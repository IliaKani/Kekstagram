import './render-big-pictures.js';
import './form.js';
import './slider.js';
import { renderPictures } from './render-pictures.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './utils.js';
import { initFilter } from './filters.js';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderPictures(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
}

bootstrap();
