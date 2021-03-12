/* variables */
let mousedown = false;
let fullScreenFlag = false;

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

/* functions */
const togglePlay = () => {
  if (video.paused) {
    video.play();
    toggle.innerHTML = "&#10074;&#10074;";
  } else {
    video.pause();
    toggle.innerHTML = "&#9658;";
  }
};

function skip() {
  video.currentTime += +this.dataset.skip;
}

function handleRangeUpdate() {
  console.log(this.name);
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
