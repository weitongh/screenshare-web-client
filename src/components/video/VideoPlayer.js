import "./VideoPlayer.css";
import { onConnected } from "@utils/observer";
import { joinStream } from "@services/agora";

function VideoPlayer() {
  const connectedCallback = () => {
    const videoPlayer = document.getElementById('video-player');

    const setupEventListeners = () => {
      const video = videoPlayer.querySelector('video');
      document.onvisibilitychange = () => {
        document.hidden ? video.pause() : video.play();
      };
    };

    const removeVideoElement = () => {
      videoPlayer.querySelector('video')?.remove();
      document.onvisibilitychange = null;
    };
    
    window.addEventListener('screensharestart', joinStream);
    window.addEventListener('addlocalvideo', setupEventListeners);
    window.addEventListener('removelocalvideo', removeVideoElement);
    window.addEventListener('removeremotevideo', removeVideoElement);
  };

  onConnected('video-player', connectedCallback);

  return '<div id="video-player"></div>';
}

export default VideoPlayer;
