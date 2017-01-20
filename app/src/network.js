/**
 * Created by Farmas on 21.10.2016.
 */
// hosts go there
export const hosts = {
  github: `https://api.github.com`,
};
export const getToken = () => {
  //get token from local storage
  try {
    return tokenStr = (window.localStorage.getItem('token'));
  } catch (ex) {
    return null;
  }
};
export const isAuthorized = () => {
  // Authorization rules
  // no authorisation now
  return true;
};

export const removeToken = () => {
  window.localStorage.removeItem('token');
};
export const setToken = (payload) => {
  window.localStorage.setItem('token', "Hello");
};

const defaultHeader = (json) => ({
  async: true,
  crossDomain: true,
  headers: {
    'Content-Type': `${json ?
      'application/json'
      :
      'application/x-www-form-urlencoded; charset=UTF-8'}`,
  },
  processData: false,
  contentType: false,
  mimeType: 'multipart/form-data',
});


export const doIt = (host, path, methodString, body = {}, json = false) => {
  const received = {
    url: `${host}/${path}`,
    method: methodString,
    body,
  };
  const header = defaultHeader(json);
  return Object.assign(
    received,
    header,
  );
};
