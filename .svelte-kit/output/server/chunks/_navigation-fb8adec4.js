import { c as create_ssr_component, b as subscribe, h as each, j as add_attribute, e as escape } from "./index-1abd510b.js";
import "./_...index_-1b88065c.js";
import { n as node, i as isActive } from "./index-e25a1ff5.js";
var _navigation_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-dexlqq.svelte-dexlqq{padding:0 40px}.isActive.svelte-dexlqq a.svelte-dexlqq{text-decoration:underline}",
  map: null
};
const Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let liveUrl;
  let $node, $$unsubscribe_node;
  let $isActive, $$unsubscribe_isActive;
  $$unsubscribe_node = subscribe(node, (value) => $node = value);
  $$unsubscribe_isActive = subscribe(isActive, (value) => $isActive = value);
  let { pages } = $$props;
  if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
    $$bindings.pages(pages);
  $$result.css.add(css);
  liveUrl = (index) => pages && pages[index]?.router?.url.external();
  $$unsubscribe_node();
  $$unsubscribe_isActive();
  return `<nav class="${"container svelte-dexlqq"}"><ul><li><h1><a href="${"/"}">Portfolio</a></h1></li></ul>
    <ul>${each($node.pages, (childNode, index) => {
    return `<li class="${["svelte-dexlqq", $isActive(childNode.path) ? "isActive" : ""].join(" ").trim()}"><a${add_attribute("href", liveUrl(index) || childNode.path, 0)} class="${"svelte-dexlqq"}">${escape(childNode.meta.title || childNode.name)}</a>
            </li>`;
  })}</ul>
</nav>`;
});
export { Navigation as default };
