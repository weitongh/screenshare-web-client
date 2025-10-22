import "./VolumeButton.css";
import { onConnected } from "@utils/observer";
import { session } from "@stores/session";
import { setRemoteAudioVolume, getRemoteAudioTrack } from "@services/agora";

function VolumeButton() {
  const connectedCallback = () => {
    const volumeCtl = document.getElementById('volume-ctl');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeSlider = document.getElementById('volume-slider');

    const volume = {
      _value: 1,
      _isMuted: false,
      
      get value() {
        return this._value;
      },
      
      get isMuted() {
        return this._isMuted;
      },
      
      set value(val) {
        this._value = val;
        setRemoteAudioVolume(val);
      },

      set isMuted(bool) {
        const audio = getRemoteAudioTrack();
        this._isMuted = bool;

        if (bool) {
          audio.stop();
          volumeSlider.value = 0;
        } else {
          audio.play();
          if (this._value === 0) {
            this.value = 0.1;
          }
          volumeSlider.value = this._value;
        }
      }
    };

    const updateVolumeBtn = () => {
      let volumeLevel;

      if (volume.isMuted || volume.value === 0) {
        volumeLevel = "muted";
      } else if (volume.value >= 0.5) {
        volumeLevel = "high";
      } else {
        volumeLevel = "low";
      }

      volumeBtn.dataset.level = volumeLevel;
    };

    volumeSlider.oninput = (e) => {
      const currentVolume = parseFloat(e.target.value);
      volume.value = currentVolume;

      if (currentVolume === 0) {
        volume.isMuted = true;
      } else {
        volume.isMuted = false;
      }
      
      updateVolumeBtn();
    };

    volumeBtn.onclick = () => {
      volume.isMuted = !volume.isMuted;
      updateVolumeBtn();
    };

    const showVolumeBtn = () => {
      if (session.isInStream) {
        volumeCtl.classList.remove('hidden');
      }        
    };

    const hideVolumeBtn = () => {
      volumeCtl.classList.add('hidden');
    };

    window.addEventListener('addremotevideo', showVolumeBtn);
    window.addEventListener('removeremotevideo', hideVolumeBtn);
  };

  onConnected('volume-ctl', connectedCallback);

  return (`
    <div id="volume-ctl" class="hidden">
      <button class="control-btn" id="volume-btn" data-level="high">
        <svg class="icon high" viewBox="0 0 24 24"> <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" /> </svg>
        <svg class="icon low" viewBox="0 0 24 24"> <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" /> </svg>
        <svg class="icon muted" viewBox="0 0 24 24"> <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" /> </svg>
      </button>
      <input id="volume-slider" type="range" min="0" max="1" step="0.01" value="1">
    </div>
  `);
}

export default VolumeButton;
