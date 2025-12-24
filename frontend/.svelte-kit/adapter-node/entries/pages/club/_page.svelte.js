import { h as head, d as bind_props } from "../../../chunks/index2.js";
import "clsx";
import { N as Navigation2 } from "../../../chunks/Navigation2.js";
import "../../../chunks/runtime.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
/* empty css                                                   */
function _page($$renderer, $$props) {
  let data = $$props["data"];
  head("xdt42l", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Le Club - Olympique Poznań</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Découvrez notre club"/>`);
  });
  Navigation2($$renderer);
  bind_props($$props, { data });
}
export {
  _page as default
};
