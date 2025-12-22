import { h as head, c as attr, a as store_get, u as unsubscribe_stores, d as bind_props } from "../../../../../chunks/index2.js";
import { $ as $format } from "../../../../../chunks/runtime.js";
import { N as Navigation2 } from "../../../../../chunks/Navigation2.js";
import { F as Footer } from "../../../../../chunks/Footer.js";
import { A as Arrow_left } from "../../../../../chunks/arrow-left.js";
import { A as Award } from "../../../../../chunks/award.js";
import { H as Heart } from "../../../../../chunks/heart.js";
import { e as escape_html } from "../../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    head("1mp25g8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.name"))} - ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.tagline"))}/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="coach-page svelte-1mp25g8"><nav class="breadcrumb svelte-1mp25g8"><a href="/club/coaches" class="svelte-1mp25g8">`);
    Arrow_left($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.backToCoaches"))}</a></nav> <section class="hero-coach svelte-1mp25g8"><div class="hero-content svelte-1mp25g8"><img src="/trener/stephane-trener.jpg"${attr("alt", store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.name"))} class="coach-hero-photo svelte-1mp25g8"/> <div class="hero-info svelte-1mp25g8"><h1 class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.name"))}</h1> <p class="coach-tagline svelte-1mp25g8">`);
    Award($$renderer2, { size: 24 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.tagline"))}</p></div></div></section> <main class="main-content svelte-1mp25g8"><div class="container svelte-1mp25g8"><div class="highlight-box svelte-1mp25g8"><p class="since svelte-1mp25g8">⚽ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.since"))}</p> <p class="motto svelte-1mp25g8">`);
    Heart($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> <strong>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.motto"))}</strong></p></div> <section class="section-block svelte-1mp25g8"><h2 class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.formations.title"))}</h2> <ul class="styled-list svelte-1mp25g8"><li class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.formations.uefa_c"))}</li> <li class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.formations.uefa_b"))}</li> <li class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.formations.stages"))}</li> <li class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.formations.conferences"))}</li></ul></section> <section class="section-block svelte-1mp25g8"><h2 class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.experience.coach.title"))}</h2> <ul class="compact-list svelte-1mp25g8"><li class="svelte-1mp25g8">Tours FC</li> <li class="svelte-1mp25g8">Quick Tours Nord</li> <li class="svelte-1mp25g8">IEP Bordeaux</li> <li class="svelte-1mp25g8">JA Bréal</li> <li class="svelte-1mp25g8">David Beckham Football Academy</li> <li class="svelte-1mp25g8">Suchary Suchy Las</li> <li class="svelte-1mp25g8">Orkan Objezierze</li> <li class="svelte-1mp25g8">Olympique Poznań</li></ul></section> <section class="section-block svelte-1mp25g8"><h2 class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.experience.player.title"))}</h2> <ul class="compact-list svelte-1mp25g8"><li class="svelte-1mp25g8">CA Vitry</li> <li class="svelte-1mp25g8">Montrouge FC</li> <li class="svelte-1mp25g8">Tours FC</li> <li class="svelte-1mp25g8">JA Bréal</li> <li class="svelte-1mp25g8">GKS Dopiewo</li> <li class="svelte-1mp25g8">Warta Międzychód</li> <li class="svelte-1mp25g8">Sokół Rakoniewice</li> <li class="svelte-1mp25g8">Polonia Poznań</li> <li class="svelte-1mp25g8">Olympique Poznań Les Bleus</li></ul></section> <div class="quote-box svelte-1mp25g8"><h3 class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.idol.title"))}</h3> <p class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.idol.text"))}</p></div> <div class="highlight-box passion svelte-1mp25g8"><h3 class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.passion.title"))}</h3> <p class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.passion.text"))}</p></div> <section class="qa-section svelte-1mp25g8"><h2 class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.questions.title"))}</h2> <div class="question svelte-1mp25g8"><strong class="svelte-1mp25g8">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.questions.q1.question"))}</strong> <p class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.questions.q1.answer"))}</p></div> <div class="question svelte-1mp25g8"><strong class="svelte-1mp25g8">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.questions.q2.question"))}</strong> <p class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.questions.q2.answer"))}</p></div> <div class="question svelte-1mp25g8"><strong class="svelte-1mp25g8">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.questions.q3.question"))}</strong> <p class="svelte-1mp25g8">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.stephane.questions.q3.answer"))}</p></div></section> <div class="back-link svelte-1mp25g8"><a href="/club/coaches" class="btn-back svelte-1mp25g8">`);
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
