import { h as head, f as bind_props } from './index2-DM23HGju.js';
import { N as Navigation } from './Navigation-BL8mhdmO.js';
import './utils2-Bf5dtsip.js';
import './context-R2425nfV.js';
import './runtime-BvgGssNx.js';
import './index-BEapQtpA.js';
import './auth-By6dChTT.js';
import './exports-CgQJUv15.js';
import './state.svelte-bTJGT0Z8.js';
import './user-C8H-6uno.js';
import './x-C2OVpXEC.js';

function _page($$renderer, $$props) {
  let data = $$props["data"];
  head("a8yt2h", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>shop - Olympique Poznań</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Shop d'Olympique Poznań - Club de football"/>`);
  });
  Navigation($$renderer);
  $$renderer.push(`<!----> <section class="hero"><h1>Bienvenue sur le shop d'Olympique Poznań</h1> <p>Club de football de Poznań</p></section>`);
  bind_props($$props, { data });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CcHB4A5x.js.map
