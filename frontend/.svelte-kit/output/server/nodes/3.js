import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.BZN7OASJ.js","_app/immutable/chunks/yV6hNknX.js","_app/immutable/chunks/BTi8hTM2.js","_app/immutable/chunks/CUSw2KYz.js","_app/immutable/chunks/D9w18YgX.js","_app/immutable/chunks/DnPaU4U0.js","_app/immutable/chunks/DVICO2qe.js","_app/immutable/chunks/BA0YXBA-.js","_app/immutable/chunks/CG3RL-lj.js","_app/immutable/chunks/BsEiZ-tN.js","_app/immutable/chunks/Dmd6iH9P.js","_app/immutable/chunks/ewJSZW_y.js","_app/immutable/chunks/LoGnCDsg.js","_app/immutable/chunks/CciYVela.js","_app/immutable/chunks/Dz77sDPm.js","_app/immutable/chunks/2pELbkbu.js","_app/immutable/chunks/q5Rjcvax.js","_app/immutable/chunks/wFrrpgIj.js","_app/immutable/chunks/BY8K__4x.js","_app/immutable/chunks/D3kSvixu.js","_app/immutable/chunks/DBhVopSh.js","_app/immutable/chunks/4r6PF1qH.js"];
export const stylesheets = ["_app/immutable/assets/Footer.DmUUcsfW.css","_app/immutable/assets/Navigation.CYWGz3cr.css","_app/immutable/assets/3.1a00lk2c.css","_app/immutable/assets/SectionTeams.BcxjAFvG.css"];
export const fonts = [];
