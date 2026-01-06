import { e as ensure_array_like, b as attr_class, c as attr, a as store_get, u as unsubscribe_stores, d as bind_props, f as stringify, g as attr_style, h as head } from "../../chunks/index2.js";
import { U as fallback } from "../../chunks/utils2.js";
import { $ as $format } from "../../chunks/runtime.js";
import { e as escape_html } from "../../chunks/context.js";
import { F as Footer } from "../../chunks/Footer.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
/* empty css                                                      */
import { N as Navigation } from "../../chunks/Navigation.js";
function Hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let images = fallback($$props["images"], () => ["/victory.jpg"], true);
    let currentIndex = 0;
    $$renderer2.push(`<section class="hero svelte-vhe327"><div class="hero-background svelte-vhe327"><!--[-->`);
    const each_array = ensure_array_like(images);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let image = each_array[index];
      $$renderer2.push(`<div${attr_class("hero-slide svelte-vhe327", void 0, { "active": currentIndex === index })}><img${attr("src", image)}${attr("alt", `Olympique Poznań - Image ${stringify(index + 1)}`)} class="svelte-vhe327"/></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="hero-overlay svelte-vhe327"></div></div> <div class="hero-content svelte-vhe327"><h1 class="svelte-vhe327">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("hero.title"))}</h1> <p class="hero-subtitle svelte-vhe327">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("hero.subtitle"))}</p> <p class="hero-description svelte-vhe327">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("hero.description"))}</p></div> `);
    if (images.length > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="hero-indicators svelte-vhe327"><!--[-->`);
      const each_array_1 = ensure_array_like(images);
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        each_array_1[index];
        $$renderer2.push(`<button${attr_class("indicator svelte-vhe327", void 0, { "active": currentIndex === index })}${attr("aria-label", `Voir image ${stringify(index + 1)}`)}></button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { images });
  });
}
function BanniereCamp($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const campImages = [
      {
        src: "../camps/537378575_666839196445870_7205819773690376839_n.jpg",
        alt: "Camp Olympique - Entraînement"
      },
      {
        src: "../camps/538546293_666839159779207_5349435575611989785_n.jpg",
        alt: "Camp Olympique - Activités"
      },
      {
        src: "../camps/565101131_710263548770101_4822435177271192086_n.jpg",
        alt: "Camp Olympique - Groupe"
      },
      {
        src: "../camps/511562436_618032664659857_2760144674956014663_n.jpg",
        alt: "Camp Olympique - Match"
      },
      {
        src: "../camps/510558630_616454818150975_2848625339731913587_n.jpg",
        alt: "Camp Olympique - Fun"
      },
      {
        src: "../camps/485693359_545062581956866_8217956033877381566_n.jpg",
        alt: "Camp Olympique - Amis"
      },
      {
        src: "../camps/480541685_525020913961033_7575004528192900917_n.jpg",
        alt: "Camp Olympique - Sourires"
      },
      {
        src: "../camps/480828745_525012433961881_1776206399951794533_n.jpg",
        alt: "Camp Olympique - Entraîneurs"
      },
      {
        src: "../camps/478278206_518114947984963_3727456241404200799_n.jpg",
        alt: "Camp Olympique - Terrain"
      },
      {
        src: "../camps/479544477_516514228145035_3370660487461680180_n.jpg",
        alt: "Camp Olympique - Équipe"
      }
    ];
    let currentSlide = 0;
    $$renderer2.push(`<section class="banniere-camp svelte-9rg21t"><div class="banniere-container svelte-9rg21t"><div class="banniere-content svelte-9rg21t"><h2 class="svelte-9rg21t">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("camps.title", { default: "Le Camp Olympique" }))}</h2> <p class="svelte-9rg21t">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("camps.subtitle", { default: "Des vacances sportives inoubliables" }))}</p></div> <div class="slider svelte-9rg21t"><div class="slides svelte-9rg21t"${attr_style(`transform: translateX(-${stringify(currentSlide * 100)}%)`)}><!--[-->`);
    const each_array = ensure_array_like(campImages);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let image = each_array[index];
      $$renderer2.push(`<div class="slide svelte-9rg21t"><img${attr("src", image.src)}${attr("alt", image.alt)} loading="lazy" class="svelte-9rg21t"/></div>`);
    }
    $$renderer2.push(`<!--]--></div> <button class="nav-btn prev svelte-9rg21t" aria-label="Image précédente"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button> <button class="nav-btn next svelte-9rg21t" aria-label="Image suivante"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button> <div class="indicators svelte-9rg21t"><!--[-->`);
    const each_array_1 = ensure_array_like(campImages);
    for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
      each_array_1[index];
      $$renderer2.push(`<button${attr_class("indicator svelte-9rg21t", void 0, { "active": currentSlide === index })}${attr("aria-label", `Aller à l'image ${stringify(index + 1)}`)}></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Externe($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const shopImages = [
      {
        src: "../vitrine/Veste1.jpg",
        alt: "veste domicile Olympique Poznań",
        titleKey: "shop.items.jacket",
        link: ""
      },
      {
        src: "../vitrine/maillot.jpg",
        alt: "maillot domicile Olympique Poznań",
        titleKey: "shop.items.homeJersey",
        link: "https://olympique.pl/products/koszulka-meczowa-olympique-domowa"
      },
      {
        src: "../vitrine/vestehv.jpg",
        alt: "veste hiver Olympique Poznań",
        titleKey: "shop.items.scarf",
        link: ""
      },
      {
        src: "../vitrine/Bidon.jpg",
        alt: "Gourde Olympique Poznań",
        titleKey: "shop.items.bottle",
        link: ""
      },
      {
        src: "../vitrine/roller.png",
        alt: "Roller Olympique Poznań",
        titleKey: "shop.items.roller",
        link: ""
      },
      {
        src: "../vitrine/chaussettes2.png",
        alt: "Chaussettes Olympique Poznań",
        titleKey: "shop.items.socks",
        link: "https://olympique.pl/products/skarpetogetry"
      },
      {
        src: "../vitrine/sweatpluie.jpg",
        alt: "Veste pluie officielle Olympique Poznań",
        titleKey: "shop.items.rainJacket",
        link: ""
      },
      {
        src: "../vitrine/ShortBlanc3.png",
        alt: "Short blanc Olympique Poznań",
        titleKey: "shop.items.whiteShorts",
        link: "https://olympique.pl/products/meskie-spodenki-meczowe-olympique?ownerid=126459513&noProxyRedirect=true&ownerid=126459513"
      },
      {
        src: "../vitrine/ShortBleu4.jpg",
        alt: "Short bleu Olympique Poznań",
        titleKey: "shop.items.blueShorts",
        link: "https://olympique.pl/products/damskie-spodenki-meczowe-olympique?ownerid=126459513&noProxyRedirect=true&ownerid=126459513"
      },
      {
        src: "../vitrine/sweatfilles.jpg",
        alt: "sweat Olympique Poznań",
        titleKey: "shop.items.sweatshirt",
        link: ""
      }
    ];
    let pageUrl = fallback($$props["pageUrl"], "https://www.facebook.com/OlympiquePoz");
    let currentSlide = 0;
    $$renderer2.push(`<section class="combined-section svelte-vo9vdt"><div class="container svelte-vo9vdt"><div class="shop-column svelte-vo9vdt"><div class="text-content svelte-vo9vdt"><h2 class="svelte-vo9vdt">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("shop.banner.title"))}</h2> <button class="shop-btn svelte-vo9vdt">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("shop.banner.cta"))}</button></div> <div class="slider svelte-vo9vdt"><div class="slides svelte-vo9vdt"${attr_style(`transform: translateX(-${stringify(currentSlide * 100)}%)`)}><!--[-->`);
    const each_array = ensure_array_like(shopImages);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let product = each_array[$$index];
      if (product.link) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="slide clickable svelte-vo9vdt"${attr("aria-label", `Voir ${stringify(store_get($$store_subs ??= {}, "$_", $format)(product.titleKey))}`)}><img${attr("src", product.src)}${attr("alt", product.alt)} loading="lazy" class="svelte-vo9vdt"/> <div class="product-info svelte-vo9vdt"><h3 class="svelte-vo9vdt">${escape_html(store_get($$store_subs ??= {}, "$_", $format)(product.titleKey))}</h3> <span class="view-product svelte-vo9vdt">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("shop.viewProduct"))}</span></div></button>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="slide svelte-vo9vdt"><img${attr("src", product.src)}${attr("alt", product.alt)} loading="lazy" class="svelte-vo9vdt"/> <div class="product-info svelte-vo9vdt"><h3 class="svelte-vo9vdt">${escape_html(store_get($$store_subs ??= {}, "$_", $format)(product.titleKey))}</h3></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> <button class="nav-btn prev svelte-vo9vdt" aria-label="Produit précédent"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button> <button class="nav-btn next svelte-vo9vdt" aria-label="Produit suivant"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button> <div class="indicators svelte-vo9vdt"><!--[-->`);
    const each_array_1 = ensure_array_like(shopImages);
    for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
      each_array_1[index];
      $$renderer2.push(`<button${attr_class("indicator svelte-vo9vdt", void 0, { "active": currentSlide === index })}${attr("aria-label", `Voir produit ${stringify(index + 1)}`)}></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="facebook-column svelte-vo9vdt"><h2 class="svelte-vo9vdt">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("facebook.latestPosts"))}</h2> <p class="facebook-subtitle svelte-vo9vdt">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("facebook.followDescription"))}</p> <div class="facebook-card svelte-vo9vdt"><div class="facebook-header svelte-vo9vdt"><div class="facebook-logo svelte-vo9vdt"><svg viewBox="0 0 24 24" fill="currentColor" class="svelte-vo9vdt"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></div> <div class="page-info svelte-vo9vdt"><h3 class="svelte-vo9vdt">Olympique Poznań</h3> <p class="svelte-vo9vdt">@OlympiquePoznan</p></div></div> <div class="facebook-content svelte-vo9vdt"><div class="cover-image svelte-vo9vdt"><img src="/logo.png" alt="Olympique Poznań" class="svelte-vo9vdt"/></div> <div class="facebook-description svelte-vo9vdt"><p class="svelte-vo9vdt">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("footer.description"))}</p></div> <div class="facebook-stats svelte-vo9vdt"><div class="stat svelte-vo9vdt"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-vo9vdt"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> <span class="svelte-vo9vdt">1.7K+</span></div> <div class="stat svelte-vo9vdt"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-vo9vdt"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> <span class="svelte-vo9vdt">Followers</span></div></div></div> <button class="facebook-cta svelte-vo9vdt"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="svelte-vo9vdt"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("facebook.viewOnFacebook"))}</button></div></div></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { pageUrl });
  });
}
function SectionTeamsShort($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const teams = [
      {
        slug: "feminine",
        image: "../seniorsf/548748092_685055974624192_8235511687039625110_n.jpg",
        link: "/teams/ladies"
      },
      {
        slug: "junior",
        image: "../juniors/535057118_663522866777503_4651670088385010660_n.jpg",
        link: "/teams/academy"
      },
      {
        slug: "senior",
        image: "../seniorsh/565694409_714234655039657_3240198854373276417_n.jpg",
        link: "/teams/blues"
      }
    ];
    $$renderer2.push(`<section class="teams-section svelte-1x51gbf"><div class="content-teams svelte-1x51gbf"><h2 class="svelte-1x51gbf">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("home.teams.title"))}</h2></div> <div class="teams-cards svelte-1x51gbf"><!--[-->`);
    const each_array = ensure_array_like(teams);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let team = each_array[$$index];
      $$renderer2.push(`<a${attr("href", team.link)} class="team-card svelte-1x51gbf"${attr("aria-label", store_get($$store_subs ??= {}, "$_", $format)(`home.teams.${team.slug}.name`))}><div class="team-image svelte-1x51gbf"><img${attr("src", team.image)}${attr("alt", store_get($$store_subs ??= {}, "$_", $format)(`home.teams.${team.slug}.name`))} loading="lazy" class="svelte-1x51gbf"/></div> <div class="team-content svelte-1x51gbf"><h3 class="svelte-1x51gbf">${escape_html(store_get($$store_subs ??= {}, "$_", $format)(`home.teams.${team.slug}.name`))}</h3></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  const heroImages = [
    "/victory.jpg",
    "/480253574_519592814503843_155183674564057428_n.jpg",
    "/img-communes/fondteam.jpeg",
    "/img-communes/515983768_627785960351194_4348364861543239483_n.jpg",
    "/480550232_520175491112242_6056627001798457656_n.jpg",
    "/480451313_519582431171548_3309691283841879797_n.jpg"
  ];
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Home - Olympique Poznań</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Olympique Poznań - Club de football"/>`);
  });
  Navigation($$renderer);
  $$renderer.push(`<!----> `);
  Hero($$renderer, { images: heroImages });
  $$renderer.push(`<!----> `);
  SectionTeamsShort($$renderer);
  $$renderer.push(`<!----> `);
  Externe($$renderer, {});
  $$renderer.push(`<!----> `);
  BanniereCamp($$renderer);
  $$renderer.push(`<!----> `);
  Footer($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
