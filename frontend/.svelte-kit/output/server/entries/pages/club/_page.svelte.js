import { a as store_get, u as unsubscribe_stores, h as head, e as ensure_array_like, c as attr, d as bind_props } from "../../../chunks/index2.js";
import { a as $locale, $ as $format } from "../../../chunks/runtime.js";
import { N as Navigation2 } from "../../../chunks/Navigation2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
/* empty css                                                   */
import { e as escape_html } from "../../../chunks/context.js";
import "clsx";
function Copyright($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $locale.subscribe((value) => {
    });
    $$renderer2.push(`<footer class="footer svelte-16g66ls"><div class="footer-bottom svelte-16g66ls"><div class="footer-bottom-container svelte-16g66ls"><p class="svelte-16g66ls">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Kamiicode &amp; Olympique Poznań. ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("footer.rights"))}</p></div></div></footer>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    const club = [
      {
        slug: "about",
        image: "../club/about.jpg",
        link: "/club/about",
        external: false
      },
      {
        slug: "shop",
        image: "../club/logo-shop.jpeg",
        link: "https://olympique.pl/",
        external: true
      },
      {
        slug: "coaches",
        image: "../club/treners.jpg",
        link: "/club/coaches",
        external: false
      },
      {
        slug: "partners",
        image: "../club/part.jpg",
        link: "/club/partners",
        external: false
      },
      {
        slug: "status",
        image: "../club/statut.png",
        link: "https://docs.google.com/document/d/1GDOQUc8G9FQZjQTDuLBw_grxg1bKWg1a2V8GhbsnGU0/edit?tab=t.0",
        external: true
      },
      {
        slug: "documents.title",
        image: "../logo.svg",
        link: "https://docs.google.com/document/d/1GDOQUc8G9FQZjQTDuLBw_grxg1bKWg1a2V8GhbsnGU0/edit?tab=t.0",
        external: true
      }
    ];
    head("xdt42l", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("about.metaDescription"))}/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <section class="hero-club svelte-xdt42l"><div class="hero-content svelte-xdt42l"><h1 class="svelte-xdt42l">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("club.title"))}</h1></div></section> <section class="club-section svelte-xdt42l"><div class="club-cards svelte-xdt42l"><!--[-->`);
    const each_array = ensure_array_like(club);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let team = each_array[$$index];
      $$renderer2.push(`<a${attr("href", team.link)} class="team-card svelte-xdt42l"${attr("aria-label", store_get($$store_subs ??= {}, "$_", $format)(`club.${team.slug}`))}${attr("target", team.external ? "_blank" : "_self")}${attr("rel", team.external ? "noopener noreferrer" : "")}><div class="team-image svelte-xdt42l"><img${attr("src", team.image)}${attr("alt", store_get($$store_subs ??= {}, "$_", $format)(`club.${team.slug}`))} loading="lazy" class="svelte-xdt42l"/> <div class="overlay svelte-xdt42l"></div></div> <div class="team-content svelte-xdt42l"><h3 class="svelte-xdt42l">${escape_html(store_get($$store_subs ??= {}, "$_", $format)(`club.${team.slug}`))}</h3></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> `);
    Copyright($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
