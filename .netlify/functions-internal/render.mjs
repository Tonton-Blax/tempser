import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	assets: new Set([".DS_Store","404.png","assets/cross_primary.svg","cahier-des-charges.pdf","cross_primary.svg","devis.pdf","favicon.png","pres/budget.svg","pres/cd.png","pres/cdn.png","pres/cerfa_11770-03.pdf","pres/digital-workspace.png","pres/directus.svg","pres/droits.jpg","pres/max.webp","pres/pwa.png","pres/refs/cd.png","pres/refs/icimacity.jpg","pres/refs/oudot-scroll.jpg","pres/refs/oudot.jpg","pres/refs/plx-users-01.jpg","pres/refs/plx-users-02.jpg","pres/refs/plx-users-03.jpg","pres/refs/polyexpert.jpg","pres/refs/red-editions.jpg","pres/refs/rouge.jpg","pres/refs/world.png","pres/s3.png","pres/schema-big.png","pres/schema-small.png","servair-couv.jpg","servair.png","sigle-servair.png","world.webp"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".pdf":"application/pdf",".jpg":"image/jpeg",".webp":"image/webp"},
	_: {
		entry: {"file":"_app/immutable/start-53b7beb3.js","imports":["_app/immutable/start-53b7beb3.js","_app/immutable/chunks/preload-helper-aa6bc0ce.js","_app/immutable/chunks/index-29000174.js","_app/immutable/chunks/singletons-4952f98b.js"],"stylesheets":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js')
		],
		routes: [
			{
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
