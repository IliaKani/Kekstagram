import { initEffect, resetEffect } from './slider.js';
import { resetScale } from './scale.js';
import { sendPictures } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const FILE_TYPES = ['jpg', 'jped', 'png'];
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
/*regular expression:
  starts with #,
  contains letters and numbers,
  has a length of 19 characters,
  case insensitive*/
const errorText = {
  INVALID_COUNT: `maximum ${MAX_HASHTAG_COUNT} hashtags`,
  NOT_UNIQUE: 'Hashtags must be unique',
  INVALID_PATTERN: 'Wrong hashtag'
};
const submitButtonCaption = {
  SUBMITTING: 'Sending...',
  IDLE: 'Publish',
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const photoPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

function toggleSubmitButton (isDisabled) {
  submitButton.disabled = isDisabled;
  if (isDisabled) {
    submitButton.textContent = submitButtonCaption.SUBMITTING;
  } else {
    submitButtonCaption.textContent = submitButtonCaption.IDLE;
  }
}

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const convertTags = function (tagString) {
  return tagString.trim() //we remove problems from the beginning and from the end
    .split(' ') //create a space-delimited array
    .filter((tag) => Boolean(tag.length)); //create a new array without extra spaces
};

const isTypeValid = (file) => {
  const fileName = file.name.toLowerCase();//convert to lower case
  return FILE_TYPES.some((item) => fileName.endsWith(item));//check that the sent file ends with the required characters
};
//hashtag matches regular expression
const isTagValid = function (value) {
  return convertTags(value).every((tag) => VALID_SYMBOLS.test(tag));
};
//number of hashtags no more than 5
const isCountValid = function (value) {
  return convertTags(value).length <= MAX_HASHTAG_COUNT;
};
// Hashtag is unique
const isTagUnique = function (value) {
  const lowerCaseTags = convertTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set (lowerCaseTags).size;//compare the length of the array with the size of Set
};

pristine.addValidator (
  hashtagField,//The dom element where validator is applied to
  isTagValid,//The function that validates the field
  errorText.INVALID_PATTERN,//The message to show when the validation fails.
  1,//Priority of the validator function
  true//halt
);

pristine.addValidator (
  hashtagField,
  isTagUnique,
  errorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator (
  hashtagField,
  isCountValid,
  errorText.INVALID_COUNT,
  3,
  true
);

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function isErrorMessageExists() {
  return Boolean(document.querySelector('.error'));
}

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    closeImgModal();
  }
};

const onFileInputChange = () => {
  const file = imgUploadInput.files[0];
  if (file && isTypeValid(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  openImgModal();
};

const onCancelButtonClick = () => {
  closeImgModal ();
};

async function sendForm(formElement) {
  if (! pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(formElement));
    closeImgModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

function openImgModal () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open'); //remove scroll
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeImgModal () {
  imgUploadForm.reset();//reset all form values
  pristine.reset();//remove Pristine listeners
  resetEffect(); //
  resetScale(); //reset Scale
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadCancel.addEventListener('click', onCancelButtonClick);
imgUploadInput.addEventListener('change', onFileInputChange);
imgUploadForm.addEventListener('submit', onFormSubmit);
initEffect();
