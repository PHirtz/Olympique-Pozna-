import { h as head, c as attr, a as store_get, u as unsubscribe_stores, d as bind_props } from "../../../../../chunks/index2.js";
import { $ as $format } from "../../../../../chunks/runtime.js";
import { N as Navigation2 } from "../../../../../chunks/Navigation2.js";
import { F as Footer } from "../../../../../chunks/Footer.js";
import { A as Arrow_left } from "../../../../../chunks/arrow-left.js";
import { T as Target } from "../../../../../chunks/target.js";
import { e as escape_html } from "../../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    head("1bilyy4", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.name"))} - ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.tagline"))}/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="coach-page svelte-1bilyy4"><nav class="breadcrumb svelte-1bilyy4"><a href="/club/coaches" class="svelte-1bilyy4">`);
    Arrow_left($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.backToCoaches"))}</a></nav> <section class="hero-coach svelte-1bilyy4"><div class="hero-content svelte-1bilyy4"><img src="/trener/patrikw-trener.jpg"${attr("alt", store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.name"))} class="coach-hero-photo svelte-1bilyy4"/> <div class="hero-info svelte-1bilyy4"><h1 class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.name"))}</h1> <p class="coach-tagline svelte-1bilyy4">`);
    Target($$renderer2, { size: 24 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.tagline"))}</p></div></div></section> <main class="main-content svelte-1bilyy4"><div class="container svelte-1bilyy4"><div class="highlight-box svelte-1bilyy4"><p class="since svelte-1bilyy4">⚽ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.since"))}</p></div> <section class="section-block svelte-1bilyy4"><h2 class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.formations.title"))}</h2> <ul class="styled-list svelte-1bilyy4"><li class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.formations.animator"))}</li> <li class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.formations.camp"))}</li> <li class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.formations.reissa"))}</li> <li class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.formations.conferences"))}</li></ul></section> <div class="quote-box svelte-1bilyy4"><h3 class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.idol.title"))}</h3> <p class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.idol.text"))}</p></div> <section class="qa-section svelte-1bilyy4"><h2 class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.questions.title"))}</h2> <div class="question svelte-1bilyy4"><strong class="svelte-1bilyy4">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.questions.q1.question"))}</strong> <p class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.questions.q1.answer"))}</p></div> <div class="question svelte-1bilyy4"><strong class="svelte-1bilyy4">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.questions.q2.question"))}</strong> <p class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.questions.q2.answer"))}</p></div> <div class="question svelte-1bilyy4"><strong class="svelte-1bilyy4">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.questions.q3.question"))}</strong> <p class="svelte-1bilyy4">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_w.questions.q3.answer"))}</p></div></section> <div class="back-link svelte-1bilyy4"><a href="/club/coaches" class="btn-back svelte-1bilyy4">`);
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
