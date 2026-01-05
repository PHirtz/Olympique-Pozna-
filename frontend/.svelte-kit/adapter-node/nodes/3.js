import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.CuQzP8N-.js","_app/immutable/chunks/DQOotIaD.js","_app/immutable/chunks/G35wOt7m.js","_app/immutable/chunks/C9ReR1f7.js","_app/immutable/chunks/D7AFifD7.js","_app/immutable/chunks/BPhhjFAv.js","_app/immutable/chunks/D3YV3_XT.js","_app/immutable/chunks/CLN4J0d5.js","_app/immutable/chunks/DO4spKrk.js","_app/immutable/chunks/Cm715Ro6.js","_app/immutable/chunks/7mg64UOf.js","_app/immutable/chunks/DyLC8_-p.js","_app/immutable/chunks/C0YbRnBB.js","_app/immutable/chunks/qDl1peNW.js","_app/immutable/chunks/Cl3ePmS4.js","_app/immutable/chunks/DJ5D4IQ-.js","_app/immutable/chunks/CK6n_VI9.js","_app/immutable/chunks/C5edZROl.js","_app/immutable/chunks/C3NGi-fm.js","_app/immutable/chunks/BLWeoTtg.js","_app/immutable/chunks/BG8rmPaB.js","_app/immutable/chunks/CMx1MmhL.js","_app/immutable/chunks/RUWNFUrL.js"];
export const stylesheets = ["_app/immutable/assets/Footer.BXR3axXK.css","_app/immutable/assets/Navigation.CW7q6ha0.css","_app/immutable/assets/3.CHfDqByQ.css","_app/immutable/assets/SectionTeams.BcxjAFvG.css"];
export const fonts = [];
