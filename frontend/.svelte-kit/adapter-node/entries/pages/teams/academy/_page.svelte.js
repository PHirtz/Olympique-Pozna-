import { h as head, a as store_get, e as ensure_array_like, c as attr, u as unsubscribe_stores, d as bind_props } from "../../../../chunks/index2.js";
import { $ as $format } from "../../../../chunks/runtime.js";
import { N as Navigation2 } from "../../../../chunks/Navigation2.js";
import { F as Footer } from "../../../../chunks/Footer.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    const teams = [
      {
        id: "giroud",
        name: "Olivier Giroud",
        photo: "/team/giroud.png",
        copyright: "Richard Sellers / GettyImages"
      },
      {
        id: "doue",
        name: "Désiré Doué",
        photo: "/team/doue.jpg",
        copyright: "Aleteia / AFP"
      },
      {
        id: "griezmann",
        name: "Antoine Griezmann",
        photo: "/team/antoine.png",
        copyright: "Eurosport / Getty Images"
      },
      {
        id: "coman",
        name: "Kingsley Coman",
        photo: "/team/coman.jpg",
        copyright: "Action Press / SIPA"
      },
      {
        id: "diani",
        name: "Kadidiatou Diani",
        photo: "/team/diani.png",
        copyright: "Naomi Baker / GettyImages"
      },
      {
        id: "renard",
        name: "Wendie Renard",
        photo: "/team/wendie.jpg",
        copyright: " FRANCK FIFE / AFP"
      },
      {
        id: "lesommer",
        name: "Eugénie Le Sommer",
        photo: "/team/eugenie.jpg",
        copyright: "FRANCK FIFE / AFP"
      },
      {
        id: "henry",
        name: "Amandine Henry",
        photo: "/team/amandine.jpg",
        copyright: "Le progres / AFP"
      }
    ];
    head("i5ti3o", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>L'académie</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Découvrez l'académie de l'Olympique Poznan et ses équipes jeunes"/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="academy-page"><section class="hero-academy svelte-i5ti3o"><div class="hero-content svelte-i5ti3o"><h1 class="svelte-i5ti3o">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("teams.hero.title"))}</h1> <p class="teams-hero-subtitle">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("teams.hero.subtitle"))}</p></div></section> <div class="teams-page svelte-i5ti3o"><main class="main-content svelte-i5ti3o"><div class="container svelte-i5ti3o"><div class="teams-grid svelte-i5ti3o"><!--[-->`);
    const each_array = ensure_array_like(teams);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let team = each_array[$$index];
      $$renderer2.push(`<a${attr("href", `/club/teams/${team.id}`)} class="team-card svelte-i5ti3o"><div class="team-image-wrapper svelte-i5ti3o"><img${attr("src", team.photo)}${attr("alt", team.name)} class="team-photo svelte-i5ti3o"/> `);
      if (team.copyright) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="photo-copyright svelte-i5ti3o">© ${escape_html(team.copyright)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="team-info svelte-i5ti3o"><h3 class="svelte-i5ti3o">${escape_html(team.name)}</h3> <span class="view-profile svelte-i5ti3o">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("teams.viewProfile"))}</span></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></div></main></div></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
