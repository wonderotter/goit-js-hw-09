import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const flatpickrEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const countDays = document.querySelector('span[data-days]');
const countHours = document.querySelector('span[data-hours]');
const countMin = document.querySelector('span[data-minutes]');
const countSec = document.querySelector('span[data-seconds]');

let intervalId = null;
startBtn.disabled = true;

