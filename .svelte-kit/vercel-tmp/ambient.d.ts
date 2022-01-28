declare module '../output/server/app.js' {
	import { App } from '@sveltejs/kit';
	export { App };
}

declare module './manifest.js' {
	import { SSRManifest } from '@sveltejs/kit';
	export const manifest: SSRManifest;
}
