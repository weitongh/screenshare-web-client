import "./ParamSelector.css";
import { onConnected } from "@utils/observer";
import { session } from "@stores/session";

function ParamSelector() {
  const connectedCallback = () => {
    const bitrateSelector = document.getElementById('bitrate-select');
    const codecSelector = document.getElementById('codec-select');

    bitrateSelector.onchange = () => {
      session.bitrateMax = bitrateSelector.value;
    };

    codecSelector.onchange = () => {
      session.codec = codecSelector.value;
    };
    
    session.bitrateMax = bitrateSelector.value;
    session.codec = codecSelector.value;
  };

  onConnected('param-selector', connectedCallback);

  return (`
    <div id="param-selector">
      <label for="bitrate-select">码率:</label>
      <select class="param-select" id="bitrate-select">
        <option value="8000">8000 kbps</option>
        <option value="6000" selected>6000 kbps</option>
        <option value="4000">4000 kbps</option>
        <option value="2500">2500 kbps</option>
      </select>

      <label for="codec-select">编码:</label>
      <select class="param-select" id="codec-select">
        <option value="h264">H264</option>
        <option value="vp9" selected>VP9</option>
        <option value="vp8">VP8</option>
        <option value="av1">AV1</option>
      </select>
    </div>
  `);
}

export default ParamSelector;
