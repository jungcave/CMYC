import {isObject} from './primitives';

export const getPaths = (url = window.location.pathname) => url.split('/').filter(Boolean);

export const getUrlSlug = (url = window.location.pathname, ofPage = '') =>
  !ofPage
    ? [url.split('/').filter(Boolean).pop()] // returns last page inside array
    : url.includes(ofPage)
      ? url.split(`/${ofPage}`).pop().split('/').filter(Boolean)
      : null; // url doesnt include page

export const getParams = (search = window.location.search) => Object.fromEntries(new URLSearchParams(search).entries());

export const getStatus = (res) => (isObject(res) ? res.status : res);

export const isSuccess = (res) =>
  res && !res.error && getStatus(res) >= 200 && getStatus(res) < 300;
