export const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
export const getLocalStorageItem = (name) => {
  return window.localStorage.getItem(name);
};
export const setLocalStorageItem = (name, value) => {
  window.localStorage.setItem(name, value);
};
export const removeLocalStorageItem = (name) => {
  window.localStorage.removeItem(name);
};
