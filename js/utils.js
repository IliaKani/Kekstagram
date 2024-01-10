const REMOVE_MESSAGE_TIMEOUT = 5000;//5 sec
const errorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

function showErrorMessage() {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
}

function debounce (callback, timeoutDelay = 500) {
  // We use closures so that the timeout id is permanently stuck to us
  // to the returned function with setTimeout, then we can overwrite it
  let timeoutId;

  return (...rest) => {
    // Before each new call, we delete the previous timeout,
    // so they don't accumulate
    clearTimeout(timeoutId);

    // Then we set a new timeout with a callback call for the same delay
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Thus, the cycle “set timeout - remove timeout” will be executed,
    // as long as the action is performed more often than the passed timeoutDelay
  };
}

function throttle (callback, delayBetweenFrames) {
  // We use closures to make the “last frame” time stick forever
  // to the returned function with a condition, then we can overwrite it
  let lastTime = 0;

  return (...rest) => {
    // Пget the current date in milliseconds,
    // so that it will be possible in the future
    // calculate the difference between frames
    const now = new Date();

    // If the time between frames is greater than the delay,
    // call our callback and overwrite lastTime
    // "last frame" time
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

//function to get a random number
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min,max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
//Function event on click on Esc
const isEscapeKey = (evt) => evt.key === 'Escape';


export {showErrorMessage, isEscapeKey, throttle, debounce, createRandomIdFromRangeGenerator};
