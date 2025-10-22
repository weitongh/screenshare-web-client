import "./UserCard.css";
import { onConnected } from "@utils/observer";
import { session } from "@stores/session";
import { joinStream, leaveStream } from "@services/agora";

function UserCard(user) {
  const connectedCallback = () => {
    const userCard = document.getElementById(user.id);
    const liveIcon = userCard.querySelector('.live-icon');

    const showLiveIcon = () => {
      if (user.isScreenSharing) {
        liveIcon.style.display = 'block';
      }
    };

    const hideLiveIcon = () => {
      if (!user.isScreenSharing) {
        liveIcon.style.display = 'none';
      }
    };

    const updateUserCardState = () => {
      userCard.setAttribute('aria-pressed', 'true');
    };

    const resetUserCardState = () => {
      userCard.setAttribute('aria-pressed', 'false');
    };

    userCard.onclick = async () => {
      const clicked = userCard.getAttribute('aria-pressed') === 'true';
      if (clicked) return;
      if (user.id === session.id) return;
      if (!user.isScreenSharing) return;
      if (session.isInStream) await leaveStream();
      joinStream(user.id);
      updateUserCardState();
    };

    window.addEventListener('screensharestart', showLiveIcon);
    window.addEventListener('screenshareend', hideLiveIcon);
    window.addEventListener('removeremotevideo', resetUserCardState);

    showLiveIcon();
  };

  onConnected(`${user.id}`, connectedCallback);

  return (`
    <div class="user-card" id=${user.id} aria-pressed="false">
      <div class=user-name>${user.id.split("-")[0]}</div>
        <div class="live-icon">
          Live
        </div>
    </div>
  `);
}

export default UserCard;
