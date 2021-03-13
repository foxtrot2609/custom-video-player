/* variables */
let mousedown = false;
let fullScreenFlag = false;
let x, y;

/* get elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
video.volume = 0.3;
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const openButton = player.querySelector("[data-action]");
const ranges = player.querySelectorAll(".player__slider");
const header = player.querySelector(".header");
const playerControls = player.querySelector(".player__controls");

/* functions */
const togglePlay = () => {
  if (video.paused) {
    video.play();
    toggle.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-118"></use><path class="ytp-svg-fill" d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" id="ytp-id-118"></path></svg>';
  } else {
    video.pause();
    toggle.innerHTML = '<svg version="1.1" height="100%" viewBox="0 0 48 48" width="100%" xmlns="http://www.w3.org/2000/svg"><path data-icon="icon" d="M-838-2232H562v3600H-838z" fill="none" /><path d="M16 10v28l22-14z" /><path d="M0 0h48v48H0z" fill="none" /></svg>';
  }
};

function skip() {
  video.currentTime += +this.dataset.skip;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const fullScreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitrequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullscreen) {
    element.mozRequestFullScreen();
  }
};

const fullScreenCancel = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitRequestFullscreen) {
    document.webkitRequestFullscreen();
  } else if (document.mozRequestFullscreen) {
    document.mozRequestFullScreen();
  }
};

const openFullScreen = () => {
  if (!fullScreenFlag) {
    fullScreen(player);
    fullScreenFlag = true;
  } else {
    fullScreenCancel();
    fullScreenFlag = false;
  }
};

/* event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mosemove", handleRangeUpdate)
);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
openButton.addEventListener("click", openFullScreen);

player.addEventListener("mousemove", (e) => {
  /* work only with fullscreen */
  if (!fullScreenFlag) {
    document.documentElement.style.cursor = "auto";
    header.style.top = "";
    playerControls.style.bottom = "";
    return;
  }
  /* hide cursor and panels after 5 sec without moving mouse */
  [x, y] = [e.screenX, e.screenY];
  document.documentElement.style.cursor = "auto";
  header.style.top = "";
  playerControls.style.bottom = "";

  setTimeout(() => {
    if (!(x === e.screenX && y === e.screenY)) return;
    document.documentElement.style.cursor = "none";
    header.style.top = "-5vh";
    playerControls.style.bottom = "calc(-6vh + 5px)";
  }, 5000);
});
