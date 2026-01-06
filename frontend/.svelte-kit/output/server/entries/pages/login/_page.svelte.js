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
    let username = "";
    let password = "";
    let loading = false;
    $$renderer2.push(`<div class="menu-logo svelte-1x05zx6"><a href="/" class="svelte-1x05zx6"><img src="/home.png" alt="Logo home" class="logo svelte-1x05zx6"/></a></div> <div class="language-selector svelte-1x05zx6"><button${attr_class("lang-btn svelte-1x05zx6", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "fr"
    })} aria-label="Français">FR</button> <span class="separator svelte-1x05zx6">|</span> <button${attr_class("lang-btn svelte-1x05zx6", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "pl"
    })} aria-label="Polski">PL</button> <span class="separator svelte-1x05zx6">|</span> <button${attr_class("lang-btn svelte-1x05zx6", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "en"
    })} aria-label="English">EN</button></div> <section class="login-page svelte-1x05zx6"><div class="login-card svelte-1x05zx6"><a href="/" class="logo-container svelte-1x05zx6"><img src="/logo.png" alt="Logo Olympique Poznań" class="logo-op svelte-1x05zx6"/></a> <h1 class="svelte-1x05zx6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.login.title"))}</h1> <form><label class="svelte-1x05zx6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.login.username"))} <input type="text"${attr("value", username)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("auth.login.usernamePlaceholder"))} required class="svelte-1x05zx6"/></label> <label class="svelte-1x05zx6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.login.password"))} <div class="password-input-wrapper svelte-1x05zx6"><input${attr("type", "password")}${attr("value", password)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("auth.login.passwordPlaceholder"))} required class="svelte-1x05zx6"/> <button type="button" class="toggle-password svelte-1x05zx6"${attr("aria-label", "Afficher le mot de passe")}>`);
    {
      $$renderer2.push("<!--[!-->");
      Eye($$renderer2, { size: 20 });
    }
    $$renderer2.push(`<!--]--></button></div></label> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)} class="svelte-1x05zx6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.login.submit"))}</button></form> <p class="register-link svelte-1x05zx6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.login.noAccount"))} <a href="/register" class="svelte-1x05zx6">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("auth.login.createAccount"))}</a></p></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
