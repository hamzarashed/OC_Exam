storeItem = function (name, value, isJsonString, isLocal) {
  if (isJsonString) {
    localStorage.setItem(name, JSON.stringify(value));
  } else {
    localStorage.setItem(name, value);
  }
};

getItem = function (name, isJsonString) {
  var value = localStorage.getItem(name);
  if (isJsonString) {
    return value ? JSON.parse(value) : null;
  } else {
    return localStorage.getItem(name);
  }
};

removeItem = function (name) {
  localStorage.removeItem(name);
};
