export function onConnected(target, callback) {
  const observer = new MutationObserver(() => {

    let element;
    
    if (target === 'video') {
      const videoPlayer = document.getElementById('video-player');
      element = videoPlayer.querySelector('video');
    } else {
      element = document.getElementById(target);
    }

    if (element) {
      callback();
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
