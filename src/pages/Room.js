import "./Room.css";
import { connectWebsocketServer } from "@services/webSocket";
import UserPanel from "../components/user/UserPanel";
import VideoContainer from "../components/video/VideoContainer";

function Room() {
  let id = new URLSearchParams(location.search).get('i');

  if (!id) {
    id = import.meta.env.VITE_DEFAULT_ROOM_ID;
    history.replaceState(null, null, `/room?i=${id}`);
  }

  connectWebsocketServer(id);

  return (`
    <div class="room">
      ${UserPanel()}
      ${VideoContainer()}
    </div>
  `);
}

export default Room;
