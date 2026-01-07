import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.ZSHFF3Oe.js","_app/immutable/chunks/ClJk8BT9.js","_app/immutable/chunks/ZI_zDGFJ.js","_app/immutable/chunks/1A2Anh5z.js","_app/immutable/chunks/Di_EI3d7.js","_app/immutable/chunks/BVsfWQA1.js","_app/immutable/chunks/f0ANnpuX.js","_app/immutable/chunks/wE-5lYDp.js","_app/immutable/chunks/CXqmAC--.js","_app/immutable/chunks/aPGRaC7W.js","_app/immutable/chunks/BOvlz4Jb.js","_app/immutable/chunks/CUvkkpnr.js","_app/immutable/chunks/CzVCK4xm.js","_app/immutable/chunks/dQoKatiQ.js","_app/immutable/chunks/DqgUVBxH.js","_app/immutable/chunks/bc4VeSCS.js","_app/immutable/chunks/hyc-k8cU.js","_app/immutable/chunks/r34TKVCO.js","_app/immutable/chunks/CLoaOhKX.js","_app/immutable/chunks/iU134orw.js","_app/immutable/chunks/B9YCLPA5.js"];
export const stylesheets = ["_app/immutable/assets/Footer.DmUUcsfW.css","_app/immutable/assets/Navigation.D3LhcijO.css","_app/immutable/assets/3.1a00lk2c.css","_app/immutable/assets/SectionTeams.BcxjAFvG.css"];
export const fonts = [];
