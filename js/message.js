const successMessage = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMessage = document
  .querySelector('#error')
  .content
  .querySelector('.error');

const body = document.querySelector('body');

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }
  hideMessage();
}

function hideMessage() {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onBodyClick);
}

function onCloseButtonClick() {
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

function showSuccessMessage() {
  const element = successMessage.cloneNode(true);
  body.appendChild(element);
  const successBbutton = element.querySelector('.success__button');
  document.addEventListener('keydown', onDocumentKeydown);
  successBbutton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('click', onBodyClick);
}

function showErrorMessage() {
  const element = errorMessage.cloneNode(true);
  body.appendChild(element);
  const ErrorButton = element.querySelector('.error__button');
  document.addEventListener('keydown', onDocumentKeydown);
  ErrorButton.addEventListener('click', hideMessage);
  document.addEventListener('click', onBodyClick);
}

export { showSuccessMessage, showErrorMessage };
