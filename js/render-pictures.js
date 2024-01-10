import { showBigPicture } from './render-big-pictures.js';

// Находим контейнер для изображений
const container = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content;
const template = picturesTemplate.querySelector('.picture');
const createPicture = ({ url, description, likes, comments }) => {
  //clone the template
  const picture = template.cloneNode(true);
  // insert data into template
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  return picture;
};
// draw a picture
const renderPictures = (pictures) => {
  //Create a fragment
  const fragment = document.createDocumentFragment();
  //go through the array
  pictures.forEach((picture) => {
    const newPicture = createPicture(picture);
    //create a closure
    newPicture.addEventListener('click', (evt) => {
      evt.preventDefault();//
      showBigPicture(picture); // function for drawing photos
    });
    // add an element to the end of the fragment
    fragment.appendChild(newPicture);
  });
  container.appendChild(fragment);
};

export { renderPictures, container };
