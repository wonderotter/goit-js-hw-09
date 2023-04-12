function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

function onStart() {
    refs.stopBtn.disabled = '';
    refs.startBtn.disabled = 'disabled';
    document.body.style.backgroundColor = getRandomHexColor();
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onStop() {
    refs.startBtn.disabled = '';
    clearInterval(timerId);
}
