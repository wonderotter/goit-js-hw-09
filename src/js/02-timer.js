import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const flatpickrEL = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const countDays = document.querySelector('span[data-days]');
const countHours = document.querySelector('span[data-hours]');
const countMin = document.querySelector('span[data-minutes]');
const countSec = document.querySelector('span[data-seconds]');

let intervalId = null;
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose([selectedDates]) {
        if (selectedDates <= Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.disabled = true;
        }
        startBtn.disabled = false;
    },
};

const picker = flatpickr(flatpickrEL, options);

startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
    startBtn.disabled = true;

    intervalId = setInterval(() => {
        const selectDate = picker.selectedDates[0];
        const startCount = selectDate - Date.now();
        const timeValue = convertMs(startCount);

        onUpdateTimer(timeValue);

        if (startCount < 1000) {
            clearInterval(intervalId);
        }
    }, 1000);
}

function onUpdateTimer({ days, hours, minutes, seconds }) {
    countDays.textContent = addLeadingZero(days);
    countHours.textContent = addLeadingZero(hours);
    countMin.textContent = addLeadingZero(minutes);
    countSec.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}