import "../../chunks/i18n.js";
import { w as waitLocale } from "../../chunks/runtime.js";
const load = async () => {
  await waitLocale();
  return {};
};
export {
  load
};
