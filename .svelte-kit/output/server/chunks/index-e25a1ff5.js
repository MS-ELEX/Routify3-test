import { b as contexts, d as derived, p as populateUrl, e as pathAndParamsToUrl } from "./_...index_-1b88065c.js";
import { g as get_store_value } from "./index-1abd510b.js";
const getMRCA = (node1, node2) => {
  const lineage1 = [node1, ...node1.ancestors];
  const lineage2 = [node2, ...node2.ancestors];
  return lineage1.find((node3) => lineage2.includes(node3));
};
const getPath = (node1, node2) => {
  const lineage1 = [node1, ...node1.ancestors];
  const lineage2 = [node2, ...node2.ancestors];
  const mrca = getMRCA(node1, node2);
  const backtrackSteps = lineage1.indexOf(mrca);
  const backtrackStr = backtrackSteps ? "../".repeat(backtrackSteps) : "";
  const forwardSteps = lineage2.indexOf(mrca);
  const forwardStepsStr = lineage2.slice(0, forwardSteps).reverse().map((n) => n.name).join("/");
  return backtrackStr + forwardStepsStr;
};
const url = {
  subscribe: (run, invalidate) => {
    const { router } = contexts;
    const originalOriginNode = contexts.fragment.node;
    return derived(router.activeRoute, (activeRoute) => {
      const originNode = router.rootNode.traverse(originalOriginNode.path);
      return (inputPath, userParams = {}) => {
        const offset = inputPath.startsWith("/") ? router.rootNode.path : "";
        const targetNode = originNode.traverse(offset + inputPath);
        if (!targetNode) {
          console.error("could not find destination node", inputPath);
          return;
        }
        const mrca = getMRCA(targetNode, router.rootNode);
        const path = "/" + getPath(mrca, targetNode);
        const params = {
          ...inheritedParams(targetNode, activeRoute),
          ...userParams
        };
        const internalUrl = populateUrl(path, params, activeRoute);
        return router.getExternalUrl(internalUrl);
      };
    }).subscribe(run, invalidate);
  }
};
const inheritedParams = (node2, route) => {
  const lineage = [node2, ...node2.ancestors].reverse();
  const params = lineage.map((_node) => route.allFragments.find((fragment) => fragment.node === _node || fragment.node.path === _node.path)?.params);
  return Object.assign({}, ...params);
};
const isActive = {
  subscribe: (run, invalidate) => derived(contexts.router.activeRoute, isActiveRoute).subscribe(run, invalidate)
};
const isActiveRoute = ($route) => isActiveUrl($route.url);
const isActiveUrl = (url2) => (path, params, options = {}) => {
  const { recursive } = { recursive: true, ...options };
  path = pathAndParamsToUrl(path, params, (x) => "");
  if (recursive)
    path = path.replace(/\/index\/?$/, "");
  return (url2 + "/").startsWith(path + "/");
};
const pseudoStore = (callback) => ({
  subscribe: (run) => {
    run(callback());
    return () => {
    };
  }
});
const context = pseudoStore(() => contexts.fragment);
const node = pseudoStore(() => get_store_value(context).node);
const meta = pseudoStore(() => get_store_value(node).meta);
const pendingRoute = {
  subscribe: (run) => contexts.router.pendingRoute.subscribe(run)
};
export { context as c, isActive as i, meta as m, node as n, pendingRoute as p, url as u };
