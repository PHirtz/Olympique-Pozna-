import { h as head, f as bind_props, a as store_get, c as attr, u as unsubscribe_stores } from './index2-DM23HGju.js';
import { $ as $format } from './runtime-BvgGssNx.js';
import { N as Navigation } from './Navigation-QbO066q4.js';
import './exports-CgQJUv15.js';
import './state.svelte-bTJGT0Z8.js';
import { e as escape_html } from './context-R2425nfV.js';
import './utils2-Bf5dtsip.js';
import './index-BEapQtpA.js';
import './auth-By6dChTT.js';
import './user-C8H-6uno.js';
import './x-C2OVpXEC.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    head("pwqbs0", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("about.metaDescription"))}/>`);
    });
    Navigation($$renderer2);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dy2iiVPq.js.map
