const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const serverRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const httpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const errorText = {
  [httpMethod.GET]: 'Failed to load data',
  [httpMethod.POST]: 'Failed to send data',
};

async function request (url, method = httpMethod.GET, body = null) {
  const response = await fetch (url, {method, body});
  if (! response.ok) {
    throw new Error(errorText[method]);//throw an error
  }
  return response.json();//convert data from string to object
}

async function loadPictures() {
  return request(SERVER_URL + serverRoute.GET_DATA);
}

async function sendPictures(pictureData) {
  return request(
    SERVER_URL + serverRoute.SEND_DATA,
    httpMethod.POST,
    pictureData,
  );
}
export { loadPictures, sendPictures };
