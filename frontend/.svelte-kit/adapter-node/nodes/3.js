import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.VHilTzCe.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BCiTZPL4.js","_app/immutable/chunks/DcbGj4HI.js","_app/immutable/chunks/BqSiu8H-.js","_app/immutable/chunks/BWK43h2m.js","_app/immutable/chunks/BlfuTCKK.js","_app/immutable/chunks/Bn7WFMu1.js","_app/immutable/chunks/BeisVtk3.js","_app/immutable/chunks/BMLd0klQ.js","_app/immutable/chunks/C2vvDMYo.js","_app/immutable/chunks/BADDifj7.js","_app/immutable/chunks/CMQPevso.js","_app/immutable/chunks/B8EHdlT2.js","_app/immutable/chunks/C-74er22.js","_app/immutable/chunks/CE-SLRbk.js","_app/immutable/chunks/COIXjIlF.js","_app/immutable/chunks/CSx56XUQ.js","_app/immutable/chunks/CPtVDxBT.js","_app/immutable/chunks/CZyZQTsz.js","_app/immutable/chunks/CdcW4p2c.js","_app/immutable/chunks/CxPMd2Oy.js","_app/immutable/chunks/6Gs7uGpx.js","_app/immutable/chunks/BejE46_g.js"];
export const stylesheets = ["_app/immutable/assets/Footer.BXR3axXK.css","_app/immutable/assets/Navigation.BDhhzBBr.css","_app/immutable/assets/3.BiLsHSVi.css"];
export const fonts = [];
