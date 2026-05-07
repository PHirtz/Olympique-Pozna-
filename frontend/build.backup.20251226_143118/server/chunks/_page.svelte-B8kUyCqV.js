import { h as head, a as store_get, e as ensure_array_like, c as attr, u as unsubscribe_stores, f as bind_props } from './index2-DM23HGju.js';
import { $ as $format } from './runtime-BvgGssNx.js';
import { N as Navigation2 } from './Navigation2-C3DrEnEH.js';
import { F as Footer } from './Footer-BJ2in_ql.js';
import { e as escape_html } from './context-R2425nfV.js';
import './utils2-Bf5dtsip.js';
import './index-BEapQtpA.js';
import './auth-By6dChTT.js';
import './exports-CgQJUv15.js';
import './state.svelte-bTJGT0Z8.js';
import './user-C8H-6uno.js';
import './x-C2OVpXEC.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    const ladies = [
      { id: "1", name: "Joueuse 1", photo: "/seniorsf/ladies.png" },
      { id: "2", name: "Joueuse 2", photo: "/seniorsf/ladies.png" },
      { id: "3", name: "Joueuse 3", photo: "/seniorsf/ladies.png" },
      { id: "4", name: "Joueuse 4", photo: "/seniorsf/ladies.png" },
      { id: "5", name: "Joueuse 5", photo: "/seniorsf/ladies.png" },
      { id: "6", name: "Joueuse 6", photo: "/seniorsf/ladies.png" },
      { id: "7", name: "Joueuse 7", photo: "/seniorsf/ladies.png" },
      { id: "8", name: "Joueuse 8", photo: "/seniorsf/ladies.png" },
      { id: "9", name: "Joueuse 9", photo: "/seniorsf/ladies.png" },
      { id: "10", name: "Joueuse 10", photo: "/seniorsf/ladies.png" },
      { id: "11", name: "Joueuse 11", photo: "/seniorsf/ladies.png" }
    ];
    head("pwqbs0", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Les Dames - Olympique Poznań</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Découvrez l'équipe féminine de l'Olympique Poznań"/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="ladies-page svelte-pwqbs0"><section class="hero-ladies svelte-pwqbs0"><div class="hero-content svelte-pwqbs0"><h1 class="svelte-pwqbs0">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("teams.ladies"))}</h1> <p class="hero-subtitle svelte-pwqbs0">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("teams.ladies-subtitle"))}</p></div></section> <main class="main-content svelte-pwqbs0"><div class="container svelte-pwqbs0"><div class="teams-grid svelte-pwqbs0"><!--[-->`);
    const each_array = ensure_array_like(ladies);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let player = each_array[$$index];
      $$renderer2.push(`<div class="team-card svelte-pwqbs0"><div class="team-image-wrapper svelte-pwqbs0"><img${attr("src", player.photo)}${attr("alt", player.name)} class="team-photo svelte-pwqbs0"/></div> <div class="team-info svelte-pwqbs0"><h3 class="svelte-pwqbs0">${escape_html(player.name)}</h3> <span class="player-number svelte-pwqbs0">#${escape_html(player.id)}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></main></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B8kUyCqV.js.map
