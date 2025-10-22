import "./ScreenShareButton.css";
import { onConnected } from "@utils/observer";
import { session } from "@stores/session";
import { startScreenShare, stopScreenShare } from "@services/agora";

function ScreenShareButton() {
  const connectedCallback = () => {
    const screenShareBtn = document.getElementById('screenshare-btn');

    const updateScreenShareBtnState = () => {
      screenShareBtn.setAttribute('aria-pressed', 'true');
    };

    const resetScreenShareBtnState = () => {
      screenShareBtn.setAttribute('aria-pressed', 'false');
    };

    screenShareBtn.onclick = async () => {
      const screenSharing = screenShareBtn.getAttribute('aria-pressed') === 'true';
      if (!screenSharing) {
        startScreenShare(session.id);
      } else {
        stopScreenShare();
      }
    };

    window.addEventListener('addlocalvideo', updateScreenShareBtnState);
    window.addEventListener('removelocalvideo', resetScreenShareBtnState);
  };

  onConnected('screenshare-btn', connectedCallback);

  return (`
    <button class="control-btn" id="screenshare-btn" aria-pressed="false">
      <span class="tooltip before">共享屏幕</span>
      <svg class="icon before" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <rect x="3" y="4" width="18" height="12" rx="2" /> <path d="M8 20h8M12 16v4" /> <path d="M12 14V8" /> <path d="M9.5 10.5 12 8l2.5 2.5" /> </svg>
      <span class="tooltip after">结束共享</span>
      <svg class="icon after" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <rect x="3" y="4" width="18" height="12" rx="2"/> <path d="M8.5 18h7l-1.2 2H9.7L8.5 18z" /> <g stroke="#000" stroke-width="2" stroke-linecap="round"> <line x1="9" y1="8" x2="15" y2="14"/> <line x1="15" y1="8" x2="9" y2="14"/> </g> </svg>
    </button>
  `);
}

export default ScreenShareButton;
