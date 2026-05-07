import { a as store_get, u as unsubscribe_stores } from './index2-DM23HGju.js';
import './exports-CgQJUv15.js';
import './state.svelte-bTJGT0Z8.js';
import { p as page } from './stores-C5l4ksZu.js';
import './utils2-Bf5dtsip.js';
import './context-R2425nfV.js';

function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).url.pathname;
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="min-h-screen flex items-center justify-center"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div> <p class="mt-4 text-gray-600">Chargement...</p></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-C_Ac5snB.js.map
