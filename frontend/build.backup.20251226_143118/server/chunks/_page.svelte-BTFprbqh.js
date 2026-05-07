import { h as head, f as bind_props } from './index2-DM23HGju.js';
import './runtime-BvgGssNx.js';
import { N as Navigation } from './Navigation-QbO066q4.js';
import './exports-CgQJUv15.js';
import './state.svelte-bTJGT0Z8.js';
import './utils2-Bf5dtsip.js';
import './context-R2425nfV.js';
import './index-BEapQtpA.js';
import './auth-By6dChTT.js';
import './user-C8H-6uno.js';
import './x-C2OVpXEC.js';

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

export { _page as default };
//# sourceMappingURL=_page.svelte-BTFprbqh.js.map
