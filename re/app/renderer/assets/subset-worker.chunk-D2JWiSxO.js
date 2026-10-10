import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
import { Y as init_chunk_SRAX5OIU } from "./excalidraw-preview-component-DXgf6_pG.js";
import { a as init_chunk_EIO257PC, n as CB, r as NQ } from "./chunk-EIO257PC-DS31mUg-.js";
//#region ../../node_modules/.pnpm/@excalidraw+excalidraw@0.18_b405f991ba332bfb83462b13a131b095/node_modules/@excalidraw/excalidraw/dist/prod/subset-worker.chunk.js
var s;
//#endregion
__esmMin((() => {
	init_chunk_EIO257PC();
	init_chunk_SRAX5OIU();
	s = import.meta.url ? new URL(import.meta.url) : void 0;
	typeof window > "u" && typeof self < "u" && (self.onmessage = async (e) => {
		switch (e.data.command) {
			case CB.Subset:
				let a = await NQ(e.data.arrayBuffer, e.data.codePoints);
				self.postMessage(a, { transfer: [a] });
		}
	});
}))();
export { s as WorkerUrl };
