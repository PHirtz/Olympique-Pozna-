import "clsx";
import { S as SponsorForm } from "../../../../../chunks/SponsorForm.js";
import { A as Arrow_left } from "../../../../../chunks/arrow-left.js";
function _page($$renderer) {
  $$renderer.push(`<div class="fm-container svelte-4n19b"><div class="fm-breadcrumb svelte-4n19b"><a href="/admin" class="fm-breadcrumb-link svelte-4n19b">`);
  Arrow_left($$renderer, { size: 16 });
  $$renderer.push(`<!----> <span>Retour au tableau de bord</span></a></div> `);
  SponsorForm($$renderer, { mode: "create" });
  $$renderer.push(`<!----></div>`);
}
export {
  _page as default
};
