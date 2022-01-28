import { c as create_ssr_component, b as subscribe, j as add_attribute } from "./index-1abd510b.js";
import "./_...index_-1b88065c.js";
import { p as pendingRoute } from "./index-e25a1ff5.js";
var _loader_svelte_svelte_type_style_lang = "";
const css = {
  code: "progress.svelte-1yl4j34{position:fixed}",
  map: null
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value;
  let $pendingRoute, $$unsubscribe_pendingRoute;
  $$unsubscribe_pendingRoute = subscribe(pendingRoute, (value2) => $pendingRoute = value2);
  setInterval(() => value++, 10);
  $$result.css.add(css);
  value = $pendingRoute && 0;
  $$unsubscribe_pendingRoute();
  return `${$pendingRoute ? `<progress${add_attribute("value", value, 0)} max="${"100"}" class="${"svelte-1yl4j34"}"></progress>` : ``}`;
});
export { Loader as default };
