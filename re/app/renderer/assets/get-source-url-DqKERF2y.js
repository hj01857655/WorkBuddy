import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../packages/agent-ui/src/utils/get-source-url.ts
var getSourceUrl;
var init_get_source_url = __esmMin((() => {
	getSourceUrl = (smhHost, shareCode, inode, accessToken) => {
		return `${`${smhHost}/api/v1/share/file`}/${`${encodeURIComponent(shareCode)}/${encodeURIComponent(inode)}`}?download&access_token=${encodeURIComponent(accessToken)}`;
	};
}));
//#endregion
export { init_get_source_url as n, getSourceUrl as t };
