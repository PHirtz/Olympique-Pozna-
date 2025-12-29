import { h as head, a as store_get, e as ensure_array_like, c as attr, u as unsubscribe_stores, d as bind_props } from "../../../../chunks/index2.js";
import { $ as $format } from "../../../../chunks/runtime.js";
import { N as Navigation2 } from "../../../../chunks/Navigation2.js";
import { F as Footer } from "../../../../chunks/Footer.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    const blues = [
      { id: "1", name: "Joueur 1", photo: "/seniorsh/blues.png" },
      { id: "2", name: "Joueur 2", photo: "/seniorsh/blues.png" },
      { id: "3", name: "Joueur 3", photo: "/seniorsh/blues.png" },
      { id: "4", name: "Joueur 4", photo: "/seniorsh/blues.png" },
      { id: "5", name: "Joueur 5", photo: "/seniorsh/blues.png" },
      { id: "6", name: "Joueur 6", photo: "/seniorsh/blues.png" },
      { id: "7", name: "Joueur 7", photo: "/seniorsh/blues.png" },
      { id: "8", name: "Joueur 8", photo: "/seniorsh/blues.png" },
      { id: "9", name: "Joueur 9", photo: "/seniorsh/blues.png" },
      { id: "10", name: "Joueur 10", photo: "/seniorsh/blues.png" },
      { id: "11", name: "Joueur 11", photo: "/seniorsh/blues.png" }
    ];
    head("f0x6kf", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Les Bleus - Olympique Poznań</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Découvrez l'équipe masculine de l'Olympique Poznań"/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="blues-page svelte-f0x6kf"><section class="hero-blues svelte-f0x6kf"><div class="hero-background svelte-f0x6kf"><img src="/seniorsh/552250913_691587517304371_2630196048960264861_n.jpg" alt="Les Bleus" class="hero-image svelte-f0x6kf"/> <div class="hero-overlay svelte-f0x6kf"></div></div> <div class="hero-content svelte-f0x6kf"><h1 class="svelte-f0x6kf">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("teams.blues"))}</h1> <p class="hero-subtitle svelte-f0x6kf">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("teams.blues-subtitle"))}</p></div></section> <main class="main-content svelte-f0x6kf"><div class="container svelte-f0x6kf"><div class="teams-grid svelte-f0x6kf"><!--[-->`);
    const each_array = ensure_array_like(blues);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let player = each_array[$$index];
      $$renderer2.push(`<div class="team-card svelte-f0x6kf"><div class="team-image-wrapper svelte-f0x6kf"><img${attr("src", player.photo)}${attr("alt", player.name)} class="team-photo svelte-f0x6kf"/></div> <div class="team-info svelte-f0x6kf"><h3 class="svelte-f0x6kf">${escape_html(player.name)}</h3> <span class="player-number svelte-f0x6kf">#${escape_html(player.id)}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></main></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
