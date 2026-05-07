import { h as head, f as bind_props } from './index2-DM23HGju.js';
import './runtime-BvgGssNx.js';
import { N as Navigation2 } from './Navigation2-C3DrEnEH.js';
import { F as Footer } from './Footer-BJ2in_ql.js';
import './utils2-Bf5dtsip.js';
import './context-R2425nfV.js';
import './index-BEapQtpA.js';
import './auth-By6dChTT.js';
import './exports-CgQJUv15.js';
import './state.svelte-bTJGT0Z8.js';
import './user-C8H-6uno.js';
import './x-C2OVpXEC.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let partnersList = [];
    ({
      main_sponsor: partnersList.filter((p) => p.category === "main_sponsor"),
      gold: partnersList.filter((p) => p.category === "gold"),
      silver: partnersList.filter((p) => p.category === "silver"),
      bronze: partnersList.filter((p) => p.category === "bronze"),
      partner: partnersList.filter((p) => p.category === "partner"),
      supplier: partnersList.filter((p) => p.category === "supplier"),
      institutional: partnersList.filter((p) => p.category === "institutional")
    });
    head("1yqxcjh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Nos Partenaires - Olympique Poznań</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Découvrez nos partenaires, merci à eux de nous soutenir dans tous nos projets"/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="partners-page svelte-1yqxcjh"><section class="hero-partners svelte-1yqxcjh"><div class="hero-overlay"></div> <div class="hero-content svelte-1yqxcjh"><h1 class="svelte-1yqxcjh">Nos Partenaires</h1> <p class="svelte-1yqxcjh">Merci à eux de nous soutenir et nous permettent de réaliser nos projets</p></div></section> <section class="partners-content svelte-1yqxcjh"><div class="container svelte-1yqxcjh">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="loading-state svelte-1yqxcjh"><div class="spinner svelte-1yqxcjh"></div> <p>Chargement des partenaires...</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></section></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CX0BlewX.js.map
