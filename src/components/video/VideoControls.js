import "./VideoControls.css";
import { onConnected } from "@utils/observer";
import ScreenShareButton from "../controls/ScreenShareButton";
import ParamSelector from "../controls/ParamSelector";
import VolumeButton from "../controls/VolumeButton";
import PipButton from "../controls/PipButton";
import FullscreenButton from "../controls/FullscreenButton";

function VideoControls() {
  onConnected('video-controls', () => {
    const centerControl = document.getElementById('center-control');

    const showCenterControl = () => {
      centerControl.classList.remove('hidden');
    };

    const hideCenterControl = () => {
      centerControl.classList.add('hidden');
    };

    window.addEventListener('addremotevideo', hideCenterControl);
    window.addEventListener('removeremotevideo', showCenterControl);
  });

  return (`
    <div id="video-controls">
      <div id="bottom-controls">
        <div class="center-control" id="center-control">
          ${ScreenShareButton()}
          ${ParamSelector()}
        </div>
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
