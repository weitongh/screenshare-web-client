import { session } from "@stores/session";

export function connectWebsocketServer(id) {
  const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/${id}`);

  const sendMessage = (msg) => ws.send(JSON.stringify({ type: msg }));
  
  // Host user sends messages to WebSocket server
  ws.onopen = () => sendMessage('joined');
  window.addEventListener('addlocalvideo', () => sendMessage('started'));
  window.addEventListener('removelocalvideo', () => sendMessage('ended'));

  // Audience user receives messages from WebSocket server
  ws.onmessage = handleMessage;
};

async function handleMessage(e) {
  const msg = JSON.parse(e.data);
  switch (msg.type) {
    case 'connected':
      handleSessionConnected(msg);
      break;
    case 'joined':
      handleUserJoined(msg);
      break;
    case 'started':
      handleScreenShareStarted(msg);
      break;
    case 'ended':
      handleScreenShareEnded(msg);
      break;
    case 'left':
      handleUserLeft(msg);
      break;
    default:
      break;
  }
};

function handleSessionConnected(msg) {
  Object.assign(session, msg);
  window.dispatchEvent(new Event('sessionconnected'));
};

function handleUserJoined(msg) {
  session.users.push({ id: msg.id });
  window.dispatchEvent(new Event('userchange'));
};

function handleScreenShareStarted(msg) {
  const user = session.users.find(user => user.id === msg.id)
  if (user) {
    user.isScreenSharing = true;
  }
  window.dispatchEvent(new Event('screensharestart'));
};

function handleScreenShareEnded(msg) {
  const user = session.users.find(user => user.id === msg.id)
  if (user) {
    user.isScreenSharing = false;
  }
  window.dispatchEvent(new Event('screenshareend'));
};

function handleUserLeft(msg) {
  const index = session.users.findIndex(user => user.id === msg.id);
  if (index !== -1) {
    session.users.splice(index, 1);
  }
  window.dispatchEvent(new Event('userchange'));
};
