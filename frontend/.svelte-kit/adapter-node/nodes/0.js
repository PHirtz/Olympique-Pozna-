import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.B1_DGv1p.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/CzVCK4xm.js","_app/immutable/chunks/ZI_zDGFJ.js","_app/immutable/chunks/ClJk8BT9.js","_app/immutable/chunks/1A2Anh5z.js","_app/immutable/chunks/BVsfWQA1.js","_app/immutable/chunks/aPGRaC7W.js"];
export const stylesheets = ["_app/immutable/assets/0.CqYmwLOr.css"];
export const fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.FAIU8e3o.woff2","_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.Co4MVjrD.woff","_app/immutable/assets/fira-mono-cyrillic-400-normal.BJkDdjbt.woff2","_app/immutable/assets/fira-mono-cyrillic-400-normal.DUd3efVn.woff","_app/immutable/assets/fira-mono-greek-ext-400-normal.Be4g_LSk.woff2","_app/immutable/assets/fira-mono-greek-ext-400-normal.BQ5yw6bY.woff","_app/immutable/assets/fira-mono-greek-400-normal.ftNhKy_S.woff2","_app/immutable/assets/fira-mono-greek-400-normal.B_0AmgK7.woff","_app/immutable/assets/fira-mono-symbols2-400-normal.C6JptOil.woff2","_app/immutable/assets/fira-mono-symbols2-400-normal.CpeG9ob9.woff","_app/immutable/assets/fira-mono-latin-ext-400-normal.B2gPvaNr.woff2","_app/immutable/assets/fira-mono-latin-ext-400-normal.CbD3vWRE.woff","_app/immutable/assets/fira-mono-latin-400-normal.DVTTRLHv.woff2","_app/immutable/assets/fira-mono-latin-400-normal.C3FQ26ho.woff"];
