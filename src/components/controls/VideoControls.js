import "./VideoControls.css";
import ScreenShareButton from "./ScreenShareButton";
import ParamSelector from "./ParamSelector";
import VolumeButton from "./VolumeButton";
import PipButton from "./PipButton";
import FullscreenButton from "./FullscreenButton";

function VideoControls() {
  return (`
    <div id="video-controls">
      <div id="bottom-controls">
        <div class="center-control">
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
