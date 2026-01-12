import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.BuZoXzlj.js","_app/immutable/chunks/DARMnDLv.js","_app/immutable/chunks/BM3DQzQ8.js","_app/immutable/chunks/6t_syFyg.js","_app/immutable/chunks/BeWk9NVf.js","_app/immutable/chunks/Cz3P5szO.js","_app/immutable/chunks/bdwg5BNF.js","_app/immutable/chunks/Bt_ZHyh5.js","_app/immutable/chunks/fk7l_UBd.js","_app/immutable/chunks/DmQuaZaT.js","_app/immutable/chunks/CYMg8b5J.js","_app/immutable/chunks/oNU2ofWQ.js","_app/immutable/chunks/BkD8QmH2.js","_app/immutable/chunks/CitGNqtU.js","_app/immutable/chunks/BAc9AAss.js","_app/immutable/chunks/oKBXK1La.js","_app/immutable/chunks/CcVsdusC.js","_app/immutable/chunks/DrRlngTJ.js","_app/immutable/chunks/DwdrW0WI.js","_app/immutable/chunks/DmAm9rW4.js","_app/immutable/chunks/C58KJ1Ih.js","_app/immutable/chunks/Bvr-ukj3.js","_app/immutable/chunks/CGoJsWJ1.js","_app/immutable/chunks/hJz3YM7M.js"];
export const stylesheets = ["_app/immutable/assets/Footer.DmUUcsfW.css","_app/immutable/assets/Navigation.CYWGz3cr.css","_app/immutable/assets/3.1a00lk2c.css","_app/immutable/assets/SectionTeams.BcxjAFvG.css"];
export const fonts = [];
