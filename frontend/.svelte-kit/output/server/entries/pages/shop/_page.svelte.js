import { h as head, d as bind_props } from "../../../chunks/index2.js";
import { N as Navigation } from "../../../chunks/Navigation.js";
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
export {
  _page as default
};
