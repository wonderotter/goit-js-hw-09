import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onPromiseCreate);

function onPromiseCreate(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);
  makePromises(inputDelay, inputStep, inputAmount);
  e.target.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function makePromises(delay, step, amount) {
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}