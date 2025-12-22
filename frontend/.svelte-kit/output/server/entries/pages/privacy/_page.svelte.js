import { h as head, c as attr } from "../../../chunks/index2.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let firstName = "";
    let lastName = "";
    let email = "";
    let phone = "";
    let subject = "";
    let message = "";
    let loading = false;
    head("7ke6fz", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Contact - Olympique Poznań</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Contactez Olympique Poznań"/>`);
    });
    $$renderer2.push(`<div class="menu-logo svelte-7ke6fz"><a href="/" class="logo-card svelte-7ke6fz"><img src="/logo.png" alt="Logo Olympique Poznań" class="logo svelte-7ke6fz"/></a></div> <section class="contact-page svelte-7ke6fz"><div class="contact-card svelte-7ke6fz"><h1 class="svelte-7ke6fz">Contactez-nous</h1> <p class="subtitle svelte-7ke6fz">Une question ? N'hésitez pas à nous écrire !</p> <form class="svelte-7ke6fz"><div class="form-row svelte-7ke6fz"><label class="svelte-7ke6fz">Prénom * <input type="text"${attr("value", firstName)} placeholder="Votre prénom" required class="svelte-7ke6fz"/></label> <label class="svelte-7ke6fz">Nom * <input type="text"${attr("value", lastName)} placeholder="Votre nom" required class="svelte-7ke6fz"/></label></div> <div class="form-row svelte-7ke6fz"><label class="svelte-7ke6fz">Email * <input type="email"${attr("value", email)} placeholder="votre.email@example.com" required class="svelte-7ke6fz"/></label> <label class="svelte-7ke6fz">Téléphone <input type="tel"${attr("value", phone)} placeholder="+33 6 12 34 56 78" class="svelte-7ke6fz"/></label></div> <label class="svelte-7ke6fz">Sujet * `);
    $$renderer2.select(
      { value: subject, required: true, class: "" },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`-- Choisissez un sujet --`);
        });
        $$renderer3.option({ value: "inscription" }, ($$renderer4) => {
          $$renderer4.push(`Inscription / Rejoindre le club`);
        });
        $$renderer3.option({ value: "stage" }, ($$renderer4) => {
          $$renderer4.push(`Stage de football`);
        });
        $$renderer3.option({ value: "equipe" }, ($$renderer4) => {
          $$renderer4.push(`Informations sur une équipe`);
        });
        $$renderer3.option({ value: "match" }, ($$renderer4) => {
          $$renderer4.push(`Renseignements matchs`);
        });
        $$renderer3.option({ value: "partenariat" }, ($$renderer4) => {
          $$renderer4.push(`Partenariat`);
        });
        $$renderer3.option({ value: "autre" }, ($$renderer4) => {
          $$renderer4.push(`Autre demande`);
        });
      },
      "svelte-7ke6fz"
    );
    $$renderer2.push(`</label> <label class="svelte-7ke6fz">Message * <textarea placeholder="Votre message..." rows="6" required class="svelte-7ke6fz">`);
    const $$body = escape_html(message);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></label> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)} class="svelte-7ke6fz">${escape_html("Envoyer le message")}</button></form> <div class="contact-info svelte-7ke6fz"><h3 class="svelte-7ke6fz">Autres moyens de nous contacter</h3> <div class="info-grid svelte-7ke6fz"><div class="info-item svelte-7ke6fz"><span class="icon svelte-7ke6fz">📧</span> <div><strong class="svelte-7ke6fz">Email</strong> <p class="svelte-7ke6fz">s.wutezi@wutezi.com</p></div></div> <div class="info-item svelte-7ke6fz"><span class="icon svelte-7ke6fz">📞</span> <div><strong class="svelte-7ke6fz">Téléphone</strong> <p class="svelte-7ke6fz">+48 123 456 789</p></div></div> <div class="info-item svelte-7ke6fz"><span class="icon svelte-7ke6fz">📍</span> <div><strong class="svelte-7ke6fz">Adresse</strong> <p class="svelte-7ke6fz">Poznań, Pologne</p></div></div></div></div></div></section>`);
  });
}
export {
  _page as default
};
