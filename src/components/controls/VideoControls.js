import "./VideoControls.css";
import { onConnected } from "@utils/observer";
import ScreenShareButton from "./ScreenShareButton";
import ParamSelector from "./ParamSelector";
import VolumeButton from "./VolumeButton";
import PipButton from "./PipButton";
import FullscreenButton from "./FullscreenButton";

function VideoControls() {
  let centerControl = '';

  const isNotMobile = !window.matchMedia('(max-width: 768px)').matches;

  const connectedCallback = () => {
    const centerControl = document.getElementById('center-control');

    const showCenterControl = () => {
        centerControl.classList.remove('hidden');
    };

    const hideCenterControl = () => {
      centerControl.classList.add('hidden');
    };

    window.addEventListener('addremotevideo', hideCenterControl);
    window.addEventListener('removeremotevideo', showCenterControl);
  }

  if (isNotMobile) {
    centerControl = `<div class="center-control" id="center-control"> ${ScreenShareButton()} ${ParamSelector()} </div>`;
    onConnected('center-control', connectedCallback);
  }

  return (`
    <div id="video-controls">
      <div id="bottom-controls">
        ${centerControl}
  
        <div class="right-control">
          ${VolumeButton()}
          ${PipButton()}
          ${FullscreenButton()}
        </div>
      </div>
    </div>
  `);
}

export default VideoControls;
