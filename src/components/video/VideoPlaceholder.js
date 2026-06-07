import "./VideoPlaceholder.css";
import { onConnected } from "@utils/observer";

function VideoPlaceholder() {
  const connectedCallback = () => {
    const placeholder = document.getElementById('video-placeholder');

    const hidePlaceholder = () => {
      placeholder.style.display = 'none';
    };

    const showPlaceholder = () => {
      placeholder.style.display = 'flex';
    };
    
    window.addEventListener('addlocalvideo', hidePlaceholder);
    window.addEventListener('removelocalvideo', showPlaceholder);
    window.addEventListener('addremotevideo', hidePlaceholder);
    window.addEventListener('removeremotevideo', showPlaceholder);
  };

  onConnected('video-placeholder', connectedCallback);

  return (`
    <div id="video-placeholder">
      请等待共享开始 ...
    </div>
  `);
}

export default VideoPlaceholder;
