import { b as attr_class, a as store_get, c as attr, u as unsubscribe_stores } from "./index2.js";
import { $ as $format, a as $locale } from "./runtime.js";
import { u as user } from "./auth.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
import { C as Chevron_down, U as User, L as Log_out, a as Log_in, b as User_plus, M as Menu } from "./user.js";
import { X } from "./x.js";
import { e as escape_html } from "./context.js";
function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let open = false;
    let visible = false;
    let openDropdown = null;
    $$renderer2.push(`<nav${attr_class("nav svelte-1huo92h", void 0, { "visible": visible })}><div class="nav-container svelte-1huo92h"><a href="/" class="logo-container svelte-1huo92h"><img src="/logo.png" alt="Logo Olympique Poznań" class="logo-olympique-poznan svelte-1huo92h"/></a> <div class="nav-links svelte-1huo92h"><a href="https://olympique.pl/" class="nav-link shop-link svelte-1huo92h" style="animation-delay: 0.2s">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.shop"))} <span class="new-badge svelte-1huo92h"><span class="badge-text svelte-1huo92h">NEW</span> <span class="shine svelte-1huo92h"></span></span></a> <div class="dropdown svelte-1huo92h" style="animation-delay: 0.3s" role="group"><a href="/club" class="nav-link dropdown-trigger svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.club"))} `);
    Chevron_down($$renderer2, { size: 16 });
    $$renderer2.push(`<!----></a> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="dropdown teams-dropdown svelte-1huo92h" style="animation-delay: 0.4s" role="group"><a href="/teams" class="nav-link dropdown-trigger svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.teams"))} `);
    Chevron_down($$renderer2, { size: 16 });
    $$renderer2.push(`<!----></a> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <a href="/camps" class="nav-link svelte-1huo92h" style="animation-delay: 0.5s">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.camps"))}</a> <a href="https://drive.google.com/drive/folders/1Qm9yOZJ9_sKRuJ70V8KSa1FrcSgxwXRW" class="nav-link svelte-1huo92h" style="animation-delay: 0.1s">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.photo"))}</a></div> <div class="desktop-user-actions svelte-1huo92h"><div class="language-selector svelte-1huo92h"><button${attr_class("lang-btn svelte-1huo92h", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "fr"
    })} aria-label="Français">FR</button> <span class="separator svelte-1huo92h">|</span> <button${attr_class("lang-btn svelte-1huo92h", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "pl"
    })} aria-label="Polski">PL</button></div> `);
    if (store_get($$store_subs ??= {}, "$user", user)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="user-info svelte-1huo92h">`);
      User($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> <span class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("userMenu.hello"))}, ${escape_html(store_get($$store_subs ??= {}, "$user", user).firstName)} !</span></div> <button class="btn-logout svelte-1huo92h">`);
      Log_out($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> <span class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("userMenu.logout"))}</span></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a href="/login" class="btn-auth btn-login svelte-1huo92h">`);
      Log_in($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> <span class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("userMenu.login"))}</span></a> <a href="/register" class="btn-auth btn-register svelte-1huo92h">`);
      User_plus($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> <span class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("userMenu.register"))}</span></a>`);
    }
    $$renderer2.push(`<!--]--></div> <button class="menu-toggle svelte-1huo92h"${attr("aria-label", store_get($$store_subs ??= {}, "$_", $format)("nav.menu"))}${attr("aria-expanded", open)}>`);
    {
      $$renderer2.push("<!--[!-->");
      Menu($$renderer2, { size: 28 });
    }
    $$renderer2.push(`<!--]--></button></div></nav> <div${attr_class("mobile-drawer svelte-1huo92h", void 0, { "open": open })} role="dialog" aria-modal="true"${attr("aria-label", store_get($$store_subs ??= {}, "$_", $format)("nav.mobileMenu"))}><div class="drawer-content svelte-1huo92h"><button class="close-btn svelte-1huo92h"${attr("aria-label", store_get($$store_subs ??= {}, "$_", $format)("common.close"))}>`);
    X($$renderer2, { size: 24 });
    $$renderer2.push(`<!----></button> <nav${attr("aria-label", store_get($$store_subs ??= {}, "$_", $format)("nav.mainNavigation"))} class="svelte-1huo92h"><ul class="mobile-menu svelte-1huo92h"><li class="svelte-1huo92h"><a href="/" class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.home"))}</a></li> <li class="svelte-1huo92h"><a href="https://olympique.pl/" class="shop-mobile-link svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.shop"))} <span class="new-badge svelte-1huo92h"><span class="badge-text svelte-1huo92h">NEW</span> <span class="shine svelte-1huo92h"></span></span></a></li> <li class="mobile-dropdown svelte-1huo92h"><button class="mobile-dropdown-trigger svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.club"))} <span${attr_class("icon-wrapper svelte-1huo92h", void 0, { "rotate": openDropdown === "club-mobile" })}>`);
    Chevron_down($$renderer2, { size: 16 });
    $$renderer2.push(`<!----></span></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></li> <li class="mobile-dropdown svelte-1huo92h"><button class="mobile-dropdown-trigger svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.teams"))} <span${attr_class("icon-wrapper svelte-1huo92h", void 0, { "rotate": openDropdown === "teams-mobile" })}>`);
    Chevron_down($$renderer2, { size: 16 });
    $$renderer2.push(`<!----></span></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></li> <li class="svelte-1huo92h"><a href="/camps" class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.camps"))}</a></li> <li class="svelte-1huo92h"><a href="https://drive.google.com/drive/folders/1Qm9yOZJ9_sKRuJ70V8KSa1FrcSgxwXRW" class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("nav.photo"))}</a></li></ul></nav> <div class="mobile-user-actions svelte-1huo92h"><div class="language-selector mobile svelte-1huo92h"><button${attr_class("lang-btn svelte-1huo92h", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "fr"
    })} aria-label="Français">FR</button> <span class="separator svelte-1huo92h">|</span> <button${attr_class("lang-btn svelte-1huo92h", void 0, {
      "active": store_get($$store_subs ??= {}, "$locale", $locale) === "pl"
    })} aria-label="Polski">PL</button></div> `);
    if (store_get($$store_subs ??= {}, "$user", user)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="user-info-mobile svelte-1huo92h">`);
      User($$renderer2, { size: 20 });
      $$renderer2.push(`<!----> <span class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("userMenu.hello"))}, ${escape_html(store_get($$store_subs ??= {}, "$user", user).firstName)} !</span></div> <button class="btn-logout mobile svelte-1huo92h">`);
      Log_out($$renderer2, { size: 20 });
      $$renderer2.push(`<!----> <span class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("userMenu.logout"))}</span></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a href="/login" class="btn-auth btn-login mobile svelte-1huo92h">`);
      Log_in($$renderer2, { size: 20 });
      $$renderer2.push(`<!----> <span class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("userMenu.login"))}</span></a> <a href="/register" class="btn-auth btn-register mobile svelte-1huo92h">`);
      User_plus($$renderer2, { size: 20 });
      $$renderer2.push(`<!----> <span class="svelte-1huo92h">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("userMenu.register"))}</span></a>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  Navigation as N
};
