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
disable(true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentTime = Date.now();
        if (selectedDates[0] <= currentTime) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }
        disable(false);
        console.log(selectedDates[0]);
    },
};

flatpickr(flatpickrEL, options);

startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
    disable(true);

    intervalId = setInterval(() => {
        const timeStart = Date.now();

        let timeEnd = flatpickrEL.value;
        timeEnd = Date.parse(timeEnd);

        const startCount = timeEnd - timeStart;

        const time = convertMs(startCount);
        onUpdateTimer(time);

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

function disable(bool) {
    startBtn.disabled = bool;
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