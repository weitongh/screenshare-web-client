import "./IOSPlayButton.css";
import { onConnected } from "@utils/observer";
import { getRemoteAudioTrack } from "@services/agora";

function IOSPlayButton() {
  onConnected('ios-play-btn', () => {
    const playBtn = document.getElementById('ios-play-btn');
    window.addEventListener('addremotevideo', () => playBtn.classList.remove('hidden'));
    window.addEventListener('removeremotevideo', () => playBtn.classList.add('hidden'));

    // Browser auto-mutes audio until user interaction
    // so pause the video on first frame too
    window.addEventListener('addremotevideo', () => {
      const video = document.querySelector('video');
      if (!video) return;
      video.ontimeupdate = () => {
        video.ontimeupdate = null;
        video.pause();
        getRemoteAudioTrack().getMediaStreamTrack().enabled = false;
      };
    });

    const syncVideoAudioState = () => {
      getRemoteAudioTrack().getMediaStreamTrack().enabled = !document.querySelector('video').paused;
    };

    const enterFullscreen = () => {
      const video = document.querySelector('video');
      if (!video) return;

      video.play();
      video.webkitEnterFullscreen();

      // The native iOS fullscreen controls can pause/resume the video without
      // triggering any JS event, so poll and mirror the video's paused state
      // to the audio track until fullscreen exits
      const poll = setInterval(() => {
        if (!video.webkitDisplayingFullscreen) {
          clearInterval(poll);
          getRemoteAudioTrack().getMediaStreamTrack().enabled = false;
        } else {
          syncVideoAudioState();
        }
      }, 300);
    };

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
