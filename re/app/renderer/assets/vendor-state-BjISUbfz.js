import { n as __esmMin, s as __toESM } from "./rolldown-runtime-V4kyJ4NV.js";
import { $st as init_tslib_es6, Jst as __read, Qst as __values, Wst as __extends, Xst as __spreadArray } from "./ui-docs-viewer-Bo02yf1Q.js";
import { Ev as require_react, Tv as require_jsx_runtime } from "./lib-chat-ui-D8Ji0f8n.js";
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
	return typeof value === "function";
}
var init_isFunction = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
	var _super = function(instance) {
		Error.call(instance);
		instance.stack = (/* @__PURE__ */ new Error()).stack;
	};
	var ctorFunc = createImpl(_super);
	ctorFunc.prototype = Object.create(Error.prototype);
	ctorFunc.prototype.constructor = ctorFunc;
	return ctorFunc;
}
var init_createErrorClass = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError;
var init_UnsubscriptionError = __esmMin((() => {
	init_createErrorClass();
	UnsubscriptionError = createErrorClass(function(_super) {
		return function UnsubscriptionErrorImpl(errors) {
			_super(this);
			this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
				return i + 1 + ") " + err.toString();
			}).join("\n  ") : "";
			this.name = "UnsubscriptionError";
			this.errors = errors;
		};
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
	if (arr) {
		var index = arr.indexOf(item);
		0 <= index && arr.splice(index, 1);
	}
}
var init_arrRemove = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscription.js
function isSubscription(value) {
	return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
	if (isFunction(finalizer)) finalizer();
	else finalizer.unsubscribe();
}
var Subscription, EMPTY_SUBSCRIPTION;
var init_Subscription = __esmMin((() => {
	init_tslib_es6();
	init_isFunction();
	init_UnsubscriptionError();
	init_arrRemove();
	Subscription = function() {
		function Subscription(initialTeardown) {
			this.initialTeardown = initialTeardown;
			this.closed = false;
			this._parentage = null;
			this._finalizers = null;
		}
		Subscription.prototype.unsubscribe = function() {
			var e_1, _a, e_2, _b;
			var errors;
			if (!this.closed) {
				this.closed = true;
				var _parentage = this._parentage;
				if (_parentage) {
					this._parentage = null;
					if (Array.isArray(_parentage)) try {
						for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) _parentage_1_1.value.remove(this);
					} catch (e_1_1) {
						e_1 = { error: e_1_1 };
					} finally {
						try {
							if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
						} finally {
							if (e_1) throw e_1.error;
						}
					}
					else _parentage.remove(this);
				}
				var initialFinalizer = this.initialTeardown;
				if (isFunction(initialFinalizer)) try {
					initialFinalizer();
				} catch (e) {
					errors = e instanceof UnsubscriptionError ? e.errors : [e];
				}
				var _finalizers = this._finalizers;
				if (_finalizers) {
					this._finalizers = null;
					try {
						for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
							var finalizer = _finalizers_1_1.value;
							try {
								execFinalizer(finalizer);
							} catch (err) {
								errors = errors !== null && errors !== void 0 ? errors : [];
								if (err instanceof UnsubscriptionError) errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
								else errors.push(err);
							}
						}
					} catch (e_2_1) {
						e_2 = { error: e_2_1 };
					} finally {
						try {
							if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
						} finally {
							if (e_2) throw e_2.error;
						}
					}
				}
				if (errors) throw new UnsubscriptionError(errors);
			}
		};
		Subscription.prototype.add = function(teardown) {
			var _a;
			if (teardown && teardown !== this) {
				if (this.closed) execFinalizer(teardown);
				else {
					if (teardown instanceof Subscription) {
						if (teardown.closed || teardown._hasParent(this)) return;
						teardown._addParent(this);
					}
					(this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
				}
			}
		};
		Subscription.prototype._hasParent = function(parent) {
			var _parentage = this._parentage;
			return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
		};
		Subscription.prototype._addParent = function(parent) {
			var _parentage = this._parentage;
			this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
		};
		Subscription.prototype._removeParent = function(parent) {
			var _parentage = this._parentage;
			if (_parentage === parent) this._parentage = null;
			else if (Array.isArray(_parentage)) arrRemove(_parentage, parent);
		};
		Subscription.prototype.remove = function(teardown) {
			var _finalizers = this._finalizers;
			_finalizers && arrRemove(_finalizers, teardown);
			if (teardown instanceof Subscription) teardown._removeParent(this);
		};
		Subscription.EMPTY = (function() {
			var empty = new Subscription();
			empty.closed = true;
			return empty;
		})();
		return Subscription;
	}();
	EMPTY_SUBSCRIPTION = Subscription.EMPTY;
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/config.js
var config;
var init_config = __esmMin((() => {
	config = {
		onUnhandledError: null,
		onStoppedNotification: null,
		Promise: void 0,
		useDeprecatedSynchronousErrorHandling: false,
		useDeprecatedNextContext: false
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider;
var init_timeoutProvider = __esmMin((() => {
	init_tslib_es6();
	timeoutProvider = {
		setTimeout: function(handler, timeout) {
			var args = [];
			for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
			var delegate = timeoutProvider.delegate;
			if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
			return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
		},
		clearTimeout: function(handle) {
			var delegate = timeoutProvider.delegate;
			return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
		},
		delegate: void 0
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err) {
	timeoutProvider.setTimeout(function() {
		var onUnhandledError = config.onUnhandledError;
		if (onUnhandledError) onUnhandledError(err);
		else throw err;
	});
}
var init_reportUnhandledError = __esmMin((() => {
	init_config();
	init_timeoutProvider();
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() {}
var init_noop = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
function errorNotification(error) {
	return createNotification("E", void 0, error);
}
function nextNotification(value) {
	return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
	return {
		kind,
		value,
		error
	};
}
var COMPLETE_NOTIFICATION;
var init_NotificationFactories = __esmMin((() => {
	COMPLETE_NOTIFICATION = (function() {
		return createNotification("C", void 0, void 0);
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
function errorContext(cb) {
	if (config.useDeprecatedSynchronousErrorHandling) {
		var isRoot = !context;
		if (isRoot) context = {
			errorThrown: false,
			error: null
		};
		cb();
		if (isRoot) {
			var _a = context, errorThrown = _a.errorThrown, error = _a.error;
			context = null;
			if (errorThrown) throw error;
		}
	} else cb();
}
function captureError(err) {
	if (config.useDeprecatedSynchronousErrorHandling && context) {
		context.errorThrown = true;
		context.error = err;
	}
}
var context;
var init_errorContext = __esmMin((() => {
	init_config();
	context = null;
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscriber.js
function bind(fn, thisArg) {
	return _bind.call(fn, thisArg);
}
function handleUnhandledError(error) {
	if (config.useDeprecatedSynchronousErrorHandling) captureError(error);
	else reportUnhandledError(error);
}
function defaultErrorHandler(err) {
	throw err;
}
function handleStoppedNotification(notification, subscriber) {
	var onStoppedNotification = config.onStoppedNotification;
	onStoppedNotification && timeoutProvider.setTimeout(function() {
		return onStoppedNotification(notification, subscriber);
	});
}
var Subscriber, _bind, ConsumerObserver, SafeSubscriber, EMPTY_OBSERVER;
var init_Subscriber = __esmMin((() => {
	init_tslib_es6();
	init_isFunction();
	init_Subscription();
	init_config();
	init_reportUnhandledError();
	init_noop();
	init_NotificationFactories();
	init_timeoutProvider();
	init_errorContext();
	Subscriber = function(_super) {
		__extends(Subscriber, _super);
		function Subscriber(destination) {
			var _this = _super.call(this) || this;
			_this.isStopped = false;
			if (destination) {
				_this.destination = destination;
				if (isSubscription(destination)) destination.add(_this);
			} else _this.destination = EMPTY_OBSERVER;
			return _this;
		}
		Subscriber.create = function(next, error, complete) {
			return new SafeSubscriber(next, error, complete);
		};
		Subscriber.prototype.next = function(value) {
			if (this.isStopped) handleStoppedNotification(nextNotification(value), this);
			else this._next(value);
		};
		Subscriber.prototype.error = function(err) {
			if (this.isStopped) handleStoppedNotification(errorNotification(err), this);
			else {
				this.isStopped = true;
				this._error(err);
			}
		};
		Subscriber.prototype.complete = function() {
			if (this.isStopped) handleStoppedNotification(COMPLETE_NOTIFICATION, this);
			else {
				this.isStopped = true;
				this._complete();
			}
		};
		Subscriber.prototype.unsubscribe = function() {
			if (!this.closed) {
				this.isStopped = true;
				_super.prototype.unsubscribe.call(this);
				this.destination = null;
			}
		};
		Subscriber.prototype._next = function(value) {
			this.destination.next(value);
		};
		Subscriber.prototype._error = function(err) {
			try {
				this.destination.error(err);
			} finally {
				this.unsubscribe();
			}
		};
		Subscriber.prototype._complete = function() {
			try {
				this.destination.complete();
			} finally {
				this.unsubscribe();
			}
		};
		return Subscriber;
	}(Subscription);
	_bind = Function.prototype.bind;
	ConsumerObserver = function() {
		function ConsumerObserver(partialObserver) {
			this.partialObserver = partialObserver;
		}
		ConsumerObserver.prototype.next = function(value) {
			var partialObserver = this.partialObserver;
			if (partialObserver.next) try {
				partialObserver.next(value);
			} catch (error) {
				handleUnhandledError(error);
			}
		};
		ConsumerObserver.prototype.error = function(err) {
			var partialObserver = this.partialObserver;
			if (partialObserver.error) try {
				partialObserver.error(err);
			} catch (error) {
				handleUnhandledError(error);
			}
			else handleUnhandledError(err);
		};
		ConsumerObserver.prototype.complete = function() {
			var partialObserver = this.partialObserver;
			if (partialObserver.complete) try {
				partialObserver.complete();
			} catch (error) {
				handleUnhandledError(error);
			}
		};
		return ConsumerObserver;
	}();
	SafeSubscriber = function(_super) {
		__extends(SafeSubscriber, _super);
		function SafeSubscriber(observerOrNext, error, complete) {
			var _this = _super.call(this) || this;
			var partialObserver;
			if (isFunction(observerOrNext) || !observerOrNext) partialObserver = {
				next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
				error: error !== null && error !== void 0 ? error : void 0,
				complete: complete !== null && complete !== void 0 ? complete : void 0
			};
			else {
				var context_1;
				if (_this && config.useDeprecatedNextContext) {
					context_1 = Object.create(observerOrNext);
					context_1.unsubscribe = function() {
						return _this.unsubscribe();
					};
					partialObserver = {
						next: observerOrNext.next && bind(observerOrNext.next, context_1),
						error: observerOrNext.error && bind(observerOrNext.error, context_1),
						complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
					};
				} else partialObserver = observerOrNext;
			}
			_this.destination = new ConsumerObserver(partialObserver);
			return _this;
		}
		return SafeSubscriber;
	}(Subscriber);
	EMPTY_OBSERVER = {
		closed: true,
		next: noop,
		error: defaultErrorHandler,
		complete: noop
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable;
var init_observable = __esmMin((() => {
	observable = (function() {
		return typeof Symbol === "function" && Symbol.observable || "@@observable";
	})();
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
	return x;
}
var init_identity = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipeFromArray(fns) {
	if (fns.length === 0) return identity;
	if (fns.length === 1) return fns[0];
	return function piped(input) {
		return fns.reduce(function(prev, fn) {
			return fn(prev);
		}, input);
	};
}
var init_pipe = __esmMin((() => {
	init_identity();
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Observable.js
function getPromiseCtor(promiseCtor) {
	var _a;
	return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
	return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
	return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
var Observable;
var init_Observable = __esmMin((() => {
	init_Subscriber();
	init_Subscription();
	init_observable();
	init_pipe();
	init_config();
	init_isFunction();
	init_errorContext();
	Observable = function() {
		function Observable(subscribe) {
			if (subscribe) this._subscribe = subscribe;
		}
		Observable.prototype.lift = function(operator) {
			var observable = new Observable();
			observable.source = this;
			observable.operator = operator;
			return observable;
		};
		Observable.prototype.subscribe = function(observerOrNext, error, complete) {
			var _this = this;
			var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
			errorContext(function() {
				var _a = _this, operator = _a.operator, source = _a.source;
				subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
			});
			return subscriber;
		};
		Observable.prototype._trySubscribe = function(sink) {
			try {
				return this._subscribe(sink);
			} catch (err) {
				sink.error(err);
			}
		};
		Observable.prototype.forEach = function(next, promiseCtor) {
			var _this = this;
			promiseCtor = getPromiseCtor(promiseCtor);
			return new promiseCtor(function(resolve, reject) {
				var subscriber = new SafeSubscriber({
					next: function(value) {
						try {
							next(value);
						} catch (err) {
							reject(err);
							subscriber.unsubscribe();
						}
					},
					error: reject,
					complete: resolve
				});
				_this.subscribe(subscriber);
			});
		};
		Observable.prototype._subscribe = function(subscriber) {
			var _a;
			return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
		};
		Observable.prototype[observable] = function() {
			return this;
		};
		Observable.prototype.pipe = function() {
			var operations = [];
			for (var _i = 0; _i < arguments.length; _i++) operations[_i] = arguments[_i];
			return pipeFromArray(operations)(this);
		};
		Observable.prototype.toPromise = function(promiseCtor) {
			var _this = this;
			promiseCtor = getPromiseCtor(promiseCtor);
			return new promiseCtor(function(resolve, reject) {
				var value;
				_this.subscribe(function(x) {
					return value = x;
				}, function(err) {
					return reject(err);
				}, function() {
					return resolve(value);
				});
			});
		};
		Observable.create = function(subscribe) {
			return new Observable(subscribe);
		};
		return Observable;
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/lift.js
function hasLift(source) {
	return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
	return function(source) {
		if (hasLift(source)) return source.lift(function(liftedSource) {
			try {
				return init(liftedSource, this);
			} catch (err) {
				this.error(err);
			}
		});
		throw new TypeError("Unable to lift unknown Observable type");
	};
}
var init_lift = __esmMin((() => {
	init_isFunction();
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
	return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber;
var init_OperatorSubscriber = __esmMin((() => {
	init_tslib_es6();
	init_Subscriber();
	OperatorSubscriber = function(_super) {
		__extends(OperatorSubscriber, _super);
		function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
			var _this = _super.call(this, destination) || this;
			_this.onFinalize = onFinalize;
			_this.shouldUnsubscribe = shouldUnsubscribe;
			_this._next = onNext ? function(value) {
				try {
					onNext(value);
				} catch (err) {
					destination.error(err);
				}
			} : _super.prototype._next;
			_this._error = onError ? function(err) {
				try {
					onError(err);
				} catch (err) {
					destination.error(err);
				} finally {
					this.unsubscribe();
				}
			} : _super.prototype._error;
			_this._complete = onComplete ? function() {
				try {
					onComplete();
				} catch (err) {
					destination.error(err);
				} finally {
					this.unsubscribe();
				}
			} : _super.prototype._complete;
			return _this;
		}
		OperatorSubscriber.prototype.unsubscribe = function() {
			var _a;
			if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
				var closed_1 = this.closed;
				_super.prototype.unsubscribe.call(this);
				!closed_1 && ((_a = this.onFinalize) === null || _a === void 0 || _a.call(this));
			}
		};
		return OperatorSubscriber;
	}(Subscriber);
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
var ObjectUnsubscribedError;
var init_ObjectUnsubscribedError = __esmMin((() => {
	init_createErrorClass();
	ObjectUnsubscribedError = createErrorClass(function(_super) {
		return function ObjectUnsubscribedErrorImpl() {
			_super(this);
			this.name = "ObjectUnsubscribedError";
			this.message = "object unsubscribed";
		};
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subject.js
var Subject, AnonymousSubject;
var init_Subject = __esmMin((() => {
	init_tslib_es6();
	init_Observable();
	init_Subscription();
	init_ObjectUnsubscribedError();
	init_arrRemove();
	init_errorContext();
	Subject = function(_super) {
		__extends(Subject, _super);
		function Subject() {
			var _this = _super.call(this) || this;
			_this.closed = false;
			_this.currentObservers = null;
			_this.observers = [];
			_this.isStopped = false;
			_this.hasError = false;
			_this.thrownError = null;
			return _this;
		}
		Subject.prototype.lift = function(operator) {
			var subject = new AnonymousSubject(this, this);
			subject.operator = operator;
			return subject;
		};
		Subject.prototype._throwIfClosed = function() {
			if (this.closed) throw new ObjectUnsubscribedError();
		};
		Subject.prototype.next = function(value) {
			var _this = this;
			errorContext(function() {
				var e_1, _a;
				_this._throwIfClosed();
				if (!_this.isStopped) {
					if (!_this.currentObservers) _this.currentObservers = Array.from(_this.observers);
					try {
						for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) _c.value.next(value);
					} catch (e_1_1) {
						e_1 = { error: e_1_1 };
					} finally {
						try {
							if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
						} finally {
							if (e_1) throw e_1.error;
						}
					}
				}
			});
		};
		Subject.prototype.error = function(err) {
			var _this = this;
			errorContext(function() {
				_this._throwIfClosed();
				if (!_this.isStopped) {
					_this.hasError = _this.isStopped = true;
					_this.thrownError = err;
					var observers = _this.observers;
					while (observers.length) observers.shift().error(err);
				}
			});
		};
		Subject.prototype.complete = function() {
			var _this = this;
			errorContext(function() {
				_this._throwIfClosed();
				if (!_this.isStopped) {
					_this.isStopped = true;
					var observers = _this.observers;
					while (observers.length) observers.shift().complete();
				}
			});
		};
		Subject.prototype.unsubscribe = function() {
			this.isStopped = this.closed = true;
			this.observers = this.currentObservers = null;
		};
		Object.defineProperty(Subject.prototype, "observed", {
			get: function() {
				var _a;
				return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
			},
			enumerable: false,
			configurable: true
		});
		Subject.prototype._trySubscribe = function(subscriber) {
			this._throwIfClosed();
			return _super.prototype._trySubscribe.call(this, subscriber);
		};
		Subject.prototype._subscribe = function(subscriber) {
			this._throwIfClosed();
			this._checkFinalizedStatuses(subscriber);
			return this._innerSubscribe(subscriber);
		};
		Subject.prototype._innerSubscribe = function(subscriber) {
			var _this = this;
			var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
			if (hasError || isStopped) return EMPTY_SUBSCRIPTION;
			this.currentObservers = null;
			observers.push(subscriber);
			return new Subscription(function() {
				_this.currentObservers = null;
				arrRemove(observers, subscriber);
			});
		};
		Subject.prototype._checkFinalizedStatuses = function(subscriber) {
			var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
			if (hasError) subscriber.error(thrownError);
			else if (isStopped) subscriber.complete();
		};
		Subject.prototype.asObservable = function() {
			var observable = new Observable();
			observable.source = this;
			return observable;
		};
		Subject.create = function(destination, source) {
			return new AnonymousSubject(destination, source);
		};
		return Subject;
	}(Observable);
	AnonymousSubject = function(_super) {
		__extends(AnonymousSubject, _super);
		function AnonymousSubject(destination, source) {
			var _this = _super.call(this) || this;
			_this.destination = destination;
			_this.source = source;
			return _this;
		}
		AnonymousSubject.prototype.next = function(value) {
			var _a, _b;
			(_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 || _b.call(_a, value);
		};
		AnonymousSubject.prototype.error = function(err) {
			var _a, _b;
			(_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 || _b.call(_a, err);
		};
		AnonymousSubject.prototype.complete = function() {
			var _a, _b;
			(_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 || _b.call(_a);
		};
		AnonymousSubject.prototype._subscribe = function(subscriber) {
			var _a, _b;
			return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
		};
		return AnonymousSubject;
	}(Subject);
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js
var BehaviorSubject;
var init_BehaviorSubject = __esmMin((() => {
	init_tslib_es6();
	init_Subject();
	BehaviorSubject = function(_super) {
		__extends(BehaviorSubject, _super);
		function BehaviorSubject(_value) {
			var _this = _super.call(this) || this;
			_this._value = _value;
			return _this;
		}
		Object.defineProperty(BehaviorSubject.prototype, "value", {
			get: function() {
				return this.getValue();
			},
			enumerable: false,
			configurable: true
		});
		BehaviorSubject.prototype._subscribe = function(subscriber) {
			var subscription = _super.prototype._subscribe.call(this, subscriber);
			!subscription.closed && subscriber.next(this._value);
			return subscription;
		};
		BehaviorSubject.prototype.getValue = function() {
			var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
			if (hasError) throw thrownError;
			this._throwIfClosed();
			return _value;
		};
		BehaviorSubject.prototype.next = function(value) {
			_super.prototype.next.call(this, this._value = value);
		};
		return BehaviorSubject;
	}(Subject);
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/types.js
var init_types = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js
function distinctUntilChanged(comparator, keySelector) {
	if (keySelector === void 0) keySelector = identity;
	comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
	return operate(function(source, subscriber) {
		var previousKey;
		var first = true;
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			var currentKey = keySelector(value);
			if (first || !comparator(previousKey, currentKey)) {
				first = false;
				previousKey = currentKey;
				subscriber.next(value);
			}
		}));
	});
}
function defaultCompare(a, b) {
	return a === b;
}
var init_distinctUntilChanged = __esmMin((() => {
	init_identity();
	init_lift();
	init_OperatorSubscriber();
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/index.js
var init_esm5 = __esmMin((() => {
	init_Observable();
	init_Subscription();
	init_lift();
	init_OperatorSubscriber();
	init_observable();
	init_Subject();
	init_BehaviorSubject();
	init_Subscriber();
	init_reportUnhandledError();
	init_pipe();
	init_ObjectUnsubscribedError();
	init_UnsubscriptionError();
	init_types();
	init_config();
	init_distinctUntilChanged();
}));
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/operators/index.js
var init_operators = __esmMin((() => {
	init_lift();
	init_Observable();
	init_observable();
	init_reportUnhandledError();
	init_OperatorSubscriber();
	init_Subscription();
	init_pipe();
	init_Subject();
	init_distinctUntilChanged();
	init_BehaviorSubject();
	init_Subscriber();
}));
//#endregion
//#region ../../node_modules/.pnpm/jotai@2.11.0_@types+react@18.3.20_react@18.3.1/node_modules/jotai/esm/vanilla.mjs
function atom(read, write) {
	const key = `atom${++keyCount}`;
	const config = { toString() {
		return key;
	} };
	if (typeof read === "function") config.read = read;
	else {
		config.init = read;
		config.read = defaultRead$1;
		config.write = defaultWrite$1;
	}
	if (write) config.write = write;
	return config;
}
function defaultRead$1(get) {
	return get(this);
}
function defaultWrite$1(get, set, arg) {
	return set(this, typeof arg === "function" ? arg(get(this)) : arg);
}
var keyCount, isSelfAtom, hasInitialValue, isActuallyWritableAtom, cancelablePromiseMap, isPendingPromise, cancelPromise, patchPromiseForCancelability, isPromiseLike$1, isAtomStateInitialized, returnAtomValue, addPendingPromiseToDependency, addDependency, createBatch, addBatchFunc, registerBatchAtom, addBatchAtomDependent, getBatchAtomDependents, flushBatch, buildStore, createStore, defaultStore, getDefaultStore;
var init_vanilla = __esmMin((() => {
	keyCount = 0;
	isSelfAtom = (atom, a) => atom.unstable_is ? atom.unstable_is(a) : a === atom;
	hasInitialValue = (atom) => "init" in atom;
	isActuallyWritableAtom = (atom) => !!atom.write;
	cancelablePromiseMap = /* @__PURE__ */ new WeakMap();
	isPendingPromise = (value) => {
		var _a;
		return isPromiseLike$1(value) && !((_a = cancelablePromiseMap.get(value)) == null ? void 0 : _a[1]);
	};
	cancelPromise = (promise, nextValue) => {
		const promiseState = cancelablePromiseMap.get(promise);
		if (promiseState) {
			promiseState[1] = true;
			promiseState[0].forEach((fn) => fn(nextValue));
		}
	};
	patchPromiseForCancelability = (promise) => {
		if (cancelablePromiseMap.has(promise)) return;
		const promiseState = [/* @__PURE__ */ new Set(), false];
		cancelablePromiseMap.set(promise, promiseState);
		const settle = () => {
			promiseState[1] = true;
		};
		promise.then(settle, settle);
		promise.onCancel = (fn) => {
			promiseState[0].add(fn);
		};
	};
	isPromiseLike$1 = (x) => typeof (x == null ? void 0 : x.then) === "function";
	isAtomStateInitialized = (atomState) => "v" in atomState || "e" in atomState;
	returnAtomValue = (atomState) => {
		if ("e" in atomState) throw atomState.e;
		return atomState.v;
	};
	addPendingPromiseToDependency = (atom, promise, dependencyAtomState) => {
		if (!dependencyAtomState.p.has(atom)) {
			dependencyAtomState.p.add(atom);
			promise.then(() => {
				dependencyAtomState.p.delete(atom);
			}, () => {
				dependencyAtomState.p.delete(atom);
			});
		}
	};
	addDependency = (batch, atom, atomState, a, aState) => {
		var _a;
		atomState.d.set(a, aState.n);
		if (isPendingPromise(atomState.v)) addPendingPromiseToDependency(atom, atomState.v, aState);
		(_a = aState.m) == null || _a.t.add(atom);
		if (batch) addBatchAtomDependent(batch, a, atom);
	};
	createBatch = () => ({
		D: /* @__PURE__ */ new Map(),
		H: /* @__PURE__ */ new Set(),
		M: /* @__PURE__ */ new Set(),
		L: /* @__PURE__ */ new Set()
	});
	addBatchFunc = (batch, priority, fn) => {
		batch[priority].add(fn);
	};
	registerBatchAtom = (batch, atom, atomState) => {
		if (!batch.D.has(atom)) {
			batch.D.set(atom, /* @__PURE__ */ new Set());
			addBatchFunc(batch, "M", () => {
				var _a;
				(_a = atomState.m) == null || _a.l.forEach((listener) => addBatchFunc(batch, "M", listener));
			});
		}
	};
	addBatchAtomDependent = (batch, atom, dependent) => {
		const dependents = batch.D.get(atom);
		if (dependents) dependents.add(dependent);
	};
	getBatchAtomDependents = (batch, atom) => batch.D.get(atom);
	flushBatch = (batch) => {
		let error;
		let hasError = false;
		const call = (fn) => {
			try {
				fn();
			} catch (e) {
				if (!hasError) {
					error = e;
					hasError = true;
				}
			}
		};
		while (batch.H.size || batch.M.size || batch.L.size) {
			batch.D.clear();
			batch.H.forEach(call);
			batch.H.clear();
			batch.M.forEach(call);
			batch.M.clear();
			batch.L.forEach(call);
			batch.L.clear();
		}
		if (hasError) throw error;
	};
	buildStore = (...[getAtomState, atomRead, atomWrite, atomOnMount]) => {
		const setAtomStateValueOrPromise = (atom, atomState, valueOrPromise) => {
			const hasPrevValue = "v" in atomState;
			const prevValue = atomState.v;
			const pendingPromise = isPendingPromise(atomState.v) ? atomState.v : null;
			if (isPromiseLike$1(valueOrPromise)) {
				patchPromiseForCancelability(valueOrPromise);
				for (const a of atomState.d.keys()) addPendingPromiseToDependency(atom, valueOrPromise, getAtomState(a));
				atomState.v = valueOrPromise;
			} else atomState.v = valueOrPromise;
			delete atomState.e;
			delete atomState.x;
			if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
				++atomState.n;
				if (pendingPromise) cancelPromise(pendingPromise, valueOrPromise);
			}
		};
		const readAtomState = (batch, atom) => {
			var _a;
			const atomState = getAtomState(atom);
			if (isAtomStateInitialized(atomState)) {
				if (atomState.m && !atomState.x) return atomState;
				if (Array.from(atomState.d).every(([a, n]) => readAtomState(batch, a).n === n)) return atomState;
			}
			atomState.d.clear();
			let isSync = true;
			const getter = (a) => {
				if (isSelfAtom(atom, a)) {
					const aState2 = getAtomState(a);
					if (!isAtomStateInitialized(aState2)) {
						if (hasInitialValue(a)) setAtomStateValueOrPromise(a, aState2, a.init);
						else throw new Error("no atom init");
					}
					return returnAtomValue(aState2);
				}
				const aState = readAtomState(batch, a);
				try {
					return returnAtomValue(aState);
				} finally {
					if (isSync) addDependency(batch, atom, atomState, a, aState);
					else {
						const batch2 = createBatch();
						addDependency(batch2, atom, atomState, a, aState);
						mountDependencies(batch2, atom, atomState);
						flushBatch(batch2);
					}
				}
			};
			let controller;
			let setSelf;
			const options = {
				get signal() {
					if (!controller) controller = new AbortController();
					return controller.signal;
				},
				get setSelf() {
					if (!setSelf && isActuallyWritableAtom(atom)) setSelf = (...args) => {
						if (!isSync) return writeAtom(atom, ...args);
					};
					return setSelf;
				}
			};
			try {
				const valueOrPromise = atomRead(atom, getter, options);
				setAtomStateValueOrPromise(atom, atomState, valueOrPromise);
				if (isPromiseLike$1(valueOrPromise)) {
					(_a = valueOrPromise.onCancel) == null || _a.call(valueOrPromise, () => controller == null ? void 0 : controller.abort());
					const complete = () => {
						if (atomState.m) {
							const batch2 = createBatch();
							mountDependencies(batch2, atom, atomState);
							flushBatch(batch2);
						}
					};
					valueOrPromise.then(complete, complete);
				}
				return atomState;
			} catch (error) {
				delete atomState.v;
				atomState.e = error;
				delete atomState.x;
				++atomState.n;
				return atomState;
			} finally {
				isSync = false;
			}
		};
		const readAtom = (atom) => returnAtomValue(readAtomState(void 0, atom));
		const getMountedOrBatchDependents = (batch, atom, atomState) => {
			var _a, _b;
			const dependents = /* @__PURE__ */ new Map();
			for (const a of ((_a = atomState.m) == null ? void 0 : _a.t) || []) {
				const aState = getAtomState(a);
				if (aState.m) dependents.set(a, aState);
			}
			for (const atomWithPendingPromise of atomState.p) dependents.set(atomWithPendingPromise, getAtomState(atomWithPendingPromise));
			(_b = getBatchAtomDependents(batch, atom)) == null || _b.forEach((dependent) => {
				dependents.set(dependent, getAtomState(dependent));
			});
			return dependents;
		};
		const recomputeDependents = (batch, atom, atomState) => {
			const topSortedReversed = [];
			const visiting = /* @__PURE__ */ new Set();
			const visited = /* @__PURE__ */ new Set();
			const stack = [[atom, atomState]];
			while (stack.length > 0) {
				const [a, aState] = stack[stack.length - 1];
				if (visited.has(a)) {
					stack.pop();
					continue;
				}
				if (visiting.has(a)) {
					topSortedReversed.push([
						a,
						aState,
						aState.n
					]);
					visited.add(a);
					aState.x = true;
					stack.pop();
					continue;
				}
				visiting.add(a);
				for (const [d, s] of getMountedOrBatchDependents(batch, a, aState)) if (a !== d && !visiting.has(d)) stack.push([d, s]);
			}
			addBatchFunc(batch, "H", () => {
				const changedAtoms = /* @__PURE__ */ new Set([atom]);
				for (let i = topSortedReversed.length - 1; i >= 0; --i) {
					const [a, aState, prevEpochNumber] = topSortedReversed[i];
					let hasChangedDeps = false;
					for (const dep of aState.d.keys()) if (dep !== a && changedAtoms.has(dep)) {
						hasChangedDeps = true;
						break;
					}
					if (hasChangedDeps) {
						readAtomState(batch, a);
						mountDependencies(batch, a, aState);
						if (prevEpochNumber !== aState.n) {
							registerBatchAtom(batch, a, aState);
							changedAtoms.add(a);
						}
					}
					delete aState.x;
				}
			});
		};
		const writeAtomState = (batch, atom, ...args) => {
			let isSync = true;
			const getter = (a) => returnAtomValue(readAtomState(batch, a));
			const setter = (a, ...args2) => {
				const aState = getAtomState(a);
				try {
					if (isSelfAtom(atom, a)) {
						if (!hasInitialValue(a)) throw new Error("atom not writable");
						const prevEpochNumber = aState.n;
						const v = args2[0];
						setAtomStateValueOrPromise(a, aState, v);
						mountDependencies(batch, a, aState);
						if (prevEpochNumber !== aState.n) {
							registerBatchAtom(batch, a, aState);
							recomputeDependents(batch, a, aState);
						}
						return;
					} else return writeAtomState(batch, a, ...args2);
				} finally {
					if (!isSync) flushBatch(batch);
				}
			};
			try {
				return atomWrite(atom, getter, setter, ...args);
			} finally {
				isSync = false;
			}
		};
		const writeAtom = (atom, ...args) => {
			const batch = createBatch();
			try {
				return writeAtomState(batch, atom, ...args);
			} finally {
				flushBatch(batch);
			}
		};
		const mountDependencies = (batch, atom, atomState) => {
			if (atomState.m && !isPendingPromise(atomState.v)) {
				for (const a of atomState.d.keys()) if (!atomState.m.d.has(a)) {
					mountAtom(batch, a, getAtomState(a)).t.add(atom);
					atomState.m.d.add(a);
				}
				for (const a of atomState.m.d || []) if (!atomState.d.has(a)) {
					atomState.m.d.delete(a);
					unmountAtom(batch, a, getAtomState(a))?.t.delete(atom);
				}
			}
		};
		const mountAtom = (batch, atom, atomState) => {
			if (!atomState.m) {
				readAtomState(batch, atom);
				for (const a of atomState.d.keys()) mountAtom(batch, a, getAtomState(a)).t.add(atom);
				atomState.m = {
					l: /* @__PURE__ */ new Set(),
					d: new Set(atomState.d.keys()),
					t: /* @__PURE__ */ new Set()
				};
				if (isActuallyWritableAtom(atom)) {
					const mounted = atomState.m;
					let setAtom;
					const createInvocationContext = (batch2, fn) => {
						let isSync = true;
						setAtom = (...args) => {
							try {
								return writeAtomState(batch2, atom, ...args);
							} finally {
								if (!isSync) flushBatch(batch2);
							}
						};
						try {
							return fn();
						} finally {
							isSync = false;
						}
					};
					addBatchFunc(batch, "L", () => {
						const onUnmount = createInvocationContext(batch, () => atomOnMount(atom, (...args) => setAtom(...args)));
						if (onUnmount) mounted.u = (batch2) => createInvocationContext(batch2, onUnmount);
					});
				}
			}
			return atomState.m;
		};
		const unmountAtom = (batch, atom, atomState) => {
			if (atomState.m && !atomState.m.l.size && !Array.from(atomState.m.t).some((a) => {
				var _a;
				return (_a = getAtomState(a).m) == null ? void 0 : _a.d.has(atom);
			})) {
				const onUnmount = atomState.m.u;
				if (onUnmount) addBatchFunc(batch, "L", () => onUnmount(batch));
				delete atomState.m;
				for (const a of atomState.d.keys()) unmountAtom(batch, a, getAtomState(a))?.t.delete(atom);
				return;
			}
			return atomState.m;
		};
		const subscribeAtom = (atom, listener) => {
			const batch = createBatch();
			const atomState = getAtomState(atom);
			const listeners = mountAtom(batch, atom, atomState).l;
			listeners.add(listener);
			flushBatch(batch);
			return () => {
				listeners.delete(listener);
				const batch2 = createBatch();
				unmountAtom(batch2, atom, atomState);
				flushBatch(batch2);
			};
		};
		const unstable_derive = (fn) => buildStore(...fn(getAtomState, atomRead, atomWrite, atomOnMount));
		return {
			get: readAtom,
			set: writeAtom,
			sub: subscribeAtom,
			unstable_derive
		};
	};
	createStore = () => {
		const atomStateMap = /* @__PURE__ */ new WeakMap();
		const getAtomState = (atom) => {
			let atomState = atomStateMap.get(atom);
			if (!atomState) {
				atomState = {
					d: /* @__PURE__ */ new Map(),
					p: /* @__PURE__ */ new Set(),
					n: 0
				};
				atomStateMap.set(atom, atomState);
			}
			return atomState;
		};
		return buildStore(getAtomState, (atom, ...params) => atom.read(...params), (atom, ...params) => atom.write(...params), (atom, ...params) => {
			var _a;
			return (_a = atom.onMount) == null ? void 0 : _a.call(atom, ...params);
		});
	};
	getDefaultStore = () => {
		if (!defaultStore) defaultStore = createStore();
		return defaultStore;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/jotai@2.11.0_@types+react@18.3.20_react@18.3.1/node_modules/jotai/esm/react.mjs
function useAtomValue(atom, options) {
	const store = useStore(options);
	const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] = (0, import_react$2.useReducer)((prev) => {
		const nextValue = store.get(atom);
		if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom) return prev;
		return [
			nextValue,
			store,
			atom
		];
	}, void 0, () => [
		store.get(atom),
		store,
		atom
	]);
	let value = valueFromReducer;
	if (storeFromReducer !== store || atomFromReducer !== atom) {
		rerender();
		value = store.get(atom);
	}
	const delay = options == null ? void 0 : options.delay;
	(0, import_react$2.useEffect)(() => {
		const unsub = store.sub(atom, () => {
			if (typeof delay === "number") {
				const value2 = store.get(atom);
				if (isPromiseLike(value2)) attachPromiseMeta(createContinuablePromise(value2));
				setTimeout(rerender, delay);
				return;
			}
			rerender();
		});
		rerender();
		return unsub;
	}, [
		store,
		atom,
		delay
	]);
	(0, import_react$2.useDebugValue)(value);
	if (isPromiseLike(value)) {
		const promise = createContinuablePromise(value);
		return use(promise);
	}
	return value;
}
function useSetAtom(atom, options) {
	const store = useStore(options);
	return (0, import_react$2.useCallback)((...args) => {
		return store.set(atom, ...args);
	}, [store, atom]);
}
function useAtom(atom, options) {
	return [useAtomValue(atom, options), useSetAtom(atom, options)];
}
var import_react$2, StoreContext, useStore, isPromiseLike, attachPromiseMeta, use, continuablePromiseMap, createContinuablePromise;
var init_react = __esmMin((() => {
	import_react$2 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_vanilla();
	StoreContext = (0, import_react$2.createContext)(void 0);
	useStore = (options) => {
		const store = (0, import_react$2.useContext)(StoreContext);
		return (options == null ? void 0 : options.store) || store || getDefaultStore();
	};
	isPromiseLike = (x) => typeof (x == null ? void 0 : x.then) === "function";
	attachPromiseMeta = (promise) => {
		promise.status = "pending";
		promise.then((v) => {
			promise.status = "fulfilled";
			promise.value = v;
		}, (e) => {
			promise.status = "rejected";
			promise.reason = e;
		});
	};
	use = import_react$2.default.use || ((promise) => {
		if (promise.status === "pending") throw promise;
		else if (promise.status === "fulfilled") return promise.value;
		else if (promise.status === "rejected") throw promise.reason;
		else {
			attachPromiseMeta(promise);
			throw promise;
		}
	});
	continuablePromiseMap = /* @__PURE__ */ new WeakMap();
	createContinuablePromise = (promise) => {
		let continuablePromise = continuablePromiseMap.get(promise);
		if (!continuablePromise) {
			continuablePromise = new Promise((resolve, reject) => {
				let curr = promise;
				const onFulfilled = (me) => (v) => {
					if (curr === me) resolve(v);
				};
				const onRejected = (me) => (e) => {
					if (curr === me) reject(e);
				};
				const registerCancelHandler = (p) => {
					if ("onCancel" in p && typeof p.onCancel === "function") p.onCancel((nextValue) => {
						if (isPromiseLike(nextValue)) {
							continuablePromiseMap.set(nextValue, continuablePromise);
							curr = nextValue;
							nextValue.then(onFulfilled(nextValue), onRejected(nextValue));
							registerCancelHandler(nextValue);
						} else resolve(nextValue);
					});
				};
				promise.then(onFulfilled(promise), onRejected(promise));
				registerCancelHandler(promise);
			});
			continuablePromiseMap.set(promise, continuablePromise);
		}
		return continuablePromise;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/jotai@2.11.0_@types+react@18.3.20_react@18.3.1/node_modules/jotai/esm/index.mjs
var init_esm = __esmMin((() => {
	init_vanilla();
	init_react();
}));
//#endregion
//#region ../../node_modules/.pnpm/jotai@2.11.0_@types+react@18.3.20_react@18.3.1/node_modules/jotai/esm/react/utils.mjs
function useHydrateAtoms(values, options) {
	const store = useStore(options);
	const hydratedSet = getHydratedSet(store);
	for (const [atom, value] of values) if (!hydratedSet.has(atom) || (options == null ? void 0 : options.dangerouslyForceHydrate)) {
		hydratedSet.add(atom);
		store.set(atom, value);
	}
}
var hydratedMap, getHydratedSet;
var init_utils = __esmMin((() => {
	require_react();
	init_react();
	hydratedMap = /* @__PURE__ */ new WeakMap();
	getHydratedSet = (store) => {
		let hydratedSet = hydratedMap.get(store);
		if (!hydratedSet) {
			hydratedSet = /* @__PURE__ */ new WeakSet();
			hydratedMap.set(store, hydratedSet);
		}
		return hydratedSet;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/jotai-scope@0.7.2_@types+re_3fc0d1c866f729f016ca6ffce0216394/node_modules/jotai-scope/dist/index.modern.js
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
function createIsolation() {
	const StoreContext = (0, import_react.createContext)(null);
	function Provider({ store, initialValues = [], children }) {
		const storeRef = (0, import_react.useRef)(store);
		if (!storeRef.current) storeRef.current = createStore();
		useHydrateAtoms(initialValues, { store: storeRef.current });
		return (0, import_jsx_runtime.jsx)(StoreContext.Provider, {
			value: storeRef.current,
			children
		});
	}
	const useStore$1 = (options) => {
		const store = (0, import_react.useContext)(StoreContext);
		if (!store) throw new Error("Missing Provider from createIsolation");
		return useStore(_extends({ store }, options));
	};
	const useAtom$1 = (anAtom, options) => {
		const store = useStore$1();
		return useAtom(anAtom, _extends({ store }, options));
	};
	const useAtomValue$1 = (anAtom, options) => {
		const store = useStore$1();
		return useAtomValue(anAtom, _extends({ store }, options));
	};
	const useSetAtom$1 = (anAtom, options) => {
		const store = useStore$1();
		return useSetAtom(anAtom, _extends({ store }, options));
	};
	return {
		Provider,
		useStore: useStore$1,
		useAtom: useAtom$1,
		useAtomValue: useAtomValue$1,
		useSetAtom: useSetAtom$1
	};
}
var import_jsx_runtime, import_react, defaultRead, defaultWrite;
var init_index_modern = __esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_vanilla();
	init_react();
	init_utils();
	init_esm();
	({read: defaultRead, write: defaultWrite} = atom(null));
	(0, import_react.createContext)({
		scope: void 0,
		baseStore: void 0
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/immer@9.0.21/node_modules/immer/dist/immer.esm.mjs
function n(n) {
	for (var r = arguments.length, t = Array(r > 1 ? r - 1 : 0), e = 1; e < r; e++) t[e - 1] = arguments[e];
	throw Error("[Immer] minified error nr: " + n + (t.length ? " " + t.map((function(n) {
		return "'" + n + "'";
	})).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r(n) {
	return !!n && !!n[Q];
}
function t(n) {
	var r;
	return !!n && (function(n) {
		if (!n || "object" != typeof n) return !1;
		var r = Object.getPrototypeOf(n);
		if (null === r) return !0;
		var t = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
		return t === Object || "function" == typeof t && Function.toString.call(t) === Z;
	}(n) || Array.isArray(n) || !!n[L] || !!(null === (r = n.constructor) || void 0 === r ? void 0 : r[L]) || s(n) || v(n));
}
function i(n, r, t) {
	void 0 === t && (t = !1), 0 === o(n) ? (t ? Object.keys : nn)(n).forEach((function(e) {
		t && "symbol" == typeof e || r(e, n[e], n);
	})) : n.forEach((function(t, e) {
		return r(e, t, n);
	}));
}
function o(n) {
	var r = n[Q];
	return r ? r.i > 3 ? r.i - 4 : r.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}
function u(n, r) {
	return 2 === o(n) ? n.has(r) : Object.prototype.hasOwnProperty.call(n, r);
}
function a(n, r) {
	return 2 === o(n) ? n.get(r) : n[r];
}
function f(n, r, t) {
	var e = o(n);
	2 === e ? n.set(r, t) : 3 === e ? n.add(t) : n[r] = t;
}
function c(n, r) {
	return n === r ? 0 !== n || 1 / n == 1 / r : n != n && r != r;
}
function s(n) {
	return X && n instanceof Map;
}
function v(n) {
	return q && n instanceof Set;
}
function p(n) {
	return n.o || n.t;
}
function l(n) {
	if (Array.isArray(n)) return Array.prototype.slice.call(n);
	var r = rn(n);
	delete r[Q];
	for (var t = nn(r), e = 0; e < t.length; e++) {
		var i = t[e], o = r[i];
		!1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (r[i] = {
			configurable: !0,
			writable: !0,
			enumerable: o.enumerable,
			value: n[i]
		});
	}
	return Object.create(Object.getPrototypeOf(n), r);
}
function d(n, e) {
	return void 0 === e && (e = !1), y(n) || r(n) || !t(n) || (o(n) > 1 && (n.set = n.add = n.clear = n.delete = h), Object.freeze(n), e && i(n, (function(n, r) {
		return d(r, !0);
	}), !0)), n;
}
function h() {
	n(2);
}
function y(n) {
	return null == n || "object" != typeof n || Object.isFrozen(n);
}
function b(r) {
	var t = tn[r];
	return t || n(18, r), t;
}
function m(n, r) {
	tn[n] || (tn[n] = r);
}
function _() {
	return U;
}
function j(n, r) {
	r && (b("Patches"), n.u = [], n.s = [], n.v = r);
}
function g(n) {
	O(n), n.p.forEach(S), n.p = null;
}
function O(n) {
	n === U && (U = n.l);
}
function w(n) {
	return U = {
		p: [],
		l: U,
		h: n,
		m: !0,
		_: 0
	};
}
function S(n) {
	var r = n[Q];
	0 === r.i || 1 === r.i ? r.j() : r.g = !0;
}
function P(r, e) {
	e._ = e.p.length;
	var i = e.p[0], o = void 0 !== r && r !== i;
	return e.h.O || b("ES5").S(e, r, o), o ? (i[Q].P && (g(e), n(4)), t(r) && (r = M(e, r), e.l || x(e, r)), e.u && b("Patches").M(i[Q].t, r, e.u, e.s)) : r = M(e, i, []), g(e), e.u && e.v(e.u, e.s), r !== H ? r : void 0;
}
function M(n, r, t) {
	if (y(r)) return r;
	var e = r[Q];
	if (!e) return i(r, (function(i, o) {
		return A(n, e, r, i, o, t);
	}), !0), r;
	if (e.A !== n) return r;
	if (!e.P) return x(n, e.t, !0), e.t;
	if (!e.I) {
		e.I = !0, e.A._--;
		var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o, u = o, a = !1;
		3 === e.i && (u = new Set(o), o.clear(), a = !0), i(u, (function(r, i) {
			return A(n, e, o, r, i, t, a);
		})), x(n, o, !1), t && n.u && b("Patches").N(e, t, n.u, n.s);
	}
	return e.o;
}
function A(e, i, o, a, c, s, v) {
	if (r(c)) {
		var p = M(e, c, s && i && 3 !== i.i && !u(i.R, a) ? s.concat(a) : void 0);
		if (f(o, a, p), !r(p)) return;
		e.m = !1;
	} else v && o.add(c);
	if (t(c) && !y(c)) {
		if (!e.h.D && e._ < 1) return;
		M(e, c), i && i.A.l || x(e, c);
	}
}
function x(n, r, t) {
	void 0 === t && (t = !1), !n.l && n.h.D && n.m && d(r, t);
}
function z(n, r) {
	var t = n[Q];
	return (t ? p(t) : n)[r];
}
function I(n, r) {
	if (r in n) for (var t = Object.getPrototypeOf(n); t;) {
		var e = Object.getOwnPropertyDescriptor(t, r);
		if (e) return e;
		t = Object.getPrototypeOf(t);
	}
}
function k(n) {
	n.P || (n.P = !0, n.l && k(n.l));
}
function E(n) {
	n.o || (n.o = l(n.t));
}
function N(n, r, t) {
	var e = s(r) ? b("MapSet").F(r, t) : v(r) ? b("MapSet").T(r, t) : n.O ? function(n, r) {
		var t = Array.isArray(n), e = {
			i: t ? 1 : 0,
			A: r ? r.A : _(),
			P: !1,
			I: !1,
			R: {},
			l: r,
			t: n,
			k: null,
			o: null,
			j: null,
			C: !1
		}, i = e, o = en;
		t && (i = [e], o = on);
		var u = Proxy.revocable(i, o), a = u.revoke, f = u.proxy;
		return e.k = f, e.j = a, f;
	}(r, t) : b("ES5").J(r, t);
	return (t ? t.A : _()).p.push(e), e;
}
function R(e) {
	return r(e) || n(22, e), function n(r) {
		if (!t(r)) return r;
		var e, u = r[Q], c = o(r);
		if (u) {
			if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
			u.I = !0, e = D(r, c), u.I = !1;
		} else e = D(r, c);
		return i(e, (function(r, t) {
			u && a(u.t, r) === t || f(e, r, n(t));
		})), 3 === c ? new Set(e) : e;
	}(e);
}
function D(n, r) {
	switch (r) {
		case 2: return new Map(n);
		case 3: return Array.from(n);
	}
	return l(n);
}
function T() {
	function e(n) {
		if (!t(n)) return n;
		if (Array.isArray(n)) return n.map(e);
		if (s(n)) return new Map(Array.from(n.entries()).map((function(n) {
			return [n[0], e(n[1])];
		})));
		if (v(n)) return new Set(Array.from(n).map(e));
		var r = Object.create(Object.getPrototypeOf(n));
		for (var i in n) r[i] = e(n[i]);
		return u(n, L) && (r[L] = n[L]), r;
	}
	function f(n) {
		return r(n) ? e(n) : n;
	}
	var c = "add";
	m("Patches", {
		$: function(r, t) {
			return t.forEach((function(t) {
				for (var i = t.path, u = t.op, f = r, s = 0; s < i.length - 1; s++) {
					var v = o(f), p = i[s];
					"string" != typeof p && "number" != typeof p && (p = "" + p), 0 !== v && 1 !== v || "__proto__" !== p && "constructor" !== p || n(24), "function" == typeof f && "prototype" === p && n(24), "object" != typeof (f = a(f, p)) && n(15, i.join("/"));
				}
				var l = o(f), d = e(t.value), h = i[i.length - 1];
				switch (u) {
					case "replace": switch (l) {
						case 2: return f.set(h, d);
						case 3: n(16);
						default: return f[h] = d;
					}
					case c: switch (l) {
						case 1: return "-" === h ? f.push(d) : f.splice(h, 0, d);
						case 2: return f.set(h, d);
						case 3: return f.add(d);
						default: return f[h] = d;
					}
					case "remove": switch (l) {
						case 1: return f.splice(h, 1);
						case 2: return f.delete(h);
						case 3: return f.delete(t.value);
						default: return delete f[h];
					}
					default: n(17, u);
				}
			})), r;
		},
		N: function(n, r, t, e) {
			switch (n.i) {
				case 0:
				case 4:
				case 2: return function(n, r, t, e) {
					var o = n.t, s = n.o;
					i(n.R, (function(n, i) {
						var v = a(o, n), p = a(s, n), l = i ? u(o, n) ? "replace" : c : "remove";
						if (v !== p || "replace" !== l) {
							var d = r.concat(n);
							t.push("remove" === l ? {
								op: l,
								path: d
							} : {
								op: l,
								path: d,
								value: p
							}), e.push(l === c ? {
								op: "remove",
								path: d
							} : "remove" === l ? {
								op: c,
								path: d,
								value: f(v)
							} : {
								op: "replace",
								path: d,
								value: f(v)
							});
						}
					}));
				}(n, r, t, e);
				case 5:
				case 1: return function(n, r, t, e) {
					var i = n.t, o = n.R, u = n.o;
					if (u.length < i.length) {
						var a = [u, i];
						i = a[0], u = a[1];
						var s = [e, t];
						t = s[0], e = s[1];
					}
					for (var v = 0; v < i.length; v++) if (o[v] && u[v] !== i[v]) {
						var p = r.concat([v]);
						t.push({
							op: "replace",
							path: p,
							value: f(u[v])
						}), e.push({
							op: "replace",
							path: p,
							value: f(i[v])
						});
					}
					for (var l = i.length; l < u.length; l++) {
						var d = r.concat([l]);
						t.push({
							op: c,
							path: d,
							value: f(u[l])
						});
					}
					i.length < u.length && e.push({
						op: "replace",
						path: r.concat(["length"]),
						value: i.length
					});
				}(n, r, t, e);
				case 3: return function(n, r, t, e) {
					var i = n.t, o = n.o, u = 0;
					i.forEach((function(n) {
						if (!o.has(n)) {
							var i = r.concat([u]);
							t.push({
								op: "remove",
								path: i,
								value: n
							}), e.unshift({
								op: c,
								path: i,
								value: n
							});
						}
						u++;
					})), u = 0, o.forEach((function(n) {
						if (!i.has(n)) {
							var o = r.concat([u]);
							t.push({
								op: c,
								path: o,
								value: n
							}), e.unshift({
								op: "remove",
								path: o,
								value: n
							});
						}
						u++;
					}));
				}(n, r, t, e);
			}
		},
		M: function(n, r, t, e) {
			t.push({
				op: "replace",
				path: [],
				value: r === H ? void 0 : r
			}), e.push({
				op: "replace",
				path: [],
				value: n
			});
		}
	});
}
var G, U, W, X, q, B, H, L, Q, Z, nn, rn, tn, en, on, un, an, fn, cn, pn;
var init_immer_esm = __esmMin((() => {
	W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x");
	X = "undefined" != typeof Map;
	q = "undefined" != typeof Set;
	B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect;
	H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = !0, G);
	L = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
	Q = W ? Symbol.for("immer-state") : "__$immer_state";
	Z = "" + Object.prototype.constructor;
	nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n) {
		return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
	} : Object.getOwnPropertyNames;
	rn = Object.getOwnPropertyDescriptors || function(n) {
		var r = {};
		return nn(n).forEach((function(t) {
			r[t] = Object.getOwnPropertyDescriptor(n, t);
		})), r;
	};
	tn = {};
	en = {
		get: function(n, r) {
			if (r === Q) return n;
			var e = p(n);
			if (!u(e, r)) return function(n, r, t) {
				var e, i = I(r, t);
				return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
			}(n, e, r);
			var i = e[r];
			return n.I || !t(i) ? i : i === z(n.t, r) ? (E(n), n.o[r] = N(n.A.h, i, n)) : i;
		},
		has: function(n, r) {
			return r in p(n);
		},
		ownKeys: function(n) {
			return Reflect.ownKeys(p(n));
		},
		set: function(n, r, t) {
			var e = I(p(n), r);
			if (null == e ? void 0 : e.set) return e.set.call(n.k, t), !0;
			if (!n.P) {
				var i = z(p(n), r), o = null == i ? void 0 : i[Q];
				if (o && o.t === t) return n.o[r] = t, n.R[r] = !1, !0;
				if (c(t, i) && (void 0 !== t || u(n.t, r))) return !0;
				E(n), k(n);
			}
			return n.o[r] === t && (void 0 !== t || r in n.o) || Number.isNaN(t) && Number.isNaN(n.o[r]) || (n.o[r] = t, n.R[r] = !0), !0;
		},
		deleteProperty: function(n, r) {
			return void 0 !== z(n.t, r) || r in n.t ? (n.R[r] = !1, E(n), k(n)) : delete n.R[r], n.o && delete n.o[r], !0;
		},
		getOwnPropertyDescriptor: function(n, r) {
			var t = p(n), e = Reflect.getOwnPropertyDescriptor(t, r);
			return e ? {
				writable: !0,
				configurable: 1 !== n.i || "length" !== r,
				enumerable: e.enumerable,
				value: t[r]
			} : e;
		},
		defineProperty: function() {
			n(11);
		},
		getPrototypeOf: function(n) {
			return Object.getPrototypeOf(n.t);
		},
		setPrototypeOf: function() {
			n(12);
		}
	};
	on = {};
	i(en, (function(n, r) {
		on[n] = function() {
			return arguments[0] = arguments[0][0], r.apply(this, arguments);
		};
	})), on.deleteProperty = function(r, t) {
		return on.set.call(this, r, t, void 0);
	}, on.set = function(r, t, e) {
		return en.set.call(this, r[0], t, e, r[0]);
	};
	un = function() {
		function e(r) {
			var e = this;
			this.O = B, this.D = !0, this.produce = function(r, i, o) {
				if ("function" == typeof r && "function" != typeof i) {
					var u = i;
					i = r;
					var a = e;
					return function(n) {
						var r = this;
						void 0 === n && (n = u);
						for (var t = arguments.length, e = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) e[o - 1] = arguments[o];
						return a.produce(n, (function(n) {
							var t;
							return (t = i).call.apply(t, [r, n].concat(e));
						}));
					};
				}
				var f;
				if ("function" != typeof i && n(6), void 0 !== o && "function" != typeof o && n(7), t(r)) {
					var c = w(e), s = N(e, r, void 0), v = !0;
					try {
						f = i(s), v = !1;
					} finally {
						v ? g(c) : O(c);
					}
					return "undefined" != typeof Promise && f instanceof Promise ? f.then((function(n) {
						return j(c, o), P(n, c);
					}), (function(n) {
						throw g(c), n;
					})) : (j(c, o), P(f, c));
				}
				if (!r || "object" != typeof r) {
					if (void 0 === (f = i(r)) && (f = r), f === H && (f = void 0), e.D && d(f, !0), o) {
						var p = [], l = [];
						b("Patches").M(r, f, p, l), o(p, l);
					}
					return f;
				}
				n(21, r);
			}, this.produceWithPatches = function(n, r) {
				if ("function" == typeof n) return function(r) {
					for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) i[o - 1] = arguments[o];
					return e.produceWithPatches(r, (function(r) {
						return n.apply(void 0, [r].concat(i));
					}));
				};
				var t, i, o = e.produce(n, r, (function(n, r) {
					t = n, i = r;
				}));
				return "undefined" != typeof Promise && o instanceof Promise ? o.then((function(n) {
					return [
						n,
						t,
						i
					];
				})) : [
					o,
					t,
					i
				];
			}, "boolean" == typeof (null == r ? void 0 : r.useProxies) && this.setUseProxies(r.useProxies), "boolean" == typeof (null == r ? void 0 : r.autoFreeze) && this.setAutoFreeze(r.autoFreeze);
		}
		var i = e.prototype;
		return i.createDraft = function(e) {
			t(e) || n(8), r(e) && (e = R(e));
			var i = w(this), o = N(this, e, void 0);
			return o[Q].C = !0, O(i), o;
		}, i.finishDraft = function(r, t) {
			var i = (r && r[Q]).A;
			return j(i, t), P(void 0, i);
		}, i.setAutoFreeze = function(n) {
			this.D = n;
		}, i.setUseProxies = function(r) {
			r && !B && n(20), this.O = r;
		}, i.applyPatches = function(n, t) {
			var e = t.length - 1;
			for (; e >= 0; e--) {
				var i = t[e];
				if (0 === i.path.length && "replace" === i.op) {
					n = i.value;
					break;
				}
			}
			e > -1 && (t = t.slice(e + 1));
			var o = b("Patches").$;
			return r(n) ? o(n, t) : this.produce(n, (function(n) {
				return o(n, t);
			}));
		}, e;
	}();
	an = new un();
	fn = an.produce;
	cn = an.produceWithPatches.bind(an);
	an.setAutoFreeze.bind(an);
	an.setUseProxies.bind(an);
	pn = an.applyPatches.bind(an);
	an.createDraft.bind(an);
	an.finishDraft.bind(an);
}));
//#endregion
export { init_BehaviorSubject as _, pn as a, init_esm as c, init_vanilla as d, init_operators as f, BehaviorSubject as g, init_distinctUntilChanged as h, init_immer_esm as i, atom as l, distinctUntilChanged as m, cn as n, createIsolation as o, init_esm5 as p, fn as r, init_index_modern as s, T as t, createStore as u, Observable as v, init_Observable as y };
