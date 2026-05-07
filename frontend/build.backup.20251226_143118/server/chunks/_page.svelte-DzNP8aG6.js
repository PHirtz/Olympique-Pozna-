import { a as store_get, u as unsubscribe_stores } from './index2-DM23HGju.js';
import { p as page } from './stores-C5l4ksZu.js';
import { S as SponsorForm } from './SponsorForm-bJw9Ko4c.js';
import { A as Arrow_left } from './arrow-left-BpxR7UB8.js';
import './utils2-Bf5dtsip.js';
import './context-R2425nfV.js';
import './exports-CgQJUv15.js';
import './state.svelte-bTJGT0Z8.js';
import './x-C2OVpXEC.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let sponsorId;
    sponsorId = store_get($$store_subs ??= {}, "$page", page).params.id;
    $$renderer2.push(`<div class="fm-container svelte-1se3sal"><div class="fm-breadcrumb svelte-1se3sal"><a href="/admin" class="fm-breadcrumb-link svelte-1se3sal">`);
    Arrow_left($$renderer2, { size: 16 });
    $$renderer2.push(`<!----> <span>Retour au tableau de bord</span></a></div> `);
    SponsorForm($$renderer2, { mode: "edit", sponsorId });
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DzNP8aG6.js.map
