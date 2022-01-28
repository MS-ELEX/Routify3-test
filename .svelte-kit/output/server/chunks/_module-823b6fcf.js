import { c as create_ssr_component, b as subscribe, v as validate_component, e as escape, h as each } from "./index-1abd510b.js";
import { C as Component, c as createRouter, I as InternalReflector, a as clone, R as Router_1 } from "./_...index_-1b88065c.js";
import { c as context } from "./index-e25a1ff5.js";
import Navigation from "./_navigation-fb8adec4.js";
import Loader from "./_loader-fce8554a.js";
const Nested = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $context, $$unsubscribe_context;
  $$unsubscribe_context = subscribe(context, (value) => $context = value);
  let { fragments } = $$props;
  fragments = fragments || $context.route.fragments.slice(1);
  if ($$props.fragments === void 0 && $$bindings.fragments && fragments !== void 0)
    $$bindings.fragments(fragments);
  $$unsubscribe_context();
  return `${validate_component(Component, "Component").$$render($$result, { fragments }, {}, {})}`;
});
const InlineNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeRoute, $$unsubscribe_activeRoute;
  let $context, $$unsubscribe_context;
  $$unsubscribe_context = subscribe(context, (value) => $context = value);
  let { parentNode = null } = $$props;
  let { singlePage = null } = $$props;
  const { route, node } = $context;
  const { activeRoute } = route.router;
  $$unsubscribe_activeRoute = subscribe(activeRoute, (value) => $activeRoute = value);
  let payload;
  singlePage = singlePage || typeof window === "undefined";
  parentNode = parentNode || node;
  const isActiveNode = (node2) => $activeRoute.allFragments.find((ar) => ar.node === node2);
  const createRouterCmp = (router) => {
    return function(opts) {
      opts.props = { ...opts.props, router };
      return new Router_1(opts);
    };
  };
  const transformFragments = (fragments) => {
    const cutoff = fragments.findIndex((fragment) => fragment.node.level > parentNode.level);
    return fragments.slice(cutoff);
  };
  const routers = parentNode.pages.map((n) => ({
    rootNode: n,
    router: createRouter({
      transformFragments,
      passthrough: true,
      urlReflector: InternalReflector,
      url: n.path,
      name: n.name
    })
  }));
  const refresh = ($activeRoute2) => {
    const activeSubRouter = routers.find((router) => isActiveNode(router.rootNode));
    const clonedRoute = clone($activeRoute2, { router: activeSubRouter.router });
    activeSubRouter.router.activeRoute.set(clonedRoute);
    payload = {
      index: singlePage ? 0 : routers.indexOf(activeSubRouter),
      pages: !singlePage ? routers.map((page) => ({
        Page: createRouterCmp(page.router),
        router: page.router
      })) : [{ Page: Nested }],
      inBrowser: !singlePage
    };
  };
  if ($$props.parentNode === void 0 && $$bindings.parentNode && parentNode !== void 0)
    $$bindings.parentNode(parentNode);
  if ($$props.singlePage === void 0 && $$bindings.singlePage && singlePage !== void 0)
    $$bindings.singlePage(singlePage);
  {
    refresh($activeRoute);
  }
  $$unsubscribe_activeRoute();
  $$unsubscribe_context();
  return `${!singlePage ? `<div style="${"display: contents"}">${slots.default ? slots.default({ ...payload }) : ``}</div>` : `${slots.default ? slots.default({ ...payload }) : ``}`}`;
});
var _module_svelte_svelte_type_style_lang = "";
const css = {
  code: "*{max-height:100%}html,body{overflow:hidden}.container.svelte-1drhydj{transition:transform 0.3s;transform:translateX(calc(-100% * var(--page-index)));display:flex;padding:0 40px}.page.svelte-1drhydj{flex:0 0 100%;margin-right:80px;max-height:calc(100vh - 100px);overflow-y:auto}",
  map: null
};
const Module = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}
${validate_component(InlineNav, "InlineNav").$$render($$result, {}, {}, {
    default: ({ pages, index }) => {
      return `${validate_component(Navigation, "Navigation").$$render($$result, { pages }, {}, {})}
    <div class="${"container svelte-1drhydj"}" style="${"--page-index: " + escape(index)}">${each(pages, ({ Page, router }) => {
        return `<div class="${"page svelte-1drhydj"}">${validate_component(Page, "Page").$$render($$result, {}, {}, {})}
            </div>`;
      })}</div>`;
    }
  })}`;
});
export { Module as default };
