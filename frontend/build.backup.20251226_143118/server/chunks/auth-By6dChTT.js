import { w as writable } from './index-BEapQtpA.js';

function persistStore(key, initial) {
  const store = writable(initial);
  return store;
}
const user = persistStore("olympique_user", null);
const token = persistStore("olympique_token", null);
function getToken() {
  let currentToken = null;
  const unsubscribe = token.subscribe((t) => {
    currentToken = t;
  });
  unsubscribe();
  return currentToken;
}

export { getToken as g, user as u };
//# sourceMappingURL=auth-By6dChTT.js.map
