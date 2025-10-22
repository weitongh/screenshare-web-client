import { onConnected } from "@utils/observer";

function PipButton() {
  const connectedCallback = () => {
    const pipBtn = document.getElementById('pip-btn');
    const videoPlayer = document.getElementById('video-player');
    const video = videoPlayer.querySelector('video');

    pipBtn.onclick = () => {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        video.requestPictureInPicture();
      }
    };

    video.onenterpictureinpicture = () => {
      const state = pipBtn.getAttribute('aria-pressed') === 'true';
      pipBtn.setAttribute('aria-pressed', String(!state));
    };
    
    video.onleavepictureinpicture = () => {
      const state = pipBtn.getAttribute('aria-pressed') === 'true';
      pipBtn.setAttribute('aria-pressed', String(!state));
    };
  };

  onConnected('video', connectedCallback);

  return (`
    <button class="control-btn" id="pip-btn" aria-pressed="false">
      <span class="tooltip before">开启画中画</span>
      <svg class="icon before" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <path fill="currentColor" d="M15 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V4.41l-4.3 4.3a1 1 0 1 1-1.4-1.42L19.58 3H16a1 1 0 0 1-1-1Z" class=""></path><path fill="currentColor" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z" class=""></path> </svg>
      <span class="tooltip after">结束画中画</span>
      <svg class="icon after" xmlns="http://www.w4.org/2000/svg" fill="none" viewBox="0 0 24 24"> <g transform="rotate(180 12 12)"> <path fill="currentColor" d="M15 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V4.41l-4.3 4.3a1 1 0 1 1-1.4-1.42L19.58 3H16a1 1 0 0 1-1-1Z"></path> <path fill="currentColor" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z"></path> </g> </svg>
    </button>
  `);
}

export default PipButton;
