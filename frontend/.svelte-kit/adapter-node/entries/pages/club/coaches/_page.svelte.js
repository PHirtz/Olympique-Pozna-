import { j as sanitize_props, k as spread_props, s as slot, e as ensure_array_like, b as attr_class, g as attr_style, c as attr, d as bind_props, f as stringify, h as head, a as store_get, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import { $ as $format } from "../../../../chunks/runtime.js";
import { N as Navigation } from "../../../../chunks/Navigation.js";
import { U as fallback } from "../../../../chunks/utils2.js";
import { I as Icon } from "../../../../chunks/x.js";
import { e as escape_html } from "../../../../chunks/context.js";
import { F as Footer } from "../../../../chunks/Footer.js";
import { A as Award } from "../../../../chunks/award.js";
import { H as Heart } from "../../../../chunks/heart.js";
import { T as Target } from "../../../../chunks/target.js";
function Chevron_left($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-left" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTUgMTgtNi02IDYtNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/chevron-left
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
function Chevron_right($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtOSAxOCA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/chevron-right
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
function HeroSlider($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let images = fallback($$props["images"], () => [], true);
    let title = fallback($$props["title"], "");
    let subtitle = fallback($$props["subtitle"], "");
    let autoplayDelay = fallback($$props["autoplayDelay"], 5e3);
    let currentSlide = 0;
    $$renderer2.push(`<section class="hero-slider svelte-1kpow93"><div class="slider-wrapper svelte-1kpow93"><!--[-->`);
    const each_array = ensure_array_like(images);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let image = each_array[index];
      $$renderer2.push(`<div${attr_class("slide svelte-1kpow93", void 0, { "active": index === currentSlide })}${attr_style(`background-image: url(${stringify(image)})`)}></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="overlay svelte-1kpow93"></div></div> <div class="hero-content svelte-1kpow93">`);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h1 class="svelte-1kpow93">${escape_html(title)}</h1>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (subtitle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="hero-subtitle svelte-1kpow93">${escape_html(subtitle)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <button class="nav-arrow prev svelte-1kpow93" aria-label="Image précédente">`);
    Chevron_left($$renderer2, { size: 32 });
    $$renderer2.push(`<!----></button> <button class="nav-arrow next svelte-1kpow93" aria-label="Image suivante">`);
    Chevron_right($$renderer2, { size: 32 });
    $$renderer2.push(`<!----></button> <div class="slider-dots svelte-1kpow93"><!--[-->`);
    const each_array_1 = ensure_array_like(images);
    for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
      each_array_1[index];
      $$renderer2.push(`<button${attr_class("dot svelte-1kpow93", void 0, { "active": index === currentSlide })}${attr("aria-label", `Aller à l'image ${index + 1}`)}></button>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
    bind_props($$props, { images, title, subtitle, autoplayDelay });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    const heroSlides = [
      "/slides/trener.jpg",
      "/slides/trener1.jpg",
      "/slides/trener2.jpg",
      "/slides/trener3.jpg",
      "/slides/trener5.jpg",
      "/slides/trener6.jpg",
      "/slides/trener8.jpg",
      "/slides/trener9.jpg",
      "/slides/trener10.jpg",
      "/slides/trener11.jpg",
      "/slides/trener14.jpg",
      "/slides/trener15.jpg"
    ];
    const coaches = [
      {
        id: "stephane-wutezi",
        name: "coaches.stephane.name",
        role: "coaches.stephane.tagline",
        photo: "/trener/stephane-trener.jpg",
        icon: "award",
        highlight: false
      },
      {
        id: "patryk-kamionka",
        name: "coaches.patryk_k.name",
        role: "coaches.patryk_k.tagline",
        photo: "/trener/patrikk-trener.jpg",
        icon: "target",
        highlight: false
      },
      {
        id: "patryk-wesolowski",
        name: "coaches.patryk_w.name",
        role: "coaches.patryk_w.tagline",
        photo: "/trener/patrikw-trener.jpg",
        icon: "target",
        highlight: false
      },
      {
        id: "dominika-klosowska",
        name: "coaches.dominika.name",
        role: "coaches.dominika.tagline",
        photo: "/trener/dominika-trener.jpg",
        icon: "heart",
        highlight: false
      },
      {
        id: "jakub-golanski",
        name: "coaches.jakub.name",
        role: "coaches.jakub.tagline",
        photo: "/trener/jakub-trener.jpg",
        icon: "award",
        highlight: false
      },
      {
        id: "pawel-kulesa",
        name: "coaches.pawel.name",
        role: "coaches.pawel.tagline",
        photo: "/trener/pawel-trener.jpg",
        icon: "award",
        highlight: false
      }
    ];
    head("8oxr0m", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.title"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", store_get($$store_subs ??= {}, "$_", $format)("coaches.metaDescription"))}/>`);
    });
    Navigation($$renderer2);
    $$renderer2.push(`<!----> `);
    HeroSlider($$renderer2, {
      images: heroSlides,
      title: store_get($$store_subs ??= {}, "$_", $format)("coaches.hero.title"),
      subtitle: store_get($$store_subs ??= {}, "$_", $format)("coaches.hero.subtitle")
    });
    $$renderer2.push(`<!----> <div class="coaches-page svelte-8oxr0m"><main class="main-content svelte-8oxr0m"><div class="container svelte-8oxr0m"><section class="intro-section svelte-8oxr0m"><h2 class="svelte-8oxr0m">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.intro.title"))}</h2> <p class="svelte-8oxr0m">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.intro.description"))}</p></section> <div class="coaches-grid svelte-8oxr0m"><!--[-->`);
    const each_array = ensure_array_like(coaches);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let coach = each_array[$$index];
      $$renderer2.push(`<a${attr("href", `/club/coaches/${coach.id}`)}${attr_class("coach-card svelte-8oxr0m", void 0, { "highlight": coach.highlight })}><div class="coach-image-wrapper svelte-8oxr0m"><img${attr("src", coach.photo)}${attr("alt", store_get($$store_subs ??= {}, "$_", $format)(coach.name))} class="coach-photo svelte-8oxr0m"/> `);
      if (coach.highlight) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="highlight-badge svelte-8oxr0m">⭐ Coach Principal</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="coach-info svelte-8oxr0m"><h3 class="svelte-8oxr0m">${escape_html(store_get($$store_subs ??= {}, "$_", $format)(coach.name))}</h3> <p class="coach-role svelte-8oxr0m">`);
      if (coach.icon === "award") {
        $$renderer2.push("<!--[-->");
        Award($$renderer2, { size: 18 });
      } else {
        $$renderer2.push("<!--[!-->");
        if (coach.icon === "heart") {
          $$renderer2.push("<!--[-->");
          Heart($$renderer2, { size: 18 });
        } else {
          $$renderer2.push("<!--[!-->");
          Target($$renderer2, { size: 18 });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)(coach.role))}</p> <span class="view-profile svelte-8oxr0m">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("coaches.viewProfile"))}</span></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></div></main></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
