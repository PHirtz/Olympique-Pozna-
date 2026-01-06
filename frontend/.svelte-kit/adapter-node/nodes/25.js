import * as universal from '../entries/pages/shop/_page.js';

export const index = 25;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/shop/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/shop/+page.js";
export const imports = ["_app/immutable/nodes/25.CHtCSDCj.js","_app/immutable/chunks/ClJk8BT9.js","_app/immutable/chunks/ZI_zDGFJ.js","_app/immutable/chunks/1A2Anh5z.js","_app/immutable/chunks/Di_EI3d7.js","_app/immutable/chunks/CUvkkpnr.js","_app/immutable/chunks/BvgcJFfi.js","_app/immutable/chunks/BVsfWQA1.js","_app/immutable/chunks/f0ANnpuX.js","_app/immutable/chunks/BOvlz4Jb.js","_app/immutable/chunks/CXqmAC--.js","_app/immutable/chunks/CzVCK4xm.js","_app/immutable/chunks/BZ71F_yy.js","_app/immutable/chunks/wE-5lYDp.js","_app/immutable/chunks/aPGRaC7W.js","_app/immutable/chunks/cvZuFovX.js","_app/immutable/chunks/r34TKVCO.js","_app/immutable/chunks/CLoaOhKX.js","_app/immutable/chunks/iU134orw.js","_app/immutable/chunks/B9YCLPA5.js"];
export const stylesheets = ["_app/immutable/assets/Navigation.CJqfd4kX.css"];
export const fonts = [];
