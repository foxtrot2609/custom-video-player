/* get elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
video.volume = 0.3;

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
};

function handleRangeUpdate() {
    console.log(this.name)
    video[this.name] = this.value;
};

/* event listeners */
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) => range.addEventListener("mosemove", handleRangeUpdate));
