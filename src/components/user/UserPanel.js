import "./UserPanel.css";
import { onConnected } from "@utils/observer";
import { session } from "@stores/session";
import UserCard from "./UserCard";

function UserPanel() {
  const connectedCallback = () => {
    const userList = document.getElementById('user-list');

    const updateUsersList = () => {
      const users = session.users;
      userList.innerHTML = users.map(user => UserCard(user)).join('');
    };

    window.addEventListener('sessionconnected', updateUsersList);
    window.addEventListener('userchange', updateUsersList);
  };

  onConnected('user-panel', connectedCallback);

  return (`
    <div class="user-panel" id="user-panel">
      <div class="panel-header">
        <div class="title">已加入的用户</div>
      </div>
      <div class="user-list" id="user-list"></div>
    </div>
  `);
}

export default UserPanel;
