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
    head("vdq1r6", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.name"))} - ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.tagline"))}/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="coach-page svelte-vdq1r6"><nav class="breadcrumb svelte-vdq1r6"><a href="/club/coaches" class="svelte-vdq1r6">`);
    Arrow_left($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.backToCoaches"))}</a></nav> <section class="hero-coach svelte-vdq1r6"><div class="hero-content svelte-vdq1r6"><img src="/trener/pawel-trener.jpg"${attr("alt", store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.name"))} class="coach-hero-photo svelte-vdq1r6"/> <div class="hero-info svelte-vdq1r6"><h1 class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.name"))}</h1> <p class="coach-tagline svelte-vdq1r6">`);
    Award($$renderer2, { size: 24 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.tagline"))}</p></div></div></section> <main class="main-content svelte-vdq1r6"><div class="container svelte-vdq1r6"><div class="highlight-box svelte-vdq1r6"><p class="since svelte-vdq1r6">⚽ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.since"))}</p> <p class="motto svelte-vdq1r6">`);
    Heart($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> <strong>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.motto"))}</strong></p></div> <section class="section-block svelte-vdq1r6"><h2 class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.formations.title"))}</h2> <ul class="styled-list svelte-vdq1r6"><li class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.formations.uefa"))}</li> <li class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.formations.conferences"))}</li></ul></section> <section class="section-block svelte-vdq1r6"><h2 class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.experience.coach.title"))}</h2> <ul class="compact-list svelte-vdq1r6"><li class="svelte-vdq1r6">Akademia Piłkarska Reissa</li> <li class="svelte-vdq1r6">Koziołek Poznań</li> <li class="svelte-vdq1r6">MKS Przemysław Poznań</li> <li class="svelte-vdq1r6">GKS Dopiewo</li> <li class="svelte-vdq1r6">Korona Zakrzewo</li> <li class="svelte-vdq1r6">UKS Orlik Mosina</li> <li class="svelte-vdq1r6">Olympique Poznań</li></ul></section> <section class="section-block svelte-vdq1r6"><h2 class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.experience.player.title"))}</h2> <ul class="compact-list svelte-vdq1r6"><li class="svelte-vdq1r6">MKS Czarni Połaniec (3 liga)</li> <li class="svelte-vdq1r6">Akademia Piłkarska Reissa</li> <li class="svelte-vdq1r6">Olympique Les Bleus</li></ul></section> <div class="quote-box svelte-vdq1r6"><h3 class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.idol.title"))}</h3> <p class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.idol.text"))}</p></div> <div class="highlight-box passion svelte-vdq1r6"><h3 class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.passion.title"))}</h3> <p class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.passion.text"))}</p></div> <div class="info-box svelte-vdq1r6"><h3 class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.favorite_club.title"))}</h3> <p class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.favorite_club.text"))}</p></div> <section class="qa-section svelte-vdq1r6"><h2 class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.questions.title"))}</h2> <div class="question svelte-vdq1r6"><strong class="svelte-vdq1r6">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.questions.q1.question"))}</strong> <p class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.questions.q1.answer"))}</p></div> <div class="question svelte-vdq1r6"><strong class="svelte-vdq1r6">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.questions.q2.question"))}</strong> <p class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.questions.q2.answer"))}</p></div> <div class="question svelte-vdq1r6"><strong class="svelte-vdq1r6">➡️ ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.questions.q3.question"))}</strong> <p class="svelte-vdq1r6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.pawel.questions.q3.answer"))}</p></div></section> <div class="back-link svelte-vdq1r6"><a href="/club/coaches" class="btn-back svelte-vdq1r6">`);
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
