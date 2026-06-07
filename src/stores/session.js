export const session = {
  // fallback values for when ParamSelector is not rendered on mobile
  // codec is required by Agora to initialize the client
  codec: 'vp8',
  bitrateMax: 2500,
  // volume state persists across stream within the same session
  volume: 1,
  isMuted: true,
};
