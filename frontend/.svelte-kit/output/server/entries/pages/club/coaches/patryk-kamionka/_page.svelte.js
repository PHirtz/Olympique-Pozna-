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
    head("gwgsqa", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.name"))} - ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.tagline"))}/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="coach-page svelte-gwgsqa"><nav class="breadcrumb svelte-gwgsqa"><a href="/club/coaches" class="svelte-gwgsqa">`);
    Arrow_left($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.backToCoaches"))}</a></nav> <section class="hero-coach svelte-gwgsqa"><div class="hero-content svelte-gwgsqa"><img src="/trener/patrikk-trener.jpg"${attr("alt", store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.name"))} class="coach-hero-photo svelte-gwgsqa"/> <div class="hero-info svelte-gwgsqa"><h1 class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.name"))}</h1> <p class="coach-tagline svelte-gwgsqa">`);
    Target($$renderer2, { size: 24 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.tagline"))}</p></div></div></section> <main class="main-content svelte-gwgsqa"><div class="container svelte-gwgsqa"><div class="highlight-box svelte-gwgsqa"><p class="since svelte-gwgsqa">⚽ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.since"))}</p></div> <section class="section-block svelte-gwgsqa"><h2 class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.formations.title"))}</h2> <ul class="styled-list svelte-gwgsqa"><li class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.formations.wopr"))}</li> <li class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.formations.teacher"))}</li> <li class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.formations.kinesiology"))}</li> <li class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.formations.goalkeeper"))}</li> <li class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.formations.uefa"))}</li></ul></section> <section class="section-block svelte-gwgsqa"><h2 class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.experience.player.title"))}</h2> <ul class="compact-list svelte-gwgsqa"><li class="svelte-gwgsqa">Polonia Poznań</li> <li class="svelte-gwgsqa">TPS Winogrady</li> <li class="svelte-gwgsqa">Przemysław Poznań</li> <li class="svelte-gwgsqa">Złoci Złotkowo</li> <li class="svelte-gwgsqa">Antares Zalasewo</li> <li class="svelte-gwgsqa">Phytopharm Klęka</li> <li class="svelte-gwgsqa">FC Polonia Paris</li></ul></section> <div class="quote-box svelte-gwgsqa"><h3 class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.idol.title"))}</h3> <p class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.idol.text"))}</p></div> <section class="qa-section svelte-gwgsqa"><h2 class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.questions.title"))}</h2> <div class="question svelte-gwgsqa"><strong class="svelte-gwgsqa">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.questions.q1.question"))}</strong> <p class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.questions.q1.answer"))}</p></div> <div class="question svelte-gwgsqa"><strong class="svelte-gwgsqa">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.questions.q2.question"))}</strong> <p class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.questions.q2.answer"))}</p></div> <div class="question svelte-gwgsqa"><strong class="svelte-gwgsqa">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.questions.q3.question"))}</strong> <p class="svelte-gwgsqa">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.patryk_k.questions.q3.answer"))}</p></div></section> <div class="back-link svelte-gwgsqa"><a href="/club/coaches" class="btn-back svelte-gwgsqa">`);
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
