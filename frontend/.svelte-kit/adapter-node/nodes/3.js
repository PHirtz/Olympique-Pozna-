import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.mRoIGxPJ.js","_app/immutable/chunks/BsRqJqtP.js","_app/immutable/chunks/DSk5tNde.js","_app/immutable/chunks/CtAnzEYw.js","_app/immutable/chunks/BXqOVUJn.js","_app/immutable/chunks/4xhlnLdH.js","_app/immutable/chunks/eaMXaYMN.js","_app/immutable/chunks/H8ZvxCft.js","_app/immutable/chunks/rFn3Klnk.js","_app/immutable/chunks/lYXgT22N.js","_app/immutable/chunks/Cwny00gn.js","_app/immutable/chunks/9A33ZMJZ.js","_app/immutable/chunks/C1ShTtqO.js","_app/immutable/chunks/J-LyndCf.js","_app/immutable/chunks/ehnnSMYt.js","_app/immutable/chunks/FCle-DG7.js","_app/immutable/chunks/X_YTCDmc.js","_app/immutable/chunks/CVz9dfD9.js","_app/immutable/chunks/Bv6-pexu.js","_app/immutable/chunks/DH3EdG_N.js","_app/immutable/chunks/CCZBzPLf.js","_app/immutable/chunks/CIqjotdg.js","_app/immutable/chunks/DJrv95J_.js"];
export const stylesheets = ["_app/immutable/assets/Footer.BXR3axXK.css","_app/immutable/assets/Navigation.ClDJNL0K.css","_app/immutable/assets/3.CHfDqByQ.css","_app/immutable/assets/SectionTeams.BcxjAFvG.css"];
export const fonts = [];
