const styleOfEffect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectToFilter = {
  [styleOfEffect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [styleOfEffect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [styleOfEffect.MARVIN]: {
    style: 'invert',
    unit: '%'
  },
  [styleOfEffect.PHOBOS]: {
    style: 'blur',
    unit: 'px'
  },
  [styleOfEffect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [styleOfEffect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [styleOfEffect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [styleOfEffect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [styleOfEffect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [styleOfEffect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [styleOfEffect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modal = document.querySelector('.img-upload');
const image = modal.querySelector('.img-upload__preview img');
const effects = modal.querySelector('.effects');
const slider = modal.querySelector('.effect-level__slider');
const sliderContainer = modal.querySelector('.img-upload__effect-level');
const effectLevelValue = modal.querySelector('.effect-level__value');
//write to the initial value - the default value
let chosenEffect = styleOfEffect.DEFAULT;
//фfunction that allows you to define the default effect
const isDefault = () => chosenEffect === styleOfEffect.DEFAULT;
//we substitute the style into our element
const setImageStyle = function () {
  if (isDefault()) {
    image.style.filter = null;
    return;
  }
  const { value } = effectLevelValue;//записываем значение по умолчанию
  const { style, unit } = effectToFilter[chosenEffect];//берем значение из объекта
  image.style.filter = `${style}(${value}${unit})`;//получаем например blur(3px)
};

const showSlider = function () {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = function () {
  sliderContainer.classList.add('hidden');
};

const onSliderUpdate = function () {
  effectLevelValue.value = slider.noUiSlider.get();//get the value from the slider
  setImageStyle();
};
//create slider
const createSlider = function ({min, max, step}) {
  noUiSlider.create(slider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),//convert the value from a string to a number
      from: (value) => Number(value),
    }
  });
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

//update slider values when switching
const updateSlider = function ({min, max, step}) {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = function () {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = function (effect) {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};
const resetEffect = function () {
  setEffect(styleOfEffect.DEFAULT);
};

const onEffectChange = function (evt) {
  setEffect(evt.target.value);
};

const initEffect = function () {
  createSlider(effectToSliderOptions[chosenEffect]);
  effects.addEventListener('change', onEffectChange);
};

export { initEffect, resetEffect };
