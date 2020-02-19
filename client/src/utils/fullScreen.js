/* View in fullscreen */
export function open(maximizeElement = document.documentElement) {

  if (maximizeElement.requestFullscreen) {
    maximizeElement.requestFullscreen();
  } else if (maximizeElement.mozRequestFullScreen) { /* Firefox */
    maximizeElement.mozRequestFullScreen();
  } else if (maximizeElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    maximizeElement.webkitRequestFullscreen();
  } else if (maximizeElement.msRequestFullscreen) { /* IE/Edge */
    maximizeElement.msRequestFullscreen();
  } else {
    return false;
  }
  return true;
}

/* Close fullscreen */
export function close() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  } else {
    return false;
  }
  return true;
}
