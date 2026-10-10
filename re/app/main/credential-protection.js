const require_rolldown_runtime = require("./rolldown-runtime.js");
const require_process_cpu_sampler = require("./process-cpu-sampler.js");
let node_fs = require("node:fs");
node_fs = require_rolldown_runtime.__toESM(node_fs);
let node_path = require("node:path");
require_rolldown_runtime.__toESM(node_path, 1);
node_path = require_rolldown_runtime.__toESM(node_path);
require("node:fs/promises");
let node_crypto = require("node:crypto");
let node_util = require("node:util");
//#region ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js
var require_polyfills = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	var constants = require("constants");
	var origCwd = process.cwd;
	var cwd = null;
	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		if (!cwd) cwd = origCwd.call(process);
		return cwd;
	};
	try {
		process.cwd();
	} catch (er) {}
	if (typeof process.chdir === "function") {
		var chdir = process.chdir;
		process.chdir = function(d) {
			cwd = null;
			chdir.call(process, d);
		};
		if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
	}
	module.exports = patch;
	function patch(fs) {
		if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) patchLchmod(fs);
		if (!fs.lutimes) patchLutimes(fs);
		fs.chown = chownFix(fs.chown);
		fs.fchown = chownFix(fs.fchown);
		fs.lchown = chownFix(fs.lchown);
		fs.chmod = chmodFix(fs.chmod);
		fs.fchmod = chmodFix(fs.fchmod);
		fs.lchmod = chmodFix(fs.lchmod);
		fs.chownSync = chownFixSync(fs.chownSync);
		fs.fchownSync = chownFixSync(fs.fchownSync);
		fs.lchownSync = chownFixSync(fs.lchownSync);
		fs.chmodSync = chmodFixSync(fs.chmodSync);
		fs.fchmodSync = chmodFixSync(fs.fchmodSync);
		fs.lchmodSync = chmodFixSync(fs.lchmodSync);
		fs.stat = statFix(fs.stat);
		fs.fstat = statFix(fs.fstat);
		fs.lstat = statFix(fs.lstat);
		fs.statSync = statFixSync(fs.statSync);
		fs.fstatSync = statFixSync(fs.fstatSync);
		fs.lstatSync = statFixSync(fs.lstatSync);
		if (fs.chmod && !fs.lchmod) {
			fs.lchmod = function(path, mode, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchmodSync = function() {};
		}
		if (fs.chown && !fs.lchown) {
			fs.lchown = function(path, uid, gid, cb) {
				if (cb) process.nextTick(cb);
			};
			fs.lchownSync = function() {};
		}
		if (platform === "win32") fs.rename = typeof fs.rename !== "function" ? fs.rename : (function(fs$rename) {
			function rename(from, to, cb) {
				var start = Date.now();
				var backoff = 0;
				fs$rename(from, to, function CB(er) {
					if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
						setTimeout(function() {
							fs.stat(to, function(stater, st) {
								if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);
								else cb(er);
							});
						}, backoff);
						if (backoff < 100) backoff += 10;
						return;
					}
					if (cb) cb(er);
				});
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
			return rename;
		})(fs.rename);
		fs.read = typeof fs.read !== "function" ? fs.read : (function(fs$read) {
			function read(fd, buffer, offset, length, position, callback_) {
				var callback;
				if (callback_ && typeof callback_ === "function") {
					var eagCounter = 0;
					callback = function(er, _, __) {
						if (er && er.code === "EAGAIN" && eagCounter < 10) {
							eagCounter++;
							return fs$read.call(fs, fd, buffer, offset, length, position, callback);
						}
						callback_.apply(this, arguments);
					};
				}
				return fs$read.call(fs, fd, buffer, offset, length, position, callback);
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
			return read;
		})(fs.read);
		fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : (function(fs$readSync) {
			return function(fd, buffer, offset, length, position) {
				var eagCounter = 0;
				while (true) try {
					return fs$readSync.call(fs, fd, buffer, offset, length, position);
				} catch (er) {
					if (er.code === "EAGAIN" && eagCounter < 10) {
						eagCounter++;
						continue;
					}
					throw er;
				}
			};
		})(fs.readSync);
		function patchLchmod(fs) {
			fs.lchmod = function(path, mode, callback) {
				fs.open(path, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
					if (err) {
						if (callback) callback(err);
						return;
					}
					fs.fchmod(fd, mode, function(err) {
						fs.close(fd, function(err2) {
							if (callback) callback(err || err2);
						});
					});
				});
			};
			fs.lchmodSync = function(path, mode) {
				var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
				var threw = true;
				var ret;
				try {
					ret = fs.fchmodSync(fd, mode);
					threw = false;
				} finally {
					if (threw) try {
						fs.closeSync(fd);
					} catch (er) {}
					else fs.closeSync(fd);
				}
				return ret;
			};
		}
		function patchLutimes(fs) {
			if (constants.hasOwnProperty("O_SYMLINK") && fs.futimes) {
				fs.lutimes = function(path, at, mt, cb) {
					fs.open(path, constants.O_SYMLINK, function(er, fd) {
						if (er) {
							if (cb) cb(er);
							return;
						}
						fs.futimes(fd, at, mt, function(er) {
							fs.close(fd, function(er2) {
								if (cb) cb(er || er2);
							});
						});
					});
				};
				fs.lutimesSync = function(path, at, mt) {
					var fd = fs.openSync(path, constants.O_SYMLINK);
					var ret;
					var threw = true;
					try {
						ret = fs.futimesSync(fd, at, mt);
						threw = false;
					} finally {
						if (threw) try {
							fs.closeSync(fd);
						} catch (er) {}
						else fs.closeSync(fd);
					}
					return ret;
				};
			} else if (fs.futimes) {
				fs.lutimes = function(_a, _b, _c, cb) {
					if (cb) process.nextTick(cb);
				};
				fs.lutimesSync = function() {};
			}
		}
		function chmodFix(orig) {
			if (!orig) return orig;
			return function(target, mode, cb) {
				return orig.call(fs, target, mode, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chmodFixSync(orig) {
			if (!orig) return orig;
			return function(target, mode) {
				try {
					return orig.call(fs, target, mode);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function chownFix(orig) {
			if (!orig) return orig;
			return function(target, uid, gid, cb) {
				return orig.call(fs, target, uid, gid, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chownFixSync(orig) {
			if (!orig) return orig;
			return function(target, uid, gid) {
				try {
					return orig.call(fs, target, uid, gid);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function statFix(orig) {
			if (!orig) return orig;
			return function(target, options, cb) {
				if (typeof options === "function") {
					cb = options;
					options = null;
				}
				function callback(er, stats) {
					if (stats) {
						if (stats.uid < 0) stats.uid += 4294967296;
						if (stats.gid < 0) stats.gid += 4294967296;
					}
					if (cb) cb.apply(this, arguments);
				}
				return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
			};
		}
		function statFixSync(orig) {
			if (!orig) return orig;
			return function(target, options) {
				var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
				if (stats) {
					if (stats.uid < 0) stats.uid += 4294967296;
					if (stats.gid < 0) stats.gid += 4294967296;
				}
				return stats;
			};
		}
		function chownErOk(er) {
			if (!er) return true;
			if (er.code === "ENOSYS") return true;
			if (!process.getuid || process.getuid() !== 0) {
				if (er.code === "EINVAL" || er.code === "EPERM") return true;
			}
			return false;
		}
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	var Stream = require("stream").Stream;
	module.exports = legacy;
	function legacy(fs) {
		return {
			ReadStream,
			WriteStream
		};
		function ReadStream(path, options) {
			if (!(this instanceof ReadStream)) return new ReadStream(path, options);
			Stream.call(this);
			var self = this;
			this.path = path;
			this.fd = null;
			this.readable = true;
			this.paused = false;
			this.flags = "r";
			this.mode = 438;
			this.bufferSize = 65536;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.encoding) this.setEncoding(this.encoding);
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if ("number" !== typeof this.end) throw TypeError("end must be a Number");
				if (this.start > this.end) throw new Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					self._read();
				});
				return;
			}
			fs.open(this.path, this.flags, this.mode, function(err, fd) {
				if (err) {
					self.emit("error", err);
					self.readable = false;
					return;
				}
				self.fd = fd;
				self.emit("open", fd);
				self._read();
			});
		}
		function WriteStream(path, options) {
			if (!(this instanceof WriteStream)) return new WriteStream(path, options);
			Stream.call(this);
			this.path = path;
			this.fd = null;
			this.writable = true;
			this.flags = "w";
			this.encoding = "binary";
			this.mode = 438;
			this.bytesWritten = 0;
			options = options || {};
			var keys = Object.keys(options);
			for (var index = 0, length = keys.length; index < length; index++) {
				var key = keys[index];
				this[key] = options[key];
			}
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.start < 0) throw new Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = false;
			this._queue = [];
			if (this.fd === null) {
				this._open = fs.open;
				this._queue.push([
					this._open,
					this.path,
					this.flags,
					this.mode,
					void 0
				]);
				this.flush();
			}
		}
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js
var require_clone = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	module.exports = clone;
	var getPrototypeOf = Object.getPrototypeOf || function(obj) {
		return obj.__proto__;
	};
	function clone(obj) {
		if (obj === null || typeof obj !== "object") return obj;
		if (obj instanceof Object) var copy = { __proto__: getPrototypeOf(obj) };
		else var copy = Object.create(null);
		Object.getOwnPropertyNames(obj).forEach(function(key) {
			Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
		});
		return copy;
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	var fs$3 = require("fs");
	var polyfills = require_polyfills();
	var legacy = require_legacy_streams();
	var clone = require_clone();
	var util = require("util");
	/* istanbul ignore next - node 0.x polyfill */
	var gracefulQueue;
	var previousSymbol;
	/* istanbul ignore else - node 0.x polyfill */
	if (typeof Symbol === "function" && typeof Symbol.for === "function") {
		gracefulQueue = Symbol.for("graceful-fs.queue");
		previousSymbol = Symbol.for("graceful-fs.previous");
	} else {
		gracefulQueue = "___graceful-fs.queue";
		previousSymbol = "___graceful-fs.previous";
	}
	function noop() {}
	function publishQueue(context, queue) {
		Object.defineProperty(context, gracefulQueue, { get: function() {
			return queue;
		} });
	}
	var debug = noop;
	if (util.debuglog) debug = util.debuglog("gfs4");
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) debug = function() {
		var m = util.format.apply(util, arguments);
		m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
		console.error(m);
	};
	if (!fs$3[gracefulQueue]) {
		publishQueue(fs$3, global[gracefulQueue] || []);
		fs$3.close = (function(fs$close) {
			function close(fd, cb) {
				return fs$close.call(fs$3, fd, function(err) {
					if (!err) resetQueue();
					if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
			Object.defineProperty(close, previousSymbol, { value: fs$close });
			return close;
		})(fs$3.close);
		fs$3.closeSync = (function(fs$closeSync) {
			function closeSync(fd) {
				fs$closeSync.apply(fs$3, arguments);
				resetQueue();
			}
			Object.defineProperty(closeSync, previousSymbol, { value: fs$closeSync });
			return closeSync;
		})(fs$3.closeSync);
		if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) process.on("exit", function() {
			debug(fs$3[gracefulQueue]);
			require("assert").equal(fs$3[gracefulQueue].length, 0);
		});
	}
	if (!global[gracefulQueue]) publishQueue(global, fs$3[gracefulQueue]);
	module.exports = patch(clone(fs$3));
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$3.__patched) {
		module.exports = patch(fs$3);
		fs$3.__patched = true;
	}
	function patch(fs) {
		polyfills(fs);
		fs.gracefulify = patch;
		fs.createReadStream = createReadStream;
		fs.createWriteStream = createWriteStream;
		var fs$readFile = fs.readFile;
		fs.readFile = readFile;
		function readFile(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$readFile(path, options, cb);
			function go$readFile(path, options, cb, startTime) {
				return fs$readFile(path, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readFile,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$writeFile = fs.writeFile;
		fs.writeFile = writeFile;
		function writeFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$writeFile(path, data, options, cb);
			function go$writeFile(path, data, options, cb, startTime) {
				return fs$writeFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$writeFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$appendFile = fs.appendFile;
		if (fs$appendFile) fs.appendFile = appendFile;
		function appendFile(path, data, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			return go$appendFile(path, data, options, cb);
			function go$appendFile(path, data, options, cb, startTime) {
				return fs$appendFile(path, data, options, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$appendFile,
						[
							path,
							data,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$copyFile = fs.copyFile;
		if (fs$copyFile) fs.copyFile = copyFile;
		function copyFile(src, dest, flags, cb) {
			if (typeof flags === "function") {
				cb = flags;
				flags = 0;
			}
			return go$copyFile(src, dest, flags, cb);
			function go$copyFile(src, dest, flags, cb, startTime) {
				return fs$copyFile(src, dest, flags, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$copyFile,
						[
							src,
							dest,
							flags,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		var fs$readdir = fs.readdir;
		fs.readdir = readdir;
		var noReaddirOptionVersions = /^v[0-5]\./;
		function readdir(path, options, cb) {
			if (typeof options === "function") cb = options, options = null;
			var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, fs$readdirCallback(path, options, cb, startTime));
			} : function go$readdir(path, options, cb, startTime) {
				return fs$readdir(path, options, fs$readdirCallback(path, options, cb, startTime));
			};
			return go$readdir(path, options, cb);
			function fs$readdirCallback(path, options, cb, startTime) {
				return function(err, files) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readdir,
						[
							path,
							options,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else {
						if (files && files.sort) files.sort();
						if (typeof cb === "function") cb.call(this, err, files);
					}
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var legStreams = legacy(fs);
			ReadStream = legStreams.ReadStream;
			WriteStream = legStreams.WriteStream;
		}
		var fs$ReadStream = fs.ReadStream;
		if (fs$ReadStream) {
			ReadStream.prototype = Object.create(fs$ReadStream.prototype);
			ReadStream.prototype.open = ReadStream$open;
		}
		var fs$WriteStream = fs.WriteStream;
		if (fs$WriteStream) {
			WriteStream.prototype = Object.create(fs$WriteStream.prototype);
			WriteStream.prototype.open = WriteStream$open;
		}
		Object.defineProperty(fs, "ReadStream", {
			get: function() {
				return ReadStream;
			},
			set: function(val) {
				ReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(fs, "WriteStream", {
			get: function() {
				return WriteStream;
			},
			set: function(val) {
				WriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileReadStream = ReadStream;
		Object.defineProperty(fs, "FileReadStream", {
			get: function() {
				return FileReadStream;
			},
			set: function(val) {
				FileReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileWriteStream = WriteStream;
		Object.defineProperty(fs, "FileWriteStream", {
			get: function() {
				return FileWriteStream;
			},
			set: function(val) {
				FileWriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		function ReadStream(path, options) {
			if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;
			else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
		}
		function ReadStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					if (that.autoClose) that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
					that.read();
				}
			});
		}
		function WriteStream(path, options) {
			if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;
			else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
		}
		function WriteStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
				}
			});
		}
		function createReadStream(path, options) {
			return new fs.ReadStream(path, options);
		}
		function createWriteStream(path, options) {
			return new fs.WriteStream(path, options);
		}
		var fs$open = fs.open;
		fs.open = open;
		function open(path, flags, mode, cb) {
			if (typeof mode === "function") cb = mode, mode = null;
			return go$open(path, flags, mode, cb);
			function go$open(path, flags, mode, cb, startTime) {
				return fs$open(path, flags, mode, function(err, fd) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$open,
						[
							path,
							flags,
							mode,
							cb
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
		}
		return fs;
	}
	function enqueue(elem) {
		debug("ENQUEUE", elem[0].name, elem[1]);
		fs$3[gracefulQueue].push(elem);
		retry();
	}
	var retryTimer;
	function resetQueue() {
		var now = Date.now();
		for (var i = 0; i < fs$3[gracefulQueue].length; ++i) if (fs$3[gracefulQueue][i].length > 2) {
			fs$3[gracefulQueue][i][3] = now;
			fs$3[gracefulQueue][i][4] = now;
		}
		retry();
	}
	function retry() {
		clearTimeout(retryTimer);
		retryTimer = void 0;
		if (fs$3[gracefulQueue].length === 0) return;
		var elem = fs$3[gracefulQueue].shift();
		var fn = elem[0];
		var args = elem[1];
		var err = elem[2];
		var startTime = elem[3];
		var lastTime = elem[4];
		if (startTime === void 0) {
			debug("RETRY", fn.name, args);
			fn.apply(null, args);
		} else if (Date.now() - startTime >= 6e4) {
			debug("TIMEOUT", fn.name, args);
			var cb = args.pop();
			if (typeof cb === "function") cb.call(null, err);
		} else {
			var sinceAttempt = Date.now() - lastTime;
			var sinceStart = Math.max(lastTime - startTime, 1);
			if (sinceAttempt >= Math.min(sinceStart * 1.2, 100)) {
				debug("RETRY", fn.name, args);
				fn.apply(null, args.concat([startTime]));
			} else fs$3[gracefulQueue].push(elem);
		}
		if (retryTimer === void 0) retryTimer = setTimeout(retry, 0);
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/retry@0.12.0/node_modules/retry/lib/retry_operation.js
var require_retry_operation = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	function RetryOperation(timeouts, options) {
		if (typeof options === "boolean") options = { forever: options };
		this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
		this._timeouts = timeouts;
		this._options = options || {};
		this._maxRetryTime = options && options.maxRetryTime || Infinity;
		this._fn = null;
		this._errors = [];
		this._attempts = 1;
		this._operationTimeout = null;
		this._operationTimeoutCb = null;
		this._timeout = null;
		this._operationStart = null;
		if (this._options.forever) this._cachedTimeouts = this._timeouts.slice(0);
	}
	module.exports = RetryOperation;
	RetryOperation.prototype.reset = function() {
		this._attempts = 1;
		this._timeouts = this._originalTimeouts;
	};
	RetryOperation.prototype.stop = function() {
		if (this._timeout) clearTimeout(this._timeout);
		this._timeouts = [];
		this._cachedTimeouts = null;
	};
	RetryOperation.prototype.retry = function(err) {
		if (this._timeout) clearTimeout(this._timeout);
		if (!err) return false;
		var currentTime = (/* @__PURE__ */ new Date()).getTime();
		if (err && currentTime - this._operationStart >= this._maxRetryTime) {
			this._errors.unshift(/* @__PURE__ */ new Error("RetryOperation timeout occurred"));
			return false;
		}
		this._errors.push(err);
		var timeout = this._timeouts.shift();
		if (timeout === void 0) {
			if (this._cachedTimeouts) {
				this._errors.splice(this._errors.length - 1, this._errors.length);
				this._timeouts = this._cachedTimeouts.slice(0);
				timeout = this._timeouts.shift();
			} else return false;
		}
		var self = this;
		var timer = setTimeout(function() {
			self._attempts++;
			if (self._operationTimeoutCb) {
				self._timeout = setTimeout(function() {
					self._operationTimeoutCb(self._attempts);
				}, self._operationTimeout);
				if (self._options.unref) self._timeout.unref();
			}
			self._fn(self._attempts);
		}, timeout);
		if (this._options.unref) timer.unref();
		return true;
	};
	RetryOperation.prototype.attempt = function(fn, timeoutOps) {
		this._fn = fn;
		if (timeoutOps) {
			if (timeoutOps.timeout) this._operationTimeout = timeoutOps.timeout;
			if (timeoutOps.cb) this._operationTimeoutCb = timeoutOps.cb;
		}
		var self = this;
		if (this._operationTimeoutCb) this._timeout = setTimeout(function() {
			self._operationTimeoutCb();
		}, self._operationTimeout);
		this._operationStart = (/* @__PURE__ */ new Date()).getTime();
		this._fn(this._attempts);
	};
	RetryOperation.prototype.try = function(fn) {
		console.log("Using RetryOperation.try() is deprecated");
		this.attempt(fn);
	};
	RetryOperation.prototype.start = function(fn) {
		console.log("Using RetryOperation.start() is deprecated");
		this.attempt(fn);
	};
	RetryOperation.prototype.start = RetryOperation.prototype.try;
	RetryOperation.prototype.errors = function() {
		return this._errors;
	};
	RetryOperation.prototype.attempts = function() {
		return this._attempts;
	};
	RetryOperation.prototype.mainError = function() {
		if (this._errors.length === 0) return null;
		var counts = {};
		var mainError = null;
		var mainErrorCount = 0;
		for (var i = 0; i < this._errors.length; i++) {
			var error = this._errors[i];
			var message = error.message;
			var count = (counts[message] || 0) + 1;
			counts[message] = count;
			if (count >= mainErrorCount) {
				mainError = error;
				mainErrorCount = count;
			}
		}
		return mainError;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/retry@0.12.0/node_modules/retry/lib/retry.js
var require_retry$1 = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports) => {
	var RetryOperation = require_retry_operation();
	exports.operation = function(options) {
		return new RetryOperation(exports.timeouts(options), {
			forever: options && options.forever,
			unref: options && options.unref,
			maxRetryTime: options && options.maxRetryTime
		});
	};
	exports.timeouts = function(options) {
		if (options instanceof Array) return [].concat(options);
		var opts = {
			retries: 10,
			factor: 2,
			minTimeout: 1e3,
			maxTimeout: Infinity,
			randomize: false
		};
		for (var key in options) opts[key] = options[key];
		if (opts.minTimeout > opts.maxTimeout) throw new Error("minTimeout is greater than maxTimeout");
		var timeouts = [];
		for (var i = 0; i < opts.retries; i++) timeouts.push(this.createTimeout(i, opts));
		if (options && options.forever && !timeouts.length) timeouts.push(this.createTimeout(i, opts));
		timeouts.sort(function(a, b) {
			return a - b;
		});
		return timeouts;
	};
	exports.createTimeout = function(attempt, opts) {
		var random = opts.randomize ? Math.random() + 1 : 1;
		var timeout = Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt));
		timeout = Math.min(timeout, opts.maxTimeout);
		return timeout;
	};
	exports.wrap = function(obj, options, methods) {
		if (options instanceof Array) {
			methods = options;
			options = null;
		}
		if (!methods) {
			methods = [];
			for (var key in obj) if (typeof obj[key] === "function") methods.push(key);
		}
		for (var i = 0; i < methods.length; i++) {
			var method = methods[i];
			var original = obj[method];
			obj[method] = function retryWrapper(original) {
				var op = exports.operation(options);
				var args = Array.prototype.slice.call(arguments, 1);
				var callback = args.pop();
				args.push(function(err) {
					if (op.retry(err)) return;
					if (err) arguments[0] = op.mainError();
					callback.apply(this, arguments);
				});
				op.attempt(function() {
					original.apply(obj, args);
				});
			}.bind(obj, original);
			obj[method].options = options;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/retry@0.12.0/node_modules/retry/index.js
var require_retry = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	module.exports = require_retry$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js
var require_signals = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	module.exports = [
		"SIGABRT",
		"SIGALRM",
		"SIGHUP",
		"SIGINT",
		"SIGTERM"
	];
	if (process.platform !== "win32") module.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
	if (process.platform === "linux") module.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
}));
//#endregion
//#region ../../node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js
var require_signal_exit = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	var process = global.process;
	var processOk = function(process) {
		return process && typeof process === "object" && typeof process.removeListener === "function" && typeof process.emit === "function" && typeof process.reallyExit === "function" && typeof process.listeners === "function" && typeof process.kill === "function" && typeof process.pid === "number" && typeof process.on === "function";
	};
	/* istanbul ignore if */
	if (!processOk(process)) module.exports = function() {
		return function() {};
	};
	else {
		var assert = require("assert");
		var signals = require_signals();
		var isWin = /^win/i.test(process.platform);
		var EE = require("events");
		/* istanbul ignore if */
		if (typeof EE !== "function") EE = EE.EventEmitter;
		var emitter;
		if (process.__signal_exit_emitter__) emitter = process.__signal_exit_emitter__;
		else {
			emitter = process.__signal_exit_emitter__ = new EE();
			emitter.count = 0;
			emitter.emitted = {};
		}
		if (!emitter.infinite) {
			emitter.setMaxListeners(Infinity);
			emitter.infinite = true;
		}
		module.exports = function(cb, opts) {
			/* istanbul ignore if */
			if (!processOk(global.process)) return function() {};
			assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
			if (loaded === false) load();
			var ev = "exit";
			if (opts && opts.alwaysLast) ev = "afterexit";
			var remove = function() {
				emitter.removeListener(ev, cb);
				if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) unload();
			};
			emitter.on(ev, cb);
			return remove;
		};
		var unload = function unload() {
			if (!loaded || !processOk(global.process)) return;
			loaded = false;
			signals.forEach(function(sig) {
				try {
					process.removeListener(sig, sigListeners[sig]);
				} catch (er) {}
			});
			process.emit = originalProcessEmit;
			process.reallyExit = originalProcessReallyExit;
			emitter.count -= 1;
		};
		module.exports.unload = unload;
		var emit = function emit(event, code, signal) {
			/* istanbul ignore if */
			if (emitter.emitted[event]) return;
			emitter.emitted[event] = true;
			emitter.emit(event, code, signal);
		};
		var sigListeners = {};
		signals.forEach(function(sig) {
			sigListeners[sig] = function listener() {
				/* istanbul ignore if */
				if (!processOk(global.process)) return;
				if (process.listeners(sig).length === emitter.count) {
					unload();
					emit("exit", null, sig);
					/* istanbul ignore next */
					emit("afterexit", null, sig);
					/* istanbul ignore next */
					if (isWin && sig === "SIGHUP") sig = "SIGINT";
					/* istanbul ignore next */
					process.kill(process.pid, sig);
				}
			};
		});
		module.exports.signals = function() {
			return signals;
		};
		var loaded = false;
		var load = function load() {
			if (loaded || !processOk(global.process)) return;
			loaded = true;
			emitter.count += 1;
			signals = signals.filter(function(sig) {
				try {
					process.on(sig, sigListeners[sig]);
					return true;
				} catch (er) {
					return false;
				}
			});
			process.emit = processEmit;
			process.reallyExit = processReallyExit;
		};
		module.exports.load = load;
		var originalProcessReallyExit = process.reallyExit;
		var processReallyExit = function processReallyExit(code) {
			/* istanbul ignore if */
			if (!processOk(global.process)) return;
			process.exitCode = code || /* istanbul ignore next */ 0;
			emit("exit", process.exitCode, null);
			/* istanbul ignore next */
			emit("afterexit", process.exitCode, null);
			/* istanbul ignore next */
			originalProcessReallyExit.call(process, process.exitCode);
		};
		var originalProcessEmit = process.emit;
		var processEmit = function processEmit(ev, arg) {
			if (ev === "exit" && processOk(global.process)) {
				/* istanbul ignore else */
				if (arg !== void 0) process.exitCode = arg;
				var ret = originalProcessEmit.apply(this, arguments);
				/* istanbul ignore next */
				emit("exit", process.exitCode, null);
				/* istanbul ignore next */
				emit("afterexit", process.exitCode, null);
				/* istanbul ignore next */
				return ret;
			} else return originalProcessEmit.apply(this, arguments);
		};
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/proper-lockfile@4.1.2/node_modules/proper-lockfile/lib/mtime-precision.js
var require_mtime_precision = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	var cacheSymbol = Symbol();
	function probe(file, fs, callback) {
		const cachedPrecision = fs[cacheSymbol];
		if (cachedPrecision) return fs.stat(file, (err, stat) => {
			/* istanbul ignore if */
			if (err) return callback(err);
			callback(null, stat.mtime, cachedPrecision);
		});
		const mtime = /* @__PURE__ */ new Date(Math.ceil(Date.now() / 1e3) * 1e3 + 5);
		fs.utimes(file, mtime, mtime, (err) => {
			/* istanbul ignore if */
			if (err) return callback(err);
			fs.stat(file, (err, stat) => {
				/* istanbul ignore if */
				if (err) return callback(err);
				const precision = stat.mtime.getTime() % 1e3 === 0 ? "s" : "ms";
				Object.defineProperty(fs, cacheSymbol, { value: precision });
				callback(null, stat.mtime, precision);
			});
		});
	}
	function getMtime(precision) {
		let now = Date.now();
		if (precision === "s") now = Math.ceil(now / 1e3) * 1e3;
		return new Date(now);
	}
	module.exports.probe = probe;
	module.exports.getMtime = getMtime;
}));
//#endregion
//#region ../../node_modules/.pnpm/proper-lockfile@4.1.2/node_modules/proper-lockfile/lib/lockfile.js
var require_lockfile = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	var path$4 = require("path");
	var fs = require_graceful_fs();
	var retry = require_retry();
	var onExit = require_signal_exit();
	var mtimePrecision = require_mtime_precision();
	var locks = {};
	function getLockFile(file, options) {
		return options.lockfilePath || `${file}.lock`;
	}
	function resolveCanonicalPath(file, options, callback) {
		if (!options.realpath) return callback(null, path$4.resolve(file));
		options.fs.realpath(file, callback);
	}
	function acquireLock(file, options, callback) {
		const lockfilePath = getLockFile(file, options);
		options.fs.mkdir(lockfilePath, (err) => {
			if (!err) return mtimePrecision.probe(lockfilePath, options.fs, (err, mtime, mtimePrecision) => {
				/* istanbul ignore if */
				if (err) {
					options.fs.rmdir(lockfilePath, () => {});
					return callback(err);
				}
				callback(null, mtime, mtimePrecision);
			});
			if (err.code !== "EEXIST") return callback(err);
			if (options.stale <= 0) return callback(Object.assign(/* @__PURE__ */ new Error("Lock file is already being held"), {
				code: "ELOCKED",
				file
			}));
			options.fs.stat(lockfilePath, (err, stat) => {
				if (err) {
					if (err.code === "ENOENT") return acquireLock(file, {
						...options,
						stale: 0
					}, callback);
					return callback(err);
				}
				if (!isLockStale(stat, options)) return callback(Object.assign(/* @__PURE__ */ new Error("Lock file is already being held"), {
					code: "ELOCKED",
					file
				}));
				removeLock(file, options, (err) => {
					if (err) return callback(err);
					acquireLock(file, {
						...options,
						stale: 0
					}, callback);
				});
			});
		});
	}
	function isLockStale(stat, options) {
		return stat.mtime.getTime() < Date.now() - options.stale;
	}
	function removeLock(file, options, callback) {
		options.fs.rmdir(getLockFile(file, options), (err) => {
			if (err && err.code !== "ENOENT") return callback(err);
			callback();
		});
	}
	function updateLock(file, options) {
		const lock = locks[file];
		/* istanbul ignore if */
		if (lock.updateTimeout) return;
		lock.updateDelay = lock.updateDelay || options.update;
		lock.updateTimeout = setTimeout(() => {
			lock.updateTimeout = null;
			options.fs.stat(lock.lockfilePath, (err, stat) => {
				const isOverThreshold = lock.lastUpdate + options.stale < Date.now();
				if (err) {
					if (err.code === "ENOENT" || isOverThreshold) return setLockAsCompromised(file, lock, Object.assign(err, { code: "ECOMPROMISED" }));
					lock.updateDelay = 1e3;
					return updateLock(file, options);
				}
				if (!(lock.mtime.getTime() === stat.mtime.getTime())) return setLockAsCompromised(file, lock, Object.assign(/* @__PURE__ */ new Error("Unable to update lock within the stale threshold"), { code: "ECOMPROMISED" }));
				const mtime = mtimePrecision.getMtime(lock.mtimePrecision);
				options.fs.utimes(lock.lockfilePath, mtime, mtime, (err) => {
					const isOverThreshold = lock.lastUpdate + options.stale < Date.now();
					if (lock.released) return;
					if (err) {
						if (err.code === "ENOENT" || isOverThreshold) return setLockAsCompromised(file, lock, Object.assign(err, { code: "ECOMPROMISED" }));
						lock.updateDelay = 1e3;
						return updateLock(file, options);
					}
					lock.mtime = mtime;
					lock.lastUpdate = Date.now();
					lock.updateDelay = null;
					updateLock(file, options);
				});
			});
		}, lock.updateDelay);
		/* istanbul ignore else */
		if (lock.updateTimeout.unref) lock.updateTimeout.unref();
	}
	function setLockAsCompromised(file, lock, err) {
		lock.released = true;
		/* istanbul ignore if */
		if (lock.updateTimeout) clearTimeout(lock.updateTimeout);
		if (locks[file] === lock) delete locks[file];
		lock.options.onCompromised(err);
	}
	function lock(file, options, callback) {
		/* istanbul ignore next */
		options = {
			stale: 1e4,
			update: null,
			realpath: true,
			retries: 0,
			fs,
			onCompromised: (err) => {
				throw err;
			},
			...options
		};
		options.retries = options.retries || 0;
		options.retries = typeof options.retries === "number" ? { retries: options.retries } : options.retries;
		options.stale = Math.max(options.stale || 0, 2e3);
		options.update = options.update == null ? options.stale / 2 : options.update || 0;
		options.update = Math.max(Math.min(options.update, options.stale / 2), 1e3);
		resolveCanonicalPath(file, options, (err, file) => {
			if (err) return callback(err);
			const operation = retry.operation(options.retries);
			operation.attempt(() => {
				acquireLock(file, options, (err, mtime, mtimePrecision) => {
					if (operation.retry(err)) return;
					if (err) return callback(operation.mainError());
					const lock = locks[file] = {
						lockfilePath: getLockFile(file, options),
						mtime,
						mtimePrecision,
						options,
						lastUpdate: Date.now()
					};
					updateLock(file, options);
					callback(null, (releasedCallback) => {
						if (lock.released) return releasedCallback && releasedCallback(Object.assign(/* @__PURE__ */ new Error("Lock is already released"), { code: "ERELEASED" }));
						unlock(file, {
							...options,
							realpath: false
						}, releasedCallback);
					});
				});
			});
		});
	}
	function unlock(file, options, callback) {
		options = {
			fs,
			realpath: true,
			...options
		};
		resolveCanonicalPath(file, options, (err, file) => {
			if (err) return callback(err);
			const lock = locks[file];
			if (!lock) return callback(Object.assign(/* @__PURE__ */ new Error("Lock is not acquired/owned by you"), { code: "ENOTACQUIRED" }));
			lock.updateTimeout && clearTimeout(lock.updateTimeout);
			lock.released = true;
			delete locks[file];
			removeLock(file, options, callback);
		});
	}
	function check(file, options, callback) {
		options = {
			stale: 1e4,
			realpath: true,
			fs,
			...options
		};
		options.stale = Math.max(options.stale || 0, 2e3);
		resolveCanonicalPath(file, options, (err, file) => {
			if (err) return callback(err);
			options.fs.stat(getLockFile(file, options), (err, stat) => {
				if (err) return err.code === "ENOENT" ? callback(null, false) : callback(err);
				return callback(null, !isLockStale(stat, options));
			});
		});
	}
	function getLocks() {
		return locks;
	}
	/* istanbul ignore next */
	onExit(() => {
		for (const file in locks) {
			const options = locks[file].options;
			try {
				options.fs.rmdirSync(getLockFile(file, options));
			} catch (e) {}
		}
	});
	module.exports.lock = lock;
	module.exports.unlock = unlock;
	module.exports.check = check;
	module.exports.getLocks = getLocks;
}));
//#endregion
//#region ../../node_modules/.pnpm/proper-lockfile@4.1.2/node_modules/proper-lockfile/lib/adapter.js
var require_adapter = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	var fs = require_graceful_fs();
	function createSyncFs(fs) {
		const methods = [
			"mkdir",
			"realpath",
			"stat",
			"rmdir",
			"utimes"
		];
		const newFs = { ...fs };
		methods.forEach((method) => {
			newFs[method] = (...args) => {
				const callback = args.pop();
				let ret;
				try {
					ret = fs[`${method}Sync`](...args);
				} catch (err) {
					return callback(err);
				}
				callback(null, ret);
			};
		});
		return newFs;
	}
	function toPromise(method) {
		return (...args) => new Promise((resolve, reject) => {
			args.push((err, result) => {
				if (err) reject(err);
				else resolve(result);
			});
			method(...args);
		});
	}
	function toSync(method) {
		return (...args) => {
			let err;
			let result;
			args.push((_err, _result) => {
				err = _err;
				result = _result;
			});
			method(...args);
			if (err) throw err;
			return result;
		};
	}
	function toSyncOptions(options) {
		options = { ...options };
		options.fs = createSyncFs(options.fs || fs);
		if (typeof options.retries === "number" && options.retries > 0 || options.retries && typeof options.retries.retries === "number" && options.retries.retries > 0) throw Object.assign(/* @__PURE__ */ new Error("Cannot use retries with the sync api"), { code: "ESYNC" });
		return options;
	}
	module.exports = {
		toPromise,
		toSync,
		toSyncOptions
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/proper-lockfile@4.1.2/node_modules/proper-lockfile/index.js
var require_proper_lockfile = /* @__PURE__ */ require_rolldown_runtime.__commonJSMin(((exports, module) => {
	var lockfile = require_lockfile();
	var { toPromise, toSync, toSyncOptions } = require_adapter();
	async function lock(file, options) {
		return toPromise(await toPromise(lockfile.lock)(file, options));
	}
	function lockSync(file, options) {
		return toSync(toSync(lockfile.lock)(file, toSyncOptions(options)));
	}
	function unlock(file, options) {
		return toPromise(lockfile.unlock)(file, options);
	}
	function unlockSync(file, options) {
		return toSync(lockfile.unlock)(file, toSyncOptions(options));
	}
	function check(file, options) {
		return toPromise(lockfile.check)(file, options);
	}
	function checkSync(file, options) {
		return toSync(lockfile.check)(file, toSyncOptions(options));
	}
	module.exports = lock;
	module.exports.lock = lock;
	module.exports.unlock = unlock;
	module.exports.lockSync = lockSync;
	module.exports.unlockSync = unlockSync;
	module.exports.check = check;
	module.exports.checkSync = checkSync;
}));
//#endregion
//#region ../../packages/core/src/node/credential-protection/file-lock.ts
function resolveCredentialFileLockPath(filePath) {
	const absolute = node_path.default.resolve(filePath);
	return node_path.default.join(node_path.default.dirname(absolute), `.${node_path.default.basename(absolute)}.workbuddy.lock`);
}
async function withCredentialFileLock(filePath, action, options = {}) {
	const target = prepareTarget(filePath);
	const compromise = createCompromiseState();
	const release = await import_proper_lockfile.lock(target, asyncOptions(target, options, compromise));
	try {
		return await action();
	} finally {
		await releaseAsync(release, compromise);
	}
}
async function tryWithCredentialFileLock(filePath, action) {
	const target = prepareTarget(filePath);
	const compromise = createCompromiseState();
	let release;
	try {
		release = await import_proper_lockfile.lock(target, lockOptions(target, compromise));
	} catch (error) {
		if (isBusy(error)) return { acquired: false };
		throw error;
	}
	try {
		return {
			acquired: true,
			value: await action()
		};
	} finally {
		await releaseAsync(release, compromise);
	}
}
function prepareTarget(filePath) {
	const target = node_path.default.resolve(filePath);
	node_fs.default.mkdirSync(node_path.default.dirname(target), { recursive: true });
	return target;
}
function lockOptions(target, compromise) {
	return {
		lockfilePath: resolveCredentialFileLockPath(target),
		realpath: false,
		retries: 0,
		stale: STALE_MS,
		update: UPDATE_MS,
		onCompromised: compromise.onCompromised
	};
}
function asyncOptions(target, options, compromise) {
	const maxWaitMs = options.maxWaitMs ?? DEFAULT_MAX_WAIT_MS;
	const retryDelayMs = options.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
	return {
		...lockOptions(target, compromise),
		retries: {
			retries: Math.max(0, Math.ceil(maxWaitMs / retryDelayMs)),
			factor: 1,
			minTimeout: retryDelayMs,
			maxTimeout: retryDelayMs
		}
	};
}
function createCompromiseState() {
	const state = {
		error: void 0,
		onCompromised: (error) => {
			state.error ??= error;
		}
	};
	return state;
}
async function releaseAsync(release, compromise) {
	if (compromise.error) throw compromise.error;
	try {
		await release();
	} catch (error) {
		throw compromise.error ?? error;
	}
	if (compromise.error) throw compromise.error;
}
function isBusy(error) {
	return typeof error === "object" && error !== null && "code" in error && error.code === "ELOCKED";
}
var import_proper_lockfile, STALE_MS, UPDATE_MS, DEFAULT_MAX_WAIT_MS, DEFAULT_RETRY_DELAY_MS;
var init_file_lock = require_rolldown_runtime.__esmMin((() => {
	import_proper_lockfile = /* @__PURE__ */ require_rolldown_runtime.__toESM(require_proper_lockfile());
	STALE_MS = 1e4;
	UPDATE_MS = 5e3;
	DEFAULT_MAX_WAIT_MS = 2e3;
	DEFAULT_RETRY_DELAY_MS = 50;
}));
//#endregion
//#region ../../packages/at-rest-crypto/dist/field.mjs
function isStandardEncryptedFieldWrapper(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const wrapper = value;
	const keys = Object.keys(wrapper).sort();
	return keys.length === 2 && keys[0] === "$wbEncrypted" && keys[1] === "envelope" && wrapper.$wbEncrypted === 1 && typeof wrapper.envelope === "string";
}
function isAsymmetricEncryptedFieldWrapper(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const wrapper = value;
	const keys = Object.keys(wrapper).sort();
	return keys.length === 3 && keys[0] === "$wbEncrypted" && keys[1] === "envelope" && keys[2] === "scheme" && wrapper.$wbEncrypted === 1 && wrapper.scheme === "asym-v1" && typeof wrapper.envelope === "string";
}
function isEncryptedFieldWrapper(value) {
	return isStandardEncryptedFieldWrapper(value) || isAsymmetricEncryptedFieldWrapper(value);
}
function isObject$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function hasEncryptedFieldMarker(value) {
	return isObject$1(value) && value.$wbEncrypted === 1;
}
function* walkField(current, path, depth, concrete) {
	if (!isObject$1(current) && !Array.isArray(current)) return;
	const node = current;
	const segment = path[depth];
	if (depth === path.length - 1) {
		if (segment === "*") for (const key of Object.keys(node)) yield {
			parent: node,
			key,
			concretePath: [...concrete, key]
		};
		else yield {
			parent: node,
			key: segment,
			concretePath: [...concrete, segment]
		};
		return;
	}
	if (segment === "*") {
		for (const key of Object.keys(node)) yield* walkField(node[key], path, depth + 1, [...concrete, key]);
		return;
	}
	yield* walkField(node[segment], path, depth + 1, [...concrete, segment]);
}
function escapeJsonPointerSegment(segment) {
	return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function unescapeJsonPointerSegment(segment) {
	return segment.replace(/~1/g, "/").replace(/~0/g, "~");
}
function pointerOf(path) {
	return `/${path.map(escapeJsonPointerSegment).join("/")}`;
}
function fieldPathSegments(fieldPath) {
	return fieldPath.slice(1).split("/").map(unescapeJsonPointerSegment);
}
function fieldPathPatternsOverlap(a, b) {
	return a.length === b.length && a.every((segment, index) => segment === "*" || b[index] === "*" || segment === b[index]);
}
var ProtectedFieldCodec, ProtectedJsonFields;
var init_field = require_rolldown_runtime.__esmMin((() => {
	require_process_cpu_sampler.init_key_normalize_2t2Jeyvk();
	require_process_cpu_sampler.init_aes_gcm_4L6MEmMw();
	require_process_cpu_sampler.init_asymmetric_envelope_DhFQSwLY();
	ProtectedFieldCodec = class {
		asymmetricKeyMaterial;
		crypto;
		mode;
		constructor(options) {
			this.mode = options.mode;
			this.crypto = options.key ? new require_process_cpu_sampler.AtRestCrypto(options.key) : void 0;
			this.asymmetricKeyMaterial = options.asymmetricKeyMaterial;
		}
		encodeString(plaintext, context, protection = "standard") {
			if (this.mode === "disabled") return plaintext;
			return this.seal(Buffer.from(plaintext, "utf8"), context, protection);
		}
		decodeString(value, context) {
			if (typeof value === "string") return value;
			return this.open(value, context).toString("utf8");
		}
		canSeal(protection = "standard") {
			if (this.mode === "disabled") return false;
			return protection === "advanced" ? this.asymmetricKeyMaterial !== void 0 : this.crypto !== void 0;
		}
		seal(plaintext, context, protection = "standard") {
			if (this.mode === "disabled") throw new require_process_cpu_sampler.CryptoUnavailableError("disabled field codec cannot create encrypted wrappers");
			if (protection === "advanced") return {
				$wbEncrypted: 1,
				scheme: "asym-v1",
				envelope: require_process_cpu_sampler.sealAsymmetricEnvelope(plaintext, this.requireAdvancedContext(context), this.requireAsymmetricKeyMaterial()).toString("base64")
			};
			return {
				$wbEncrypted: 1,
				envelope: this.requireCrypto().seal(plaintext, { framing: "field" }).toString("base64")
			};
		}
		open(value, context) {
			if (!isEncryptedFieldWrapper(value)) throw new require_process_cpu_sampler.IntegrityError("encrypted field wrapper does not match the schema");
			const envelopeBytes = Buffer.from(value.envelope, "base64");
			if (envelopeBytes.toString("base64") !== value.envelope) throw new require_process_cpu_sampler.IntegrityError("encrypted field envelope must be canonical base64");
			if (isAsymmetricEncryptedFieldWrapper(value)) return require_process_cpu_sampler.openAsymmetricEnvelope(envelopeBytes, this.requireAdvancedContext(context), this.requireAsymmetricKeyMaterial());
			const envelope = require_process_cpu_sampler.parseSupportedEnvelope(envelopeBytes);
			return this.requireCrypto().open(envelope, { framing: "field" });
		}
		dispose() {
			this.crypto?.dispose();
		}
		requireCrypto() {
			if (!this.crypto) throw new require_process_cpu_sampler.CryptoUnavailableError("at-rest key is not ready");
			return this.crypto;
		}
		requireAsymmetricKeyMaterial() {
			if (!this.asymmetricKeyMaterial) throw new require_process_cpu_sampler.CryptoUnavailableError("advanced at-rest key material is not ready");
			return this.asymmetricKeyMaterial;
		}
		/** asym-v1 把 purpose/resourceId/fieldPath 明文写进 envelope 并在读取时比对。 */
		requireAdvancedContext(context) {
			if (!context) throw new require_process_cpu_sampler.CryptoUnavailableError("advanced field protection requires a context");
			return {
				framing: "field",
				...context
			};
		}
	};
	ProtectedJsonFields = class {
		codec;
		mode;
		purpose;
		resourceId;
		onUnavailable;
		previousFields = /* @__PURE__ */ new Map();
		constructor(options) {
			this.mode = options.mode;
			this.purpose = options.purpose;
			this.resourceId = options.resourceId;
			this.onUnavailable = options.onUnavailable;
			this.codec = new ProtectedFieldCodec({
				mode: options.mode,
				key: options.key,
				asymmetricKeyMaterial: options.asymmetricKeyMaterial
			});
		}
		decode(input, specs) {
			const value = this.clone(input);
			this.assertUniqueFieldPaths(specs);
			this.previousFields.clear();
			let migrationNeeded = false;
			for (const spec of specs) {
				const specFieldPath = this.getFieldPath(spec);
				const wildcard = spec.path.includes("*");
				const resolvedFields = [...this.resolveFields(value, spec.path)];
				const ownerCounts = /* @__PURE__ */ new Map();
				if (wildcard) for (const resolved of resolvedFields) ownerCounts.set(resolved.parent, (ownerCounts.get(resolved.parent) ?? 0) + 1);
				for (const resolved of resolvedFields) {
					if (!(resolved.key in resolved.parent)) continue;
					const rawValue = resolved.parent[resolved.key];
					const previousKey = wildcard ? pointerOf(resolved.concretePath) : specFieldPath;
					const ownerIdentity = wildcard && ownerCounts.get(resolved.parent) === 1 ? resolved.parent : void 0;
					try {
						let plaintext;
						let fieldMigrationNeeded = false;
						if (spec.kind === "json") {
							if (isEncryptedFieldWrapper(rawValue)) {
								plaintext = JSON.parse(this.codec.open(rawValue, this.context(specFieldPath)).toString("utf8"));
								fieldMigrationNeeded = this.requiresAdvancedMigration(rawValue, spec);
							} else if (isObject$1(rawValue)) {
								plaintext = rawValue;
								fieldMigrationNeeded = this.mode === "required" && this.codec.canSeal(spec.protection ?? "standard");
							} else throw new Error("sensitive JSON field has an invalid value");
							if (!isObject$1(plaintext)) throw new Error("sensitive JSON field must decode to an object");
						} else {
							plaintext = this.codec.decodeString(rawValue, this.context(specFieldPath));
							fieldMigrationNeeded = this.mode === "required" && typeof rawValue === "string" && this.codec.canSeal(spec.protection ?? "standard");
							fieldMigrationNeeded ||= this.requiresAdvancedMigration(rawValue, spec);
						}
						if (isEncryptedFieldWrapper(rawValue)) this.previousFields.set(previousKey, {
							kind: "readable",
							persisted: rawValue,
							plaintext: this.clone(plaintext),
							migrationNeeded: this.mode === "disabled" || fieldMigrationNeeded,
							specFieldPath,
							concretePath: resolved.concretePath,
							ownerIdentity
						});
						migrationNeeded ||= fieldMigrationNeeded;
						resolved.parent[resolved.key] = plaintext;
					} catch (error) {
						if (hasEncryptedFieldMarker(rawValue)) this.previousFields.set(previousKey, {
							kind: "opaque",
							persisted: rawValue,
							specFieldPath,
							concretePath: resolved.concretePath,
							ownerIdentity
						});
						delete resolved.parent[resolved.key];
						this.reportUnavailable(specFieldPath, error);
					}
				}
			}
			return {
				value,
				migrationNeeded
			};
		}
		encode(input, specs) {
			const value = this.clone(input);
			this.assertUniqueFieldPaths(specs);
			for (const spec of specs) {
				const specFieldPath = this.getFieldPath(spec);
				const wildcard = spec.path.includes("*");
				const resolvedFields = [...this.resolveFields(value, spec.path)].map((resolved) => ({
					...resolved,
					previousKey: wildcard ? pointerOf(resolved.concretePath) : specFieldPath,
					sourceParent: this.resolveConcreteParent(input, resolved.concretePath)
				}));
				if (!wildcard) {
					const resolvedKeys = new Set(resolvedFields.map((resolved) => resolved.previousKey));
					for (const [previousKey, previous] of this.previousFields) if (previous.kind === "opaque" && previous.specFieldPath === specFieldPath && !resolvedKeys.has(previousKey)) this.restoreOpaqueField(value, previous.concretePath, previous.persisted);
				}
				for (const resolved of resolvedFields) {
					const previous = this.findPreviousField(resolved.previousKey, specFieldPath, wildcard, resolved.sourceParent);
					if (previous?.kind === "opaque" && resolved.sourceParent !== void 0 && !(resolved.key in resolved.sourceParent)) {
						resolved.parent[resolved.key] = previous.persisted;
						continue;
					}
					if (!(resolved.key in resolved.parent)) {
						if (previous?.kind === "opaque") resolved.parent[resolved.key] = previous.persisted;
						continue;
					}
					const fieldValue = resolved.parent[resolved.key];
					if (previous?.kind === "readable" && !previous.migrationNeeded && (0, node_util.isDeepStrictEqual)(fieldValue, previous.plaintext)) {
						resolved.parent[resolved.key] = previous.persisted;
						continue;
					}
					if (isEncryptedFieldWrapper(fieldValue)) {
						if (this.mode === "required") this.codec.open(fieldValue, this.context(specFieldPath));
						else if (spec.kind === "json") {
							const plaintext = JSON.parse(this.codec.open(fieldValue, this.context(specFieldPath)).toString("utf8"));
							if (!isObject$1(plaintext)) throw new Error(`sensitive JSON field is invalid: ${specFieldPath}`);
							resolved.parent[resolved.key] = plaintext;
						} else resolved.parent[resolved.key] = this.codec.decodeString(fieldValue, this.context(specFieldPath));
						continue;
					}
					if (spec.kind === "json") {
						if (!isObject$1(fieldValue)) throw new Error(`sensitive JSON field is invalid: ${specFieldPath}`);
						if (this.mode === "required") try {
							resolved.parent[resolved.key] = this.codec.seal(Buffer.from(JSON.stringify(fieldValue), "utf8"), this.context(specFieldPath), spec.protection ?? "standard");
						} catch (error) {
							this.reportUnavailable(specFieldPath, error);
						}
						continue;
					}
					if (typeof fieldValue !== "string") throw new Error(`sensitive string field is invalid: ${specFieldPath}`);
					try {
						resolved.parent[resolved.key] = this.codec.encodeString(fieldValue, this.context(specFieldPath), spec.protection ?? "standard");
					} catch (error) {
						this.reportUnavailable(specFieldPath, error);
					}
				}
			}
			return value;
		}
		findPreviousField(previousKey, specFieldPath, wildcard, ownerIdentity) {
			if (!wildcard) return this.previousFields.get(previousKey);
			if (ownerIdentity === void 0) return this.previousFields.get(previousKey);
			for (const previous of this.previousFields.values()) if (previous.specFieldPath === specFieldPath && previous.ownerIdentity === ownerIdentity) return previous;
			const indexedPrevious = this.previousFields.get(previousKey);
			if (indexedPrevious?.ownerIdentity === void 0) return indexedPrevious;
		}
		discardPrevious(fieldPath) {
			if (!fieldPath.startsWith("/")) throw new Error("fieldPath must be an absolute JSON pointer");
			this.previousFields.delete(fieldPath);
		}
		dispose() {
			this.codec.dispose();
			this.previousFields.clear();
		}
		context(fieldPath) {
			return {
				purpose: this.purpose,
				resourceId: this.resourceId,
				fieldPath
			};
		}
		reportUnavailable(fieldPath, error) {
			try {
				this.onUnavailable?.(fieldPath, error);
			} catch {}
		}
		requiresAdvancedMigration(value, spec) {
			return this.mode === "required" && spec.protection === "advanced" && this.codec.canSeal("advanced") && isEncryptedFieldWrapper(value) && !("scheme" in value);
		}
		getFieldPath(spec) {
			if (spec.fieldPath !== void 0) {
				if (!spec.fieldPath.startsWith("/")) throw new Error("sensitive fieldPath must be an absolute JSON pointer");
				return spec.fieldPath;
			}
			return `/${spec.path.map((segment) => segment.replace(/~/g, "~0").replace(/\//g, "~1")).join("/")}`;
		}
		assertUniqueFieldPaths(specs) {
			const fieldPaths = /* @__PURE__ */ new Set();
			const patterns = [];
			for (const spec of specs) {
				const fieldPath = this.getFieldPath(spec);
				if (fieldPaths.has(fieldPath)) throw new Error(`duplicate sensitive fieldPath: ${fieldPath}`);
				fieldPaths.add(fieldPath);
				const segments = fieldPathSegments(fieldPath);
				for (const existing of patterns) if (fieldPathPatternsOverlap(existing, segments)) throw new Error(`overlapping sensitive fieldPath: ${fieldPath}`);
				patterns.push(segments);
			}
		}
		*resolveFields(root, path) {
			if (path.length === 0) return;
			yield* walkField(root, path, 0, []);
		}
		resolveConcreteParent(root, path) {
			let current = root;
			for (const segment of path.slice(0, -1)) {
				if (!isObject$1(current) && !Array.isArray(current)) return;
				current = current[segment];
			}
			return isObject$1(current) || Array.isArray(current) ? current : void 0;
		}
		restoreOpaqueField(root, path, persisted) {
			if (path.length === 0) return;
			let parent = root;
			for (let index = 0; index < path.length - 1; index += 1) {
				const segment = path[index];
				const child = parent[segment];
				if (isObject$1(child) || Array.isArray(child)) {
					parent = child;
					continue;
				}
				if (child !== void 0) return;
				const nextSegment = path[index + 1];
				const created = /^\d+$/.test(nextSegment) ? [] : {};
				parent[segment] = created;
				parent = created;
			}
			parent[path[path.length - 1]] = persisted;
		}
		clone(value) {
			return JSON.parse(JSON.stringify(value));
		}
	};
}));
//#endregion
//#region ../../packages/at-rest-crypto/dist/file.mjs
var init_file = require_rolldown_runtime.__esmMin((() => {
	require_process_cpu_sampler.init_failure_registry_HWe3iSX2();
}));
//#endregion
//#region ../../packages/core/src/node/credential-protection/runtime.ts
function setCredentialProtectionPending() {
	if (state.status === "disabled") {
		state = { status: "pending" };
		return true;
	}
	return state.status === "pending";
}
function configureCredentialProtection(bootstrap) {
	if (!bootstrap.symmetricKey) {
		if (state.status !== "ready") {
			writePolicy = bootstrap.policy;
			state = {
				status: "unavailable",
				category: bootstrap.symmetricUnavailable
			};
		}
		return true;
	}
	const key = normalizeKey(bootstrap.symmetricKey);
	if (!key) {
		if (state.status === "ready") return false;
		writePolicy = bootstrap.policy;
		state = {
			status: "unavailable",
			category: "invalid-key"
		};
		return true;
	}
	if (state.status === "ready") {
		const matches = writePolicy === bootstrap.policy && state.key.keyId === key.keyId;
		key.key.fill(0);
		return matches;
	}
	writePolicy = bootstrap.policy;
	state = {
		status: "ready",
		key
	};
	captureAsymmetricMaterial(bootstrap);
	return true;
}
function captureAsymmetricMaterial(bootstrap) {
	const material = require_process_cpu_sampler.getAtRestAsymmetricKeyMaterial(bootstrap);
	if (!material) return;
	asymmetricMaterial = {
		userKey: {
			keyId: material.userKey.keyId,
			key: Buffer.from(material.userKey.key)
		},
		developerPublicKey: material.developerPublicKey
	};
}
function getCredentialProtectionState() {
	return state.status === "ready" ? { status: "ready" } : { ...state };
}
function createCredentialFieldCodec(options) {
	const readyKey = state.status === "ready" ? {
		keyId: state.key.keyId,
		key: Buffer.from(state.key.key)
	} : void 0;
	const { scope = "field", ...fieldOptions } = options;
	try {
		return new ProtectedJsonFields({
			mode: require_process_cpu_sampler.resolveAtRestEncryptionMode(writePolicy, scope),
			key: readyKey,
			...fieldOptions
		});
	} finally {
		readyKey?.key.fill(0);
	}
}
/**
* file scope 的整文件 codec（advanced/asym-v1 双包裹）。mode 由 file scope 的最低
* 生效策略决定（需 ≥ files 才 required）；持有非对称材料时无论策略都能解密。
*/
function createCredentialWholeFileCodec(options) {
	return new require_process_cpu_sampler.ProtectedWholeFileCodec({
		mode: require_process_cpu_sampler.resolveAtRestEncryptionMode(writePolicy, "file"),
		protection: "advanced",
		...asymmetricMaterial ? { asymmetricKeyMaterial: {
			userKey: {
				keyId: asymmetricMaterial.userKey.keyId,
				key: Buffer.from(asymmetricMaterial.userKey.key)
			},
			developerPublicKey: asymmetricMaterial.developerPublicKey
		} } : {}
	});
}
/** file scope 是否已具备可用非对称材料（写加密的前提）。 */
function isWholeFileProtectionReady() {
	return asymmetricMaterial !== void 0;
}
/** 当前生效的写策略（来自最近一次 configureCredentialProtection 的 bootstrap.policy）。 */
function getCredentialWritePolicy() {
	return writePolicy;
}
function disposeCredentialProtection() {
	if (state.status === "ready") state.key.key.fill(0);
	asymmetricMaterial?.userKey.key.fill(0);
	asymmetricMaterial = void 0;
	state = { status: "disabled" };
	writePolicy = "off";
}
function normalizeKey(input) {
	const key = Buffer.from(input.key);
	try {
		if (key.length !== 32 || key.every((byte) => byte === 0) || require_process_cpu_sampler.deriveAtRestKeyId(key) !== input.keyId) return;
		return {
			keyId: input.keyId,
			key: Buffer.from(key)
		};
	} catch {
		return;
	} finally {
		key.fill(0);
	}
}
var state, writePolicy, asymmetricMaterial;
var init_runtime = require_rolldown_runtime.__esmMin((() => {
	require_process_cpu_sampler.init_dist();
	init_field();
	init_file();
	state = { status: "disabled" };
	writePolicy = "off";
}));
//#endregion
//#region ../../packages/core/src/node/credential-protection/failure-reporter.ts
function resolveCredentialProtectionConfigDir(filePath) {
	const parent = node_path.default.dirname(node_path.default.resolve(filePath));
	return node_path.default.basename(parent) === "auth" ? node_path.default.dirname(parent) : parent;
}
function classifyCredentialProtectionFailure(error) {
	const runtime = getCredentialProtectionState();
	const code = readErrorCode(error);
	if (code === "CRYPTO_UNAVAILABLE") return runtime.status === "unavailable" ? runtime.category : "missing-key";
	if (code === "KEY_MISMATCH") return "invalid-key";
	if (code === "INTEGRITY_ERROR") return "integrity";
	if (code === "UNSUPPORTED_CIPHERTEXT") return "unsupported";
	if (code === "ELOCKED") return "lock";
	if (typeof code === "string" && (code.startsWith("E") || code.startsWith("UV_"))) return "io";
	return runtime.status === "unavailable" ? runtime.category : "unknown";
}
function readErrorCode(error) {
	return typeof error === "object" && error !== null && "code" in error ? error.code : void 0;
}
function selectorKey(selector) {
	return `${selector.resourceId}\0${selector.adapter}\0${selector.operation}`;
}
function safeWarn(logger, message) {
	try {
		logger.warn(message);
	} catch {}
}
function safeInfo(logger, message) {
	try {
		logger.info?.(message);
	} catch {}
}
function warnAtMostOncePerInterval(state, key, message) {
	const now = Date.now();
	const lastWarningAt = state.lastWarningAt.get(key);
	if (lastWarningAt !== void 0 && now - lastWarningAt < WARNING_INTERVAL_MS$1) return;
	state.lastWarningAt.set(key, now);
	safeWarn(state.loggerRef.current, message);
}
var WARNING_INTERVAL_MS$1, registries, CredentialProtectionFailureReporter;
var init_failure_reporter = require_rolldown_runtime.__esmMin((() => {
	require_process_cpu_sampler.init_dist();
	init_file_lock();
	init_runtime();
	WARNING_INTERVAL_MS$1 = 6e4;
	registries = /* @__PURE__ */ new Map();
	CredentialProtectionFailureReporter = class {
		constructor(options) {
			this.options = options;
			const configDir = resolveCredentialProtectionConfigDir(options.filePath);
			const registryKey = `${configDir}\0${options.processRole}`;
			const current = registries.get(registryKey);
			if (current) {
				current.loggerRef.current = options.logger;
				this.state = current;
				return;
			}
			const loggerRef = { current: options.logger };
			const failed = /* @__PURE__ */ new Set();
			const recoveryChecked = /* @__PURE__ */ new Set();
			const lastWarningAt = /* @__PURE__ */ new Map();
			const state = {
				loggerRef,
				registry: new require_process_cpu_sampler.AtRestFailureRegistry({
					configDir,
					processRole: options.processRole,
					withFileLock: (filePath, action) => withCredentialFileLock(filePath, action),
					logger: {
						warn: (message) => {
							if (message.includes("failure-registry")) warnAtMostOncePerInterval({
								loggerRef,
								lastWarningAt
							}, `internal\0${message}`, message);
						},
						info: (message) => safeInfo(loggerRef.current, message)
					}
				}),
				failed,
				recoveryChecked,
				lastWarningAt
			};
			registries.set(registryKey, state);
			this.state = state;
		}
		attempt(operation) {
			let failed = false;
			return {
				onUnavailable: (_fieldPath, error) => {
					if (failed) return;
					failed = true;
					this.record(operation, error);
				},
				fail: (error) => {
					if (failed) return;
					failed = true;
					this.record(operation, error);
				},
				complete: () => {
					if (!failed) this.recover(operation);
				}
			};
		}
		record(operation, error) {
			const selector = this.selector(operation);
			const key = selectorKey(selector);
			const category = classifyCredentialProtectionFailure(error);
			this.state.failed.add(key);
			warnAtMostOncePerInterval(this.state, key, `[AtRestEncryption] unavailable adapter=${selector.adapter} resource=${selector.resourceId} operation=${operation} category=${category} role=${this.options.processRole}; continuing`);
			this.state.registry.record({
				...selector,
				category
			}).catch(() => void 0);
		}
		recordStorageFailure(operation, error) {
			if (classifyCredentialProtectionFailure(error) !== "unknown") this.record(operation, error);
		}
		recover(operation) {
			const selector = this.selector(operation);
			const key = selectorKey(selector);
			const failedInProcess = this.state.failed.delete(key);
			if (!failedInProcess && this.state.recoveryChecked.has(key)) return;
			if (!failedInProcess && !this.state.registry.hasFailureSync(selector)) {
				this.state.recoveryChecked.add(key);
				return;
			}
			this.state.recoveryChecked.add(key);
			this.state.registry.clear(selector).catch(() => void 0);
		}
		selector(operation) {
			return {
				resourceId: this.options.resourceId,
				adapter: this.options.adapter,
				operation
			};
		}
	};
}));
//#endregion
//#region ../../packages/core/src/node/credential-protection/migration.ts
function scheduleCredentialFileMigration(filePath, migrate, options = {}) {
	const target = node_path.default.resolve(filePath);
	if (migrations.has(target)) return false;
	const task = Promise.resolve().then(async () => {
		if (!(await tryWithCredentialFileLock(target, async () => {
			const current = await node_fs.default.promises.readFile(target);
			const migrated = await migrate(current);
			if (!migrated || current.equals(migrated)) return;
			await writeCredentialFileAtomically(target, migrated, { verifyTemporary: options.verifyTemporary ? (temporaryBytes) => options.verifyTemporary?.(temporaryBytes, current) : void 0 });
		})).acquired) throw Object.assign(/* @__PURE__ */ new Error("credential migration lock is busy"), { code: "ELOCKED" });
	}).catch((error) => reportFailure(target, error, options.onFailure)).finally(() => {
		if (migrations.get(target) === task) migrations.delete(target);
	});
	migrations.set(target, task);
	return true;
}
async function writeCredentialFileAtomically(filePath, bytes, options = {}) {
	const target = node_path.default.resolve(filePath);
	await node_fs.default.promises.mkdir(node_path.default.dirname(target), { recursive: true });
	const mode = await readMode(target);
	const temporary = uniqueTemporaryPath(target);
	let handle;
	try {
		handle = await node_fs.default.promises.open(temporary, "wx", mode);
		await handle.writeFile(bytes);
		await handle.sync();
		await handle.close();
		handle = void 0;
		if (options.verifyTemporary) await options.verifyTemporary(await node_fs.default.promises.readFile(temporary));
		await renameWithRetry(temporary, target);
		await syncDirectory(node_path.default.dirname(target));
	} catch (error) {
		await handle?.close().catch(() => void 0);
		await node_fs.default.promises.unlink(temporary).catch(() => void 0);
		throw error;
	}
}
function writeCredentialFileAtomicallySync(filePath, bytes, options = {}) {
	const target = node_path.default.resolve(filePath);
	node_fs.default.mkdirSync(node_path.default.dirname(target), { recursive: true });
	const mode = readModeSync(target);
	const temporary = uniqueTemporaryPath(target);
	let descriptor;
	try {
		descriptor = node_fs.default.openSync(temporary, "wx", mode);
		node_fs.default.writeFileSync(descriptor, bytes);
		node_fs.default.fsyncSync(descriptor);
		node_fs.default.closeSync(descriptor);
		descriptor = void 0;
		options.verifyTemporary?.(node_fs.default.readFileSync(temporary));
		renameSyncWithRetry(temporary, target);
		syncDirectorySync(node_path.default.dirname(target));
	} catch (error) {
		if (descriptor !== void 0) try {
			node_fs.default.closeSync(descriptor);
		} catch {}
		try {
			node_fs.default.unlinkSync(temporary);
		} catch {}
		throw error;
	}
}
async function readMode(filePath) {
	try {
		return (await node_fs.default.promises.stat(filePath)).mode & 511;
	} catch (error) {
		if (isNodeError$1(error, "ENOENT")) return 384;
		throw error;
	}
}
function readModeSync(filePath) {
	try {
		return node_fs.default.statSync(filePath).mode & 511;
	} catch (error) {
		if (isNodeError$1(error, "ENOENT")) return 384;
		throw error;
	}
}
function uniqueTemporaryPath(filePath) {
	return node_path.default.join(node_path.default.dirname(filePath), `.${node_path.default.basename(filePath)}.${process.pid}.${(0, node_crypto.randomUUID)()}.tmp`);
}
async function renameWithRetry(temporary, target) {
	let previousDelayMs = RENAME_RETRY_INITIAL_DELAY_MS;
	let totalDelayMs = 0;
	for (let attempt = 0;; attempt++) try {
		await node_fs.default.promises.rename(temporary, target);
		return;
	} catch (error) {
		if (!isRetryableRenameError(error) || attempt >= RENAME_RETRY_MAX_ATTEMPTS) throw error;
		const delayMs = nextRenameRetryDelay(previousDelayMs, totalDelayMs);
		if (delayMs <= 0) throw error;
		await sleep(delayMs);
		previousDelayMs = delayMs;
		totalDelayMs += delayMs;
	}
}
function renameSyncWithRetry(temporary, target) {
	let previousDelayMs = RENAME_RETRY_INITIAL_DELAY_MS;
	let totalDelayMs = 0;
	for (let attempt = 0;; attempt++) try {
		node_fs.default.renameSync(temporary, target);
		return;
	} catch (error) {
		if (!isRetryableRenameError(error) || attempt >= RENAME_RETRY_MAX_ATTEMPTS) throw error;
		const delayMs = nextRenameRetryDelay(previousDelayMs, totalDelayMs);
		if (delayMs <= 0) throw error;
		sleepSync(delayMs);
		previousDelayMs = delayMs;
		totalDelayMs += delayMs;
	}
}
function isRetryableRenameError(error) {
	return typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" && RETRYABLE_RENAME_ERROR_CODES.has(error.code);
}
function nextRenameRetryDelay(previousDelayMs, totalDelayMs) {
	const maximumDelayMs = Math.min(previousDelayMs * 3, RENAME_RETRY_MAX_DELAY_MS);
	const randomizedDelayMs = RENAME_RETRY_INITIAL_DELAY_MS + Math.floor(Math.random() * (maximumDelayMs - RENAME_RETRY_INITIAL_DELAY_MS + 1));
	return Math.min(randomizedDelayMs, RENAME_RETRY_TOTAL_DELAY_MS - totalDelayMs);
}
function sleep(delayMs) {
	return new Promise((resolve) => setTimeout(resolve, delayMs));
}
function sleepSync(delayMs) {
	try {
		Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delayMs);
	} catch {
		const end = Date.now() + delayMs;
		while (Date.now() < end);
	}
}
async function syncDirectory(directory) {
	let handle;
	try {
		handle = await node_fs.default.promises.open(directory, "r");
		await handle.sync();
	} catch {} finally {
		await handle?.close().catch(() => void 0);
	}
}
function syncDirectorySync(directory) {
	let descriptor;
	try {
		descriptor = node_fs.default.openSync(directory, "r");
		node_fs.default.fsyncSync(descriptor);
	} catch {} finally {
		if (descriptor !== void 0) node_fs.default.closeSync(descriptor);
	}
}
function reportFailure(target, error, reporter) {
	const now = Date.now();
	if (now - (lastWarnings.get(target) ?? 0) < WARNING_INTERVAL_MS) return;
	lastWarnings.set(target, now);
	try {
		reporter?.(error);
	} catch {}
}
function isNodeError$1(error, code) {
	return typeof error === "object" && error !== null && "code" in error && error.code === code;
}
var migrations, lastWarnings, WARNING_INTERVAL_MS, RENAME_RETRY_INITIAL_DELAY_MS, RENAME_RETRY_MAX_DELAY_MS, RENAME_RETRY_MAX_ATTEMPTS, RENAME_RETRY_TOTAL_DELAY_MS, RETRYABLE_RENAME_ERROR_CODES;
var init_migration = require_rolldown_runtime.__esmMin((() => {
	init_file_lock();
	migrations = /* @__PURE__ */ new Map();
	lastWarnings = /* @__PURE__ */ new Map();
	WARNING_INTERVAL_MS = 6e4;
	RENAME_RETRY_INITIAL_DELAY_MS = 25;
	RENAME_RETRY_MAX_DELAY_MS = 750;
	RENAME_RETRY_MAX_ATTEMPTS = 9;
	RENAME_RETRY_TOTAL_DELAY_MS = 3e3;
	RETRYABLE_RENAME_ERROR_CODES = /* @__PURE__ */ new Set([
		"EACCES",
		"EAGAIN",
		"EBUSY",
		"EPERM",
		"ETXTBSY"
	]);
}));
//#endregion
//#region ../../packages/core/src/node/credential-protection/policies.ts
function isObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/**
* models.json 自定义模型的 apiKey 字段 specs（#95747）。
*
* 文件两种形态：顶层数组 `[{ apiKey }]` 或对象包裹 `{ models: [{ apiKey }] }`。
* 按实际形态返回对应通配路径，避免在错误形态上生成幻影字段。
*/
function getModelsJsonApiKeyFields(document) {
	if (Array.isArray(document)) return [{ path: ["*", "apiKey"] }];
	if (isObject(document) && Array.isArray(document.models)) return [{ path: [
		"models",
		"*",
		"apiKey"
	] }];
	return [];
}
function getUserSettingsCredentialFields(document) {
	const specs = USER_SETTINGS_CREDENTIAL_FIELDS.map((spec) => ({ path: [...spec.path] }));
	if (!isObject(document) || !isObject(document.claw)) return specs;
	appendChannelSpecs(specs, document.claw.channels, ["claw", "channels"]);
	if (isObject(document.claw.users)) {
		for (const [userId, user] of Object.entries(document.claw.users)) if (isObject(user)) appendChannelSpecs(specs, user.channels, [
			"claw",
			"users",
			userId,
			"channels"
		]);
	}
	return specs;
}
function appendChannelSpecs(specs, value, basePath) {
	if (!isObject(value)) return;
	for (const channel of Object.keys(value)) {
		specs.push({ path: [
			...basePath,
			channel,
			"registration",
			"webhookUrl"
		] });
		specs.push({ path: [
			...basePath,
			channel,
			"channelId"
		] });
		for (const key of CHANNEL_CREDENTIAL_KEYS[channel] ?? []) specs.push({ path: [
			...basePath,
			channel,
			key
		] });
	}
}
var AUTH_CREDENTIAL_FIELDS, USER_SETTINGS_CREDENTIAL_FIELDS, CHANNEL_CREDENTIAL_KEYS;
var init_policies = require_rolldown_runtime.__esmMin((() => {
	AUTH_CREDENTIAL_FIELDS = [
		{ path: ["auth", "accessToken"] },
		{ path: ["auth", "refreshToken"] },
		{ path: ["account", "phoneNumber"] },
		{ path: ["account", "departmentFullName"] },
		{ path: ["account", "nickname"] },
		{ path: [
			"accounts",
			"*",
			"phoneNumber"
		] },
		{ path: [
			"accounts",
			"*",
			"nickname"
		] },
		{ path: [
			"accounts",
			"*",
			"departmentFullName"
		] },
		{ path: [
			"allAccounts",
			"*",
			"phoneNumber"
		] },
		{ path: [
			"allAccounts",
			"*",
			"nickname"
		] },
		{ path: [
			"allAccounts",
			"*",
			"departmentFullName"
		] }
	];
	USER_SETTINGS_CREDENTIAL_FIELDS = [
		{ path: ["env", "CODEBUDDY_API_KEY"] },
		{ path: ["env", "CODEBUDDY_AUTH_TOKEN"] },
		{ path: ["gateway", "password"] },
		{ path: ["automation.wecomWebhookUrl"] },
		{ path: ["automation.wecomPushConfig", "webhookUrl"] },
		{ path: ["automation.wecomPushConfig", "botSecret"] }
	];
	CHANNEL_CREDENTIAL_KEYS = {
		feishu: [
			"appId",
			"appSecret",
			"encryptKey",
			"verificationToken",
			"secret"
		],
		wecomaibot: [
			"botSecret",
			"token",
			"encodingAESKey"
		],
		qq: ["appId", "appSecret"],
		dingtalk: [
			"appKey",
			"appSecret",
			"token",
			"aesKey"
		],
		yuanbao: ["appSecret"],
		wecomIOA: ["webhookUrl"],
		wechatkf: ["webhookUrl"],
		wecomNew: [
			"webhookUrl",
			"token",
			"encodingAESKey",
			"corpId",
			"corpSecret",
			"agentId"
		],
		custom: ["webhookUrl"],
		weixinClawBot: ["botToken"],
		slack: ["botToken", "appToken"],
		discord: ["token"],
		wechatmp: ["webhookUrl", "appSecret"],
		telegram: ["token"]
	};
}));
//#endregion
//#region ../../packages/core/src/node/credential-protection/models-json-codec.ts
/**
* 用户级 models.json 自定义模型 apiKey 字段的加解密 codec（issue #95747）。
*
* 与 createUserSettingsCredentialCodec 同构：把 WBEF1 字段编解码绑定到 models.json
* 的 apiKey 字段规格。用 `file` scope 门槛（策略 ≥ files 才写加密）。
*
* 供 ModelsJsonStorage 及直接读 user-level models.json 的消费方（CustomModelsProductProvider）
* 复用同一实现；项目级 models.json 不走本 codec（保持明文）。
*/
function createModelsJsonCredentialCodec(onUnavailable) {
	const codec = createCredentialFieldCodec({
		purpose: "workbuddy-models-json",
		resourceId: "models/user",
		scope: "file",
		onUnavailable
	});
	return {
		decode: (input) => codec.decode(input, getModelsJsonApiKeyFields(input)),
		encode: (input) => codec.encode(input, getModelsJsonApiKeyFields(input)),
		dispose: () => codec.dispose()
	};
}
var init_models_json_codec = require_rolldown_runtime.__esmMin((() => {
	init_policies();
	init_runtime();
}));
//#endregion
//#region ../../packages/core/src/node/credential-protection/models-json-storage.ts
/**
* 策略下调到 < files 后，把用户级 models.json 里已加密的 apiKey 字段主动重写回明文（#95747）。
*
* 只在 policy < files 时触发（≥ files 的升级由正常读改写完成，不在此处）。用单个 codec 实例
* decode+encode：disabled 模式下 encode 把 apiKey 落明文；仅当重编码结果与磁盘归一化后不同才
* 原子写回（加锁）。幂等——重写后磁盘已是明文，再读 encode 结果与磁盘相同，不再改盘。
* 解不开的 apiKey 密文由 codec 的 previousFields 记忆逐字节保留，不被本次重写抹除。
*
* 供 provider 在 startup 读用户级 models.json 时调用一次；项目级文件不传入本函数。
*/
async function reconcileUserModelsJsonToPolicy(filePath, logger) {
	if (require_process_cpu_sampler.atRestPolicyAtLeast(getCredentialWritePolicy(), "files")) return;
	let probe;
	try {
		probe = await node_fs.default.promises.readFile(filePath, "utf8");
	} catch (error) {
		if (!isNodeError(error, "ENOENT")) logger?.warn?.(`[ModelsJsonStorage] reconcile probe failed for ${filePath}: ${String(error)}`);
		return;
	}
	if (!isReconcilableJsonObject(probe)) return;
	try {
		await withCredentialFileLock(filePath, async () => {
			const current = await node_fs.default.promises.readFile(filePath, "utf8");
			let doc;
			try {
				doc = JSON.parse(current);
			} catch {
				return;
			}
			if (doc === null || typeof doc !== "object") return;
			const codec = createModelsJsonCredentialCodec((msg) => logger?.warn?.(msg));
			try {
				const plaintext = codec.decode(doc).value;
				const reencoded = codec.encode(plaintext);
				const next = JSON.stringify(reencoded, null, 2);
				if (next === JSON.stringify(doc, null, 2)) return;
				await writeCredentialFileAtomically(filePath, Buffer.from(next, "utf8"));
			} finally {
				codec.dispose();
			}
		});
	} catch (error) {
		logger?.warn?.(`[ModelsJsonStorage] reconcile failed for ${filePath}: ${String(error)}`);
	}
}
function isReconcilableJsonObject(content) {
	try {
		const parsed = JSON.parse(content);
		return parsed !== null && typeof parsed === "object";
	} catch {
		return false;
	}
}
function isNodeError(error, code) {
	return error instanceof Error && "code" in error && error.code === code;
}
/**
* 宽容解析手编 models.json：先按标准 JSON 解，失败后只做两步**无歧义**的修复——
* 剥 BOM、删尾随逗号，再解一次。
*
* ⚠️ 故意不做「去 // 注释」：旧版 core-service.ts 的 parseJsonWithRepair 用
* `/(?<=^|[^"\\])\/\/.*$/gm` 去注释，而该正则会把 `"url": "https://..."` 里的 `//`
* 当行注释，从此截断到行尾——models.json 每条模型都有 url，实测带 url 的尾随逗号
* 文件反而被"修"成 null。JSON 标准本就不支持注释，不值得为它牺牲 url。
*/
function parseJsonTolerantly(content) {
	const withoutBom = content.replace(/^\uFEFF/, "");
	try {
		return {
			ok: true,
			value: JSON.parse(withoutBom),
			repaired: withoutBom !== content
		};
	} catch (error) {
		const withoutTrailingCommas = dropTrailingCommas(withoutBom);
		if (withoutTrailingCommas === withoutBom) return {
			ok: false,
			error
		};
		try {
			return {
				ok: true,
				value: JSON.parse(withoutTrailingCommas),
				repaired: true
			};
		} catch {
			return {
				ok: false,
				error
			};
		}
	}
}
/**
* 删除 `,` 与其后第一个 `}` / `]` 之间只隔空白的尾随逗号。
*
* 逐字符扫描而非单条正则：`/,(\s*[}\]])/g` 连字符串字面量内部的 `,}` 一起吃，文件
* 同时有真语法错误、字符串里又含 `,}` 时（如 apiKey），修复过程会把
* `{"apiKey":"sk-x,}y"}` 静默改成 `{"apiKey":"sk-x}y"}`——修配置时篡改 apiKey 比
* 解析失败更糟。这里跳过引号内的内容（含 `\"` 转义），只在结构位置动手。
*/
function dropTrailingCommas(input) {
	let result = "";
	let inString = false;
	let escaped = false;
	for (let index = 0; index < input.length; index += 1) {
		const char = input[index];
		if (inString) {
			result += char;
			if (escaped) escaped = false;
			else if (char === "\\") escaped = true;
			else if (char === "\"") inString = false;
			continue;
		}
		if (char === "\"") {
			inString = true;
			result += char;
			continue;
		}
		if (char === ",") {
			let lookahead = index + 1;
			while (lookahead < input.length && /\s/.test(input[lookahead])) lookahead += 1;
			if (input[lookahead] === "}" || input[lookahead] === "]") continue;
		}
		result += char;
	}
	return result;
}
var ModelsJsonStorage;
var init_models_json_storage = require_rolldown_runtime.__esmMin((() => {
	require_process_cpu_sampler.init_dist();
	init_file_lock();
	init_migration();
	init_models_json_codec();
	init_runtime();
	ModelsJsonStorage = class {
		constructor(options) {
			this.options = options;
		}
		/** 仅用户级文件参与 apiKey 字段保护；项目级返回 undefined 走纯明文。 */
		createApiKeyCodec() {
			if (this.options.scope !== "user") return;
			return createModelsJsonCredentialCodec((fieldPath, error) => {
				this.options.logger?.warn?.(`[ModelsJsonStorage] apiKey field ${fieldPath} unavailable: ${String(error)}`);
			});
		}
		async read() {
			const parsed = await this.readRawParsed();
			return this.decodeApiKeys(parsed);
		}
		/**
		* 读原始 JSON（不解密）。「无可用配置」统一返回 undefined，调用方按自身数据形状
		* 兜底（如 extractLocalModels 转成 []）——这里不替调用方选 [] 或 { models: [] }，
		* 因为磁盘上顶层数组与 legacy `{ models: [...] }` 两种形态都合法。
		*
		* 无配置的三种情况：
		* 1. ENOENT——文件不存在
		* 2. 空文件 / 纯空白——0 字节 models.json 曾让保存与删除永久失败（JSON.parse('')
		*    抛 SyntaxError，而 SyntaxError 没有 .code，走不到 ENOENT 分支就抛穿到 UI）
		* 3. 内容损坏且无法安全修复——备份为 models.json.bak-<ts> 后当无配置处理，
		*    避免坏文件把整条读/存/删链路永久卡死
		*
		* 真 I/O 错误（EACCES / EIO 等）仍然抛出，不当作「无配置」：静默成空配置会让用户
		* 的模型列表凭空消失，且下一次保存就把空列表写回磁盘。注意部分调用方（如
		* core-service.getLocalCustomModels、desktop-models-repo.readModelsFile）自己
		* 又把异常兜成空列表——那是各自的既有选择，本层只保证不主动抹掉这个信号。
		*/
		async readRawParsed() {
			let content;
			try {
				content = await node_fs.default.promises.readFile(this.options.filePath, "utf8");
			} catch (error) {
				if (isNodeError(error, "ENOENT")) return;
				this.options.logger?.warn?.(`[ModelsJsonStorage] failed to read ${this.options.filePath}: ${String(error)}`);
				throw error;
			}
			if (!content.trim()) return;
			const parsed = parseJsonTolerantly(content);
			if (parsed.ok) {
				if (parsed.repaired) this.options.logger?.warn?.(`[ModelsJsonStorage] repaired malformed JSON in ${this.options.filePath}`);
				return parsed.value;
			}
			const backupPath = await this.backupCorruptedFile(content);
			this.options.logger?.warn?.(`[ModelsJsonStorage] ${this.options.filePath} is corrupted: ${String(parsed.error)}${backupPath ? `; backed up to ${backupPath}` : ""}; continuing with empty config`);
		}
		/**
		* 把已读到的损坏内容另存一份作为证据，原文件留在原地。
		*
		* 不用 rename：rename 会在 mutator 运行**之前**就把原文件移走，一旦 mutator 抛错
		* （`desktop-models-repo.updateCustom` 在模型不存在时按设计 throw）或返回
		* undefined，就再也没有写入发生，用户的 models.json 凭空消失。后续写入走
		* writeCredentialFileAtomically 本就是原子覆盖，不需要先腾位置。
		*
		* 也不用 copyFile：read 路径不持锁，readFile 与备份之间存在 TOCTOU——并发
		* update() 若已把文件原子覆盖成有效 JSON，copyFile 拷到的是新内容，却用旧损坏
		* 内容的哈希命名。这会打破「文件名哈希 ⟺ 文件内容」不变量，于是下次读到同样的
		* 损坏内容时哈希命中 EEXIST 被判定为"已备份"，真正的坏内容**永远不会**被留证。
		* 直接写入手上这份 content，备份内容与文件名哈希天生自洽。
		* （代价：content 是 utf8 解码后的字符串，原文件若含非法 UTF-8 字节，备份不是
		* 逐字节副本。相比"证据整个丢失"，这个取舍更划算。）
		*
		* 文件名用内容哈希而非时间戳，因为**只读路径不会修好损坏文件**：设置页、
		* productManager.sync、模型列表每读一次就会再走到这里，用时间戳会让
		* ~/.workbuddy/ 无上界堆积 .bak（实测 10 次只读产生 10 个文件）。同一份坏内容
		* 只留一份证据即可；内容变了才是新证据，哈希天然幂等。
		*
		* 写入失败不影响主流程：备份只为可追溯，拿不到备份也必须让保存继续。
		*/
		async backupCorruptedFile(content) {
			const digest = (0, node_crypto.createHash)("sha256").update(content, "utf8").digest("hex").slice(0, 12);
			const backupPath = `${this.options.filePath}.bak-${digest}`;
			try {
				await node_fs.default.promises.writeFile(backupPath, content, {
					encoding: "utf8",
					flag: "wx"
				});
				return backupPath;
			} catch (error) {
				if (isNodeError(error, "EEXIST")) return backupPath;
				this.options.logger?.warn?.(`[ModelsJsonStorage] failed to back up ${this.options.filePath}: ${String(error)}`);
				return;
			}
		}
		/** decrypt-by-default：持钥即解密 apiKey 密文，明文原样返回。 */
		decodeApiKeys(parsed) {
			if (parsed === void 0 || parsed === null) return parsed;
			const codec = this.createApiKeyCodec();
			if (!codec) return parsed;
			try {
				return codec.decode(parsed).value;
			} finally {
				codec.dispose();
			}
		}
		async update(mutator) {
			const action = async () => {
				const parsed = await this.readRawParsed();
				const codec = this.createApiKeyCodec();
				try {
					const next = await mutator(parsed !== void 0 && parsed !== null && codec ? codec.decode(parsed).value : parsed);
					if (next === void 0) return;
					const persisted = next !== null && codec ? codec.encode(next) : next;
					await writeCredentialFileAtomically(this.options.filePath, Buffer.from(JSON.stringify(persisted, null, 2), "utf8"));
					return next;
				} finally {
					codec?.dispose();
				}
			};
			try {
				return await (this.options.scope === "user" ? withCredentialFileLock(this.options.filePath, action) : action());
			} catch (error) {
				this.options.logger?.warn?.(`[ModelsJsonStorage] failed to update ${this.options.filePath}: ${String(error)}`);
				throw error;
			}
		}
		async write(value) {
			await this.update(() => value);
		}
	};
}));
//#endregion
//#region ../../packages/core/src/node/credential-protection/user-settings-codec.ts
function createUserSettingsCredentialCodec(onUnavailable) {
	const codec = createCredentialFieldCodec({
		purpose: "workbuddy-user-settings",
		resourceId: "settings/user",
		onUnavailable
	});
	return {
		decode: (input) => codec.decode(input, getUserSettingsCredentialFields(input)),
		encode: (input) => codec.encode(input, getUserSettingsCredentialFields(input)),
		dispose: () => codec.dispose()
	};
}
var init_user_settings_codec = require_rolldown_runtime.__esmMin((() => {
	init_policies();
	init_runtime();
}));
//#endregion
//#region ../../packages/core/src/node/credential-protection/index.ts
var init_credential_protection = require_rolldown_runtime.__esmMin((() => {
	init_file_lock();
	init_failure_reporter();
	init_migration();
	init_models_json_codec();
	init_models_json_storage();
	init_policies();
	init_runtime();
	init_user_settings_codec();
}));
//#endregion
Object.defineProperty(exports, "AUTH_CREDENTIAL_FIELDS", {
	enumerable: true,
	get: function() {
		return AUTH_CREDENTIAL_FIELDS;
	}
});
Object.defineProperty(exports, "CredentialProtectionFailureReporter", {
	enumerable: true,
	get: function() {
		return CredentialProtectionFailureReporter;
	}
});
Object.defineProperty(exports, "ModelsJsonStorage", {
	enumerable: true,
	get: function() {
		return ModelsJsonStorage;
	}
});
Object.defineProperty(exports, "configureCredentialProtection", {
	enumerable: true,
	get: function() {
		return configureCredentialProtection;
	}
});
Object.defineProperty(exports, "createCredentialFieldCodec", {
	enumerable: true,
	get: function() {
		return createCredentialFieldCodec;
	}
});
Object.defineProperty(exports, "createCredentialWholeFileCodec", {
	enumerable: true,
	get: function() {
		return createCredentialWholeFileCodec;
	}
});
Object.defineProperty(exports, "createModelsJsonCredentialCodec", {
	enumerable: true,
	get: function() {
		return createModelsJsonCredentialCodec;
	}
});
Object.defineProperty(exports, "createUserSettingsCredentialCodec", {
	enumerable: true,
	get: function() {
		return createUserSettingsCredentialCodec;
	}
});
Object.defineProperty(exports, "disposeCredentialProtection", {
	enumerable: true,
	get: function() {
		return disposeCredentialProtection;
	}
});
Object.defineProperty(exports, "getCredentialProtectionState", {
	enumerable: true,
	get: function() {
		return getCredentialProtectionState;
	}
});
Object.defineProperty(exports, "getCredentialWritePolicy", {
	enumerable: true,
	get: function() {
		return getCredentialWritePolicy;
	}
});
Object.defineProperty(exports, "init_credential_protection", {
	enumerable: true,
	get: function() {
		return init_credential_protection;
	}
});
Object.defineProperty(exports, "init_failure_reporter", {
	enumerable: true,
	get: function() {
		return init_failure_reporter;
	}
});
Object.defineProperty(exports, "init_file_lock", {
	enumerable: true,
	get: function() {
		return init_file_lock;
	}
});
Object.defineProperty(exports, "init_migration", {
	enumerable: true,
	get: function() {
		return init_migration;
	}
});
Object.defineProperty(exports, "init_models_json_codec", {
	enumerable: true,
	get: function() {
		return init_models_json_codec;
	}
});
Object.defineProperty(exports, "init_models_json_storage", {
	enumerable: true,
	get: function() {
		return init_models_json_storage;
	}
});
Object.defineProperty(exports, "init_policies", {
	enumerable: true,
	get: function() {
		return init_policies;
	}
});
Object.defineProperty(exports, "init_runtime", {
	enumerable: true,
	get: function() {
		return init_runtime;
	}
});
Object.defineProperty(exports, "init_user_settings_codec", {
	enumerable: true,
	get: function() {
		return init_user_settings_codec;
	}
});
Object.defineProperty(exports, "isWholeFileProtectionReady", {
	enumerable: true,
	get: function() {
		return isWholeFileProtectionReady;
	}
});
Object.defineProperty(exports, "reconcileUserModelsJsonToPolicy", {
	enumerable: true,
	get: function() {
		return reconcileUserModelsJsonToPolicy;
	}
});
Object.defineProperty(exports, "require_graceful_fs", {
	enumerable: true,
	get: function() {
		return require_graceful_fs;
	}
});
Object.defineProperty(exports, "scheduleCredentialFileMigration", {
	enumerable: true,
	get: function() {
		return scheduleCredentialFileMigration;
	}
});
Object.defineProperty(exports, "setCredentialProtectionPending", {
	enumerable: true,
	get: function() {
		return setCredentialProtectionPending;
	}
});
Object.defineProperty(exports, "withCredentialFileLock", {
	enumerable: true,
	get: function() {
		return withCredentialFileLock;
	}
});
Object.defineProperty(exports, "writeCredentialFileAtomically", {
	enumerable: true,
	get: function() {
		return writeCredentialFileAtomically;
	}
});
Object.defineProperty(exports, "writeCredentialFileAtomicallySync", {
	enumerable: true,
	get: function() {
		return writeCredentialFileAtomicallySync;
	}
});
