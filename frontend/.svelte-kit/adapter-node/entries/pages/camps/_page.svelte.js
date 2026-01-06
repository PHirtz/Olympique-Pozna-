import { j as sanitize_props, k as spread_props, s as slot, h as head, a as store_get, c as attr, u as unsubscribe_stores, d as bind_props } from "../../../chunks/index2.js";
import { $ as $format } from "../../../chunks/runtime.js";
import { N as Navigation2 } from "../../../chunks/Navigation2.js";
import { M as Map_pin, P as Phone, a as Mail, F as Footer } from "../../../chunks/Footer.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { U as Users } from "../../../chunks/users.js";
import { S as Send } from "../../../chunks/send.js";
import { e as escape_html } from "../../../chunks/context.js";
function Calendar($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      { "width": "18", "height": "18", "x": "3", "y": "4", "rx": "2" }
    ],
    ["path", { "d": "M3 10h18" }]
  ];
  Icon($$renderer, spread_props([
    { name: "calendar" },
    $$sanitized_props,
    {
      /**
       * @component @name Calendar
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAydjQiIC8+CiAgPHBhdGggZD0iTTE2IDJ2NCIgLz4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjQiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik0zIDEwaDE4IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/calendar
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
    let formData = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      message: "",
      category: "inscription"
    };
    let loading = false;
    head("cff0ph", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Le Camp Olympique - Olympique Poznań</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Rejoignez le Camp Olympique à Skarbimierz ! Stage de football intensif avec hébergement et activités."/>`);
    });
    Navigation2($$renderer2);
    $$renderer2.push(`<!----> <div class="camps-page"><section class="hero-camps svelte-cff0ph"><div class="container svelte-cff0ph"><img src="/pubcamp.png" alt="Le Camp Olympique - Luty 2026" class="camp-poster svelte-cff0ph"/></div></section> <section class="camp-info svelte-cff0ph"><div class="container svelte-cff0ph"><div class="info-grid svelte-cff0ph"><div class="info-card svelte-cff0ph">`);
    Calendar($$renderer2, { size: 32 });
    $$renderer2.push(`<!----> <h3 class="svelte-cff0ph">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("camps.dates"))}</h3> <p class="svelte-cff0ph"><strong>15-21 Février 2026</strong></p> <p class="detail svelte-cff0ph">7 dni sportů!</p></div> <div class="info-card svelte-cff0ph">`);
    Map_pin($$renderer2, { size: 32 });
    $$renderer2.push(`<!----> <h3 class="svelte-cff0ph">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("camps.lieu"))}</h3> <p class="svelte-cff0ph"><strong>Skarbimierz</strong></p> <p class="detail svelte-cff0ph">Hotel Antonio Conference</p></div> <div class="info-card svelte-cff0ph">`);
    Users($$renderer2, { size: 32 });
    $$renderer2.push(`<!----> <h3 class="svelte-cff0ph">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("camps.programme"))}</h3> <p class="svelte-cff0ph"><strong>3 entraînements/jour</strong></p> <p class="detail svelte-cff0ph">Sparingi, gry i integracja</p></div></div> <div class="activities svelte-cff0ph"><h2 class="svelte-cff0ph">Au programme</h2> <ul class="svelte-cff0ph"><li class="svelte-cff0ph">⚽ 3 entraînements quotidiens : sparingi, gry, integracja</li> <li class="svelte-cff0ph">🏨 Hébergement confortable avec repas</li> <li class="svelte-cff0ph">🏰 Visites : Wrocław 2010-2018 Drazogiszyn 2008-2018</li> <li class="svelte-cff0ph">🎾 Activités : Silownia, plac zabaw, ping pong, mini zoo</li> <li class="svelte-cff0ph">⚽ Tournois FIFA + Aquapark</li> <li class="svelte-cff0ph">🎓 Encadrement professionnel par nos entraîneurs</li></ul></div></div></section> <section class="contact-form-section svelte-cff0ph"><div class="container svelte-cff0ph"><div class="form-header svelte-cff0ph"><h2 class="svelte-cff0ph">Inscrivez-vous au Camp d'Olympique Poznań</h2> <p class="svelte-cff0ph">Remplissez le formulaire ci-dessous pour vous inscrire ou demander plus d'informations</p></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form class="camp-form svelte-cff0ph"><div class="form-row svelte-cff0ph"><div class="form-group svelte-cff0ph"><label for="firstName" class="svelte-cff0ph">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.name"))} *</label> <input type="text" id="firstName"${attr("value", formData.firstName)} required${attr("disabled", loading, true)} class="svelte-cff0ph"/></div> <div class="form-group svelte-cff0ph"><label for="lastName" class="svelte-cff0ph">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.lastName"))} *</label> <input type="text" id="lastName"${attr("value", formData.lastName)} required${attr("disabled", loading, true)} class="svelte-cff0ph"/></div></div> <div class="form-row svelte-cff0ph"><div class="form-group svelte-cff0ph"><label for="email" class="svelte-cff0ph">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.email"))} *</label> <input type="email" id="email"${attr("value", formData.email)} required${attr("disabled", loading, true)} class="svelte-cff0ph"/></div> <div class="form-group svelte-cff0ph"><label for="phone" class="svelte-cff0ph">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.tel"))} *</label> <input type="tel" id="phone"${attr("value", formData.phone)} placeholder="06 XX XX XX XX"${attr("disabled", loading, true)} class="svelte-cff0ph"/></div></div> <div class="form-row svelte-cff0ph"><div class="form-group svelte-cff0ph"><label for="age" class="svelte-cff0ph">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.age"))} *</label> <input type="number" id="age"${attr("value", formData.age)} min="5" max="80"${attr("disabled", loading, true)} class="svelte-cff0ph"/></div> <div class="form-group svelte-cff0ph"><label for="category" class="svelte-cff0ph">Type de demande</label> `);
    $$renderer2.select(
      {
        id: "category",
        value: formData.category,
        disabled: loading,
        class: ""
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "inscription" }, ($$renderer4) => {
          $$renderer4.push(`Inscription au camp`);
        });
        $$renderer3.option({ value: "information" }, ($$renderer4) => {
          $$renderer4.push(`Demande d'information`);
        });
      },
      "svelte-cff0ph"
    );
    $$renderer2.push(`</div></div> <div class="form-group svelte-cff0ph"><label for="message" class="svelte-cff0ph">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.message"))} *</label> <textarea id="message" rows="5" placeholder="Parlez-nous de vous et de votre motivation..."${attr("disabled", loading, true)} required class="svelte-cff0ph">`);
    const $$body = escape_html(formData.message);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <button type="submit" class="submit-btn svelte-cff0ph"${attr("disabled", loading, true)}>`);
    {
      $$renderer2.push("<!--[!-->");
      Send($$renderer2, { size: 20 });
      $$renderer2.push(`<!----> <span>${escape_html(store_get($$store_subs ??= {}, "$_", $format)("contact.form.demande"))} *</span>`);
    }
    $$renderer2.push(`<!--]--></button></form> <div class="contact-info svelte-cff0ph"><h3 class="svelte-cff0ph">Contact direct</h3> <div class="contact-details svelte-cff0ph"><a href="tel:669091910" class="contact-link svelte-cff0ph">`);
    Phone($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> <span>06 XX XX XX XX</span></a> <a href="mailto:os.wutezi@wutezi.com&lt;" class="contact-link svelte-cff0ph">`);
    Mail($$renderer2, { size: 20 });
    $$renderer2.push(`<!----> <span>s.wutezi@wutezi.com</span></a></div></div></div></section></div> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
