import { c as create_ssr_component, b as subscribe, h as each, j as add_attribute, e as escape } from "./index-1abd510b.js";
import "./_...index_-1b88065c.js";
import { m as meta, u as url } from "./index-e25a1ff5.js";
var _module_svelte_svelte_type_style_lang = "";
const css = {
  code: ".page.svelte-afpsxq{position:relative}",
  map: null
};
const Module = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $meta, $$unsubscribe_meta;
  let $url, $$unsubscribe_url;
  $$unsubscribe_meta = subscribe(meta, (value) => $meta = value);
  $$unsubscribe_url = subscribe(url, (value) => $url = value);
  $$result.css.add(css);
  $$unsubscribe_meta();
  $$unsubscribe_url();
  return `<div class="${"page svelte-afpsxq"}"><h1>projects</h1>
    <ul class="${"projects"}">${each($meta.repos, (repo) => {
    return `<div><h3><a${add_attribute("href", $url("./[project]", { project: repo.data.name }), 0)}>${escape(repo.data.name)}</a>
                    <p>${escape(repo.data.description || "")}
                    </p></h3>
            </div>`;
  })}</ul>
    ${slots.default ? slots.default({}) : ``}
</div>`;
});
export { Module as default };
