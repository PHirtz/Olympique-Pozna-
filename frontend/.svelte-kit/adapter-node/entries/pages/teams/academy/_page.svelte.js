import { h as head, d as bind_props } from "../../../../chunks/index2.js";
import "../../../../chunks/runtime.js";
import { N as Navigation } from "../../../../chunks/Navigation.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
/* empty css                                                      */
function _page($$renderer, $$props) {
  let data = $$props["data"];
  head("i5ti3o", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>L'académie</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Découvrez l'académie de l'Olympique Poznan et ses équipes jeunes"/>`);
  });
  Navigation($$renderer);
  bind_props($$props, { data });
}
export {
  _page as default
};
