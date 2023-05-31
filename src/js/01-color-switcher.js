const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyRef = document.body;

let timerId = null;

startBtn.addEventListener('click', onChangeColor);
stopBtn.addEventListener('click', onStopChangeColor);

function onChangeColor() {
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
}
function onStopChangeColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
