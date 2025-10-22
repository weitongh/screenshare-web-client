import "./FullscreenButton.css";
import { onConnected } from "@utils/observer";

function FullscreenButton() {
  const connectedCallback = () => {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const videoContainer = document.getElementById('video-container');

    fullscreenBtn.onclick = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else {
        const video = videoContainer.querySelector('video');
        video.webkitEnterFullscreen();
      }
    };

    videoContainer.onfullscreenchange = () => {
      const state = fullscreenBtn.getAttribute('aria-pressed') === 'true';
      fullscreenBtn.setAttribute('aria-pressed', String(!state));
    };
  };

  onConnected('fullscreen-btn', connectedCallback);

  return (`
    <button class="control-btn" id="fullscreen-btn" aria-pressed="false">
      <span class="tooltip before">进入全屏</span>
      <svg class="icon before" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <path fill="currentColor" d="M4 6c0-1.1.9-2 2-2h3a1 1 0 0 0 0-2H6a4 4 0 0 0-4 4v3a1 1 0 0 0 2 0V6ZM4 18c0 1.1.9 2 2 2h3a1 1 0 1 1 0 2H6a4 4 0 0 1-4-4v-3a1 1 0 1 1 2 0v3ZM18 4a2 2 0 0 1 2 2v3a1 1 0 1 0 2 0V6a4 4 0 0 0-4-4h-3a1 1 0 1 0 0 2h3ZM20 18a2 2 0 0 1-2 2h-3a1 1 0 1 0 0 2h3a4 4 0 0 0 4-4v-3a1 1 0 1 0-2 0v3Z" class=""></path> </svg>
      <span class="tooltip after">退出全屏</span>
      <svg class="icon after" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <path fill="currentColor" d="M8 6a2 2 0 0 1-2 2H3a1 1 0 0 0 0 2h3a4 4 0 0 0 4-4V3a1 1 0 0 0-2 0v3ZM8 18a2 2 0 0 0-2-2H3a1 1 0 1 1 0-2h3a4 4 0 0 1 4 4v3a1 1 0 1 1-2 0v-3ZM18 8a2 2 0 0 1-2-2V3a1 1 0 1 0-2 0v3a4 4 0 0 0 4 4h3a1 1 0 1 0 0-2h-3ZM16 18c0-1.1.9-2 2-2h3a1 1 0 1 0 0-2h-3a4 4 0 0 0-4 4v3a1 1 0 1 0 2 0v-3Z" class=""></path> </svg>
    </button>
  `);
}

export default FullscreenButton;
