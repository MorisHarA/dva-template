import fetch from 'dva/fetch';
import queryString from 'query-string';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      token: localStorage.token || '',
    },
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => ({ err }));
}

export const get = (url, params) => {
  return request(params ? `${url}?${queryString.stringify(params)}` : url);
};

export const post = (url, body) => {
  return request(url, {
    method: 'POST',
    body,
  });
};

export const put = (url, body) => {
  return request(url, {
    method: 'PUT',
    body,
  });
};

export const delete = (url, body) => {
  return request(url, {
    method: 'DELETE',
    body,
  });
};

export default request;
