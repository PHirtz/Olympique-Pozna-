import { j as sanitize_props, k as spread_props, s as slot, h as head, a as store_get, u as unsubscribe_stores, d as bind_props, c as attr } from "../../../../chunks/index2.js";
import { $ as $format } from "../../../../chunks/runtime.js";
import { N as Navigation2 } from "../../../../chunks/Navigation2.js";
import { I as Instagram, b as Facebook, F as Footer } from "../../../../chunks/Footer.js";
import { I as Icon } from "../../../../chunks/x.js";
import { U as Users } from "../../../../chunks/users.js";
import { H as Heart } from "../../../../chunks/heart.js";
import { T as Target } from "../../../../chunks/target.js";
import { e as escape_html } from "../../../../chunks/context.js";
function Trophy($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"
      }
    ],
    [
      "path",
      {
        "d": "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"
      }
    ],
    ["path", { "d": "M18 9h1.5a1 1 0 0 0 0-5H18" }],
    ["path", { "d": "M4 22h16" }],
    [
      "path",
      { "d": "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" }
    ],
    ["path", { "d": "M6 9H4.5a1 1 0 0 1 0-5H6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trophy" },
    $$sanitized_props,
    {
      /**
       * @component @name Trophy
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMTQuNjZ2MS42MjZhMiAyIDAgMCAxLS45NzYgMS42OTZBNSA1IDAgMCAwIDcgMjEuOTc4IiAvPgogIDxwYXRoIGQ9Ik0xNCAxNC42NnYxLjYyNmEyIDIgMCAwIDAgLjk3NiAxLjY5NkE1IDUgMCAwIDEgMTcgMjEuOTc4IiAvPgogIDxwYXRoIGQ9Ik0xOCA5aDEuNWExIDEgMCAwIDAgMC01SDE4IiAvPgogIDxwYXRoIGQ9Ik00IDIyaDE2IiAvPgogIDxwYXRoIGQ9Ik02IDlhNiA2IDAgMCAwIDEyIDBWM2ExIDEgMCAwIDAtMS0xSDdhMSAxIDAgMCAwLTEgMXoiIC8+CiAgPHBhdGggZD0iTTYgOUg0LjVhMSAxIDAgMCAxIDAtNUg2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/trophy
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    head("1pq04ur", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("about.metaDescription"))}/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="about-page svelte-1pq04ur"><section class="hero-about svelte-1pq04ur"><div class="hero-content svelte-1pq04ur"><h1 class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.hero.title"))}</h1> <p class="hero-subtitle svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.hero.subtitle"))}</p></div></section> <main class="main-content svelte-1pq04ur"><section class="intro-section svelte-1pq04ur"><div class="container svelte-1pq04ur"><div class="intro-grid svelte-1pq04ur"><div class="intro-text"><p class="lead-text svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.intro.text"))}</p></div> <div class="intro-image svelte-1pq04ur"><img src="../logo.png" alt="Logo Olympique Poznań" class="svelte-1pq04ur"/></div></div></div></section> <section class="values-section svelte-1pq04ur"><div class="container svelte-1pq04ur"><h2 class="section-title svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.values.title"))}</h2> <div class="values-grid svelte-1pq04ur"><div class="value-card svelte-1pq04ur"><div class="value-icon svelte-1pq04ur">`);
    Trophy($$renderer2, { size: 40 });
    $$renderer2.push(`<!----></div> <h3 class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.values.excellence.title"))}</h3> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.values.excellence.description"))}</p></div> <div class="value-card svelte-1pq04ur"><div class="value-icon svelte-1pq04ur">`);
    Users($$renderer2, { size: 40 });
    $$renderer2.push(`<!----></div> <h3 class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.values.teamSpirit.title"))}</h3> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.values.teamSpirit.description"))}</p></div> <div class="value-card svelte-1pq04ur"><div class="value-icon svelte-1pq04ur">`);
    Heart($$renderer2, { size: 40 });
    $$renderer2.push(`<!----></div> <h3 class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.values.passion.title"))}</h3> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.values.passion.description"))}</p></div> <div class="value-card svelte-1pq04ur"><div class="value-icon svelte-1pq04ur">`);
    Target($$renderer2, { size: 40 });
    $$renderer2.push(`<!----></div> <h3 class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.values.training.title"))}</h3> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.values.training.description"))}</p></div></div></div></section> <section class="formation-section svelte-1pq04ur"><div class="container svelte-1pq04ur"><div class="content-block svelte-1pq04ur"><h2 class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.formation.excellence.title"))}</h2> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.formation.excellence.text1"))}</p> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.formation.excellence.text2"))}</p></div> <div class="content-block svelte-1pq04ur"><h2 class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.formation.coaches.title"))}</h2> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.formation.coaches.text1"))}</p> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.formation.coaches.text2"))}</p></div> <div class="content-block svelte-1pq04ur"><h2 class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.formation.atmosphere.title"))}</h2> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.formation.atmosphere.text1"))}</p> <p class="svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.formation.atmosphere.text2"))}</p></div></div></section> <section class="community-section svelte-1pq04ur"><div class="container svelte-1pq04ur"><h2 class="section-title svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.community.title"))}</h2> <p class="community-intro svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.community.intro"))}</p> <div class="social-links svelte-1pq04ur"><a href="https://www.instagram.com/olympiquepoznan/" target="_blank" rel="noopener noreferrer" class="social-card svelte-1pq04ur">`);
    Instagram($$renderer2, { size: 32 });
    $$renderer2.push(`<!----> <span class="svelte-1pq04ur">@olympiquepoznan</span></a> <a href="https://www.facebook.com/OlympiquePoz" target="_blank" rel="noopener noreferrer" class="social-card svelte-1pq04ur">`);
    Facebook($$renderer2, { size: 32 });
    $$renderer2.push(`<!----> <span class="svelte-1pq04ur">Olympique Poznań</span></a> <a href="https://www.tiktok.com/tag/olympiquepoznań" target="_blank" rel="noopener noreferrer" class="social-card svelte-1pq04ur"><svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg> <span class="svelte-1pq04ur">#olympiquepoznań</span></a></div> <div class="cta-section svelte-1pq04ur"><p class="cta-text svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.community.cta.text"))} <strong>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.community.cta.textBold"))}</strong></p> <a href="/register" class="cta-button svelte-1pq04ur">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("about.community.cta.button"))}</a></div></div></section></main></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
