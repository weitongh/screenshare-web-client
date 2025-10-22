import { createClient, createScreenVideoTrack } from "agora-rtc-sdk-ng/esm";
import { session } from "@stores/session";

const appId = import.meta.env.VITE_AGORA_APP_ID;
const token = null;
const uid = 0;

let client;
let localVideoTrack;
let localAudioTrack;
let remoteAudioTrack;

function initializeClient() {
  client = createClient({ mode: 'live', codec: `${session.codec}`});
}

async function joinAsHost(channel) {
  await client.join(appId, channel, token, uid);
  client.setClientRole('host');
  await createLocalTracks();
  await publishLocalTracks();
  displayLocalVideo();
}

async function joinAsAudience(channel) {
  await client.join(appId, channel, token, uid);
  const clientRoleOptions = { level: 1 };
  client.setClientRole('audience', clientRoleOptions);
}

async function createLocalTracks() {
   const localTracks = await createScreenVideoTrack({
    encoderConfig: {
      bitrateMax: `${session.bitrateMax}`,
      frameRate: { max: 30 },
      height: { max: 1080 },
      width: { max: 1920 },
    }
  }, 'auto');

  if (Array.isArray(localTracks)) {
    [localVideoTrack, localAudioTrack] = localTracks;
  } else {
    localVideoTrack = localTracks;
  }
}

async function publishLocalTracks() {
  if (localAudioTrack) {
    await client.publish([localVideoTrack, localAudioTrack]);
  } else {
    await client.publish([localVideoTrack]);
  }
}

function displayLocalVideo() {
  localVideoTrack.play('video-player');
  window.dispatchEvent(new Event('addlocalvideo'));
}

function setupHostEventListenders() {
  const videoTrack = localVideoTrack.getMediaStreamTrack();
  // Will be Triggered by browser's built-in stop button
  videoTrack.onended = () => {
    stopScreenShare();
  };
}

function setupAudienceEventListeners() {
  client.on('user-published', async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === 'video') {
      user.videoTrack.play('video-player', {
        fit: 'contain'
      });
    }
    if (mediaType === 'audio') {
      user.audioTrack.play();
      remoteAudioTrack = user.audioTrack;
    }
    window.dispatchEvent(new Event('addremotevideo'));
  });

  client.on('user-unpublished', () => {
    // Prevent audiences from afk in the channel,
    // which will generate audio usage time
    leaveStream();
    remoteAudioTrack = null;
  });
}

export async function startScreenShare(channel) {
  initializeClient();
  await joinAsHost(channel);
  setupHostEventListenders();
}

export async function stopScreenShare() {
  if (localAudioTrack) {
    localAudioTrack.close();
    localAudioTrack = null; 
  }
  if (localVideoTrack) {
    localVideoTrack.close();
    localVideoTrack = null; 
    window.dispatchEvent(new Event('removelocalvideo'));
  }
  await client.leave();
}

export async function joinStream(channel) {
  initializeClient();
  setupAudienceEventListeners();
  await joinAsAudience(channel);
}

export async function leaveStream() {
  await client.leave();
  remoteAudioTrack = null;
  window.dispatchEvent(new Event('removeremotevideo'));
}

export function setRemoteAudioVolume(volume) {
  if (remoteAudioTrack) {
    remoteAudioTrack.setVolume(volume * 100);
  }
}

export function getRemoteAudioTrack() {
  return remoteAudioTrack;
}
