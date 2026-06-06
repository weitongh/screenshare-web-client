import "./Room.css";
import { connectWebsocketServer } from "@services/webSocket";
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
      ${VideoContainer()}
    </div>
  `);
}

export default Room;
