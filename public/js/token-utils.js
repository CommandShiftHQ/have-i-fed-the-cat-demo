const setToken = (token) => {
  window.localStorage.setItem('apiToken', token);
};

const getToken = () => window.localStorage.getItem('apiToken');

const decodeToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const getTokenPayload = () => {
  const token = getToken();
  return token && decodeToken(token);
};

const isTokenValid = () => {
  const token = getTokenPayload();
  return Boolean(token && ((!token.exp) || (Date.now()/1000 < token.exp)));
};

const removeToken = () => {
  window.localStorage.removeItem('apiToken');
};