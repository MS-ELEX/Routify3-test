export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	_: {
		mime: {".png":"image/png"},
		entry: {"file":"start-ece38119.js","js":["start-ece38119.js","chunks/vendor-78f63506.js","chunks/preload-helper-ec9aa979.js"],"css":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				pattern: /^(?:\/(.*))?\/?$/,
				params: (m) => ({ index: m[1] || ''}),
				path: null,
				a: [0,2],
				b: [1]
			}
		]
	}
};
