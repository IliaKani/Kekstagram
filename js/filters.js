import { renderPictures, container } from './render-pictures.js';
import { debounce, createRandomIdFromRangeGenerator } from './utils.js';

const PICTURE_RANDOM_COUNT = 10;

const filterForm = document.querySelector('.img-filters__form');
//clear all photos
const clearPictures = () => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
};
//make filter visible
const showFilters = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};
//toggle button highlighting only if the button is clicked
const onFilterButtonClick = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

const rerenderPictures = (data) => {
  clearPictures();
  renderPictures(data);
};

const debounceRerender = debounce(rerenderPictures);

const filtersFunctions = {
  'filter-default': (data) => {
    debounceRerender(data);
  },
  'filter-random': (data) => {
    const createPictureId = createRandomIdFromRangeGenerator(0, data.length - 1);
    const randomPictures = [];
    const min = Math.min(PICTURE_RANDOM_COUNT, data.length);
    while (randomPictures.length < min) {
      randomPictures.push(data[createPictureId()]);
    }
    debounceRerender(randomPictures);
  },
  'filter-discussed': (data) => {
    debounceRerender(
      data
        .slice()
        .sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length)
    );
  }
};

const changeImgFilter = (posts) => {
  filterForm.addEventListener('click', (evt) => {
    filtersFunctions[evt.target.id](posts); //select a function by button id
    onFilterButtonClick(evt);
  });
};

const initFilter = (posts) => {
  showFilters();
  changeImgFilter(posts);
};

export { initFilter };
