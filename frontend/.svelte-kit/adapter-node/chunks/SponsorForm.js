import { c as attr, e as ensure_array_like, d as bind_props } from "./index2.js";
import { U as fallback } from "./utils2.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./state.svelte.js";
import { X } from "./x.js";
import { S as Save } from "./save.js";
import { e as escape_html } from "./context.js";
function SponsorForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let mode = fallback(
      $$props["mode"],
      "create"
      // 'create' ou 'edit'
    );
    let sponsorId = fallback($$props["sponsorId"], null);
    let formData = {
      name: "",
      category: "partner",
      websiteUrl: "",
      description_fr: "",
      description_pl: "",
      logoUrl: "",
      logoPath: "",
      displayOrder: 0,
      isActive: true
    };
    let saving = false;
    const categories = [
      { value: "main_sponsor", label: "Sponsor Principal" },
      { value: "supplier", label: "Fournisseur" }
    ];
    $$renderer2.push(`<section class="fm-container svelte-mt43fw">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="bg-white rounded-lg shadow-sm"><form><div class="px-6 py-4 border-b border-gray-200"><h2 class="text-xl font-semibold text-gray-800">${escape_html(mode === "create" ? "Nouveau sponsor" : "Modifier le sponsor")}</h2></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="p-6 space-y-6"><div><h3 class="text-lg font-medium text-gray-800 mb-4">Informations générales</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="md:col-span-2"><label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nom du sponsor *</label> <input id="name" type="text"${attr("value", formData.name)} required${attr("disabled", saving, true)} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" placeholder="Ex: Le Petit Paris"/></div> <div><label for="category" class="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label> `);
      $$renderer2.select(
        {
          id: "category",
          value: formData.category,
          required: true,
          disabled: saving,
          class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        },
        ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(categories);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let cat = each_array[$$index];
            $$renderer3.option({ value: cat.value }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(cat.label)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div> <div><label for="websiteUrl" class="block text-sm font-medium text-gray-700 mb-2">Site web</label> <input id="websiteUrl" type="url"${attr("value", formData.websiteUrl)}${attr("disabled", saving, true)} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" placeholder="https://exemple.com"/></div></div></div> <div><h3 class="text-lg font-medium text-gray-800 mb-4">Descriptions</h3> <div class="space-y-4"><div><label for="description_fr" class="block text-sm font-medium text-gray-700 mb-2">Description (Français)</label> <textarea id="description_fr"${attr("disabled", saving, true)} rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" placeholder="Description du sponsor en français...">`);
      const $$body = escape_html(formData.description_fr);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div> <div><label for="description_pl" class="block text-sm font-medium text-gray-700 mb-2">Description (Polonais)</label> <textarea id="description_pl"${attr("disabled", saving, true)} rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" placeholder="Opis partnera w języku polskim...">`);
      const $$body_1 = escape_html(formData.description_pl);
      if ($$body_1) {
        $$renderer2.push(`${$$body_1}`);
      }
      $$renderer2.push(`</textarea></div></div></div> <div><h3 class="text-lg font-medium text-gray-800 mb-4">Logo</h3> <div class="space-y-4"><div><label for="logoUrl" class="block text-sm font-medium text-gray-700 mb-2">URL du logo</label> <input id="logoUrl" type="url"${attr("value", formData.logoUrl)}${attr("disabled", saving, true)} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" placeholder="https://exemple.com/logo.png"/></div> <div><label for="logoPath" class="block text-sm font-medium text-gray-700 mb-2">Chemin local du logo</label> <input id="logoPath" type="text"${attr("value", formData.logoPath)}${attr("disabled", saving, true)} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" placeholder="/images/sponsors/logo.png"/></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div><h3 class="text-lg font-medium text-gray-800 mb-4">Paramètres d'affichage</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="displayOrder" class="block text-sm font-medium text-gray-700 mb-2">Ordre d'affichage</label> <input id="displayOrder" type="number"${attr("value", formData.displayOrder)}${attr("disabled", saving, true)} min="0" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"/> <p class="text-xs text-gray-500 mt-1">Plus le nombre est petit, plus le sponsor apparaît en premier</p></div> <div><span class="block text-sm font-medium text-gray-700 mb-2">Statut</span> <label class="flex items-center gap-3 cursor-pointer"><input type="checkbox"${attr("checked", formData.isActive, true)}${attr("disabled", saving, true)} class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"/> <span class="text-gray-700">Sponsor actif (visible sur le site)</span></label></div></div></div></div> <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3"><button type="button"${attr("disabled", saving, true)} class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition disabled:opacity-50">`);
      X($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> <span>Annuler</span></button> <button type="submit"${attr("disabled", saving, true)} class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50">`);
      Save($$renderer2, { size: 18 });
      $$renderer2.push(`<!----> <span>${escape_html("Enregistrer")}</span></button></div></form></div>`);
    }
    $$renderer2.push(`<!--]--></section>`);
    bind_props($$props, { mode, sponsorId });
  });
}
export {
  SponsorForm as S
};
