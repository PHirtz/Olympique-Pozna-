import { j as sanitize_props, k as spread_props, s as slot, h as head, a as store_get, c as attr, u as unsubscribe_stores, d as bind_props } from "../../../chunks/index2.js";
import { $ as $format } from "../../../chunks/runtime.js";
import { N as Navigation } from "../../../chunks/Navigation.js";
import { a as Mail, F as Footer } from "../../../chunks/Footer.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { U as User } from "../../../chunks/user.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { S as Send } from "../../../chunks/send.js";
import { e as escape_html } from "../../../chunks/context.js";
function Message_square($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "message-square" },
    $$sanitized_props,
    {
      /**
       * @component @name MessageSquare
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjIgMTdhMiAyIDAgMCAxLTIgMkg2LjgyOGEyIDIgMCAwIDAtMS40MTQuNTg2bC0yLjIwMiAyLjIwMkEuNzEuNzEgMCAwIDEgMiAyMS4yODZWNWEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/message-square
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
    let name = "";
    let email = "";
    let category = "footj";
    let message = "";
    let isSubmitting = false;
    head("1bv7ezn", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("contact.metaDescription"))}/>`);
    });
    Navigation($$renderer2);
    $$renderer2.push(`<!----> <div class="contact-page svelte-1bv7ezn"><section class="hero-contact svelte-1bv7ezn"><div class="hero-content svelte-1bv7ezn"><h1 class="svelte-1bv7ezn">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.hero.title"))}</h1> <p class="hero-subtitle svelte-1bv7ezn">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.hero.subtitle"))}</p></div></section> <main class="main-content"><section class="contact-section"><div class="container svelte-1bv7ezn"><div class="contact-intro svelte-1bv7ezn"><h2 class="svelte-1bv7ezn">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.intro.title"))}</h2> <p class="svelte-1bv7ezn">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.intro.text"))}</p></div> <div class="form-container svelte-1bv7ezn"><form class="contact-form svelte-1bv7ezn"><div class="form-group svelte-1bv7ezn"><label for="name" class="svelte-1bv7ezn">`);
    User($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.name"))}*</label> <input type="text" id="name"${attr("value", name)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("contact.form.namePlaceholder"))} required class="svelte-1bv7ezn"/></div> <div class="form-group svelte-1bv7ezn"><label for="email" class="svelte-1bv7ezn">`);
    Mail($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.email"))}*</label> <input type="email" id="email"${attr("value", email)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("contact.form.emailPlaceholder"))} required class="svelte-1bv7ezn"/></div> <div class="form-group svelte-1bv7ezn"><label for="category" class="svelte-1bv7ezn">`);
    Message_square($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.category"))}</label> `);
    $$renderer2.select(
      { id: "category", value: category, class: "" },
      ($$renderer3) => {
        $$renderer3.option({ value: "coach" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.categories.coach"))}`);
        });
        $$renderer3.option({ value: "footj" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.categories.junior"))}`);
        });
        $$renderer3.option({ value: "foots" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.categories.senior"))}`);
        });
        $$renderer3.option({ value: "sponsor" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.categories.sponsor"))}`);
        });
        $$renderer3.option({ value: "volunteer" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.categories.volunteer"))}`);
        });
        $$renderer3.option({ value: "other" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.categories.other"))}`);
        });
      },
      "svelte-1bv7ezn"
    );
    $$renderer2.push(`</div> <div class="form-group svelte-1bv7ezn"><label for="message" class="svelte-1bv7ezn">`);
    Message_square($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.message"))}*</label> <textarea id="message" rows="6"${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("contact.form.messagePlaceholder"))} required class="svelte-1bv7ezn">`);
    const $$body = escape_html(message);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <button type="submit" class="submit-btn svelte-1bv7ezn"${attr("disabled", isSubmitting, true)}>`);
    {
      $$renderer2.push("<!--[!-->");
      Send($$renderer2, { size: 20 });
      $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.submit"))}`);
    }
    $$renderer2.push(`<!--]--></button></form> <div class="contact-info svelte-1bv7ezn"><div class="info-card svelte-1bv7ezn">`);
    Mail($$renderer2, { size: 32 });
    $$renderer2.push(`<!----> <h3 class="svelte-1bv7ezn">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.info.email.title"))}</h3> <a href="mailto:s.wutezi@wutezi.com" class="svelte-1bv7ezn">s.wutezi@wutezi.com</a></div> <div class="info-card svelte-1bv7ezn">`);
    Message_square($$renderer2, { size: 32 });
    $$renderer2.push(`<!----> <h3 class="svelte-1bv7ezn">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.info.social.title"))}</h3> <div class="social-links svelte-1bv7ezn"><a href="https://www.facebook.com/OlympiquePoz" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="svelte-1bv7ezn">Facebook</a> <a href="https://www.instagram.com/olympiquepoznan/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="svelte-1bv7ezn">Instagram</a> <a href="https://www.tiktok.com/tag/olympiquepozna%C5%84" target="_blank" rel="noopener noreferrer" aria-label="Tiktok" class="svelte-1bv7ezn">TikTok</a></div></div></div></div></div></section></main></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
