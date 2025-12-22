import { w as writable } from "./index.js";
function persistStore(key, initial) {
  const store = writable(initial);
  return store;
}
const user = persistStore("olympique_user", null);
const token = persistStore("olympique_token", null);
function logout() {
  user.set(null);
  token.set(null);
}
function getToken() {
  let currentToken = null;
  const unsubscribe = token.subscribe((t) => {
    currentToken = t;
  });
  unsubscribe();
  return currentToken;
}
export {
  getToken as g,
  logout as l,
  user as u
};
