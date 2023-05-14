export const cloneObj = obj => {
  return JSON.parse(JSON.stringify(obj));
};
export const getLocalStorageItem = name => {
  return window.localStorage.getItem(name);
};
export const setLocalStorageItem = (name, value) => {
  window.localStorage.setItem(name, value);
};
export const removeLocalStorageItem = name => {
  window.localStorage.removeItem(name);
};
export const mergeArrayWithItemById = (array, item) => {
  const itemIndex = array.findIndex(arrayItem => arrayItem._id === item._id);
  if (itemIndex === -1) return [...array, item];
  const beforeItem = array.slice(0, itemIndex);
  const afterItem = array.slice(itemIndex + 1);
  return [...beforeItem, item, ...afterItem];
};
export const deleteItemFromArrayById = (array, productId) => {
  const itemIndex = array.findIndex(arrayItem => arrayItem._id === productId);
  if (itemIndex === -1)
    throw new Error(`Product with id ${productId} not found!`);
  const beforeItem = array.slice(0, itemIndex);
  const afterItem = array.slice(itemIndex + 1);
  return [...beforeItem, ...afterItem];
};
