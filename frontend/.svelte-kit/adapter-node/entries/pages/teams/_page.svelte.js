import "clsx";
import { N as Navigation2 } from "../../../chunks/Navigation2.js";
import { a as store_get, e as ensure_array_like, c as attr, u as unsubscribe_stores } from "../../../chunks/index2.js";
import { $ as $format } from "../../../chunks/runtime.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
/* empty css                                                         */
import { e as escape_html } from "../../../chunks/context.js";
import { F as Footer } from "../../../chunks/Footer.js";
function SectionTeams($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const teams = [
      {
        slug: "feminine",
        image: "../seniorsf/548748092_685055974624192_8235511687039625110_n.jpg",
        link: "/teams/ladies"
      },
      {
        slug: "junior",
        image: "../juniors/535057118_663522866777503_4651670088385010660_n.jpg",
        link: "/teams/academy"
      },
      {
        slug: "senior",
        image: "../seniorsh/565694409_714234655039657_3240198854373276417_n.jpg",
        link: "/teams/blues"
      }
    ];
    $$renderer2.push(`<section class="teams-section svelte-yseus1"><div class="content-teams svelte-yseus1"><h2 class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.teams.title"))}</h2></div> <div class="teams-cards svelte-yseus1"><!--[-->`);
    const each_array = ensure_array_like(teams);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let team = each_array[$$index];
      $$renderer2.push(`<a${attr("href", team.link)} class="team-card svelte-yseus1"${attr("aria-label", store_get($$store_subs ??= {}, "$_", $format)(`home.teams.${team.slug}.name`))}><div class="team-image svelte-yseus1"><img${attr("src", team.image)}${attr("alt", store_get($$store_subs ??= {}, "$_", $format)(`home.teams.${team.slug}.name`))} loading="lazy" class="svelte-yseus1"/></div> <div class="team-content svelte-yseus1"><h3 class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)(`home.teams.${team.slug}.name`))}</h3></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="accompagnement svelte-yseus1"><div class="accompagnement-container svelte-yseus1"><div class="content-accompagnement svelte-yseus1"><h2 class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.accompagnement.title"))}</h2> <p class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.accompagnement.paragraph1"))}</p> <p class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.accompagnement.paragraph2"))}</p> <p class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.accompagnement.paragraph3"))}</p> <p class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.accompagnement.paragraph4"))}</p> <p class="performance-highlight svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.accompagnement.highlight"))}</p></div> <div class="accompagnement-image svelte-yseus1"><img src="../img-communes/famille.jpg" alt="Coach et enfant sur le terrain" loading="lazy" class="svelte-yseus1"/></div></div></section> <section class="performance svelte-yseus1"><div class="performance-container svelte-yseus1"><div class="performance-image svelte-yseus1"><img src="../img-communes/570370526_720083157788140_3459994557698679766_n.jpg" alt="Équipe avec médailles" loading="lazy" class="svelte-yseus1"/></div> <div class="content-performance svelte-yseus1"><h2 class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.performance.title"))}</h2> <p class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.performance.paragraph1"))}</p> <p class="svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.performance.paragraph2"))}</p> <p class="performance-highlight svelte-yseus1">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.performance.highlight"))}</p></div></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  Navigation2($$renderer);
  $$renderer.push(`<!----> `);
  SectionTeams($$renderer);
  $$renderer.push(`<!----> `);
  Footer($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
