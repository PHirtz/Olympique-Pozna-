import { b as attr_class, c as attr, a as store_get, u as unsubscribe_stores } from "../../../chunks/index2.js";
import { a as $locale, $ as $format } from "../../../chunks/runtime.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { E as Eye } from "../../../chunks/eye.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let firstName = "";
    let lastName = "";
    let username = "";
    let email = "";
    let password = "";
    let loading = false;
    $$renderer2.push(`<div class="menu-logo svelte-52fghe"><a href="/" class="svelte-52fghe"><img src="/home.png" alt="Logo Home" class="logo-home svelte-52fghe"/></a></div> <div class="language-selector svelte-52fghe"><button${attr_class("lang-btn svelte-52fghe", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "fr"
    })} aria-label="Français">FR</button> <span class="separator svelte-52fghe">|</span> <button${attr_class("lang-btn svelte-52fghe", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "pl"
    })} aria-label="Polski">PL</button> <span class="separator svelte-52fghe">|</span> <button${attr_class("lang-btn svelte-52fghe", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "en"
    })} aria-label="English">EN</button></div> <div class="register-page svelte-52fghe"><div class="register-card svelte-52fghe"><a href="/" class="logo-container svelte-52fghe"><img src="/logo.png" alt="Logo Olympique Poznań" class="logo-op svelte-52fghe"/></a> <h1 class="svelte-52fghe">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.title"))}</h1> <form><label class="svelte-52fghe">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.firstName"))} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.required"))} <input type="text"${attr("value", firstName)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("auth.register.firstNamePlaceholder"))} required class="svelte-52fghe"/></label> <label class="svelte-52fghe">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.lastName"))} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.required"))} <input type="text"${attr("value", lastName)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("auth.register.lastNamePlaceholder"))} required class="svelte-52fghe"/></label> <label class="svelte-52fghe">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.username"))} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.required"))} <input type="text"${attr("value", username)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("auth.register.usernamePlaceholder"))} required class="svelte-52fghe"/></label> <label class="svelte-52fghe">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.email"))} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.required"))} <input type="email"${attr("value", email)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("auth.register.emailPlaceholder"))} required class="svelte-52fghe"/></label> <label class="svelte-52fghe">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.password"))} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.required"))} <div class="password-input-wrapper svelte-52fghe"><input${attr("type", "password")}${attr("value", password)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("auth.register.passwordPlaceholder"))} required class="svelte-52fghe"/> <button type="button" class="toggle-password svelte-52fghe"${attr("aria-label", "Afficher le mot de passe")}>`);
    {
      $$renderer2.push("<!--[!-->");
      Eye($$renderer2, { size: 20 });
    }
    $$renderer2.push(`<!--]--></button></div></label> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)} class="svelte-52fghe">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.submit"))}</button></form> <p class="login-link svelte-52fghe">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.hasAccount"))} <a href="/login" class="svelte-52fghe">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.register.loginLink"))}</a></p></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
