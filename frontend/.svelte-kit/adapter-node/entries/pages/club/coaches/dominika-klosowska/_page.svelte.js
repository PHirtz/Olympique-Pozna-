import { j as sanitize_props, k as spread_props, s as slot, h as head, a as store_get, c as attr, u as unsubscribe_stores, d as bind_props } from "../../../../../chunks/index2.js";
import { $ as $format } from "../../../../../chunks/runtime.js";
import { N as Navigation2 } from "../../../../../chunks/Navigation2.js";
import { F as Footer } from "../../../../../chunks/Footer.js";
import { A as Arrow_left } from "../../../../../chunks/arrow-left.js";
import { I as Icon } from "../../../../../chunks/x.js";
import { H as Heart } from "../../../../../chunks/heart.js";
import { e as escape_html } from "../../../../../chunks/context.js";
function Star($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "star" },
    $$sanitized_props,
    {
      /**
       * @component @name Star
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEuNTI1IDIuMjk1YS41My41MyAwIDAgMSAuOTUgMGwyLjMxIDQuNjc5YTIuMTIzIDIuMTIzIDAgMCAwIDEuNTk1IDEuMTZsNS4xNjYuNzU2YS41My41MyAwIDAgMSAuMjk0LjkwNGwtMy43MzYgMy42MzhhMi4xMjMgMi4xMjMgMCAwIDAtLjYxMSAxLjg3OGwuODgyIDUuMTRhLjUzLjUzIDAgMCAxLS43NzEuNTZsLTQuNjE4LTIuNDI4YTIuMTIyIDIuMTIyIDAgMCAwLTEuOTczIDBMNi4zOTYgMjEuMDFhLjUzLjUzIDAgMCAxLS43Ny0uNTZsLjg4MS01LjEzOWEyLjEyMiAyLjEyMiAwIDAgMC0uNjExLTEuODc5TDIuMTYgOS43OTVhLjUzLjUzIDAgMCAxIC4yOTQtLjkwNmw1LjE2NS0uNzU1YTIuMTIyIDIuMTIyIDAgMCAwIDEuNTk3LTEuMTZ6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/star
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
    head("474btq", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.name"))} - ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.tagline"))}/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="coach-page highlight-page svelte-474btq"><nav class="breadcrumb svelte-474btq"><a href="/club/coaches" class="svelte-474btq">`);
    Arrow_left($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.backToCoaches"))}</a></nav> <section class="hero-coach svelte-474btq"><div class="hero-badge svelte-474btq">`);
    Star($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> Coach Principal</div> <div class="hero-content svelte-474btq"><img src="/trener/dominika-trener.jpg"${attr("alt", store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.name"))} class="coach-hero-photo svelte-474btq"/> <div class="hero-info svelte-474btq"><h1 class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.name"))}</h1> <p class="coach-tagline svelte-474btq">`);
    Heart($$renderer2, { size: 24 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.tagline"))}</p></div></div></section> <main class="main-content svelte-474btq"><div class="container svelte-474btq"><div class="highlight-box svelte-474btq"><p class="since svelte-474btq">⚽ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.since"))}</p></div> <section class="section-block svelte-474btq"><h2 class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.formations.title"))}</h2> <ul class="styled-list svelte-474btq"><li class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.formations.assistant"))}</li> <li class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.formations.animator"))}</li> <li class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.formations.women"))}</li> <li class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.formations.intro_uefa"))}</li> <li class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.formations.uefa_progress"))}</li></ul></section> <div class="quote-box svelte-474btq"><h3 class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.mottos.title"))}</h3> <ul class="motto-list svelte-474btq"><li class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.mottos.motto1"))}</li> <li class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.mottos.motto2"))}</li> <li class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.mottos.motto3"))}</li></ul></div> <div class="highlight-box passion svelte-474btq"><h3 class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.idol.title"))}</h3> <p class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.idol.text"))}</p></div> <section class="qa-section svelte-474btq"><h2 class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.questions.title"))}</h2> <div class="question svelte-474btq"><strong class="svelte-474btq">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.questions.q1.question"))}</strong> <p class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.questions.q1.answer"))}</p></div> <div class="question svelte-474btq"><strong class="svelte-474btq">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.questions.q2.question"))}</strong> <p class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.questions.q2.answer"))}</p></div> <div class="question svelte-474btq"><strong class="svelte-474btq">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.questions.q3.question"))}</strong> <p class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.questions.q3.answer"))}</p></div></section> <div class="back-link svelte-474btq"><a href="/club/coaches" class="btn-back svelte-474btq">`);
    Arrow_left($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.backToCoaches"))}</a></div></div></main></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
