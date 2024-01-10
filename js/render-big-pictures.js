import { isEscapeKey } from './utils.js';

const COMMENTS_COUNT_SHOWN = 5;

const userModal = document.querySelector('.big-picture');
const userModalClose = userModal.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

let commentsCountShown = 0;
let comments = [];// an array to store all comments

//Function for creating one comment
const createComment = ({avatar, message, name}) => {
  const newComment = commentElement.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

//Comment drawing function
const renderComments = () => {
  commentsCountShown += COMMENTS_COUNT_SHOWN;//show 5 comments each
  if (commentsCountShown >= comments.length) {//remove the loader when all comments have loaded
    commentsLoader.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment(); //create a fragment
  for (let i = 0; i < commentsCountShown; i++) {//draw comments in portions
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentsList.innerHTML = ''; //clearing the list of comments
  commentsList.append(fragment);
  commentCount.textContent = commentsCountShown;//update the values
  totalCommentsCount.textContent = comments.length;
};
//write a function in the handlers for rendering new comments
const onCommentsLoaderClick = () => renderComments();
// write the function into the handler
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};
// Function to open full screen image
function openUserModal () {
  userModal.classList.remove('hidden');
  document.body.classList.add('modal-open'); //remove scroll
  document.addEventListener('keydown', onDocumentKeydown);
}
// Function to close full screen image
function closeUserModal () {
  commentsCountShown = 0;//reset the comment counter
  userModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', userModalClose);
}

function renderBigPicture({url, likes, description}) {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
}

function showBigPicture(picture) {
  bigPicture.classList.remove('hidden');
  openUserModal ();
  document.addEventListener('keydown', onDocumentKeydown);
  comments = picture.comments;
  renderComments();
  renderBigPicture(picture);
}
// close the full screen image
userModalClose.addEventListener('click', closeUserModal);
// button click event
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
