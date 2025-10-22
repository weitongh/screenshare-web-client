import "./VideoContainer.css";
import { onConnected } from "@utils/observer";
import VideoPlayer from "./VideoPlayer";
import VideoPlaceholder from "./VideoPlaceholder";
import VideoControls from "../controls/VideoControls";

function VideoContainer() {
  const connectedCallback = () => {
    const videoContainer = document.getElementById('video-container');
    const videoControls = document.getElementById('video-controls');
    const bottomControls = document.getElementById('bottom-controls');

    let hideTimeout;
    let hoveringControls = false;

    const setupEventListeners = () => {
      videoContainer.onmouseleave = () => {
        videoControls.classList.add('hidden');
      };

      videoContainer.onmousemove = () => {
        videoControls.classList.remove('hidden');
        clearTimeout(hideTimeout);
        if (!hoveringControls) {
          hideTimeout = setTimeout(() => {
            videoControls.classList.add('hidden');
          }, 2000);
        }
      };

      bottomControls.onmouseenter = () => {
        hoveringControls = true;
        clearTimeout(hideTimeout);
      };

      bottomControls.onmouseleave = () => {
        hoveringControls = false;
      };

      hideTimeout = setTimeout(() => {
        videoControls.classList.add('hidden');
      }, 2000);
    };

    const removeEventListeners = () => {
      videoContainer.onmouseleave = null;
      videoContainer.onmousemove = null;
      bottomControls.onmouseenter = null;
      bottomControls.onmouseleave = null;
      clearTimeout(hideTimeout);
      videoControls.classList.remove('hidden');
    };
    
    window.addEventListener('addlocalvideo', setupEventListeners);
    window.addEventListener('removelocalvideo', removeEventListeners);
    window.addEventListener('addremotevideo', setupEventListeners);
    window.addEventListener('removeremotevideo', removeEventListeners);
  };

  onConnected('video-container', connectedCallback);

  return (`
    <div id="video-container">
      ${VideoPlayer()}
      ${VideoPlaceholder()}
      ${VideoControls()}
    </div>
  `);
}

export default VideoContainer;
