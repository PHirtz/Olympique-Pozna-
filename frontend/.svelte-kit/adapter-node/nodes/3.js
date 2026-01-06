import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.Bv-OwjV3.js","_app/immutable/chunks/D-Zhd6ZT.js","_app/immutable/chunks/CpzJ3qQk.js","_app/immutable/chunks/O3BCfsb6.js","_app/immutable/chunks/NnfbyZn6.js","_app/immutable/chunks/BHvbcu51.js","_app/immutable/chunks/NKF_jTli.js","_app/immutable/chunks/B8Cme7ZM.js","_app/immutable/chunks/C0q6uhCM.js","_app/immutable/chunks/BgfPmvqu.js","_app/immutable/chunks/BVWvtNzj.js","_app/immutable/chunks/DLIu55oR.js","_app/immutable/chunks/D9oBpOY9.js","_app/immutable/chunks/DSEovlm-.js","_app/immutable/chunks/Ciq-Lzyx.js","_app/immutable/chunks/B5R12LUx.js","_app/immutable/chunks/Bun_Vau5.js","_app/immutable/chunks/CUs-5Hm4.js","_app/immutable/chunks/YIdFPYzK.js","_app/immutable/chunks/BQtgZ_ru.js","_app/immutable/chunks/DB7QSW03.js"];
export const stylesheets = ["_app/immutable/assets/Footer.DmUUcsfW.css","_app/immutable/assets/Navigation.Dd_X-4Nt.css","_app/immutable/assets/3.1a00lk2c.css","_app/immutable/assets/SectionTeams.BcxjAFvG.css"];
export const fonts = [];
