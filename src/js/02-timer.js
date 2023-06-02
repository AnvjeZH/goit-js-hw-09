import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputPickerData = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minsSpan = document.querySelector('[data-minutes]');
const secsSpan = document.querySelector('[data-seconds]');

let intervalId = null;
let selectedDate = null;

function startCount() {
  selectedDate = new Date(inputPickerData.value);
  intervalId = setInterval(() => {
    const currentDate = new Date();
    const delta = selectedDate - currentDate;

    updateTimer(delta);
    const { days, hours, minutes, seconds } = convertMs(delta);
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minsSpan.textContent = addLeadingZero(minutes);
    secsSpan.textContent = addLeadingZero(seconds);
  }, 1000);
}

function updateTimer(delta) {
  if (delta <= 0) {
    clearInterval(intervalId);
    startBtn.disabled = true;
    inputPickerData.disabled = false;
    window.alert('Please choose a date in the future');
    return;
  }
}
function addLeadingZero(value) {
  if(value < 0) {
    return '00'
  } else {
    return String(value).padStart(2, 0);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', startCount);