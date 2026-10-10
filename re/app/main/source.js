const require_rolldown_runtime = require("./rolldown-runtime.js");
let node_child_process = require("node:child_process");
let node_path = require("node:path");
node_path = require_rolldown_runtime.__toESM(node_path, 1);
let node_fs_promises = require("node:fs/promises");
let node_util = require("node:util");
let node_url = require("node:url");
let node_process = require("node:process");
node_process = require_rolldown_runtime.__toESM(node_process, 1);
let node_events = require("node:events");
let node_stream_promises = require("node:stream/promises");
//#region ../../node_modules/.pnpm/nano-spawn@0.2.1/node_modules/nano-spawn/source/context.js
var getContext = (raw) => ({
	start: node_process.default.hrtime.bigint(),
	command: raw.map((part) => getCommandPart((0, node_util.stripVTControlCharacters)(part))).join(" "),
	state: {
		stdout: "",
		stderr: "",
		output: ""
	}
});
var getCommandPart = (part) => /[^\w./-]/.test(part) ? `'${part.replaceAll("'", "'\\''")}'` : part;
//#endregion
//#region ../../node_modules/.pnpm/nano-spawn@0.2.1/node_modules/nano-spawn/source/options.js
var getOptions = ({ stdin, stdout, stderr, stdio = [
	stdin,
	stdout,
	stderr
], env: envOption, preferLocal, cwd: cwdOption = ".", ...options }) => {
	const cwd = cwdOption instanceof URL ? (0, node_url.fileURLToPath)(cwdOption) : node_path.default.resolve(cwdOption);
	const env = envOption ? {
		...node_process.default.env,
		...envOption
	} : void 0;
	const input = stdio[0]?.string;
	return {
		...options,
		input,
		stdio: input === void 0 ? stdio : ["pipe", ...stdio.slice(1)],
		env: preferLocal ? addLocalPath(env ?? node_process.default.env, cwd) : env,
		cwd
	};
};
var addLocalPath = ({ Path = "", PATH = Path, ...env }, cwd) => {
	const pathParts = PATH.split(node_path.default.delimiter);
	const localPaths = getLocalPaths([], node_path.default.resolve(cwd)).map((localPath) => node_path.default.join(localPath, "node_modules/.bin")).filter((localPath) => !pathParts.includes(localPath));
	return {
		...env,
		PATH: [...localPaths, PATH].filter(Boolean).join(node_path.default.delimiter)
	};
};
var getLocalPaths = (localPaths, localPath) => localPaths.at(-1) === localPath ? localPaths : getLocalPaths([...localPaths, localPath], node_path.default.resolve(localPath, ".."));
//#endregion
//#region ../../node_modules/.pnpm/nano-spawn@0.2.1/node_modules/nano-spawn/source/windows.js
var applyForceShell = async (file, commandArguments, options) => await shouldForceShell(file, options) ? [
	escapeFile(file),
	commandArguments.map((argument) => escapeArgument(argument)),
	{
		...options,
		shell: true
	}
] : [
	file,
	commandArguments,
	options
];
var shouldForceShell = async (file, { shell, cwd, env = node_process.default.env }) => node_process.default.platform === "win32" && !shell && !await isExe(file, cwd, env);
var isExe = async (file, cwd, { Path = "", PATH = Path }) => exeExtensions.some((extension) => file.toLowerCase().endsWith(extension)) || (EXE_MEMO[`${file}\0${cwd}\0${PATH}`] ??= await mIsExe(file, cwd, PATH));
var EXE_MEMO = {};
var mIsExe = async (file, cwd, PATH) => {
	const parts = PATH.split(node_path.default.delimiter).filter(Boolean).map((part) => part.replace(/^"(.*)"$/, "$1"));
	try {
		await Promise.all(exeExtensions.flatMap((extension) => [cwd, ...parts].map((part) => `${node_path.default.resolve(part, file)}${extension}`)).map(async (possibleFile) => {
			try {
				await (0, node_fs_promises.stat)(possibleFile);
			} catch {
				return;
			}
			throw 0;
		}));
	} catch {
		return true;
	}
	return false;
};
var exeExtensions = [".exe", ".com"];
var escapeArgument = (argument) => escapeFile(escapeFile(`"${argument.replaceAll(/(\\*)"/g, "$1$1\\\"").replace(/(\\*)$/, "$1$1")}"`));
var escapeFile = (file) => file.replaceAll(/([()\][%!^"`<>&|;, *?])/g, "^$1");
//#endregion
//#region ../../node_modules/.pnpm/nano-spawn@0.2.1/node_modules/nano-spawn/source/result.js
var getResult = async (nodeChildProcess, { input }, context) => {
	const instance = await nodeChildProcess;
	if (input !== void 0) instance.stdin.end(input);
	const onClose = (0, node_events.once)(instance, "close");
	try {
		await Promise.race([onClose, ...instance.stdio.filter(Boolean).map((stream) => onStreamError(stream))]);
		checkFailure(context, getErrorOutput(instance));
		return getOutputs(context);
	} catch (error) {
		await Promise.allSettled([onClose]);
		throw getResultError(error, instance, context);
	}
};
var onStreamError = async (stream) => {
	for await (const [error] of (0, node_events.on)(stream, "error")) if (!["ERR_STREAM_PREMATURE_CLOSE", "EPIPE"].includes(error?.code)) throw error;
};
var checkFailure = ({ command }, { exitCode, signalName }) => {
	if (signalName !== void 0) throw new SubprocessError(`Command was terminated with ${signalName}: ${command}`);
	if (exitCode !== void 0) throw new SubprocessError(`Command failed with exit code ${exitCode}: ${command}`);
};
var getResultError = (error, instance, context) => Object.assign(getErrorInstance(error, context), getErrorOutput(instance), getOutputs(context));
var getErrorInstance = (error, { command }) => error instanceof SubprocessError ? error : new SubprocessError(`Command failed: ${command}`, { cause: error });
var SubprocessError = class extends Error {
	name = "SubprocessError";
};
var getErrorOutput = ({ exitCode, signalCode }) => ({
	...exitCode < 1 ? {} : { exitCode },
	...signalCode === null ? {} : { signalName: signalCode }
});
var getOutputs = ({ state: { stdout, stderr, output }, command, start }) => ({
	stdout: getOutput(stdout),
	stderr: getOutput(stderr),
	output: getOutput(output),
	command,
	durationMs: Number(node_process.default.hrtime.bigint() - start) / 1e6
});
var getOutput = (output) => output.at(-1) === "\n" ? output.slice(0, output.at(-2) === "\r" ? -2 : -1) : output;
//#endregion
//#region ../../node_modules/.pnpm/nano-spawn@0.2.1/node_modules/nano-spawn/source/spawn.js
var spawnSubprocess = async (file, commandArguments, options, context) => {
	try {
		[file, commandArguments] = ["node", "node.exe"].includes(file.toLowerCase()) ? [node_process.default.execPath, [...node_process.default.execArgv.filter((flag) => !flag.startsWith("--inspect")), ...commandArguments]] : [file, commandArguments];
		[file, commandArguments, options] = await applyForceShell(file, commandArguments, options);
		[file, commandArguments, options] = concatenateShell(file, commandArguments, options);
		const instance = (0, node_child_process.spawn)(file, commandArguments, options);
		bufferOutput(instance.stdout, context, "stdout");
		bufferOutput(instance.stderr, context, "stderr");
		instance.once("error", () => {});
		await (0, node_events.once)(instance, "spawn");
		return instance;
	} catch (error) {
		throw getResultError(error, {}, context);
	}
};
var concatenateShell = (file, commandArguments, options) => options.shell && commandArguments.length > 0 ? [
	[file, ...commandArguments].join(" "),
	[],
	options
] : [
	file,
	commandArguments,
	options
];
var bufferOutput = (stream, { state }, streamName) => {
	if (stream) {
		stream.setEncoding("utf8");
		if (!state.isIterating) {
			state.isIterating = false;
			stream.on("data", (chunk) => {
				state[streamName] += chunk;
				state.output += chunk;
			});
		}
	}
};
//#endregion
//#region ../../node_modules/.pnpm/nano-spawn@0.2.1/node_modules/nano-spawn/source/pipe.js
var handlePipe = async (subprocesses) => {
	const [[from, to]] = await Promise.all([Promise.allSettled(subprocesses), pipeStreams(subprocesses)]);
	if (to.reason) {
		to.reason.pipedFrom = from.reason ?? from.value;
		throw to.reason;
	}
	if (from.reason) throw from.reason;
	return {
		...to.value,
		pipedFrom: from.value
	};
};
var pipeStreams = async (subprocesses) => {
	try {
		const [{ stdout }, { stdin }] = await Promise.all(subprocesses.map(({ nodeChildProcess }) => nodeChildProcess));
		if (stdin === null) throw new Error("The \"stdin\" option must be set on the first \"spawn()\" call in the pipeline.");
		if (stdout === null) throw new Error("The \"stdout\" option must be set on the last \"spawn()\" call in the pipeline.");
		(0, node_stream_promises.pipeline)(stdout, stdin).catch(() => {});
	} catch (error) {
		await Promise.allSettled(subprocesses.map(({ nodeChildProcess }) => closeStdin(nodeChildProcess)));
		throw error;
	}
};
var closeStdin = async (nodeChildProcess) => {
	const { stdin } = await nodeChildProcess;
	stdin.end();
};
//#endregion
//#region ../../node_modules/.pnpm/nano-spawn@0.2.1/node_modules/nano-spawn/source/iterable.js
var lineIterator = async function* (subprocess, { state }, streamName) {
	if (state.isIterating === false) throw new Error(`The subprocess must be iterated right away, for example:
	for await (const line of spawn(...)) { ... }`);
	state.isIterating = true;
	try {
		const { [streamName]: stream } = await subprocess.nodeChildProcess;
		if (!stream) return;
		let buffer = "";
		for await (const chunk of stream.iterator({ destroyOnReturn: false })) {
			const lines = `${buffer}${chunk}`.split(/\r?\n/);
			buffer = lines.pop();
			yield* lines;
		}
		if (buffer) yield buffer;
	} finally {
		await subprocess;
	}
};
var combineAsyncIterators = async function* (...iterators) {
	try {
		let promises = [];
		while (iterators.length > 0) {
			promises = iterators.map((iterator, index) => promises[index] ?? getNext(iterator));
			const [{ value, done }, index] = await Promise.race(promises.map((promise, index) => Promise.all([promise, index])));
			const [iterator] = iterators.splice(index, 1);
			promises.splice(index, 1);
			if (!done) {
				iterators.push(iterator);
				yield value;
			}
		}
	} finally {
		await Promise.all(iterators.map((iterator) => iterator.return()));
	}
};
var getNext = async (iterator) => {
	try {
		return await iterator.next();
	} catch (error) {
		await iterator.throw(error);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/nano-spawn@0.2.1/node_modules/nano-spawn/source/index.js
function spawn(file, second, third, previous) {
	const [commandArguments = [], options = {}] = Array.isArray(second) ? [second, third] : [[], second];
	const context = getContext([file, ...commandArguments]);
	const spawnOptions = getOptions(options);
	const nodeChildProcess = spawnSubprocess(file, commandArguments, spawnOptions, context);
	let subprocess = getResult(nodeChildProcess, spawnOptions, context);
	Object.assign(subprocess, { nodeChildProcess });
	subprocess = previous ? handlePipe([previous, subprocess]) : subprocess;
	const stdout = lineIterator(subprocess, context, "stdout");
	const stderr = lineIterator(subprocess, context, "stderr");
	return Object.assign(subprocess, {
		nodeChildProcess,
		stdout,
		stderr,
		[Symbol.asyncIterator]: () => combineAsyncIterators(stdout, stderr),
		pipe: (file, second, third) => spawn(file, second, third, subprocess)
	});
}
//#endregion
exports.default = spawn;
