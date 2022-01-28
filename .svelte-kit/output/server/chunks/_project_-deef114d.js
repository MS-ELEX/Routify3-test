import { c as create_ssr_component, b as subscribe, j as add_attribute } from "./index-1abd510b.js";
import "./_...index_-1b88065c.js";
import { u as url } from "./index-e25a1ff5.js";
var _project__svelte_svelte_type_style_lang = "";
const css = {
  code: "article.svelte-1bz96xd{position:absolute;top:0;left:0;bottom:0;right:0;overflow:auto}.close.svelte-1bz96xd{position:absolute;top:56px;right:32px;display:inline-block}",
  map: null
};
const load = async ({ route, node }) => {
  const { meta } = node.traverse("..");
  const { project } = route.params;
  const repo = meta.repos.find((repo2) => repo2.data.name === project);
  if (repo)
    return { readme: await repo.readme() };
};
const U5Bprojectu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $url, $$unsubscribe_url;
  $$unsubscribe_url = subscribe(url, (value) => $url = value);
  let { context } = $$props;
  if ($$props.context === void 0 && $$bindings.context && context !== void 0)
    $$bindings.context(context);
  $$result.css.add(css);
  $$unsubscribe_url();
  return `<article class="${"project svelte-1bz96xd"}"><div><!-- HTML_TAG_START -->${context.load.readme}<!-- HTML_TAG_END --></div></article>
<a class="${"close svelte-1bz96xd"}"${add_attribute("href", $url("../"), 0)}><button>close </button></a>`;
});
export { U5Bprojectu5D as default, load };
