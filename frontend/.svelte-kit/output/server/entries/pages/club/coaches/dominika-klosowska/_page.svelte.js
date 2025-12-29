import { h as head, c as attr, a as store_get, u as unsubscribe_stores, d as bind_props } from "../../../../../chunks/index2.js";
import { $ as $format } from "../../../../../chunks/runtime.js";
import { N as Navigation2 } from "../../../../../chunks/Navigation2.js";
import { F as Footer } from "../../../../../chunks/Footer.js";
import { A as Arrow_left } from "../../../../../chunks/arrow-left.js";
import { H as Heart } from "../../../../../chunks/heart.js";
import { e as escape_html } from "../../../../../chunks/context.js";
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
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.backToCoaches"))}</a></nav> <section class="hero-coach svelte-474btq"><div class="hero-content svelte-474btq"><img src="/trener/dominika-trener.jpg"${attr("alt", store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.name"))} class="coach-hero-photo svelte-474btq"/> <div class="hero-info svelte-474btq"><h1 class="svelte-474btq">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.dominika.name"))}</h1> <p class="coach-tagline svelte-474btq">`);
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
