import "./IOSPlayButton.css";
import { onConnected } from "@utils/observer";
import { getRemoteAudioTrack } from "@services/agora";

function IOSPlayButton() {
  onConnected('ios-play-btn', () => {
    const playBtn = document.getElementById('ios-play-btn');

    const showPlayBtn = () => {
      playBtn.classList.remove('hidden')
    };

    const hidePlayBtn = () => {
      playBtn.classList.add('hidden')
    };

    const syncVideoAudioState = () => {
      getRemoteAudioTrack().getMediaStreamTrack().enabled = !document.querySelector('video').paused;
    };

    const pauseAudio = () => {
      getRemoteAudioTrack().getMediaStreamTrack().enabled = false;
    };

    const enterFullscreen = () => {
      const video = document.querySelector('video');
      if (!video) return;

      video.play();
      video.webkitEnterFullscreen();
      hidePlayBtn();

      // Native iOS fullscreen controls can pause or resume the video without
      // triggering any JS events, so poll and sync the video and audio track
      // states until fullscreen mode exits
      const poll = setInterval(() => {
        if (video.webkitDisplayingFullscreen) {
          syncVideoAudioState();
        } else {
          clearInterval(poll);
          pauseAudio();
          showPlayBtn();
        }
      }, 300);
    };

    window.addEventListener('addremotevideo', () => {
      const video = document.querySelector('video');
      if (!video) return;

      video.ontimeupdate = () => {
        video.ontimeupdate = null;
        // Browsers block audio playback until the user interacts with the page,
        // so start each stream session paused on the first frame for consistency
        video.pause();
        pauseAudio();
      };

      showPlayBtn();
    });

    window.addEventListener('removeremotevideo', hidePlayBtn);

    playBtn.onclick = enterFullscreen;
  });

  return (`
    <div id="ios-play-btn" class="hidden">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </div>
  `);
}

export default IOSPlayButton;
