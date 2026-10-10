const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_code_cache = require("./code-cache.js");
const require_log_acl_guard = require("./log-acl-guard.js");
const require_desktop_monitor_service = require("./desktop-monitor-service.js");
const require_index = require("./index.js");
let node_child_process = require("node:child_process");
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path);
let node_util = require("node:util");
//#region src/main/system/repair/office-file-association-repair.ts
require_desktop_monitor_service.init_app_instance();
var LSREGISTER_PATH = "/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister";
var REPAIR_MARKER_KEY = "officeFileAssociationsRepairMarker";
var REPAIR_SCHEMA_VERSION = 3;
var WINDOWS_MARKDOWN_EXTENSIONS = /* @__PURE__ */ new Set(["md", "markdown"]);
var WINDOWS_FILE_ICON_BY_EXTENSION = {
	doc: "doc",
	docx: "docx",
	xls: "xls",
	xlsx: "xlsx",
	ppt: "ppt",
	pptx: "pptx",
	md: "md",
	markdown: "md"
};
function normalizedExtensions(extensions) {
	return [...new Set(extensions.map((extension) => extension.trim().replace(/^\./, "").toLowerCase()).filter(Boolean))].sort();
}
/** 从 Electron 可执行文件路径提取最外层主应用 bundle。 */
function resolveMacAppBundlePath(executablePath) {
	return executablePath.match(/^(.+?\.app)(?:\/|$)/)?.[1];
}
/**
* 生成不会改写用户默认应用的启动期修复计划。
*
* macOS 仅让 LaunchServices 重新索引包内既有声明；Windows 为全部白名单补
* 候选应用，仅给 Markdown 写低于 UserChoice 的回退默认，绝不写 UserChoice。
*/
function buildOfficeFileAssociationRepairPlan(input) {
	const extensions = normalizedExtensions(input.extensions);
	const marker = [
		`v${REPAIR_SCHEMA_VERSION}`,
		input.platform,
		input.appVersion,
		input.executablePath,
		input.registeredApplicationName ?? "",
		extensions.join(",")
	].join(":");
	if (input.platform === "darwin") {
		const bundlePath = resolveMacAppBundlePath(input.executablePath);
		return {
			marker,
			commands: bundlePath ? [{
				file: LSREGISTER_PATH,
				args: ["-f", bundlePath],
				timeoutMs: 15e3
			}] : [],
			...!bundlePath ? { boundary: "unsupported-platform" } : {}
		};
	}
	if (input.platform === "win32") {
		const executableName = node_path.win32.basename(input.executablePath);
		const applicationKey = `HKCU\\Software\\Classes\\Applications\\${executableName}`;
		const registeredApplicationName = input.registeredApplicationName?.trim() || input.productName.trim() || node_path.win32.basename(input.executablePath, node_path.win32.extname(input.executablePath));
		const progIdBase = registeredApplicationName.replace(/[^A-Za-z0-9.]/g, "") || executableName.replace(/[^A-Za-z0-9.]/g, "") || "DesktopApp";
		const genericProgId = `${progIdBase}.OfficeDocument`;
		const capabilitiesProgId = `${progIdBase}.Capabilities`;
		const capabilitiesKey = `HKCU\\Software\\Classes\\${capabilitiesProgId}`;
		const openCommand = `"${input.executablePath}" "%1"`;
		const commands = [
			{
				file: "reg.exe",
				args: [
					"ADD",
					`${applicationKey}\\shell\\open\\command`,
					"/ve",
					"/t",
					"REG_SZ",
					"/d",
					openCommand,
					"/f"
				],
				timeoutMs: 5e3
			},
			{
				file: "reg.exe",
				args: [
					"ADD",
					capabilitiesKey,
					"/v",
					"ApplicationName",
					"/t",
					"REG_SZ",
					"/d",
					registeredApplicationName,
					"/f"
				],
				timeoutMs: 5e3
			},
			{
				file: "reg.exe",
				args: [
					"ADD",
					capabilitiesKey,
					"/v",
					"ApplicationDescription",
					"/t",
					"REG_SZ",
					"/d",
					registeredApplicationName,
					"/f"
				],
				timeoutMs: 5e3
			},
			{
				file: "reg.exe",
				args: [
					"ADD",
					"HKCU\\Software\\RegisteredApplications",
					"/v",
					registeredApplicationName,
					"/t",
					"REG_SZ",
					"/d",
					`Software\\Classes\\${capabilitiesProgId}`,
					"/f"
				],
				timeoutMs: 5e3
			}
		];
		const registeredProgIds = /* @__PURE__ */ new Set();
		for (const extension of extensions) {
			const dottedExtension = `.${extension}`;
			const iconName = WINDOWS_FILE_ICON_BY_EXTENSION[extension];
			const progId = iconName ? `${progIdBase}.${extension}` : genericProgId;
			const progIdKey = `HKCU\\Software\\Classes\\${progId}`;
			const isMarkdown = WINDOWS_MARKDOWN_EXTENSIONS.has(extension);
			if (!registeredProgIds.has(progId)) {
				registeredProgIds.add(progId);
				const defaultIcon = iconName ? `"${node_path.win32.join(node_path.win32.dirname(input.executablePath), "resources", "file-icons", `${iconName}.ico`)}",0` : `"${input.executablePath}",0`;
				commands.push({
					file: "reg.exe",
					args: [
						"ADD",
						progIdKey,
						"/ve",
						"/t",
						"REG_SZ",
						"/d",
						`${input.productName} Document`,
						"/f"
					],
					timeoutMs: 5e3
				}, {
					file: "reg.exe",
					args: [
						"ADD",
						`${progIdKey}\\DefaultIcon`,
						"/ve",
						"/t",
						"REG_SZ",
						"/d",
						defaultIcon,
						"/f"
					],
					timeoutMs: 5e3
				}, {
					file: "reg.exe",
					args: [
						"ADD",
						`${progIdKey}\\shell\\open\\command`,
						"/ve",
						"/t",
						"REG_SZ",
						"/d",
						openCommand,
						"/f"
					],
					timeoutMs: 5e3
				});
			}
			commands.push({
				file: "reg.exe",
				args: [
					"ADD",
					`${applicationKey}\\SupportedTypes`,
					"/v",
					dottedExtension,
					"/t",
					"REG_SZ",
					"/d",
					"",
					"/f"
				],
				timeoutMs: 5e3
			}, {
				file: "reg.exe",
				args: [
					"ADD",
					`HKCU\\Software\\Classes\\${dottedExtension}\\OpenWithProgids`,
					"/v",
					progId,
					"/t",
					"REG_SZ",
					"/d",
					"",
					"/f"
				],
				timeoutMs: 5e3
			}, {
				file: "reg.exe",
				args: [
					"ADD",
					`${capabilitiesKey}\\FileAssociations`,
					"/v",
					dottedExtension,
					"/t",
					"REG_SZ",
					"/d",
					progId,
					"/f"
				],
				timeoutMs: 5e3
			});
			if (isMarkdown) commands.push({
				file: "reg.exe",
				args: [
					"ADD",
					`HKCU\\Software\\Classes\\${dottedExtension}`,
					"/ve",
					"/t",
					"REG_SZ",
					"/d",
					progId,
					"/f"
				],
				timeoutMs: 5e3
			});
		}
		return {
			marker,
			commands
		};
	}
	if (input.platform === "linux") return {
		marker,
		commands: [],
		boundary: "linux-static-registration-only"
	};
	return {
		marker,
		commands: [],
		boundary: "unsupported-platform"
	};
}
async function executeOfficeFileAssociationCommands(commands, runCommand) {
	let succeeded = 0;
	const failures = [];
	for (const command of commands) try {
		await runCommand(command.file, command.args, command.timeoutMs);
		succeeded++;
	} catch (error) {
		failures.push({
			command,
			error
		});
	}
	return {
		succeeded,
		failures
	};
}
async function repairOfficeFileAssociationsOnce(input, deps) {
	if (!input.isPackaged) return "skipped-development";
	const plan = buildOfficeFileAssociationRepairPlan(input);
	if (plan.boundary) return "skipped-platform";
	if (await deps.readMarker() === plan.marker) return "skipped-current";
	const result = await deps.execute(plan.commands);
	for (const failure of result.failures) require_log_acl_guard.mainLog.warn("[OfficeFileAssociationRepair] command failed:", failure.command.file, String(failure.error));
	if (result.failures.length === 0) await deps.writeMarker(plan.marker);
	return "attempted";
}
var execFileAsync = (0, node_util.promisify)(node_child_process.execFile);
async function runPackagedOfficeFileAssociationRepair(input) {
	const settingsStore = require_log_acl_guard.createSettingsStore({
		settingsPath: node_path.join(require_code_cache.getWorkbuddyConfigDir(), "settings.json"),
		logger: require_log_acl_guard.mainLog
	});
	await repairOfficeFileAssociationsOnce({
		...input,
		extensions: require_index.OFFICE_OS_OPEN_EXTENSIONS
	}, {
		readMarker: async () => {
			const marker = (await settingsStore.read())?.[REPAIR_MARKER_KEY];
			return typeof marker === "string" ? marker : void 0;
		},
		writeMarker: async (marker) => {
			await settingsStore.update((current) => ({
				...current ?? {},
				[REPAIR_MARKER_KEY]: marker
			}));
		},
		execute: (commands) => executeOfficeFileAssociationCommands(commands, async (file, args, timeoutMs) => {
			await execFileAsync(file, [...args], { timeout: timeoutMs });
		})
	});
}
//#endregion
exports.runPackagedOfficeFileAssociationRepair = runPackagedOfficeFileAssociationRepair;
