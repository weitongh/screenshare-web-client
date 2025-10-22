export const session = {};

const updateSessionState = () => {
  session.isInStream = true;
};

const resetSessionState = () => {
  session.isInStream = false;
};

window.addEventListener('addremotevideo', updateSessionState);
window.addEventListener('removeremotevideo', resetSessionState);
