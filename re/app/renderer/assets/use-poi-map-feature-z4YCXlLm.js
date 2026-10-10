import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { E as init_contexts, no as init_city_tree, ro as setCityTreeUrl, z3 as AdapterContext } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../packages/agent-ui/src/hooks/use-poi-map-feature.ts
/**
* 获取 POI 地图服务功能是否可用
*
* @returns true 表示功能已开启；false 表示未开启（默认）或被 PoiMap 开关关闭
*/
function usePoiMapFeature() {
	const adapter = (0, import_react.useContext)(AdapterContext);
	const [enabled, setEnabled] = (0, import_react.useState)(cachedPoiMapEnabled);
	(0, import_react.useEffect)(() => {
		if (!adapter?.onProductConfigChanged && !adapter?.getProductFeatures) return;
		const handleFeature = (features) => {
			if (!features) return;
			const nextEnabled = features.PoiMap === true;
			cachedPoiMapEnabled = nextEnabled;
			setEnabled(nextEnabled);
		};
		let unsubscribe;
		if (adapter.onProductConfigChanged) unsubscribe = adapter.onProductConfigChanged((params) => {
			handleFeature(params?.productFeatures);
		});
		if (adapter.getProductFeatures) adapter.getProductFeatures().then((features) => {
			handleFeature(features);
		});
		if (adapter.getProductLinks) adapter.getProductLinks().then((links) => {
			if (links?.poiCityTreeUrl) setCityTreeUrl(links.poiCityTreeUrl);
		}).catch(() => {});
		return () => {
			if (unsubscribe) unsubscribe();
		};
	}, [adapter]);
	return enabled;
}
var import_react, cachedPoiMapEnabled;
var init_use_poi_map_feature = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_contexts();
	init_city_tree();
	cachedPoiMapEnabled = false;
}));
//#endregion
export { usePoiMapFeature as n, init_use_poi_map_feature as t };
