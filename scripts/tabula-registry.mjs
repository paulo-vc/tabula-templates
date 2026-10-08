import { appendFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
//#region ../../packages/domain/src/result.ts
var ok = (value) => ({
	ok: true,
	value
});
var err = (error) => ({
	ok: false,
	error
});
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function joinValues(array, separator = "|") {
	return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
var Cached = class {
	constructor(getter) {
		this._getter = getter;
		this._value = void 0;
	}
	get value() {
		const getter = this._getter;
		if (getter !== void 0) {
			this._value = getter();
			this._getter = void 0;
		}
		return this._value;
	}
};
function cached(getter) {
	return new Cached(getter);
}
function nullish(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
	const ratio = val / step;
	const roundedRatio = Math.round(ratio);
	const tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
	if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
	return ratio - roundedRatio;
}
var EVALUATING = /* @__PURE__*/ Symbol("evaluating");
function defineLazy(object, key, getter) {
	let value = void 0;
	Object.defineProperty(object, key, {
		get() {
			if (value === EVALUATING) return;
			if (value === void 0) {
				value = EVALUATING;
				value = getter();
			}
			return value;
		},
		set(v) {
			Object.defineProperty(object, key, { value: v });
		},
		configurable: true
	});
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
}
/**
* Whichever object a def's `shape` currently answers from: the one the caller passed until the first read, the frozen copy after it.
*
* Its keys and descriptors read without invoking anything, which is what lets a discriminated union check its discriminator, and the cycle walk read a shape, without resolving a getter that references the schema being constructed. A def that answers `shape` from an accessor of its own has none.
*/
function rawShape(def) {
	const desc = Object.getOwnPropertyDescriptor(def, "shape");
	return desc?.get ? desc.get.raw : desc?.value;
}
function sourceShape(schema) {
	return rawShape(schema._zod.def) ?? schema._zod.def.shape;
}
function deferProp(target, key, getter) {
	Object.defineProperty(target, key, {
		get() {
			const value = getter();
			assignProp(this, key, value);
			return value;
		},
		enumerable: true,
		configurable: true
	});
}
function putProp(target, key, value) {
	if (key in target) assignProp(target, key, value);
	else target[key] = value;
}
/**
* Copies `keys` of `source`'s shape onto `target`, each value passed through `wrap`.
*
* A key the source has resolved is copied through now, so the derived shape states it outright and nothing has to resolve it to learn what it holds. A key the source still defers stays deferred, and reads back through the source's own `shape`, so it resolves once and both shapes get that one schema.
*/
function mirrorShape(target, source, keys, wrap) {
	const raw = sourceShape(source);
	for (const key of keys) {
		const desc = Object.getOwnPropertyDescriptor(raw, key);
		if (!desc.enumerable) continue;
		if (desc.get) deferProp(target, key, () => {
			const value = source._zod.def.shape[key];
			return wrap ? wrap(value, key) : value;
		});
		else putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
	}
}
function mirrorProps(target, source) {
	for (const key of Reflect.ownKeys(source)) {
		const desc = Object.getOwnPropertyDescriptor(source, key);
		if (!desc.enumerable) continue;
		if (desc.get) deferProp(target, key, () => source[key]);
		else putProp(target, key, desc.value);
	}
}
function mergeDefs(...defs) {
	const mergedDescriptors = {};
	for (const def of defs) {
		const descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = /* @__PURE__*/ cached(() => {
	if (globalConfig.jitless) return false;
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function shallowClone(o) {
	if (isPlainObject(o)) return { ...o };
	if (Array.isArray(o)) return [...o];
	if (o instanceof Map) return new Map(o);
	if (o instanceof Set) return new Set(o);
	return o;
}
var propertyKeyTypes = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string") return {
		...params,
		error: () => params.error
	};
	return params;
}
function stringifyPrimitive(value) {
	if (typeof value === "bigint") return value.toString() + "n";
	if (typeof value === "string") return `"${value}"`;
	return `${value}`;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin !== void 0 && shape[k]._zod.optout === "optional";
	});
}
var NUMBER_FORMAT_RANGES = /*@__PURE__*/ (() => ({
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}))();
var BIGINT_FORMAT_RANGES = {
	int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
	uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	const newShape = {};
	mirrorShape(newShape, schema, maskedKeys(schema, mask));
	return clone(schema, mergeDefs(currDef, {
		shape: newShape,
		checks: []
	}));
}
function maskedKeys(schema, mask) {
	const raw = sourceShape(schema);
	const keys = [];
	for (const key of Reflect.ownKeys(mask)) {
		if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) throw new Error(`Unrecognized key: "${String(key)}"`);
		if (mask[key]) keys.push(key);
	}
	return keys;
}
function omit(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	const omitted = new Set(maskedKeys(schema, mask));
	const newShape = {};
	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
	return clone(schema, mergeDefs(currDef, {
		shape: newShape,
		checks: []
	}));
}
function extend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		const existingShape = sourceShape(schema);
		for (const key of Reflect.ownKeys(shape)) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function extended(schema, shape) {
	const newShape = {};
	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
	mirrorProps(newShape, shape);
	return newShape;
}
function safeExtend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function merge(a, b) {
	if (!b?._zod?.def) throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	const newShape = {};
	mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
	mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
	return clone(a, mergeDefs(a._zod.def, {
		shape: newShape,
		get catchall() {
			return b._zod.def.catchall;
		},
		checks: b._zod.def.checks ?? []
	}));
}
function partial(Class, schema, mask, name = "partial") {
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
	const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
	const newShape = {};
	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class && ((value, key) => selected && !selected.has(key) ? value : new Class({
		type: "optional",
		innerType: value
	})));
	return clone(schema, mergeDefs(schema._zod.def, {
		shape: newShape,
		checks: []
	}));
}
function required(Class, schema, mask) {
	const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
	const newShape = {};
	mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class({
		type: "nonoptional",
		innerType: value
	}));
	return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
}
function aborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function explicitlyAborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a;
		(_a = iss).path ?? (_a.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function attachSchema(issues, start, inst) {
	var _a;
	for (let i = start; i < issues.length; i++) (_a = issues[i]).schema ?? (_a.schema = inst);
}
function finalizeIssue(iss, ctx, config) {
	var _a;
	const traits = iss.inst?._zod?.traits;
	if (traits?.has("$ZodType")) {
		if (traits.has("$ZodCheck")) (_a = iss).schema ?? (_a.schema = iss.inst);
		else iss.schema = iss.inst;
	}
	const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : void 0;
	const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	const full = {};
	for (const k of Object.keys(iss)) {
		if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__") continue;
		full[k] = iss[k];
	}
	full.path ?? (full.path = []);
	full.message = message;
	if (ctx?.reportInput) full.input = iss.input;
	return full;
}
var highSurrogate = /[\uD800-\uDBFF]/;
function codePointLength(str) {
	const units = str.length;
	if (!highSurrogate.test(str)) return units;
	let count = units;
	for (let i = 0; i < units - 1; i++) if ((str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320) {
		count--;
		i++;
	}
	return count;
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function parsedType(data) {
	const t = typeof data;
	switch (t) {
		case "number": return Number.isNaN(data) ? "nan" : "number";
		case "object": {
			if (data === null) return "null";
			if (Array.isArray(data)) return "array";
			const obj = data;
			if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
		}
	}
	return t;
}
function issue$2(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string") return {
		message: iss,
		code: "custom",
		input,
		inst
	};
	return { ...iss };
}
/**
* Installs a trait's members on its prototype. Each value builds that member for the instance on first read; the built value shadows the accessor as an own property, so a detached `const { parse } = schema` keeps working.
*
* Call this from a `proto` initializer, which runs once per prototype — never per instance.
*/
function members(proto, table) {
	for (const key in table) {
		const desc = Object.getOwnPropertyDescriptor(table, key);
		if (desc.get) Object.defineProperty(proto, key, {
			...desc,
			enumerable: false
		});
		else defineBound(proto, key, desc.value);
	}
}
/** Shadows a prototype member with an own value, so a getter that builds from the instance runs once. */
function own(inst, key, value, enumerable = true) {
	Object.defineProperty(inst, key, {
		configurable: true,
		writable: true,
		enumerable,
		value
	});
	return value;
}
/** Like {@link own}, for a member that was never an own data property and has to stay out of `Object.keys`. */
function hide(inst, key, value) {
	return own(inst, key, value, false);
}
/** Adds members a table derives from the instance: each builds on first read and shadows as own data, and assignment shadows the same way, as when these were own properties. */
function derived(computes, table) {
	for (const key in computes) {
		const compute = computes[key];
		Object.defineProperty(table, key, {
			configurable: true,
			enumerable: true,
			get() {
				return own(this, key, compute(this));
			},
			set(value) {
				own(this, key, value);
			}
		});
	}
	return table;
}
function defineBound(proto, key, fn) {
	Object.defineProperty(proto, key, {
		configurable: true,
		get() {
			return this == null ? fn : own(this, key, fn.bind(this));
		},
		set(value) {
			own(this, key, value);
		}
	});
}
/** Returns the prototype to install on, or `undefined` if this group is already installed on it. */
function claim(inst, sentinel) {
	const proto = Object.getPrototypeOf(inst);
	return sentinel in proto ? void 0 : proto;
}
var installing;
var broke = false;
var breaker = {
	configurable: true,
	get() {
		broke = true;
	}
};
/**
* Installs a lazily-derived internal on the `_zod` prototype of `inst`'s
* constructor, computed from the internals object itself and cached there on
* first read. One accessor per constructor rather than one per instance.
*/
function defineLazyInternal(inst, key, compute) {
	const proto = Object.getPrototypeOf(inst._zod);
	if (key in proto && installing !== inst._zod) {
		installing = void 0;
		return;
	}
	installing = inst._zod;
	Object.defineProperty(proto, key, {
		configurable: true,
		get() {
			Object.defineProperty(this, key, breaker);
			const outer = broke;
			broke = false;
			try {
				const value = compute(this);
				if (broke) delete this[key];
				else Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					value
				});
				broke = broke || outer;
				return value;
			} catch (err) {
				delete this[key];
				broke = broke || outer;
				throw err;
			}
		},
		set(value) {
			Object.defineProperty(this, key, {
				configurable: true,
				writable: true,
				value
			});
		}
	});
}
/**
* Installs `key` on `inst`'s prototype, computed by `make` on first read and cached there as an own
* data property. One accessor per constructor rather than one per instance, because an own accessor
* puts every instance after the first into v8 dictionary mode. The key doubles as the sentinel.
*/
function installLazyProp(inst, key, make, enumerable) {
	const proto = claim(inst, key);
	if (!proto) return;
	Object.defineProperty(proto, key, {
		configurable: true,
		get() {
			const desc = {
				configurable: true,
				writable: true,
				enumerable,
				value: void 0
			};
			Object.defineProperty(this, key, desc);
			desc.value = make(this);
			Object.defineProperty(this, key, desc);
			return desc.value;
		},
		set(value) {
			Object.defineProperty(this, key, {
				configurable: true,
				writable: true,
				enumerable,
				value
			});
		}
	});
}
/** Marks the thunk `_catch` synthesises for a constant catch value. `Function.length` cannot tell that thunk from a user callback — rest and defaulted parameters both report arity 0 — and a user callback reads `ctx.error`, whose issues only finalize correctly against the caller's per-parse error map. Provenance can say what arity cannot. A plain string key rather than `Symbol.for`, whose call at module scope no bundler can prove pure — the same shape that anchored `urlCanParse` into every build. */
var CONSTANT_CATCH = "~constantCatch";
/** Wraps a constant catch value in a thunk tagged with {@link CONSTANT_CATCH}. */
function constantCatch(value) {
	const fn = () => value;
	fn[CONSTANT_CATCH] = true;
	return fn;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/core.js
var _a$1;
var _zodDesc = {
	value: void 0,
	enumerable: false
};
var _E = "captureStackTrace" in Error ? Error : null;
function newError(Definition) {
	const E = _E;
	if (E) {
		const saved = E.stackTraceLimit;
		if (typeof saved === "number") {
			try {
				E.stackTraceLimit = 0;
			} catch {
				_E = null;
				return new Definition();
			}
			try {
				return new Definition();
			} finally {
				E.stackTraceLimit = saved;
			}
		}
	}
	return new Definition();
}
function $constructor(name, initializer, proto, params) {
	const zodProto = {};
	function Internals(def) {
		this.def = def;
		this.constr = _;
		this.traits = /* @__PURE__ */ new Set();
	}
	Internals.prototype = zodProto;
	const protoMembers = proto;
	const initialized = protoMembers && /* @__PURE__ */ new WeakSet();
	function init(inst, def) {
		if (!inst._zod) {
			_zodDesc.value = new Internals(def);
			try {
				Object.defineProperty(inst, "_zod", _zodDesc);
			} finally {
				_zodDesc.value = void 0;
			}
		} else if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer(inst, def);
		if (initialized) {
			const own = Object.getPrototypeOf(inst);
			const ctorProto = inst._zod.constr.prototype;
			let up = own;
			while (up && up !== ctorProto) up = Object.getPrototypeOf(up);
			const target = up ?? own;
			if (!initialized.has(target)) {
				initialized.add(target);
				members(target, protoMembers);
			}
		}
		const proto = _.prototype;
		for (const k in proto) {
			if (!Object.prototype.hasOwnProperty.call(proto, k)) continue;
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		const inst = params?.Parent ? newError(Definition) : this;
		init(inst, def);
		const deferred = inst._zod.deferred;
		if (deferred) {
			for (const fn of deferred) fn();
			inst._zod.deferred = void 0;
		}
		const pp = globalThis.__zod_globalConfig?.postProcessor;
		if (pp) pp(inst);
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`);
		this.name = "ZodEncodeError";
	}
};
(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/errors.js
function _getMessage() {
	const internals = this._zod;
	internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
	return internals.message;
}
function _setMessage(value) {
	this._zod.message = value;
}
var _messageDesc = {
	get: _getMessage,
	set: _setMessage,
	enumerable: true,
	configurable: true
};
var _issuesDesc = {
	value: void 0,
	enumerable: false
};
var _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
var initializer$1 = (inst, def) => {
	inst.name = "$ZodError";
	_issuesDesc.value = def;
	Object.defineProperty(inst, "issues", _issuesDesc);
	_issuesDesc.value = void 0;
	Object.defineProperty(inst, "message", _messageDesc);
	const proto = Object.getPrototypeOf(inst);
	if (!_installedToString.has(proto)) {
		_installedToString.add(proto);
		Object.defineProperty(proto, "toString", {
			configurable: true,
			enumerable: false,
			get() {
				const value = () => this.message;
				Object.defineProperty(this, "toString", {
					value,
					configurable: true,
					writable: true
				});
				return value;
			},
			set(value) {
				Object.defineProperty(this, "toString", {
					value,
					configurable: true,
					writable: true
				});
			}
		});
	}
};
var $ZodError = $constructor("$ZodError", initializer$1);
$constructor("$ZodError", initializer$1, void 0, { Parent: Error });
/** Get-or-create `obj[key]` as an own data property. A path segment naming an inherited member
* ("toString", "constructor") would otherwise read through to the prototype, and assigning
* "__proto__" would hit the setter instead of creating a key. */
function node(obj, key, make) {
	if (!Object.prototype.hasOwnProperty.call(obj, key)) {
		if (key === "__proto__") Object.defineProperty(obj, key, {
			value: make(),
			writable: true,
			enumerable: true,
			configurable: true
		});
		else obj[key] = make();
	}
	return obj[key];
}
function flattenError(error, mapper = (issue) => issue.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues) if (sub.path.length > 0) node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
	else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error, mapper = (issue) => issue.message) {
	const fieldErrors = { _errors: [] };
	const processError = (error, path = []) => {
		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
		else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else {
			const fullpath = [...path, ...issue.path];
			if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
			else {
				let curr = fieldErrors;
				let i = 0;
				while (i < fullpath.length) {
					const el = fullpath[i];
					const terminal = i === fullpath.length - 1;
					if (el === "_errors") {
						if (terminal) curr._errors.push(mapper(issue));
						i++;
						continue;
					}
					if (!Object.prototype.hasOwnProperty.call(curr, el)) Object.defineProperty(curr, el, {
						value: { _errors: [] },
						enumerable: true,
						writable: true,
						configurable: true
					});
					const node = curr[el];
					if (terminal) node._errors.push(mapper(issue));
					curr = node;
					i++;
				}
			}
		}
	};
	processError(error);
	return fieldErrors;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/parse.js
function finalizeParams(callee, params) {
	return {
		callee: params?.callee ?? callee,
		Err: params?.Err
	};
}
var _parse = (_Err) => {
	const fn = (schema, value, _ctx, _params) => {
		const ctx = _ctx ? {
			..._ctx,
			async: false
		} : { async: false };
		const result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) throw new $ZodAsyncError();
		if (result.issues.length) {
			const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
			captureStackTrace(e, _params?.callee ?? fn);
			throw e;
		}
		return result.value;
	};
	return fn;
};
var _parseAsync = (_Err) => {
	const fn = async (schema, value, _ctx, params) => {
		const ctx = _ctx ? {
			..._ctx,
			async: true
		} : { async: true };
		let result = schema._zod.run({
			value,
			issues: []
		}, ctx);
		if (result instanceof Promise) result = await result;
		if (result.issues.length) {
			const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
			captureStackTrace(e, params?.callee ?? fn);
			throw e;
		}
		return result.value;
	};
	return fn;
};
var _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length ? failure$1(_Err, result.issues, ctx) : {
		success: true,
		data: result.value
	};
};
function failure$1(Err, issues, ctx) {
	let error;
	return {
		success: false,
		get error() {
			if (!error) {
				error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
				issues = void 0;
				ctx = void 0;
			}
			return error;
		},
		set error(e) {
			error = e;
			issues = void 0;
			ctx = void 0;
		}
	};
}
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true
	} : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length ? failure$1(_Err, result.issues, ctx) : {
		success: true,
		data: result.value
	};
};
var COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
var COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
var validate = ((schema, value, _ctx) => {
	const validator = schema._zod.bag.validator;
	if (validator !== void 0) {
		if (validator(value) !== COMPILE_INVALID) return true;
		if (validator.definite === true && _ctx === void 0) return false;
	}
	return validateFallback(schema, value, _ctx);
});
function validateFallback(schema, value, _ctx) {
	const ctx = _ctx ? {
		..._ctx,
		async: false,
		abortEarly: true
	} : {
		async: false,
		abortEarly: true
	};
	const fallbackRun = schema._zod.bag.fallbackRun;
	let result;
	if (fallbackRun) {
		ctx[COMPILE_FALLBACK] = true;
		result = fallbackRun({
			value,
			issues: []
		}, ctx);
	} else result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length === 0;
}
var validateAsync$1 = async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true,
		abortEarly: true
	} : {
		async: true,
		abortEarly: true
	};
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length === 0;
};
var _encode = (_Err) => {
	const parse = _parse(_Err);
	const fn = (schema, value, _ctx, _params) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return parse(schema, value, ctx, finalizeParams(fn, _params));
	};
	return fn;
};
var _decode = (_Err) => {
	const parse = _parse(_Err);
	const fn = (schema, value, _ctx, _params) => {
		return parse(schema, value, _ctx, finalizeParams(fn, _params));
	};
	return fn;
};
var _encodeAsync = (_Err) => {
	const parseAsync = _parseAsync(_Err);
	const fn = async (schema, value, _ctx, _params) => {
		const ctx = _ctx ? {
			..._ctx,
			direction: "backward"
		} : { direction: "backward" };
		return await parseAsync(schema, value, ctx, finalizeParams(fn, _params));
	};
	return fn;
};
var _decodeAsync = (_Err) => {
	const parseAsync = _parseAsync(_Err);
	const fn = async (schema, value, _ctx, _params) => {
		return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
	};
	return fn;
};
var _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
var _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/regexes.js
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link cuid2} instead.
* See https://github.com/paralleldrive/cuid.
*/
var cuid = /^[cC][0-9a-z]{6,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
function nanoidOfLength(length) {
	return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
}
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
*
* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
var uuid = (version) => {
	if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
/** Practical email validation */
var email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji$1 = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
function emoji() {
	return new RegExp(_emoji$1, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
var httpProtocol = /^https?$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
/** Anchors a pattern source. The interpolation lives here rather than at the call site because
* esbuild will not drop a `@__PURE__` call whose own argument interpolates a variable, but it
* will drop `anchor(dateSource)`. Keeping it inline pinned `date` into every bundle. */
function anchor(source) {
	return new RegExp(`^${source}$`);
}
var date = /*@__PURE__*/ anchor(dateSource);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
	const opts = ["Z"];
	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const qualified = `${timeSource({
		precision: args.precision,
		seconds: true
	})}(?:${opts.join("|")})`;
	const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var anyString = /^[\s\S]{0,}$/;
var integer = /^-?\d+$/;
var number$1 = /^-?\d+(?:\.\d+)?$/;
var boolean$1 = /^(?:true|false)$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/checks.js
var $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a = inst._zod).onattach ?? (_a.onattach = []);
});
/** Default `when` for length-based checks: run only on non-nullish values with a `length`. */
var _whenHasLength = (payload) => {
	const val = payload.value;
	return !nullish(val) && val.length !== void 0;
};
var numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date"
};
var $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
		payload.issues.push({
			origin: numericOriginMap[typeof payload.value] ?? origin,
			code: "too_big",
			maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
		payload.issues.push({
			origin: numericOriginMap[typeof payload.value] ?? origin,
			code: "too_small",
			minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
		if (typeof payload.value === "bigint" ? def.value !== BigInt(0) && payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
		payload.issues.push({
			origin: typeof payload.value,
			code: "not_multiple_of",
			divisor: def.value,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	def.format = def.format || "float64";
	const isInt = def.format?.includes("int");
	const origin = isInt ? "int" : "number";
	const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (isInt) {
			if (!Number.isInteger(input)) {
				payload.issues.push({
					expected: origin,
					format: def.format,
					code: "invalid_type",
					continue: false,
					input,
					inst
				});
				return;
			}
			if (!Number.isSafeInteger(input)) {
				if (input > 0) payload.issues.push({
					input,
					code: "too_big",
					maximum: Number.MAX_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				else payload.issues.push({
					input,
					code: "too_small",
					minimum: Number.MIN_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				return;
			}
		}
		if (input < minimum) payload.issues.push({
			origin: "number",
			input,
			code: "too_small",
			minimum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
		if (input > maximum) payload.issues.push({
			origin: "number",
			input,
			code: "too_big",
			maximum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
	inst._zod.check = (payload) => {
		const input = payload.value;
		const units = input.length;
		if ((typeof input === "string" && units > def.maximum ? codePointLength(input) : units) <= def.maximum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
	inst._zod.check = (payload) => {
		const input = payload.value;
		const units = input.length;
		if ((typeof input === "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units) >= def.minimum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
	inst._zod.check = (payload) => {
		const input = payload.value;
		const units = input.length;
		const length = typeof input === "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
		if (length === def.length) return;
		const origin = getLengthableOrigin(input);
		const tooBig = length > def.length;
		payload.issues.push({
			origin,
			...tooBig ? {
				code: "too_big",
				maximum: def.length
			} : {
				code: "too_small",
				minimum: def.length
			},
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a, _b;
	$ZodCheck.init(inst, def);
	if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			...def.pattern ? { pattern: def.pattern.toString() } : {},
			inst,
			continue: !def.abort
		});
	});
	else (_b = inst._zod).check ?? (_b.check = () => {});
});
var $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	def.pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
	inst._zod.check = (payload) => {
		if (payload.value.includes(def.includes, def.position)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.check = (payload) => {
		if (payload.value.startsWith(def.prefix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.check = (payload) => {
		if (payload.value.endsWith(def.suffix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/doc.js
var Doc = class {
	constructor(args = [], closed = {}) {
		this.content = [];
		this.indent = 0;
		this.args = args;
		this.closed = closed;
	}
	indented(fn) {
		this.indent += 1;
		try {
			fn(this);
		} finally {
			this.indent -= 1;
		}
	}
	write(arg) {
		if (typeof arg === "function") {
			arg(this, { execution: "sync" });
			arg(this, { execution: "async" });
			return;
		}
		const lines = arg.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const content = this?.content ?? [``];
		return new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${content.join("\n")}\n};`)(...Object.values(this.closed));
	}
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/versions.js
var version$2 = {
	major: 4,
	minor: 6,
	patch: 5
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/schemas.js
var $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
	var _a;
	inst ?? (inst = {});
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version$2;
	const defChecks = inst._zod.def.checks;
	const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks, ctx) => {
			if (payload.memo) return payload;
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks) {
				if (ch._zod.def.when) {
					if (explicitlyAborted(payload)) continue;
					if (!ch._zod.def.when(payload)) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
					await _;
					if (payload.issues.length === currLen) return;
					attachSchema(payload.issues, currLen, inst);
					if (!isAborted) isAborted = aborted(payload, currLen);
				});
				else {
					if (payload.issues.length === currLen) continue;
					attachSchema(payload.issues, currLen, inst);
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult) return asyncResult.then(() => {
				return payload;
			});
			return payload;
		};
		const handleCanaryResult = (canary, payload, ctx) => {
			if (aborted(canary)) {
				canary.aborted = true;
				return canary;
			}
			const checkResult = runChecks(payload, checks, ctx);
			if (checkResult instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
			}
			return inst._zod.parse(checkResult, ctx);
		};
		inst._zod.run = (payload, ctx) => {
			if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
			if (ctx.direction === "backward") {
				const canary = inst._zod.parse({
					value: payload.value,
					issues: []
				}, {
					...ctx,
					skipChecks: true
				});
				if (canary instanceof Promise) return canary.then((canary) => {
					return handleCanaryResult(canary, payload, ctx);
				});
				return handleCanaryResult(canary, payload, ctx);
			}
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result) => runChecks(result, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
}, {
	get "~standard"() {
		return hide(this, "~standard", standardProps(this));
	},
	set "~standard"(value) {
		own(this, "~standard", value);
	}
});
/** The Standard Schema surface for `inst`. Shared so wrappers can extend it without forcing it. */
var toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
async function validateAsync(inst, value) {
	const ctx = { async: true };
	return toStandardResult(await inst._zod.run({
		value,
		issues: []
	}, ctx), ctx);
}
function standardProps(inst) {
	return {
		validate: (value) => {
			const ctx = { async: false };
			try {
				const r = inst._zod.run({
					value,
					issues: []
				}, ctx);
				if (!(r instanceof Promise)) return toStandardResult(r, ctx);
			} catch (_) {}
			return validateAsync(inst, value);
		},
		vendor: "zod",
		version: 1
	};
}
var $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = def.pattern ?? anyString;
	inst._zod.parse = (payload, _) => {
		if (def.coerce) try {
			payload.value = String(payload.value);
		} catch (_) {}
		if (typeof payload.value === "string") return payload;
		payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
var $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
var $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
var $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
});
var $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
function canParseURL(input) {
	try {
		if (typeof URL !== "undefined" && typeof URL.canParse === "function") return URL.canParse(input);
		new URL(input);
		return true;
	} catch {
		return false;
	}
}
function validateURL(trimmed, def) {
	if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) return canParseURL(trimmed) || 2;
	return parseURLObject(trimmed, def);
}
/** Parses a URL while preserving the non-normalizing HTTP guard. */
function parseURLObject(trimmed, def) {
	if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) return 1;
	try {
		if (typeof URL !== "undefined") {
			const URLStatic = URL;
			if (typeof URLStatic.parse === "function") return URLStatic.parse(trimmed) ?? 2;
		}
		return new URL(trimmed);
	} catch {
		return 2;
	}
}
var asciiTabOrNewline = /[\t\n\r]/g;
/** The URL parser deletes every ASCII tab, LF and CR from its input before it parses, so `new URL("https://exa\nmple.com")` reports on `example.com`. Applying the same deletion to the returned value closes the half of that divergence which can move the host; the parser's other rewrite, stripping C0 controls at the edges, cannot. */
function stripTabAndNewline(value) {
	return value.replace(asciiTabOrNewline, "");
}
function urlHostnameOk(url, hostname) {
	hostname.lastIndex = 0;
	return hostname.test(url.hostname);
}
function urlProtocolOk(url, protocol) {
	protocol.lastIndex = 0;
	return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
}
var $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const trimmed = payload.value.trim();
			const url = validateURL(trimmed, def);
			if (url === 1) {
				payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid URL format",
					input: payload.value,
					inst,
					continue: !def.abort
				});
				return;
			}
			if (url === 2) {
				payload.issues.push({
					code: "invalid_format",
					format: "url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
				return;
			}
			if (url === true) {
				payload.value = stripTabAndNewline(trimmed);
				return;
			}
			if (def.hostname && !urlHostnameOk(url, def.hostname)) payload.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: def.hostname.source,
				input: payload.value,
				inst,
				continue: !def.abort
			});
			if (def.protocol && !urlProtocolOk(url, def.protocol)) payload.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: def.protocol.source,
				input: payload.value,
				inst,
				continue: !def.abort
			});
			payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
			return;
		} catch (_) {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
var $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
	if (def.length !== void 0 && (!Number.isInteger(def.length) || def.length < 1)) throw new Error(`Invalid nanoid length: ${def.length}`);
	def.pattern ?? (def.pattern = def.length === void 0 ? nanoid : nanoidOfLength(def.length));
	$ZodStringFormat.init(inst, def);
});
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
* See https://github.com/paralleldrive/cuid.
*/
var $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
var $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
var $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime$1(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date);
	$ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time(def));
	$ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration);
	$ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
});
/** An IPv6 address is written with hex digits, colons and dots, and nothing else. The guard is what makes the check below an IPv6 check: `new URL("http://[...]")` parses an authority, not an address, so `@` and `\` re-delimit it and `"::@1\\"` validates against the host `0.0.0.1`. The URL parser also deletes ASCII tab, LF and CR rather than failing, which is how `"::1\n"` validated as `::1`. */
var ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
function isValidIPv6(value) {
	if (!ipv6Alphabet.test(value)) return false;
	return canParseURL(`http://[${value}]`);
}
var $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (!isValidIPv6(payload.value)) payload.issues.push({
			code: "invalid_format",
			format: "ipv6",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
function isValidCIDRv6(value) {
	const parts = value.split("/");
	if (parts.length !== 2) return false;
	const [address, prefix] = parts;
	if (!prefix) return false;
	const prefixNum = Number(prefix);
	if (`${prefixNum}` !== prefix) return false;
	if (prefixNum < 0 || prefixNum > 128) return false;
	return isValidIPv6(address);
}
var $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (!isValidCIDRv6(payload.value)) payload.issues.push({
			code: "invalid_format",
			format: "cidrv6",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidBase64(data) {
	if (data === "") return true;
	if (/\s/.test(data)) return false;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
var base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
var $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64Charset);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidBase64(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var base64urlCharset = /^[A-Za-z0-9_-]*$/;
function isValidBase64URL(data) {
	if (!base64urlCharset.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
var $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64urlCharset);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidBase64URL(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164);
	$ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		if (!header) return false;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
var $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidJWT(payload.value, def.alg)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
var $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = number$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Number(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
		const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? String(input) : void 0 : void 0;
		payload.issues.push({
			expected: "number",
			code: "invalid_type",
			input,
			inst,
			...received ? { received } : {}
		});
		return payload;
	};
});
var $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def);
	$ZodNumber.init(inst, def);
});
var $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = boolean$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Boolean(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "boolean") return payload;
		payload.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
var $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
var $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.issues.push({
			expected: "never",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
var $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	const memo = globalConfig.memoizer;
	memo?.attach(inst);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
		const proms = [];
		const abortEarly = ctx?.abortEarly;
		for (let i = 0; i < input.length; i++) {
			const item = input[i];
			const result = def.element._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
			else {
				handleArrayResult(result, payload, i);
				if (abortEarly && result.issues.length !== 0 && aborted(result)) break;
			}
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handlePropertyResult(result, final, key, input, optin, optout) {
	const isPresent = key in input;
	const isOptionalOut = optout === "optional";
	if (!isPresent && isOptionalOut && optin === "optional") return;
	if (result.issues.length) {
		if (optin !== void 0 && isOptionalOut && !isPresent) return;
		final.issues.push(...prefixIssues(key, result.issues));
	}
	if (!isPresent && optin === void 0) {
		if (!result.issues.length) final.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [key]
		});
		return;
	}
	if (result.value === void 0) {
		if (isPresent || optin === "defaulted" && !isOptionalOut) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
var NO_SYMBOL_KEYS = [];
function normalizeDef(def) {
	const keys = Object.keys(def.shape);
	const ownSymbols = Object.getOwnPropertySymbols(def.shape);
	const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
	const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
	for (const k of allKeys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
	const okeys = optionalKeys(def.shape);
	return {
		...def,
		allKeys,
		symbolKeys,
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys)
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
	const unrecognized = [];
	const keySet = def.keySet;
	const _catchall = def.catchall._zod;
	const t = _catchall.def.type;
	const optin = _catchall.optin;
	const optout = _catchall.optout;
	let seen = 0;
	for (const key in input) {
		if (abortEarly && payload.issues.length !== seen) {
			if (aborted(payload, seen)) break;
			seen = payload.issues.length;
		}
		if (keySet.has(key)) continue;
		if (key === "__proto__") {
			if (t === "never") unrecognized.push(key);
			continue;
		}
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		const r = _catchall.run({
			value: input[key],
			issues: []
		}, ctx);
		if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
		else handlePropertyResult(r, payload, key, input, optin, optout);
	}
	if (unrecognized.length) payload.issues.push({
		code: "unrecognized_keys",
		keys: unrecognized,
		input,
		inst,
		continue: true
	});
	if (!proms.length) return payload;
	return Promise.all(proms).then(() => {
		return payload;
	});
}
var $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	const desc = Object.getOwnPropertyDescriptor(def, "shape");
	const sh = desc?.get ? desc.get.raw : def.shape ?? {};
	if (sh) {
		const get = () => {
			const newSh = { ...sh };
			Object.defineProperty(def, "shape", { value: newSh });
			get.raw = newSh;
			return newSh;
		};
		get.raw = sh;
		Object.defineProperty(def, "shape", { get });
	}
	const _normalized = cached(() => normalizeDef(def));
	defineLazyInternal(inst, "propValues", (zod) => {
		const shape = zod.def.shape;
		const propValues = {};
		for (const key in shape) {
			const field = shape[key]._zod;
			if (field.values) {
				if (!Object.prototype.hasOwnProperty.call(propValues, key)) assignProp(propValues, key, /* @__PURE__ */ new Set());
				for (const v of field.values) propValues[key].add(v);
				if (field.optin !== void 0) propValues[key].add(void 0);
			}
		}
		return propValues;
	});
	const isObject$2 = isObject;
	const catchall = def.catchall;
	let value;
	const memo = globalConfig.memoizer;
	memo?.attach(inst);
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$2(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
		const proms = [];
		const shape = value.shape;
		const abortEarly = ctx?.abortEarly;
		let seen = payload.issues.length;
		for (const key of value.allKeys) {
			if (abortEarly && payload.issues.length !== seen) {
				if (aborted(payload, seen)) break;
				seen = payload.issues.length;
			}
			if (key === "__proto__") continue;
			const el = shape[key];
			const optin = el._zod.optin;
			const optout = el._zod.optout;
			const r = el._zod.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
			else handlePropertyResult(r, payload, key, input, optin, optout);
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
	};
});
var $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
	$ZodObject.init(inst, def);
	const superParse = inst._zod.parse;
	const _normalized = cached(() => normalizeDef(def));
	const memo = globalConfig.memoizer;
	const generateFastpass = (shape) => {
		const normalized = _normalized.value;
		const syms = normalized.symbolKeys;
		const doc = new Doc(["payload", "ctx"], {
			shape,
			inst,
			memo,
			syms
		});
		const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		const prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
		doc.write(`const input = payload.value;`);
		const ids = Object.create(null);
		let counter = 0;
		for (const key of normalized.allKeys) ids[key] = `key_${counter++}`;
		doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
		for (const key of normalized.allKeys) {
			if (key === "__proto__") continue;
			const id = ids[key];
			const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
			const isPresent = `${k} in input`;
			const schema = shape[key];
			const optin = schema?._zod?.optin;
			const isOptionalIn = optin !== void 0;
			const isOptionalOut = schema?._zod?.optout === "optional";
			doc.write(`const ${id} = ${parseStr(k)};`);
			if (isOptionalIn && isOptionalOut) {
				const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
				doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
			} else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
			else {
				doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
				if (optin === "defaulted") doc.write(`newResult[${k}] = ${id}.value;`);
				else doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
			}
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		return doc.compile();
	};
	let fastpass;
	const isObject$1 = isObject;
	const jit = !globalConfig.jitless;
	const fastEnabled = jit && allowsEval.value;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$1(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
			if (!catchall) return payload;
			return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
		}
		return superParse(payload, ctx);
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	const nonaborted = results.filter((r) => !aborted(r));
	if (nonaborted.length === 1) {
		final.value = nonaborted[0].value;
		return nonaborted[0];
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
var $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0);
	defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
	defineLazyInternal(inst, "values", (zod) => {
		if (zod.def.options.every((o) => o._zod.values)) return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
	});
	defineLazyInternal(inst, "pattern", (zod) => {
		if (zod.def.options.every((o) => o._zod.pattern)) {
			const patterns = zod.def.options.map((o) => o._zod.pattern);
			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	const first = def.options.length === 1 ? def.options[0]._zod.run : null;
	inst._zod.parse = (payload, ctx) => {
		if (first) return first(payload, ctx);
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else {
				if (result.issues.length === 0) return result;
				results.push(result);
			}
		}
		if (!async) return handleUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results) => {
			return handleUnionResults(results, payload, inst, ctx);
		});
	};
});
function discriminatorMap(def) {
	const map = /* @__PURE__ */ new Map();
	for (const option of def.options) {
		const values = option._zod.propValues?.[def.discriminator];
		if (!values || values.size === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
		for (const value of values) if (map.has(value)) {
			if (value !== void 0) throw new Error(`Duplicate discriminator value "${String(value)}"`);
			map.set(value, null);
		} else map.set(value, option);
	}
	return map;
}
var $ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
	def.inclusive = false;
	$ZodUnion.init(inst, def);
	const _super = inst._zod.parse;
	defineLazyInternal(inst, "propValues", (zod) => {
		const propValues = {};
		let undefinedCount = 0;
		for (const option of zod.def.options) {
			const pv = option._zod.propValues;
			if (!pv || Object.keys(pv).length === 0) throw new Error(`Invalid discriminated union option at index "${zod.def.options.indexOf(option)}"`);
			if (pv[zod.def.discriminator]?.has(void 0)) undefinedCount++;
			for (const [k, v] of Object.entries(pv)) {
				if (!Object.prototype.hasOwnProperty.call(propValues, k)) assignProp(propValues, k, /* @__PURE__ */ new Set());
				for (const val of v) propValues[k].add(val);
			}
		}
		if (!zod.def.unionFallback && undefinedCount > 1) propValues[zod.def.discriminator]?.delete(void 0);
		return propValues;
	});
	def.options.forEach((option, i) => {
		const propShape = rawShape(option._zod.def);
		if (propShape && !Object.prototype.hasOwnProperty.call(propShape, def.discriminator)) throw new Error(`Invalid discriminated union option at index "${i}"`);
	});
	const disc = cached(() => discriminatorMap(def));
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isObject(input)) {
			payload.issues.push({
				code: "invalid_type",
				expected: "object",
				input,
				inst
			});
			return payload;
		}
		const value = input?.[def.discriminator];
		const opt = disc.value.get(value);
		if (opt && (value !== void 0 || ctx.direction !== "backward")) return opt._zod.run(payload, ctx);
		if (def.unionFallback || ctx.direction === "backward") return _super(payload, ctx);
		payload.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: def.discriminator,
			options: Array.from(disc.value.keys()).filter((value) => disc.value.get(value) !== null),
			input,
			path: [def.discriminator],
			inst
		});
		return payload;
	};
});
var $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		const left = def.left._zod.run({
			value: input,
			issues: []
		}, ctx);
		const right = def.right._zod.run({
			value: input,
			issues: []
		}, ctx);
		if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
			return handleIntersectionResults(payload, left, right);
		});
		return handleIntersectionResults(payload, left, right);
	};
});
function mergeValues(a, b) {
	if (a === b) return {
		valid: true,
		data: a
	};
	if (a instanceof Date && b instanceof Date && +a === +b) return {
		valid: true,
		data: a
	};
	if (isPlainObject(a) && isPlainObject(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		if (Object.prototype.hasOwnProperty.call(newObj, "__proto__")) delete newObj.__proto__;
		for (const key of sharedKeys) {
			if (key === "__proto__") continue;
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
			};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return {
			valid: false,
			mergeErrorPath: []
		};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
			};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	}
	return {
		valid: false,
		mergeErrorPath: []
	};
}
function handleIntersectionResults(result, left, right) {
	const unrecKeys = /* @__PURE__ */ new Map();
	let unrecIssue;
	const keyIssues = /* @__PURE__ */ new Map();
	const collect = (iss, side) => {
		let keys;
		if (iss.code === "unrecognized_keys" && !iss.path?.length) {
			unrecIssue ?? (unrecIssue = iss);
			keys = iss.keys;
		} else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
			const k = String(iss.path[0]);
			if (!keyIssues.has(k)) keyIssues.set(k, iss);
			keys = [k];
		} else return false;
		for (const k of keys) {
			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
			unrecKeys.get(k)[side] = true;
		}
		return true;
	};
	for (const iss of left.issues) if (!collect(iss, "l")) result.issues.push(iss);
	for (const iss of right.issues) if (!collect(iss, "r")) result.issues.push(iss);
	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length) {
		const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
		if (aggregated.length) result.issues.push({
			...unrecIssue,
			keys: aggregated
		});
		for (const k of bothKeys) if (!aggregated.includes(k) && keyIssues.has(k)) result.issues.push(keyIssues.get(k));
	}
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) {
		if (aborted(result)) return result;
		throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	}
	result.value = merged.data;
	return result;
}
var $ZodRecord = /*@__PURE__*/ $constructor("$ZodRecord", (inst, def) => {
	$ZodType.init(inst, def);
	const memo = globalConfig.memoizer;
	memo?.attach(inst);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isPlainObject(input)) {
			payload.issues.push({
				expected: "record",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		const proms = [];
		const values = def.keyType._zod.values;
		if (values && !def.partial) {
			payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
			const recordKeys = /* @__PURE__ */ new Set();
			for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
				recordKeys.add(typeof key === "number" ? key.toString() : key);
				if (key === "__proto__") continue;
				const keyResult = def.keyType._zod.run({
					value: key,
					issues: []
				}, ctx);
				if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
				if (keyResult.issues.length) {
					payload.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
						input: key,
						path: [key],
						inst
					});
					continue;
				}
				const outKey = keyResult.value;
				if (outKey === "__proto__") continue;
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[outKey] = result.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[outKey] = result.value;
				}
			}
			let unrecognized;
			for (const key in input) if (!recordKeys.has(key)) {
				if (def.mode === "loose") {
					if (key === "__proto__") continue;
					payload.value[key] = input[key];
				} else {
					unrecognized = unrecognized ?? [];
					unrecognized.push(key);
				}
			}
			if (unrecognized && unrecognized.length > 0) payload.issues.push({
				code: "unrecognized_keys",
				input,
				inst,
				keys: unrecognized,
				continue: true
			});
		} else {
			payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
			let unrecognized;
			for (const key of Reflect.ownKeys(input)) {
				if (key === "__proto__") continue;
				if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
				let keyResult = def.keyType._zod.run({
					value: key,
					issues: []
				}, ctx);
				if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
				if (typeof key === "string" && number$1.test(key) && keyResult.issues.length) {
					const retryResult = def.keyType._zod.run({
						value: Number(key),
						issues: []
					}, ctx);
					if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (retryResult.issues.length === 0) keyResult = retryResult;
				}
				if (keyResult.issues.length) {
					if (def.mode === "loose") payload.value[key] = input[key];
					else if (values) {
						unrecognized = unrecognized ?? [];
						unrecognized.push(key);
					} else payload.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
						input: key,
						path: [key],
						inst
					});
					continue;
				}
				const outKey = keyResult.value;
				if (outKey === "__proto__") continue;
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[outKey] = result.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[outKey] = result.value;
				}
			}
			if (unrecognized && unrecognized.length > 0) payload.issues.push({
				code: "unrecognized_keys",
				input,
				inst,
				keys: unrecognized,
				continue: true
			});
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
var $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	const valuesSet = new Set(values);
	inst._zod.values = valuesSet;
	defineLazyInternal(inst, "pattern", (zod) => {
		const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
		return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
	});
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (valuesSet.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		});
		return payload;
	};
});
var $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	const values = new Set(def.values);
	inst._zod.values = values;
	defineLazyInternal(inst, "pattern", (zod) => {
		const vals = zod.def.values;
		return new RegExp(vals.length ? `^(${vals.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
	});
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (values.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values: def.values,
			input,
			inst
		});
		return payload;
	};
});
var $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	globalConfig.memoizer?.guard(inst);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		const _out = def.transform(payload.value, payload);
		if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
			payload.value = output;
			return payload;
		});
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		return payload;
	};
});
function handleOptionalResult(payload, result) {
	payload.value = result.issues.length ? void 0 : result.value;
	return payload;
}
var $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
	inst._zod.optout = "optional";
	defineLazyInternal(inst, "values", (zod) => {
		const values = zod.def.innerType._zod.values;
		return values ? /* @__PURE__ */ new Set([...values, void 0]) : void 0;
	});
	defineLazyInternal(inst, "pattern", (zod) => {
		const pattern = zod.def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === void 0) {
			if (def.innerType._zod.optin !== "defaulted") return payload;
			const result = def.innerType._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) return result.then((result) => handleOptionalResult(payload, result));
			return handleOptionalResult(payload, result);
		}
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
	inst._zod.parse = (payload, ctx) => {
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
	defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
	defineLazyInternal(inst, "pattern", (zod) => {
		const pattern = zod.def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazyInternal(inst, "values", (zod) => {
		return zod.def.innerType._zod.values ? /* @__PURE__ */ new Set([...zod.def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "defaulted";
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			/**
			* $ZodDefault returns the default value immediately in forward direction.
			* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
var $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "defaulted";
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
var $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "values", (zod) => {
		const v = zod.def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
		return handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
function handleCatchResult(payload, result, def, ctx) {
	if (!result.issues.length) {
		payload.value = result.value;
		if (result.memo) payload.memo = true;
		return payload;
	}
	payload.value = def.catchValue({
		...result,
		value: payload.value,
		error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
		input: payload.value
	});
	return payload;
}
var $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
	defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run({
			value: payload.value,
			issues: []
		}, ctx);
		if (result instanceof Promise) return result.then((result) => handleCatchResult(payload, result, def, ctx));
		return handleCatchResult(payload, result, def, ctx);
	};
});
var $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
	defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
	defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
	defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") {
			const right = def.out._zod.run(payload, ctx);
			if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
			return handlePipeResult(right, def.in, ctx);
		}
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
		return handlePipeResult(left, def.out, ctx);
	};
});
function handlePipeResult(left, next, ctx) {
	if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
		left.aborted = true;
		return left;
	}
	return next._zod.run({
		value: left.value,
		issues: left.issues
	}, ctx);
}
var $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
	defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
	defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
	defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	if (!payload.memo) payload.value = Object.freeze(payload.value);
	return payload;
}
var $ZodLazy = /*@__PURE__*/ $constructor("$ZodLazy", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "innerType", () => {
		const d = def;
		if (!d._cachedInner) d._cachedInner = def.getter();
		return d._cachedInner;
	});
	defineLazyInternal(inst, "pattern", (zod) => zod.innerType?._zod?.pattern);
	defineLazyInternal(inst, "propValues", (zod) => zod.innerType?._zod?.propValues);
	defineLazyInternal(inst, "optin", (zod) => zod.innerType?._zod?.optin ?? void 0);
	defineLazyInternal(inst, "optout", (zod) => zod.innerType?._zod?.optout ?? void 0);
	inst._zod.parse = (payload, ctx) => {
		return inst._zod.innerType._zod.run(payload, ctx);
	};
});
var $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...inst._zod.def.path ?? []],
			continue: !inst._zod.def.abort
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue$2(_iss));
	}
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/memoizer.js
var $ZodCyclicError = class extends Error {
	constructor() {
		super(`Cannot parse a reference cycle that closes through a transform`);
		this.name = "ZodCyclicError";
	}
};
/** Keyed off the context object every schema in one parse call already shares. */
var STATE = "~memo";
var NO_ISSUES = [];
function isRef(value) {
	return value !== null && typeof value === "object";
}
function cloneIssues(issues) {
	return issues.map((iss) => iss.path ? {
		...iss,
		path: iss.path.slice()
	} : { ...iss });
}
var recursive = /*@__PURE__*/ new WeakMap();
/** What the walk established, in order of certainty: ordered so the strongest answer among children wins. */
var NONE = 0;
var ASSUMED = 1;
var PROVEN = 2;
/** Whether this schema's subtree contains a cycle, so one parse can re-enter it. */
function isRecursive(inst, stack, resolve) {
	const cached = recursive.get(inst);
	if (cached !== void 0) return cached ? PROVEN : NONE;
	if (stack.has(inst)) return PROVEN;
	stack.add(inst);
	let result = NONE;
	const check = (child) => {
		if (result !== PROVEN && child?._zod) {
			const answer = isRecursive(child, stack, resolve);
			if (answer > result) result = answer;
		}
	};
	const shape = (sh, spread) => {
		let answer = NONE;
		for (const key of Reflect.ownKeys(sh)) {
			const desc = Object.getOwnPropertyDescriptor(sh, key);
			if (spread && !desc.enumerable) continue;
			const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
			if (child > answer) answer = child;
		}
		return answer;
	};
	const merge = (answer) => {
		if (answer > result) result = answer;
	};
	const def = inst._zod.def;
	switch (def.type) {
		case "object": {
			const raw = rawShape(def);
			merge(raw ? shape(raw, true) : ASSUMED);
			check(def.catchall);
			break;
		}
		case "array":
			check(def.element);
			break;
		case "tuple":
			for (const el of def.items) check(el);
			check(def.rest);
			break;
		case "record":
		case "map":
			check(def.keyType);
			check(def.valueType);
			break;
		case "set":
			check(def.valueType);
			break;
		case "union":
			for (const el of def.options) check(el);
			break;
		case "intersection":
			check(def.left);
			check(def.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			check(def.innerType);
			break;
		case "pipe":
			check(def.in);
			check(def.out);
			break;
		case "function":
			check(def.input);
			check(def.output);
			break;
		case "lazy": {
			const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : void 0);
			merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
			break;
		}
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (const key in def) {
			const desc = Object.getOwnPropertyDescriptor(def, key);
			if (!desc || desc.get) continue;
			const value = desc.value;
			if (!value || typeof value !== "object") continue;
			if (value._zod) check(value);
			else if (Array.isArray(value)) for (const el of value) check(el);
		}
	}
	stack.delete(inst);
	return settle(inst, result);
}
/** An assumed answer must not outlive the resolution that settles it, so only a certain one is cached. */
function settle(inst, answer) {
	if (answer !== ASSUMED) recursive.set(inst, answer === PROVEN);
	return answer;
}
function bucketFor(state, inst) {
	let bucket = state.buckets.get(inst);
	if (!bucket) {
		bucket = /* @__PURE__ */ new WeakMap();
		state.buckets.set(inst, bucket);
	}
	return bucket;
}
var handoff;
var open = [];
var memo = {
	alloc(_inst, payload, empty) {
		const bucket = handoff;
		if (!bucket) return empty;
		handoff = void 0;
		const entry = {
			value: empty,
			issues: null
		};
		bucket.set(payload.value, entry);
		open.push(entry);
		return empty;
	},
	guard(inst) {
		var _a;
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred.push(() => {
			const base = inst._zod.parse;
			const wrapped = (payload, ctx) => {
				if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value)) throw new $ZodCyclicError();
				return base(payload, ctx);
			};
			inst._zod.parse = wrapped;
			if (inst._zod.run === base) inst._zod.run = wrapped;
		});
	},
	attach(inst) {
		var _a;
		let isRecursiveInst;
		let rechecked = false;
		let lastCtx;
		let lastBucket;
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred.push(() => {
			const base = inst._zod.parse;
			const wrapped = (payload, ctx) => {
				if (isRecursiveInst === void 0) {
					const walked = isRecursive(inst, /* @__PURE__ */ new Set(), false);
					if (walked === NONE) {
						inst._zod.parse = base;
						if (inst._zod.run === wrapped) inst._zod.run = base;
						return base(payload, ctx);
					}
					if (walked === PROVEN || rechecked) isRecursiveInst = true;
					else rechecked = true;
				}
				const input = payload.value;
				if (!isRef(input)) return base(payload, ctx);
				let state = ctx[STATE];
				if (!state) {
					state = {
						buckets: /* @__PURE__ */ new WeakMap(),
						backEdges: void 0
					};
					ctx[STATE] = state;
				}
				let bucket;
				if (lastCtx === ctx) bucket = lastBucket;
				else {
					bucket = bucketFor(state, inst);
					lastCtx = ctx;
					lastBucket = bucket;
				}
				const hit = bucket.get(input);
				if (hit) {
					payload.value = hit.value;
					if (hit.issues) {
						if (hit.issues.length) payload.issues.push(...cloneIssues(hit.issues));
					} else {
						payload.memo = true;
						state.backEdges ?? (state.backEdges = /* @__PURE__ */ new WeakSet());
						state.backEdges.add(hit.value);
					}
					return payload;
				}
				handoff = bucket;
				const depth = open.length;
				const result = base(payload, ctx);
				handoff = void 0;
				const entry = open.length > depth ? open.pop() : void 0;
				if (result instanceof Promise) return result.then((r) => {
					if (entry) entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
					return r;
				});
				if (entry) entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
				return result;
			};
			inst._zod.parse = wrapped;
			if (inst._zod.run === base) inst._zod.run = wrapped;
		});
	}
};
/** The memoizer that gives containers cycle support. `zod` installs it by default; `zod/mini` opts in with `config({ memoizer: memoizer() })`. */
function memoizer() {
	return memo;
}
/** Whether this value is a node a back-edge resolved to before it finished. */
function isBackEdge(ctx, value) {
	const backEdges = ctx[STATE]?.backEdges;
	return backEdges !== void 0 && isRef(value) && backEdges.has(value);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/locales/en.js
var error = () => {
	const Sizable = {
		string: {
			unit: "characters",
			verb: "to have"
		},
		file: {
			unit: "bytes",
			verb: "to have"
		},
		array: {
			unit: "items",
			verb: "to have"
		},
		set: {
			unit: "items",
			verb: "to have"
		},
		map: {
			unit: "entries",
			verb: "to have"
		}
	};
	function getSizing(origin) {
		return Sizable[origin] ?? null;
	}
	const FormatDictionary = {
		regex: "input",
		email: "email address",
		url: "URL",
		emoji: "emoji",
		uuid: "UUID",
		uuidv4: "UUIDv4",
		uuidv6: "UUIDv6",
		nanoid: "nanoid",
		guid: "GUID",
		cuid: "cuid",
		cuid2: "cuid2",
		ulid: "ULID",
		xid: "XID",
		ksuid: "KSUID",
		datetime: "ISO datetime",
		date: "ISO date",
		time: "ISO time",
		duration: "ISO duration",
		ipv4: "IPv4 address",
		ipv6: "IPv6 address",
		mac: "MAC address",
		cidrv4: "IPv4 range",
		cidrv6: "IPv6 range",
		base64: "base64-encoded string",
		base64url: "base64url-encoded string",
		json_string: "JSON string",
		e164: "E.164 number",
		currency_code: "currency code",
		credit_card: "credit card number",
		iban: "IBAN",
		jwt: "JWT",
		template_literal: "input"
	};
	const TypeDictionary = { nan: "NaN" };
	function getTypeName(type, input) {
		if (type === "number" && typeof input === "number" && !Number.isFinite(input)) return String(input);
		return TypeDictionary[type] ?? type;
	}
	return (issue) => {
		switch (issue.code) {
			case "invalid_type": return `Invalid input: expected ${getTypeName(issue.expected)}, received ${getTypeName(parsedType(issue.input), issue.input)}`;
			case "invalid_value":
				if (issue.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
				return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
			case "too_big": {
				const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
				return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
			}
			case "too_small": {
				const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
				const sizing = getSizing(issue.origin);
				if (sizing) return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
				return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
			}
			case "invalid_format": {
				const _issue = issue;
				if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
				if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
				if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
				if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
				return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
			}
			case "not_multiple_of": return `Invalid number: must be a multiple of ${issue.divisor}`;
			case "unrecognized_keys": return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
			case "invalid_key": return `Invalid key in ${issue.origin}`;
			case "invalid_union":
				if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) return `Invalid discriminator value. Expected ${issue.options.map((o) => `'${o}'`).join(" | ")}`;
				if (issue.inclusive === false) return "Invalid input: more than one option matched";
				return "Invalid input";
			case "invalid_element": return `Invalid value in ${issue.origin}`;
			default: return `Invalid input`;
		}
	};
};
function en_default() {
	return { localeError: error() };
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/registries.js
var _a;
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
		return this;
	}
	clear() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
		return this;
	}
	remove(schema) {
		const meta = this._map.get(schema);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			const f = {
				...pm,
				...this._map.get(schema)
			};
			return Object.keys(f).length ? f : void 0;
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/api.js
function snapshotChecks(def) {
	if (def.checks) def.checks = [...def.checks];
	return def;
}
// @__NO_SIDE_EFFECTS__
function _string(Class, params) {
	return new Class(snapshotChecks({
		type: "string",
		...normalizeParams(params)
	}));
}
// @__NO_SIDE_EFFECTS__
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link _cuid2} instead.
* See https://github.com/paralleldrive/cuid.
*/
// @__NO_SIDE_EFFECTS__
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _number(Class, params) {
	return new Class(snapshotChecks({
		type: "number",
		checks: [],
		...normalizeParams(params)
	}));
}
// @__NO_SIDE_EFFECTS__
function _int(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "safeint",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value
	});
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
	return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
	return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
	return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
	const ch = /* @__PURE__ */ _check((payload) => {
		payload.addIssue = (issue) => {
			if (typeof issue === "string") payload.issues.push(issue$2(issue, payload.value, ch._zod.def));
			else {
				const _issue = issue;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				if (!("input" in _issue)) _issue.input = payload.value;
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue$2(_issue));
			}
		};
		return fn(payload.value, payload);
	}, params);
	return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	ch._zod.check = fn;
	return ch;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/to-json-schema.js
function assignProps(target, ...sources) {
	for (const source of sources) for (const key of Reflect.ownKeys(source)) if (Object.prototype.propertyIsEnumerable.call(source, key)) assignProp(target, key, source[key]);
	return target;
}
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	if (target === "draft-4") target = "draft-04";
	if (target === "draft-7") target = "draft-07";
	return {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {}),
		io: params?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: params?.external ?? void 0
	};
}
/**
* Applies the `unrepresentable` setting at a site that has no JSON Schema equivalent. Throws
* `message` unless the setting (or the handler's return value) says otherwise. Returns `true` if a
* custom JSON Schema was written into `json`, in which case the caller must not write its own.
*/
function handleUnrepresentable(schema, ctx, json, params, message) {
	const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({
		zodSchema: schema,
		path: params.path,
		message
	}) : ctx.unrepresentable;
	if (result === "any") return false;
	if (result === void 0 || result === "throw") throw new Error(message);
	Object.assign(json, result);
	return true;
}
function processSchema(schema, ctx, _params = {
	path: [],
	schemaPath: []
}) {
	var _a;
	const def = schema._zod.def;
	const seen = ctx.seen.get(schema);
	if (seen) {
		seen.count++;
		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
		return seen.schema;
	}
	const result = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: _params.path
	};
	ctx.seen.set(schema, result);
	ctx.sharedDefsExtractedFor = void 0;
	ctx.sharedEmitDoneFor = void 0;
	const overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema) result.schema = overrideSchema;
	else {
		const params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path
		};
		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			const _json = result.schema;
			const processor = ctx.processors[def.type];
			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		const parent = schema._zod.parent;
		if (parent) {
			if (!result.ref) result.ref = parent;
			processSchema(parent, ctx, params);
			ctx.seen.get(parent).isParent = true;
		}
	}
	const meta = ctx.metadataRegistry.get(schema);
	if (meta) assignProps(result.schema, meta);
	if (ctx.io === "input" && isTransforming(schema)) {
		delete result.schema.examples;
		delete result.schema.default;
	}
	if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
	delete result.schema._prefault;
	return ctx.seen.get(schema).schema;
}
function encodeJSONPointerSegment(segment) {
	return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external) return;
	const idToSchema = /* @__PURE__ */ new Map();
	for (const entry of ctx.seen.entries()) {
		const id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			const existing = idToSchema.get(id);
			if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			idToSchema.set(id, entry[0]);
		}
	}
	const makeURI = (entry) => {
		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			const externalId = ctx.external.registry.get(entry[0])?.id;
			const uriGenerator = ctx.external.uri ?? ((id) => id);
			if (externalId) return { ref: uriGenerator(externalId) };
			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			entry[1].defId = id;
			return {
				defId: id,
				ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}`
			};
		}
		const uriPrefix = `#`;
		const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
		if (entry[1] === root && !entry[1].schema.id) return { ref: uriPrefix };
		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return {
			defId,
			ref: defUriPrefix + encodeJSONPointerSegment(defId)
		};
	};
	const extractToDef = (entry) => {
		if (entry[1].schema.$ref) return;
		const seen = entry[1];
		const { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema };
		if (defId) seen.defId = defId;
		const schema = seen.schema;
		for (const key in schema) delete schema[key];
		schema.$ref = ref;
	};
	if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			const ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		if (seen.count > 1) {
			if (ctx.reused === "ref") extractToDef(entry);
		}
	}
	if (ctx.external) ctx.sharedDefsExtractedFor = ctx.external;
}
/** Rewrites `anyOf: [{type: "a"}, {type: "b"}]` to `type: ["a", "b"]`, which every JSON Schema draft treats as equivalent and most consumers render far better for the nullable case. Only branches that are a bare type assertion qualify — anything carrying a constraint, `$ref`, `const` or metadata is left alone. Runs after `flattenRef`, so a branch an override decorated or `$defs` extraction turned into a `$ref` is no longer bare and correctly stays in `anyOf`. `oneOf` is excluded: `integer` and `number` overlap, so "exactly one" and "at least one" are not the same there. OpenAPI 3.0 is excluded: its `type` must be a single string. */
function compactTypeUnion(schema) {
	const options = schema.anyOf;
	if (!Array.isArray(options) || options.length === 0 || schema.type !== void 0) return;
	const types = [];
	for (const option of options) {
		if (!option || typeof option !== "object") return;
		compactTypeUnion(option);
		const keys = Object.keys(option);
		if (keys.length !== 1 || keys[0] !== "type") return;
		const type = option.type;
		for (const member of Array.isArray(type) ? type : [type]) {
			if (typeof member !== "string") return;
			if (!types.includes(member)) types.push(member);
		}
	}
	delete schema.anyOf;
	schema.type = types.length === 1 ? types[0] : types;
}
/** Keywords `foldIntersection` knows how to combine. Anything else — `$ref`, `patternProperties`,
* an annotation like `description` — makes a member unfoldable, so a constraint this does not
* understand leaves the `allOf` alone instead of being silently dropped or misattributed. */
var FOLDABLE_KEYS = /* @__PURE__ */ new Set([
	"type",
	"properties",
	"required",
	"additionalProperties"
]);
var UNION_KEYS = ["oneOf", "anyOf"];
/** A member's constraint on a key it does not declare itself. A `catchall` states one; `false`, an absent `additionalProperties`, and the empty schema a loose object emits state nothing. */
function undeclaredConstraint(member) {
	const extra = member.additionalProperties;
	if (extra === void 0 || extra === false || typeof extra !== "object" || extra === null) return null;
	return Object.keys(extra).length ? extra : null;
}
/** Combines object members into the single object they describe together, or returns `null` if any of them carries a keyword outside {@link FOLDABLE_KEYS}. */
function foldObjects(members) {
	const objects = [];
	for (const member of members) {
		if (typeof member !== "object" || member.type !== "object") return null;
		for (const key in member) if (!FOLDABLE_KEYS.has(key)) return null;
		objects.push(member);
	}
	const properties = {};
	const required = /* @__PURE__ */ new Set();
	for (const object of objects) {
		for (const key in object.properties) {
			if (Object.prototype.hasOwnProperty.call(properties, key)) continue;
			const parts = [];
			for (const other of objects) {
				const part = other.properties?.[key] ?? undeclaredConstraint(other);
				if (part === null || part === void 0) continue;
				if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part))) parts.push(part);
			}
			assignProp(properties, key, parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts });
		}
		for (const key of object.required ?? []) required.add(key);
	}
	const folded = {
		type: "object",
		properties
	};
	if (required.size) folded.required = [...required];
	if (objects.every((object) => object.additionalProperties === false)) folded.additionalProperties = false;
	else {
		const constraints = [];
		for (const object of objects) {
			const constraint = undeclaredConstraint(object);
			if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint))) constraints.push(constraint);
		}
		if (constraints.length === 1) folded.additionalProperties = constraints[0];
		else if (constraints.length > 1) folded.additionalProperties = { allOf: constraints };
	}
	return folded;
}
/** `additionalProperties` in an `allOf` member sees only that member's own `properties`, so two
* closed object members reject each other's keys and the schema validates nothing. Zod's parser
* pools the key sets instead — `handleIntersectionResults` reports a key as unrecognized only when
* *every* side rejects it — so the emitted schema has to pool them too, and folding the members
* into one object is the encoding that says so on every target.
*
* This runs from `finalize`, after `extractDefs`, which is what keeps it clear of the `$ref`
* machinery: a member extracted into `$defs` is already a `$ref` by now and declines to fold, so it
* keeps its reference and its own closedness rather than being inlined as a stale copy. */
function foldIntersection(json) {
	const allOf = json.allOf;
	if (!Array.isArray(allOf) || allOf.length < 2) return;
	for (const key of FOLDABLE_KEYS) if (key in json) return;
	const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
	let folded = null;
	if (!unions.length) folded = foldObjects(allOf);
	else {
		const union = unions[0];
		const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
		if (Object.keys(union).length !== 1) return;
		const rest = allOf.filter((m) => m !== union);
		const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
		if (branches.some((b) => !b)) return;
		folded = { [keyword]: branches };
	}
	if (!folded) return;
	delete json.allOf;
	assignProps(json, folded);
}
function finalize(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const flattenRef = (zodSchema) => {
		const seen = ctx.seen.get(zodSchema);
		if (seen.ref === null) return;
		const schema = seen.def ?? seen.schema;
		const _cached = { ...schema };
		const ref = seen.ref;
		seen.ref = null;
		if (ref) {
			flattenRef(ref);
			const refSeen = ctx.seen.get(ref);
			const refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
				schema.allOf = schema.allOf ?? [];
				schema.allOf.push(refSchema);
			} else assignProps(schema, refSchema);
			assignProps(schema, _cached);
			if (zodSchema._zod.parent === ref) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (!(key in _cached)) delete schema[key];
			}
			if (refSchema.$ref && refSeen.def) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
			}
		}
		const parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			const parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref) {
				schema.$ref = parentSeen.schema.$ref;
				if (parentSeen.def) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
				}
			}
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema,
			path: seen.path ?? []
		});
	};
	if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
		for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
		if (ctx.target !== "openapi-3.0") for (const entry of ctx.seen.entries()) compactTypeUnion(entry[1].def ?? entry[1].schema);
		for (const rewrite of ctx.deferred) rewrite();
		if (ctx.intersections.length) {
			const carriers = /* @__PURE__ */ new Map();
			for (const seen of ctx.seen.values()) for (const json of [seen.schema, seen.def]) {
				const allOf = json?.allOf;
				if (!Array.isArray(allOf)) continue;
				const existing = carriers.get(allOf);
				if (existing) existing.push(json);
				else carriers.set(allOf, [json]);
			}
			for (const allOf of ctx.intersections) for (const json of carriers.get(allOf) ?? []) foldIntersection(json);
		}
	}
	const result = {};
	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
	else if (ctx.target === "openapi-3.0") {}
	if (ctx.external?.uri) {
		const id = ctx.external.registry.get(schema)?.id;
		if (!id) throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
	const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
	if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
	const defs = ctx.external?.defs ?? {};
	if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.def && seen.defId) {
			if (seen.def.id === seen.defId) delete seen.def.id;
			assignProp(defs, seen.defId, seen.def);
		}
	}
	if (ctx.external) ctx.sharedEmitDoneFor = ctx.external;
	if (ctx.external) {} else if (Object.keys(defs).length > 0) {
		if (ctx.target === "draft-2020-12") result.$defs = defs;
		else result.definitions = defs;
	}
	try {
		const finalized = JSON.parse(JSON.stringify(result));
		Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
				}
			},
			enumerable: false,
			writable: false
		});
		return finalized;
	} catch (_err) {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const def = _schema._zod.def;
	if (def.type === "transform") return true;
	if (def.type === "array") return isTransforming(def.element, ctx);
	if (def.type === "set") return isTransforming(def.valueType, ctx);
	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") return isTransforming(def.innerType, ctx);
	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe") {
		if (_schema._zod.traits.has("$ZodCodec")) return true;
		return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	}
	if (def.type === "object") {
		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
		return false;
	}
	if (def.type === "union") {
		for (const option of def.options) if (isTransforming(option, ctx)) return true;
		return false;
	}
	if (def.type === "tuple") {
		for (const item of def.items) if (isTransforming(item, ctx)) return true;
		if (def.rest && isTransforming(def.rest, ctx)) return true;
		return false;
	}
	return false;
}
/**
* Creates a toJSONSchema method for a schema instance.
* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
*/
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
	const ctx = initializeContext({
		...params,
		processors
	});
	processSchema(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
	const { libraryOptions, target } = params ?? {};
	const ctx = initializeContext({
		...libraryOptions ?? {},
		target,
		io,
		processors
	});
	processSchema(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/core/json-schema-processors.js
var narrowMin = (agg, key, value) => {
	if (agg[key] === void 0 || value > agg[key]) agg[key] = value;
};
var narrowMax = (agg, key, value) => {
	if (agg[key] === void 0 || value < agg[key]) agg[key] = value;
};
var narrowBoth = (agg, value) => {
	narrowMin(agg, "minimum", value);
	narrowMax(agg, "maximum", value);
};
var addDivisor = (agg, value) => {
	agg.multipleOf ?? (agg.multipleOf = []);
	if (!agg.multipleOf.includes(value)) agg.multipleOf.push(value);
};
var addPattern = (agg, pattern) => {
	agg.patterns ?? (agg.patterns = /* @__PURE__ */ new Set());
	agg.patterns.add(pattern);
};
var intersectMime = (agg, mime) => {
	agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
};
var setFormat = (agg, format) => {
	agg.format = format;
	if (format.includes("int")) agg.isInt = true;
};
var minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
var maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
var formatContributor = (ranges) => (agg, def) => {
	setFormat(agg, def.format);
	const [minimum, maximum] = ranges[def.format];
	narrowMin(agg, "minimum", minimum);
	narrowMax(agg, "maximum", maximum);
};
var contributors = {
	greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
	less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
	multiple_of: (agg, def) => addDivisor(agg, def.value),
	number_format: formatContributor(NUMBER_FORMAT_RANGES),
	bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
	min_length: minContributor,
	max_length: maxContributor,
	length_equals: (agg, def) => narrowBoth(agg, def.length),
	min_size: minContributor,
	max_size: maxContributor,
	size_equals: (agg, def) => narrowBoth(agg, def.size),
	string_format: (agg, def) => {
		setFormat(agg, def.format);
		if (def.pattern) addPattern(agg, def.pattern);
		if (def.format === "base64" || def.format === "base64url") agg.contentEncoding = def.format;
		if (def.local || def.precision === -1) agg.laxFormat = true;
	},
	mime_type: (agg, def) => intersectMime(agg, def.mime)
};
function aggregateChecks(schema) {
	const agg = {};
	const def = schema._zod.def;
	const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
	for (const ch of list) contributors[ch._zod.def.check]?.(agg, ch._zod.def);
	const bag = schema._zod.bag;
	if (bag.minimum !== void 0) narrowMin(agg, "minimum", bag.minimum);
	if (bag.exclusiveMinimum !== void 0) narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
	if (bag.maximum !== void 0) narrowMax(agg, "maximum", bag.maximum);
	if (bag.exclusiveMaximum !== void 0) narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
	if (bag.multipleOf !== void 0) addDivisor(agg, bag.multipleOf);
	if (bag.format !== void 0) {
		agg.format ?? (agg.format = bag.format);
		if (bag.format.includes("int")) agg.isInt = true;
	}
	if (bag.mime) intersectMime(agg, bag.mime);
	for (const pattern of bag.patterns ?? []) addPattern(agg, pattern);
	return agg;
}
var formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
};
var exactPatterns = /* @__PURE__ */ new Map([[base64Charset, base64], [base64urlCharset, base64url]]);
var exactPattern = (p) => exactPatterns.get(p) ?? p;
var stringProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	json.type = "string";
	const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
	if (typeof minimum === "number") json.minLength = minimum;
	if (typeof maximum === "number") json.maxLength = maximum;
	if (format) {
		json.format = formatMap[format] ?? format;
		if (json.format === "") delete json.format;
		if (format === "time" || laxFormat) delete json.format;
	}
	if (contentEncoding) json.contentEncoding = contentEncoding;
	if (patterns && patterns.size > 0) {
		const patternList = [...patterns].map(exactPattern);
		if (patternList.length === 1) json.pattern = patternList[0].source;
		else if (patternList.length > 1) json.allOf = [...patternList.map((regex) => ({
			...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: regex.source
		}))];
	}
};
var numberProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
	json.type = isInt ? "integer" : "number";
	const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
	const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
	const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
	if (exMin) {
		if (legacy) {
			json.minimum = exclusiveMinimum;
			json.exclusiveMinimum = true;
		} else json.exclusiveMinimum = exclusiveMinimum;
	} else if (typeof minimum === "number") json.minimum = minimum;
	if (exMax) {
		if (legacy) {
			json.maximum = exclusiveMaximum;
			json.exclusiveMaximum = true;
		} else json.exclusiveMaximum = exclusiveMaximum;
	} else if (typeof maximum === "number") json.maximum = maximum;
	if (multipleOf) {
		const divisors = /* @__PURE__ */ new Set();
		for (const divisor of multipleOf) if (Number.isFinite(divisor) && divisor !== 0) divisors.add(Math.abs(divisor));
		else handleUnrepresentable(schema, ctx, json, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
		const [first, ...rest] = divisors;
		if (first !== void 0) json.multipleOf = first;
		if (rest.length) json.allOf = [...json.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))];
	}
};
var booleanProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
var neverProcessor = (_schema, _ctx, json, _params) => {
	json.not = {};
};
var enumProcessor = (schema, _ctx, json, _params) => {
	const def = schema._zod.def;
	const values = getEnumValues(def.entries);
	if (values.length === 0) {
		json.not = {};
		return;
	}
	if (values.every((v) => typeof v === "number")) json.type = "number";
	if (values.every((v) => typeof v === "string")) json.type = "string";
	json.enum = values;
};
var literalProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	if (def.values.length === 0) {
		json.not = {};
		return;
	}
	const vals = [];
	for (const val of def.values) if (val === void 0) {
		if (handleUnrepresentable(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema")) return;
	} else if (typeof val === "bigint") {
		if (handleUnrepresentable(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema")) return;
		vals.push(Number(val));
	} else vals.push(val);
	if (vals.length === 0) {} else if (vals.length === 1) {
		const val = vals[0];
		json.type = val === null ? "null" : typeof val;
		if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
		else json.const = val;
	} else {
		if (vals.every((v) => typeof v === "number")) json.type = "number";
		if (vals.every((v) => typeof v === "string")) json.type = "string";
		if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
		if (vals.every((v) => v === null)) json.type = "null";
		json.enum = vals;
	}
};
var customProcessor = (schema, ctx, json, params) => {
	handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
};
var transformProcessor = (schema, ctx, json, params) => {
	handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
};
var arrayProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const { minimum, maximum } = aggregateChecks(schema);
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
	json.type = "array";
	json.items = processSchema(def.element, ctx, {
		...params,
		path: [...params.path, "items"]
	});
};
function inputOptin(schema) {
	const def = schema._zod.def;
	if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) return inputOptin(def.out);
	if (def.type === "catch") return inputOptin(def.innerType);
	return schema._zod.optin;
}
var objectProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const shape = def.shape;
	if (Object.getOwnPropertySymbols(shape).length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) return;
	json.type = "object";
	json.properties = {};
	for (const key in shape) assignProp(json.properties, key, processSchema(shape[key], ctx, {
		...params,
		path: [
			...params.path,
			"properties",
			key
		]
	}));
	const requiredKeys = [];
	for (const key of Object.keys(shape)) {
		const field = def.shape[key];
		if (ctx.io === "input" ? inputOptin(field) === void 0 : field._zod.optout === void 0) requiredKeys.push(key);
	}
	if (requiredKeys.length > 0) json.required = requiredKeys;
	if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
	else if (!def.catchall) {
		if (ctx.io === "output") json.additionalProperties = false;
	} else if (def.catchall) json.additionalProperties = processSchema(def.catchall, ctx, {
		...params,
		path: [...params.path, "additionalProperties"]
	});
};
var unionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const isExclusive = def.inclusive === false;
	const options = def.options.map((x, i) => processSchema(x, ctx, {
		...params,
		path: [
			...params.path,
			isExclusive ? "oneOf" : "anyOf",
			i
		]
	}));
	if (isExclusive) json.oneOf = options;
	else json.anyOf = options;
};
var intersectionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const a = processSchema(def.left, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			0
		]
	});
	const b = processSchema(def.right, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			1
		]
	});
	const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
	const allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
	json.allOf = allOf;
	ctx.intersections.push(allOf);
};
/** JSON object keys are always strings, so a numeric record key schema is re-expressed over the
* numeric-string form the record parser matches. Deferred to `finalize`, after the flatten: a key
* behind a wrapper only carries its own `type` before then, and a union key only has its branches.
*
* A numeric bound cannot apply to a property name, so `minimum` and its siblings are dropped rather
* than carried over: keeping them beside `type: "string"` reproduces the match-nothing schema this
* exists to fix. A key that carries one therefore emits wider than the record parses — `z.record(z.number().min(5), V)`
* accepts `"3"` — which is the deliberate trade, since throwing on it would reject an ordinary schema
* outright. */
function stringifyKeyNames(bySchema, json, visited) {
	if (json.$ref) {
		if (visited.has(json)) return json;
		visited.add(json);
		const def = bySchema.get(json)?.def;
		if (!def) return json;
		const inlined = stringifyKeyNames(bySchema, def, visited);
		return inlined === def ? json : inlined;
	}
	for (const keyword of ["anyOf", "oneOf"]) {
		const branches = json[keyword];
		if (!Array.isArray(branches)) continue;
		const mapped = branches.map((branch) => stringifyKeyNames(bySchema, branch, visited));
		if (mapped.some((branch, i) => branch !== branches[i])) json = {
			...json,
			[keyword]: mapped
		};
	}
	const types = Array.isArray(json.type) ? json.type : [json.type];
	const numericType = !types.includes("string") && types.some((t) => t === "number" || t === "integer");
	const values = json.enum ?? (json.const !== void 0 ? [json.const] : void 0);
	if (!numericType && !values?.some((v) => typeof v === "number")) return json;
	const { minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, format, id, ...rest } = json;
	if (rest.enum) rest.enum = rest.enum.map((v) => typeof v === "number" ? String(v) : v);
	else if (typeof rest.const === "number") rest.const = String(rest.const);
	if (!numericType) return rest;
	rest.type = "string";
	if (!values) rest.pattern = (types.includes("number") ? number$1 : integer).source;
	return rest;
}
/** Every record of one conversion, so the carriers are found in a single pass rather than once per record. */
var pendingRecords = /* @__PURE__ */ new WeakMap();
function rewriteKeyNames(ctx) {
	const bySchema = /* @__PURE__ */ new Map();
	for (const entry of ctx.seen.values()) if (entry.def && !bySchema.has(entry.schema)) bySchema.set(entry.schema, entry);
	const rewrites = /* @__PURE__ */ new Map();
	for (const record of pendingRecords.get(ctx) ?? []) {
		const seen = ctx.seen.get(record);
		const names = (seen?.def ?? seen?.schema)?.propertyNames;
		if (!names || names === true || rewrites.has(names)) continue;
		const rewritten = stringifyKeyNames(bySchema, names, /* @__PURE__ */ new Set());
		if (rewritten !== names) rewrites.set(names, rewritten);
	}
	if (!rewrites.size) return;
	for (const entry of ctx.seen.values()) for (const carrier of [entry.schema, entry.def]) {
		const rewritten = carrier && rewrites.get(carrier.propertyNames);
		if (rewritten) carrier.propertyNames = rewritten;
	}
}
var recordProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	const keyType = def.keyType;
	const patterns = aggregateChecks(keyType).patterns;
	if (def.mode === "loose" && patterns && patterns.size > 0) {
		const valueSchema = processSchema(def.valueType, ctx, {
			...params,
			path: [
				...params.path,
				"patternProperties",
				"*"
			]
		});
		json.patternProperties = {};
		for (const pattern of patterns) assignProp(json.patternProperties, exactPattern(pattern).source, valueSchema);
	} else {
		if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
			json.propertyNames = processSchema(def.keyType, ctx, {
				...params,
				path: [...params.path, "propertyNames"]
			});
			let pending = pendingRecords.get(ctx);
			if (!pending) {
				pending = [];
				pendingRecords.set(ctx, pending);
				ctx.deferred.push(() => rewriteKeyNames(ctx));
			}
			pending.push(schema);
		}
		json.additionalProperties = processSchema(def.valueType, ctx, {
			...params,
			path: [...params.path, "additionalProperties"]
		});
	}
	const keyValues = keyType._zod.values;
	const omittableOnInput = ctx.io === "input" && inputOptin(def.valueType) !== void 0;
	if (keyValues && !def.partial && !omittableOnInput) {
		const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
		if (validKeyValues.length > 0) json.required = validKeyValues.map(String);
	}
};
var nullableProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const inner = processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	if (ctx.target === "openapi-3.0") {
		seen.ref = def.innerType;
		json.nullable = true;
	} else json.anyOf = [inner, { type: "null" }];
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
/** Round-trips a default value through JSON so the emitted schema is guaranteed to be valid JSON.
* A BigInt has no reliable encoding, so it goes through `unrepresentable` like any other
* unrepresentable value. Returns a sentinel when the caller must not write a default of its own. */
var UNREPRESENTABLE_DEFAULT = Symbol();
function serializeDefaultValue(value, schema, ctx, json, params) {
	let unrepresentable = false;
	const serialized = JSON.stringify(value, (_, val) => {
		if (typeof val !== "bigint") return val;
		unrepresentable = true;
		return null;
	});
	if (!unrepresentable) return JSON.parse(serialized);
	handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
	return UNREPRESENTABLE_DEFAULT;
}
var defaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
	if (value !== UNREPRESENTABLE_DEFAULT) json.default = value;
};
var prefaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	if (ctx.io !== "input") return;
	const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
	if (value !== UNREPRESENTABLE_DEFAULT) json._prefault = value;
};
var catchProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let catchValue;
	try {
		catchValue = def.catchValue(void 0);
	} catch {
		handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
		return;
	}
	json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	const inIsTransform = def.in._zod.traits.has("$ZodTransform");
	const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
	processSchema(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.readOnly = true;
};
var optionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	processSchema(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
	const innerType = schema._zod.innerType;
	processSchema(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/errors.js
var _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function _lazyMethod(proto, key, make) {
	Object.defineProperty(proto, key, {
		configurable: true,
		enumerable: false,
		get() {
			const value = make(this);
			Object.defineProperty(this, key, {
				value,
				configurable: true,
				writable: true
			});
			return value;
		},
		set(value) {
			Object.defineProperty(this, key, {
				value,
				configurable: true,
				writable: true
			});
		}
	});
}
var initializer = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	const proto = Object.getPrototypeOf(inst);
	if (_installedErrorProtos.has(proto)) return;
	_installedErrorProtos.add(proto);
	_lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
	_lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
	_lazyMethod(proto, "addIssue", (self) => (issue) => {
		self.issues.push(issue);
		self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
	});
	_lazyMethod(proto, "addIssues", (self) => (issues) => {
		self.issues.push(...issues);
		self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
	});
	Object.defineProperty(proto, "isEmpty", {
		configurable: true,
		enumerable: false,
		get() {
			return this.issues.length === 0;
		}
	});
};
var ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, void 0, { Parent: Error });
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/parse.js
var parse = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode = /* @__PURE__ */ _encode(ZodRealError);
var decode = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/schemas.js
function _ensureDefaultLocale() {
	if (!globalConfig.localeError) config(en_default());
}
function _ensureDefaultMemoizer() {
	if (!globalConfig.memoizer) config({ memoizer: memoizer() });
}
var ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
	_ensureDefaultLocale();
	$ZodType.init(inst, def);
	inst.def = def;
	inst.type = def.type;
	return inst;
}, {
	check(...chks) {
		const def = this.def;
		return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
			check: ch,
			def: { check: "custom" },
			onattach: []
		} } : ch)] }), { parent: true });
	},
	with(...chks) {
		return this.check(...chks);
	},
	clone(def, params) {
		return clone(this, def, params);
	},
	brand() {
		return this;
	},
	register(reg, meta) {
		reg.add(this, meta);
		return this;
	},
	refine(check, params) {
		return this.check(refine(check, params));
	},
	superRefine(refinement, params) {
		return this.check(superRefine(refinement, params));
	},
	overwrite(fn) {
		return this.check(/* @__PURE__ */ _overwrite(fn));
	},
	optional() {
		return optional(this);
	},
	exactOptional() {
		return exactOptional(this);
	},
	nullable() {
		return nullable(this);
	},
	nullish() {
		return optional(nullable(this));
	},
	nonoptional(params) {
		return nonoptional(this, params);
	},
	array() {
		return array(this);
	},
	or(arg) {
		return union([this, arg]);
	},
	and(arg) {
		return intersection(this, arg);
	},
	transform(tx) {
		return pipe(this, transform(tx));
	},
	default(d) {
		return _default(this, d);
	},
	prefault(d) {
		return prefault(this, d);
	},
	catch(params) {
		return _catch(this, params);
	},
	pipe(target) {
		return pipe(this, target);
	},
	readonly() {
		return readonly(this);
	},
	describe(description) {
		const cl = this.clone();
		globalRegistry.add(cl, { description });
		return cl;
	},
	meta(...args) {
		if (args.length === 0) return globalRegistry.get(this);
		const cl = this.clone();
		globalRegistry.add(cl, args[0]);
		return cl;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(fn, ...args) {
		return args.length === 0 ? fn(this) : fn(this, ...args);
	},
	get "~standard"() {
		return hide(this, "~standard", {
			...standardProps(this),
			jsonSchema: {
				input: createStandardJSONSchemaMethod(this, "input"),
				output: createStandardJSONSchemaMethod(this, "output")
			}
		});
	},
	set "~standard"(value) {
		own(this, "~standard", value);
	},
	parse: function _parse(data, params) {
		return parse(this, data, params, { callee: _parse });
	},
	parseAsync: async function _parseAsync(data, params) {
		return await parseAsync(this, data, params, { callee: _parseAsync });
	},
	safeParse(data, params) {
		return safeParse(this, data, params);
	},
	async safeParseAsync(data, params) {
		return safeParseAsync(this, data, params);
	},
	get spa() {
		return this?.safeParseAsync;
	},
	set spa(value) {
		own(this, "spa", value);
	},
	validate(data, params) {
		return validate(this, data, params);
	},
	validateAsync(data, params) {
		return validateAsync$1(this, data, params);
	},
	encode: function _encode(data, params) {
		return encode(this, data, params, { callee: _encode });
	},
	decode: function _decode(data, params) {
		return decode(this, data, params, { callee: _decode });
	},
	encodeAsync: async function _encodeAsync(data, params) {
		return await encodeAsync(this, data, params, { callee: _encodeAsync });
	},
	decodeAsync: async function _decodeAsync(data, params) {
		return await decodeAsync(this, data, params, { callee: _decodeAsync });
	},
	safeEncode(data, params) {
		return safeEncode(this, data, params);
	},
	safeDecode(data, params) {
		return safeDecode(this, data, params);
	},
	async safeEncodeAsync(data, params) {
		return safeEncodeAsync(this, data, params);
	},
	async safeDecodeAsync(data, params) {
		return safeDecodeAsync(this, data, params);
	},
	toJSONSchema(params) {
		return createToJSONSchemaMethod(this, {})(params);
	},
	get description() {
		return globalRegistry.get(this)?.description;
	},
	get _def() {
		return this._zod.def;
	}
});
/** @internal */
var _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
}, /*@__PURE__*/ derived({
	format: (inst) => aggregateChecks(inst).format ?? null,
	minLength: (inst) => aggregateChecks(inst).minimum ?? null,
	maxLength: (inst) => aggregateChecks(inst).maximum ?? null
}, {
	regex(...args) {
		return this.check(/* @__PURE__ */ _regex(...args));
	},
	includes(...args) {
		return this.check(/* @__PURE__ */ _includes(...args));
	},
	startsWith(...args) {
		return this.check(/* @__PURE__ */ _startsWith(...args));
	},
	endsWith(...args) {
		return this.check(/* @__PURE__ */ _endsWith(...args));
	},
	min(...args) {
		return this.check(/* @__PURE__ */ _minLength(...args));
	},
	max(...args) {
		return this.check(/* @__PURE__ */ _maxLength(...args));
	},
	length(...args) {
		return this.check(/* @__PURE__ */ _length(...args));
	},
	nonempty(...args) {
		return this.check(/* @__PURE__ */ _minLength(1, ...args));
	},
	lowercase(params) {
		return this.check(/* @__PURE__ */ _lowercase(params));
	},
	uppercase(params) {
		return this.check(/* @__PURE__ */ _uppercase(params));
	},
	trim() {
		return this.check(/* @__PURE__ */ _trim());
	},
	normalize(...args) {
		return this.check(/* @__PURE__ */ _normalize(...args));
	},
	toLowerCase() {
		return this.check(/* @__PURE__ */ _toLowerCase());
	},
	toUpperCase() {
		return this.check(/* @__PURE__ */ _toUpperCase());
	},
	slugify() {
		return this.check(/* @__PURE__ */ _slugify());
	}
}));
var ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
}, {
	email(params) {
		return this.check(/* @__PURE__ */ _email(ZodEmail, params));
	},
	url(params) {
		return this.check(/* @__PURE__ */ _url(ZodURL, params));
	},
	jwt(params) {
		return this.check(/* @__PURE__ */ _jwt(ZodJWT, params));
	},
	emoji(params) {
		return this.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
	},
	guid(params) {
		return this.check(/* @__PURE__ */ _guid(ZodGUID, params));
	},
	uuid(params) {
		return this.check(/* @__PURE__ */ _uuid(ZodUUID, params));
	},
	uuidv4(params) {
		return this.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
	},
	uuidv6(params) {
		return this.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
	},
	uuidv7(params) {
		return this.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
	},
	nanoid(params) {
		return this.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
	},
	cuid(params) {
		return this.check(/* @__PURE__ */ _cuid(ZodCUID, params));
	},
	cuid2(params) {
		return this.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
	},
	ulid(params) {
		return this.check(/* @__PURE__ */ _ulid(ZodULID, params));
	},
	base64(params) {
		return this.check(/* @__PURE__ */ _base64(ZodBase64, params));
	},
	base64url(params) {
		return this.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
	},
	xid(params) {
		return this.check(/* @__PURE__ */ _xid(ZodXID, params));
	},
	ksuid(params) {
		return this.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
	},
	ipv4(params) {
		return this.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
	},
	ipv6(params) {
		return this.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
	},
	cidrv4(params) {
		return this.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
	},
	cidrv6(params) {
		return this.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
	},
	e164(params) {
		return this.check(/* @__PURE__ */ _e164(ZodE164, params));
	},
	datetime(params) {
		return this.check(/* @__PURE__ */ _isoDateTime(ZodISODateTime, params));
	},
	date(params) {
		return this.check(/* @__PURE__ */ _isoDate(ZodISODate, params));
	},
	time(params) {
		return this.check(/* @__PURE__ */ _isoTime(ZodISOTime, params));
	},
	duration(params) {
		return this.check(/* @__PURE__ */ _isoDuration(ZodISODuration, params));
	}
});
function string(params) {
	return /* @__PURE__ */ _string(ZodString, params);
}
var ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
var ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
* See https://github.com/paralleldrive/cuid.
*/
var ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
var ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
	inst.isFinite = true;
}, /*@__PURE__*/ derived({
	minValue: (inst) => {
		const { minimum, exclusiveMinimum } = aggregateChecks(inst);
		return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
	},
	maxValue: (inst) => {
		const { maximum, exclusiveMaximum } = aggregateChecks(inst);
		return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
	},
	isInt: (inst) => {
		const { isInt, multipleOf } = aggregateChecks(inst);
		return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
	},
	format: (inst) => aggregateChecks(inst).format ?? null
}, {
	gt(value, params) {
		return this.check(/* @__PURE__ */ _gt(value, params));
	},
	gte(value, params) {
		return this.check(/* @__PURE__ */ _gte(value, params));
	},
	min(value, params) {
		return this.check(/* @__PURE__ */ _gte(value, params));
	},
	lt(value, params) {
		return this.check(/* @__PURE__ */ _lt(value, params));
	},
	lte(value, params) {
		return this.check(/* @__PURE__ */ _lte(value, params));
	},
	max(value, params) {
		return this.check(/* @__PURE__ */ _lte(value, params));
	},
	int(params) {
		return this.check(int(params));
	},
	safe(params) {
		return this.check(int(params));
	},
	positive(params) {
		return this.check(/* @__PURE__ */ _gt(0, params));
	},
	nonnegative(params) {
		return this.check(/* @__PURE__ */ _gte(0, params));
	},
	negative(params) {
		return this.check(/* @__PURE__ */ _lt(0, params));
	},
	nonpositive(params) {
		return this.check(/* @__PURE__ */ _lte(0, params));
	},
	multipleOf(value, params) {
		return this.check(/* @__PURE__ */ _multipleOf(value, params));
	},
	step(value, params) {
		return this.check(/* @__PURE__ */ _multipleOf(value, params));
	},
	finite() {
		return this;
	}
}));
function number(params) {
	return /* @__PURE__ */ _number(ZodNumber, params);
}
var ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber.init(inst, def);
});
function int(params) {
	return /* @__PURE__ */ _int(ZodNumberFormat, params);
}
var ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
	return /* @__PURE__ */ _boolean(ZodBoolean, params);
}
var ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => void 0;
});
function unknown() {
	return /* @__PURE__ */ _unknown(ZodUnknown);
}
var ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return /* @__PURE__ */ _never(ZodNever, params);
}
var ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
	_ensureDefaultMemoizer();
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
	inst.element = def.element;
}, {
	min(n, params) {
		return this.check(/* @__PURE__ */ _minLength(n, params));
	},
	nonempty(params) {
		return this.check(/* @__PURE__ */ _minLength(1, params));
	},
	max(n, params) {
		return this.check(/* @__PURE__ */ _maxLength(n, params));
	},
	length(n, params) {
		return this.check(/* @__PURE__ */ _length(n, params));
	},
	unwrap() {
		return this.element;
	}
});
function array(element, params) {
	return /* @__PURE__ */ _array(ZodArray, element, params);
}
var ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
	_ensureDefaultMemoizer();
	$ZodObjectJIT.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
	installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
}, {
	keyof() {
		return _enum(Object.keys(this._zod.def.shape));
	},
	catchall(catchall) {
		return this.clone(mergeDefs(this._zod.def, { catchall }));
	},
	passthrough() {
		return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
	},
	loose() {
		return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
	},
	strict() {
		return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
	},
	strip() {
		return this.clone(mergeDefs(this._zod.def, { catchall: void 0 }));
	},
	extend(incoming) {
		return extend(this, incoming);
	},
	safeExtend(incoming) {
		return safeExtend(this, incoming);
	},
	merge(other) {
		return merge(this, other);
	},
	pick(mask) {
		return pick(this, mask);
	},
	omit(mask) {
		return omit(this, mask);
	},
	partial(...args) {
		return partial(ZodOptional, this, args[0]);
	},
	exactPartial(...args) {
		return partial(ZodExactOptional, this, args[0], "exactPartial");
	},
	required(...args) {
		return required(ZodNonOptional, this, args[0]);
	}
});
function object(shape, params) {
	return new ZodObject({
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	});
}
var ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
var ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("ZodDiscriminatedUnion", (inst, def) => {
	ZodUnion.init(inst, def);
	$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
var ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
var ZodRecord = /*@__PURE__*/ $constructor("ZodRecord", (inst, def) => {
	_ensureDefaultMemoizer();
	$ZodRecord.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	if (!valueType || !valueType._zod) return new ZodRecord({
		type: "record",
		keyType: string(),
		valueType: keyType,
		...normalizeParams(valueType)
	});
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
var ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
	inst.enum = def.entries;
	inst.options = [...inst._zod.values];
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values) if (keys.has(value)) delete newEntries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum(values, params) {
	return new ZodEnum({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params)
	});
}
var ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
	inst.values = new Set(def.values);
	Object.defineProperty(inst, "value", { get() {
		if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return def.values[0];
	} });
});
function literal(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
var ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
	_ensureDefaultMemoizer();
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
	inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue) => {
			if (typeof issue === "string") payload.issues.push(issue$2(issue, payload.value, def));
			else {
				const _issue = issue;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				if (!("input" in _issue)) _issue.input = payload.value;
				_issue.inst ?? (_issue.inst = inst);
				payload.issues.push(issue$2(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output) => {
			payload.value = output;
			return payload;
		});
		payload.value = output;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
var ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
var ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
var ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
var ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
var ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
var ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
var ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
	});
}
var ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
var ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
var ZodLazy = /*@__PURE__*/ $constructor("ZodLazy", (inst, def) => {
	$ZodLazy.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => lazyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
	return new ZodLazy({
		type: "lazy",
		getter
	});
}
var ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function refine(fn, _params = {}) {
	return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
	return /* @__PURE__ */ _superRefine(fn, params);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.6.5/node_modules/zod/v4/classic/iso.js
function datetime(params) {
	return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
}
//#endregion
//#region ../../packages/domain/src/schema/primitives.ts
/**
* Limites de tamanho. Protegem o app contra arquivos importados degenerados ou maliciosos
* (o import é a principal fronteira de confiança do sistema).
*/
var LIMITS = {
	fields: 500,
	listItemFields: 30,
	listItems: 500,
	selectOptions: 100,
	layoutNodes: 1e3,
	layoutDepth: 8,
	gmSummary: 12,
	tags: 10,
	text: 1e4,
	label: 100,
	description: 2e3,
	members: 50
};
/** Identificador estável (de campo, ficha, template…). Nunca exibido ao usuário. */
var IdSchema = string().regex(/^[A-Za-z0-9_-]{1,64}$/, "Identificador inválido").refine((id) => !(id in Object.prototype), "Identificador reservado");
/** Apelido de campo usado em fórmulas (`@for`). Minúsculas, números e `_`. */
var KeySchema = string().regex(/^[a-z][a-z0-9_]{0,39}$/, "Use letras minúsculas, números e \"_\" (começando por letra, até 40 caracteres)");
var LabelSchema = string().trim().min(1, "Obrigatório").max(LIMITS.label);
var DescriptionSchema = string().max(LIMITS.description);
/** Versão semântica simplificada: MAJOR.MINOR.PATCH. */
var SemVerSchema = string().regex(/^(0|[1-9]\d{0,5})\.(0|[1-9]\d{0,5})\.(0|[1-9]\d{0,5})$/, "Versão inválida (use 1.0.0)");
var FiniteNumberSchema = number().refine(Number.isFinite, "Número inválido");
var TimestampSchema = number().int().nonnegative();
//#endregion
//#region ../../packages/domain/src/formula/ast.ts
/** Propriedades de recursos: `@hp.max`, `@hp.temp` (`@hp` é o valor atual). */
var RESOURCE_PROPERTIES = ["max", "temp"];
/** Funções disponíveis e sua aridade (mínimo e máximo de argumentos). */
var FUNCTIONS = {
	floor: {
		min: 1,
		max: 1
	},
	ceil: {
		min: 1,
		max: 1
	},
	round: {
		min: 1,
		max: 1
	},
	abs: {
		min: 1,
		max: 1
	},
	min: {
		min: 1,
		max: Infinity
	},
	max: {
		min: 1,
		max: Infinity
	},
	clamp: {
		min: 3,
		max: 3
	},
	if: {
		min: 3,
		max: 3
	},
	/** Soma a expressão para cada item de uma lista: `sum(@itens.peso * @itens.qtd)`. */
	sum: {
		min: 1,
		max: 1
	},
	/** Conta os itens em que a expressão é diferente de 0: `count(@magias.preparada)`. */
	count: {
		min: 1,
		max: 1
	},
	/** 1 se a seleção contém a opção, senão 0: `is(@condicoes, "envenenado")`. */
	is: {
		min: 2,
		max: 2
	}
};
var FormulaSyntaxError = class extends Error {
	detail;
	constructor(detail) {
		super(detail.message);
		this.detail = detail;
	}
};
var fail = (code, message, position) => {
	throw new FormulaSyntaxError({
		code,
		message,
		position
	});
};
var WHITESPACE = /\s+/y;
var TOKEN_PATTERNS = [
	[/\d+(?:\.\d+)?/y, (m, position) => ({
		kind: "number",
		value: Number(m[0]),
		position
	})],
	[/"((?:[^"\\\n]|\\["\\]){0,100})"/y, (m, position) => ({
		kind: "string",
		value: m[1].replace(/\\(["\\])/g, "$1"),
		position
	})],
	[/@([a-z][a-z0-9_]*)(?:\.([a-z][a-z0-9_]*))?/y, (m, position) => ({
		kind: "ref",
		key: m[1],
		prop: m[2],
		position
	})],
	[/[a-z]+/y, (m, position) => ({
		kind: "ident",
		name: m[0],
		position
	})],
	[/<=|>=|==|!=|[+\-*/%<>]/y, (m, position) => ({
		kind: "op",
		op: m[0],
		position
	})],
	[/[(),]/y, (m, position) => ({
		kind: "punct",
		char: m[0],
		position
	})]
];
function tokenize(source) {
	const tokens = [];
	let position = 0;
	outer: while (position < source.length) {
		WHITESPACE.lastIndex = position;
		if (WHITESPACE.test(source)) {
			position = WHITESPACE.lastIndex;
			continue;
		}
		for (const [pattern, build] of TOKEN_PATTERNS) {
			pattern.lastIndex = position;
			const match = pattern.exec(source);
			if (!match) continue;
			tokens.push(build(match, position));
			position = pattern.lastIndex;
			continue outer;
		}
		if (source[position] === "\"") fail("texto-invalido", "Texto sem aspas de fechamento (ou longo demais)", position);
		fail("caractere-invalido", `Caractere inválido: "${source[position]}"`, position);
	}
	tokens.push({
		kind: "end",
		position
	});
	return tokens;
}
/** Precedência dos operadores binários: maior = liga mais forte. */
var PRECEDENCE = {
	"<": 1,
	"<=": 1,
	">": 1,
	">=": 1,
	"==": 1,
	"!=": 1,
	"+": 2,
	"-": 2,
	"*": 3,
	"/": 3,
	"%": 3
};
var UNARY_PRECEDENCE = 4;
/** Parser Pratt. Nunca usa `eval` nem `Function`. */
var Parser = class {
	tokens;
	index = 0;
	depth = 0;
	constructor(tokens) {
		this.tokens = tokens;
	}
	parse() {
		const node = this.expression(0);
		const next = this.peek();
		if (next.kind !== "end") this.unexpected(next);
		return node;
	}
	peek() {
		return this.tokens[this.index];
	}
	advance() {
		return this.tokens[this.index++];
	}
	unexpected(token) {
		if (token.kind === "end") return fail("fim-inesperado", "A fórmula terminou antes do esperado", token.position);
		return fail("token-inesperado", "Símbolo inesperado na fórmula", token.position);
	}
	atPunct(char) {
		const token = this.peek();
		return token.kind === "punct" && token.char === char;
	}
	expectPunct(char) {
		const token = this.advance();
		if (token.kind !== "punct" || token.char !== char) this.unexpected(token);
	}
	expression(minPrecedence) {
		if (++this.depth > 32) fail("formula-aninhada-demais", "A fórmula tem níveis demais de aninhamento", this.peek().position);
		let left = this.prefix();
		for (;;) {
			const token = this.peek();
			if (token.kind !== "op" || PRECEDENCE[token.op] <= minPrecedence) break;
			this.advance();
			const right = this.expression(PRECEDENCE[token.op]);
			left = {
				type: "binary",
				op: token.op,
				left,
				right
			};
		}
		this.depth--;
		return left;
	}
	prefix() {
		const token = this.advance();
		switch (token.kind) {
			case "number": return {
				type: "number",
				value: token.value
			};
			case "string": return {
				type: "string",
				value: token.value
			};
			case "ref": return this.ref(token);
			case "ident": return this.call(token);
			case "op":
				if (token.op === "-") return {
					type: "unary",
					op: "-",
					operand: this.expression(UNARY_PRECEDENCE)
				};
				if (token.op === "+") return this.expression(UNARY_PRECEDENCE);
				return this.unexpected(token);
			case "punct": {
				if (token.char !== "(") return this.unexpected(token);
				const inner = this.expression(0);
				this.expectPunct(")");
				return inner;
			}
			case "end": return this.unexpected(token);
		}
	}
	ref(token) {
		return token.prop === void 0 ? {
			type: "ref",
			key: token.key
		} : {
			type: "ref",
			key: token.key,
			prop: token.prop
		};
	}
	call(token) {
		if (!Object.hasOwn(FUNCTIONS, token.name)) fail("funcao-desconhecida", `Função desconhecida: ${token.name}`, token.position);
		const fn = token.name;
		this.expectPunct("(");
		const args = [];
		if (!this.atPunct(")")) {
			args.push(this.expression(0));
			while (this.atPunct(",")) {
				this.advance();
				args.push(this.expression(0));
			}
		}
		this.expectPunct(")");
		const arity = FUNCTIONS[fn];
		if (args.length < arity.min || args.length > arity.max) fail("aridade-invalida", `${fn}() espera ${arity.min === arity.max ? `${arity.min}` : arity.max === Infinity ? `${arity.min} ou mais` : `${arity.min} a ${arity.max}`} argumento(s), recebeu ${args.length}`, token.position);
		return {
			type: "call",
			fn,
			args
		};
	}
};
function parseFormula(source) {
	if (source.length > 500) return err({
		code: "formula-longa-demais",
		message: `A fórmula excede 500 caracteres`,
		position: 500
	});
	if (source.trim() === "") return err({
		code: "formula-vazia",
		message: "A fórmula está vazia",
		position: 0
	});
	try {
		return ok(new Parser(tokenize(source)).parse());
	} catch (error) {
		if (error instanceof FormulaSyntaxError) return err(error.detail);
		throw error;
	}
}
//#endregion
//#region ../../packages/domain/src/formula/references.ts
/** Lista todas as referências (`@key`, `@key.prop`) de uma fórmula, na ordem em que aparecem. */
function collectRefs(node, into = []) {
	switch (node.type) {
		case "number":
		case "string": break;
		case "ref":
			into.push(node);
			break;
		case "unary":
			collectRefs(node.operand, into);
			break;
		case "binary":
			collectRefs(node.left, into);
			collectRefs(node.right, into);
			break;
		case "call": for (const arg of node.args) collectRefs(arg, into);
	}
	return into;
}
//#endregion
//#region ../../packages/domain/src/template/schema.ts
var FormulaSourceSchema = string().max(500);
var fieldBase = {
	/** ID estável: valores da ficha são indexados por ele. Renomear o rótulo não quebra fichas. */
	id: IdSchema,
	/** Apelido usado em fórmulas (`@key`). */
	key: KeySchema,
	label: LabelSchema,
	description: DescriptionSchema.optional(),
	/** `gm`: visível apenas para o Mestre durante a sessão. */
	visibility: _enum(["all", "gm"]).optional()
};
var NumberFieldSchema = object({
	...fieldBase,
	type: literal("number"),
	default: FiniteNumberSchema.optional(),
	min: FiniteNumberSchema.optional(),
	max: FiniteNumberSchema.optional(),
	integer: boolean().optional()
});
var TextFieldSchema = object({
	...fieldBase,
	type: literal("text"),
	default: string().max(LIMITS.text).optional()
});
var LongTextFieldSchema = object({
	...fieldBase,
	type: literal("longtext"),
	default: string().max(LIMITS.text).optional()
});
var BooleanFieldSchema = object({
	...fieldBase,
	type: literal("boolean"),
	default: boolean().optional()
});
var SelectOptionSchema = object({
	value: IdSchema,
	label: LabelSchema,
	/** Valor da opção em fórmulas (`@tamanho` vale o número da opção marcada; soma, se múltipla). */
	number: FiniteNumberSchema.optional()
});
var SelectFieldSchema = object({
	...fieldBase,
	type: literal("select"),
	options: array(SelectOptionSchema).min(1).max(LIMITS.selectOptions),
	multiple: boolean().optional(),
	default: union([IdSchema, array(IdSchema).max(LIMITS.selectOptions)]).optional()
});
/** Expressão de dados, ex.: "1d8+3". A rolagem é implementada numa fase futura. */
var DiceFieldSchema = object({
	...fieldBase,
	type: literal("dice"),
	default: string().max(LIMITS.label).optional()
});
/** Recurso consumível com valor atual e máximo: HP, mana, sanidade, espaços de magia… */
var ResourceFieldSchema = object({
	...fieldBase,
	type: literal("resource"),
	/** Fórmula do máximo. Se ausente, o máximo é digitado na ficha. */
	max: FormulaSourceSchema.optional(),
	/** Valor inicial (atual e, se não houver fórmula, também do máximo). */
	default: FiniteNumberSchema.optional()
});
/** Campo derivado: nunca é armazenado na ficha, é sempre calculado. */
var ComputedFieldSchema = object({
	...fieldBase,
	type: literal("computed"),
	formula: FormulaSourceSchema,
	/** Exibe o sinal também em positivos (ex.: "+3"), como em modificadores. */
	signed: boolean().optional()
});
/** Campos permitidos dentro de itens de lista (sem fórmulas nem listas aninhadas). */
var ListItemFieldSchema = discriminatedUnion("type", [
	NumberFieldSchema,
	TextFieldSchema,
	LongTextFieldSchema,
	BooleanFieldSchema,
	SelectFieldSchema,
	DiceFieldSchema
]);
var FieldDefSchema = discriminatedUnion("type", [
	NumberFieldSchema,
	TextFieldSchema,
	LongTextFieldSchema,
	BooleanFieldSchema,
	SelectFieldSchema,
	DiceFieldSchema,
	ResourceFieldSchema,
	ComputedFieldSchema,
	object({
		...fieldBase,
		type: literal("list"),
		itemFields: array(ListItemFieldSchema).min(1).max(LIMITS.listItemFields),
		maxItems: number().int().min(1).max(LIMITS.listItems).optional()
	})
]);
/** Tipos cujo valor pode ser usado em fórmulas. */
var NUMERIC_FIELD_TYPES = [
	"number",
	"boolean",
	"resource",
	"computed",
	"select"
];
/** Tipos de campo de item de lista que valem um número em `sum()`/`count()`. */
var NUMERIC_ITEM_FIELD_TYPES = [
	"number",
	"boolean",
	"select"
];
var ColumnsSchema = union([
	literal(1),
	literal(2),
	literal(3),
	literal(4)
]);
var LayoutNodeSchema = lazy(() => discriminatedUnion("kind", [object({
	kind: literal("section"),
	title: LabelSchema,
	columns: ColumnsSchema,
	children: array(LayoutNodeSchema).max(LIMITS.layoutNodes)
}), object({
	kind: literal("field"),
	fieldId: IdSchema,
	span: ColumnsSchema.optional()
})]));
var LayoutSchema = array(LayoutNodeSchema).max(LIMITS.layoutNodes);
/** De onde o template veio: embutido no app, repositório da comunidade ou criado localmente. */
var TemplateSourceSchema = _enum([
	"builtin",
	"community",
	"local"
]);
var SystemTemplateSchema = object({
	id: IdSchema,
	version: SemVerSchema,
	name: LabelSchema,
	description: DescriptionSchema.optional(),
	author: LabelSchema.optional(),
	/** Licença do conteúdo (ex.: "CC-BY-4.0"). Obrigatória para publicar na comunidade. */
	license: LabelSchema.optional(),
	/** Idioma principal (ex.: "pt-BR"). */
	language: string().regex(/^[a-z]{2,3}(-[A-Z]{2})?$/).optional(),
	tags: array(string().trim().min(1).max(30)).max(LIMITS.tags).optional(),
	source: TemplateSourceSchema,
	/**
	* Dado rolado nos testes (botão de rolar dos modificadores): "1d20" se ausente; "2d12"
	* em sistemas de dados de dualidade, "3d6" em outros…
	*/
	checkDice: string().max(LIMITS.label).optional(),
	/** Versão mínima do app capaz de abrir este template. */
	minAppVersion: SemVerSchema.optional(),
	fields: array(FieldDefSchema).min(1).max(LIMITS.fields),
	layouts: object({
		/** Ficha completa. */
		full: LayoutSchema,
		/** Reservado para uma variante de telas pequenas. O app ainda não usa: o grid de `full` já se adapta. */
		compact: LayoutSchema.optional(),
		/** Campos exibidos no card do jogador no painel do Mestre (HP, mana, condições…). */
		gmSummary: array(IdSchema).max(LIMITS.gmSummary).optional()
	})
});
/** Referência de uma ficha (ou campanha) ao template em que se baseia. */
var TemplateRefSchema = object({
	id: IdSchema,
	version: SemVerSchema,
	source: TemplateSourceSchema
});
//#endregion
//#region ../../packages/domain/src/dice/dice.ts
/**
* Notação de dados: termos somados ou subtraídos.
*
*   1d20+5      2d6 + 1d4 - 1      4d6kh3 (mantém os 3 maiores)      2d20kl1 (o menor)
*
* Sem `eval` e com limites (quantidade de dados, faces, tamanho), porque a expressão vem de
* fichas e sistemas de terceiros.
*/
var DICE_LIMITS = {
	length: 100,
	terms: 20,
	/** Total de dados rolados numa expressão. */
	dice: 100,
	sides: 1e3,
	constant: 1e6
};
var TERM = /^(\d*)d(\d+)(?:(kh|kl)(\d+))?$|^(\d+)$/;
/** Lê uma expressão de dados ("1d20+5"). Espaços são ignorados; "D" vale como "d". */
function parseDice(source) {
	const text = source.replace(/\s+/g, "").toLowerCase();
	if (text === "") return err({
		code: "expressao-vazia",
		message: "Informe os dados (ex.: 1d20+5)"
	});
	if (source.length > DICE_LIMITS.length) return err({
		code: "expressao-grande-demais",
		message: "Expressão longa demais"
	});
	const invalid = err({
		code: "expressao-invalida",
		message: `"${source.trim()}" não é uma rolagem válida (ex.: 2d6+3)`
	});
	const parts = text.match(/[+-]?[^+-]+/g);
	if (!parts || parts.join("") !== text) return invalid;
	if (parts.length > DICE_LIMITS.terms) return err({
		code: "expressao-grande-demais",
		message: "Termos demais na rolagem"
	});
	const terms = [];
	let totalDice = 0;
	for (const part of parts) {
		const sign = part.startsWith("-") ? -1 : 1;
		const body = part.replace(/^[+-]/, "");
		const match = TERM.exec(body);
		if (!match) return invalid;
		if (match[5] !== void 0) {
			const value = Number(match[5]);
			if (value > DICE_LIMITS.constant) return invalid;
			terms.push({
				kind: "constante",
				sign,
				value
			});
			continue;
		}
		const count = match[1] === "" ? 1 : Number(match[1]);
		const sides = Number(match[2]);
		if (count < 1 || sides < 1 || sides > DICE_LIMITS.sides) return invalid;
		totalDice += count;
		if (totalDice > DICE_LIMITS.dice) return err({
			code: "expressao-grande-demais",
			message: `Mais de ${DICE_LIMITS.dice} dados`
		});
		const term = {
			kind: "dados",
			sign,
			count,
			sides
		};
		if (match[3]) {
			const keep = Number(match[4]);
			if (keep < 1 || keep > count) return invalid;
			term.keep = {
				mode: match[3] === "kh" ? "maiores" : "menores",
				count: keep
			};
		}
		terms.push(term);
	}
	return ok(terms);
}
/** Texto canônico da expressão: "1d20 + 5", "4d6kh3 - 1". */
function printDice(expression) {
	return expression.map((term, index) => {
		const body = term.kind === "constante" ? String(term.value) : `${term.count}d${term.sides}${term.keep ? `${term.keep.mode === "maiores" ? "kh" : "kl"}${term.keep.count}` : ""}`;
		if (index === 0) return term.sign < 0 ? `-${body}` : body;
		return `${term.sign < 0 ? "-" : "+"} ${body}`;
	}).join(" ");
}
//#endregion
//#region ../../packages/domain/src/graph/topological-sort.ts
/**
* Ordena os nós de forma que cada nó venha depois de todas as suas dependências.
*
* @param dependencies mapa nó → nós dos quais ele depende. Dependências que não são chaves
*   do mapa são ignoradas (são valores de entrada, não calculados).
* @returns a ordem de cálculo, ou o primeiro ciclo encontrado (ex.: ['a', 'b', 'a']).
*/
function topologicalSort(dependencies) {
	const order = [];
	const state = /* @__PURE__ */ new Map();
	for (const root of dependencies.keys()) {
		if (state.has(root)) continue;
		const stack = [{
			node: root,
			next: 0
		}];
		state.set(root, "visiting");
		while (stack.length > 0) {
			const frame = stack[stack.length - 1];
			const deps = dependencies.get(frame.node) ?? [];
			if (frame.next >= deps.length) {
				stack.pop();
				state.set(frame.node, "done");
				order.push(frame.node);
				continue;
			}
			const dep = deps[frame.next++];
			if (!dependencies.has(dep) || state.get(dep) === "done") continue;
			if (state.get(dep) === "visiting") {
				const start = stack.findIndex((f) => f.node === dep);
				return err([...stack.slice(start).map((f) => f.node), dep]);
			}
			state.set(dep, "visiting");
			stack.push({
				node: dep,
				next: 0
			});
		}
	}
	return ok(order);
}
//#endregion
//#region ../../packages/domain/src/template/check-formula.ts
var NUMERIC_TYPES = new Set(NUMERIC_FIELD_TYPES);
var NUMERIC_ITEM_TYPES = new Set(NUMERIC_ITEM_FIELD_TYPES);
var nameOf = (ref) => ref.prop ? `@${ref.key}.${ref.prop}` : `@${ref.key}`;
/**
* Verifica se uma fórmula faz sentido para os campos do template:
* - referências existem e são numéricas (texto não entra em conta);
* - propriedades existem (`@hp.max` em recurso, `@lista.campo` em lista);
* - campos de lista só aparecem dentro de `sum()`/`count()`, todos da mesma lista;
* - `is()` recebe uma seleção e uma opção que existe nela.
*/
function checkFormula(ast, fieldsByKey) {
	const problems = [];
	const report = (code, message) => {
		problems.push({
			code,
			message
		});
	};
	const itemField = (list, key) => list.type === "list" ? list.itemFields.find((f) => f.key === key) : void 0;
	const visitRef = (ref, scope) => {
		const field = fieldsByKey.get(ref.key);
		if (!field) return report("referencia-desconhecida", `Campo inexistente: ${nameOf(ref)}`);
		if (field.type === "list") {
			if (!scope) return report("lista-fora-de-agregacao", `${nameOf(ref)} é uma lista: use dentro de sum() ou count(), ex.: sum(@${ref.key}.campo)`);
			if (scope.list !== null && scope.list !== ref.key) return report("listas-diferentes", `Não é possível misturar as listas @${scope.list} e @${ref.key} na mesma agregação`);
			scope.list = ref.key;
			if (ref.prop === void 0) return;
			const item = itemField(field, ref.prop);
			if (!item) return report("propriedade-invalida", `A lista @${ref.key} não tem o campo "${ref.prop}"`);
			if (!NUMERIC_ITEM_TYPES.has(item.type)) return report("referencia-nao-numerica", `${nameOf(ref)} não é numérico e não pode ser usado em fórmulas`);
			return;
		}
		if (!NUMERIC_TYPES.has(field.type)) return report("referencia-nao-numerica", `${nameOf(ref)} não é numérico e não pode ser usado em fórmulas`);
		if (ref.prop === void 0) return;
		if (field.type !== "resource") return report("propriedade-invalida", `.${ref.prop} só pode ser usado em recursos (ex.: @hp.max)`);
		if (!RESOURCE_PROPERTIES.includes(ref.prop)) return report("propriedade-invalida", `Recursos têm .max e .temp, não .${ref.prop}`);
	};
	const visitIs = (args, scope) => {
		const [target, option] = args;
		if (target.type !== "ref" || option.type !== "string") return report("is-invalido", "Use is(@seleção, \"opção\"), ex.: is(@condicoes, \"envenenado\")");
		const field = fieldsByKey.get(target.key);
		const select = field?.type === "select" ? field : field?.type === "list" && target.prop ? itemField(field, target.prop) : void 0;
		if (!field) return report("referencia-desconhecida", `Campo inexistente: ${nameOf(target)}`);
		if (select?.type !== "select" || field.type === "select" && target.prop) return report("is-invalido", `is() só funciona com campos de seleção; ${nameOf(target)} não é um`);
		if (field.type === "list") visitRef(target, scope);
		if (!select.options.some((o) => o.value === option.value)) {
			const known = select.options.map((o) => `"${o.value}"`).join(", ");
			report("opcao-inexistente", `${nameOf(target)} não tem a opção "${option.value}" (opções: ${known})`);
		}
	};
	const visit = (node, scope) => {
		switch (node.type) {
			case "number": return;
			case "string": return report("texto-fora-de-is", "Textos entre aspas só podem ser usados em is()");
			case "ref": return visitRef(node, scope);
			case "unary": return visit(node.operand, scope);
			case "binary":
				visit(node.left, scope);
				return visit(node.right, scope);
			case "call":
				if (node.fn === "is") return visitIs(node.args, scope);
				if (node.fn === "sum" || node.fn === "count") {
					if (scope) return report("agregacao-aninhada", `${node.fn}() não pode ficar dentro de outro sum()/count()`);
					const inner = { list: null };
					const before = problems.length;
					for (const arg of node.args) visit(arg, inner);
					if (inner.list === null && problems.length === before) report("agregacao-sem-lista", `${node.fn}() precisa de um campo de lista, ex.: ${node.fn}(@inventario.peso)`);
					return;
				}
				for (const arg of node.args) visit(arg, scope);
				return;
		}
	};
	visit(ast, null);
	return problems;
}
//#endregion
//#region ../../packages/domain/src/template/compile.ts
var issue$1 = (code, path, message) => ({
	code,
	path,
	message
});
/** Nó do grafo de dependências: `key` (campo calculado) ou `key.max` (máximo de recurso). */
var nodeName = (key, target) => target === "max" ? `${key}.max` : key;
function validateFieldDefaults(field, path, issues) {
	if (field.type === "number") {
		const { min, max, integer } = field;
		if (min !== void 0 && max !== void 0 && min > max) issues.push(issue$1("intervalo-invalido", [...path, "min"], "O mínimo é maior que o máximo"));
		const value = field.default;
		if (value === void 0) return;
		if (min !== void 0 && value < min || max !== void 0 && value > max) issues.push(issue$1("padrao-fora-do-intervalo", [...path, "default"], "Valor padrão fora do intervalo"));
		if (integer && !Number.isInteger(value)) issues.push(issue$1("padrao-nao-inteiro", [...path, "default"], "Valor padrão deve ser inteiro"));
	}
	if (field.type === "select") {
		const values = field.options.map((option) => option.value);
		const duplicated = values.find((value, index) => values.indexOf(value) !== index);
		if (duplicated !== void 0) issues.push(issue$1("opcao-duplicada", [...path, "options"], `Opção repetida: "${duplicated}"`));
		const value = field.default;
		if (value === void 0) return;
		const defaults = typeof value === "string" ? [value] : value;
		if (Array.isArray(value) !== Boolean(field.multiple)) {
			const expected = field.multiple ? "uma lista de opções" : "uma única opção";
			issues.push(issue$1("padrao-invalido", [...path, "default"], `O padrão deve ser ${expected}`));
		} else if (defaults.some((option) => !values.includes(option))) issues.push(issue$1("padrao-invalido", [...path, "default"], "Padrão não está entre as opções"));
	}
}
function checkUnique(fields, path, issues) {
	const ids = /* @__PURE__ */ new Set();
	const keys = /* @__PURE__ */ new Set();
	fields.forEach((field, index) => {
		if (ids.has(field.id)) issues.push(issue$1("id-duplicado", [
			...path,
			index,
			"id"
		], `ID repetido: "${field.id}"`));
		if (keys.has(field.key)) issues.push(issue$1("key-duplicada", [
			...path,
			index,
			"key"
		], `Apelido repetido: "@${field.key}"`));
		ids.add(field.id);
		keys.add(field.key);
	});
}
function validateLayout(nodes, path, fieldIds, issues) {
	const seen = /* @__PURE__ */ new Set();
	const visit = (list, listPath, depth) => {
		if (depth > LIMITS.layoutDepth) {
			issues.push(issue$1("layout-aninhado-demais", listPath, "Seções aninhadas demais"));
			return;
		}
		list.forEach((node, index) => {
			const nodePath = [...listPath, index];
			if (node.kind === "section") {
				visit(node.children, [...nodePath, "children"], depth + 1);
				return;
			}
			if (!fieldIds.has(node.fieldId)) issues.push(issue$1("campo-inexistente", [...nodePath, "fieldId"], `Campo inexistente: "${node.fieldId}"`));
			else if (seen.has(node.fieldId)) issues.push(issue$1("campo-repetido", [...nodePath, "fieldId"], "O campo aparece mais de uma vez"));
			seen.add(node.fieldId);
		});
	};
	visit(nodes, path, 1);
}
/**
* Valida as regras que o schema sozinho não expressa (unicidade, referências, ciclos, layout)
* e pré-processa as fórmulas. Assume um template que já passou por `SystemTemplateSchema`.
*/
function compileTemplate(template) {
	const issues = [];
	const { fields } = template;
	checkUnique(fields, ["fields"], issues);
	fields.forEach((field, index) => {
		validateFieldDefaults(field, ["fields", index], issues);
		if (field.type === "list") {
			checkUnique(field.itemFields, [
				"fields",
				index,
				"itemFields"
			], issues);
			field.itemFields.forEach((item, itemIndex) => validateFieldDefaults(item, [
				"fields",
				index,
				"itemFields",
				itemIndex
			], issues));
		}
	});
	const fieldsById = new Map(fields.map((field) => [field.id, field]));
	const fieldsByKey = new Map(fields.map((field) => [field.key, field]));
	const formulas = [];
	const dependencies = /* @__PURE__ */ new Map();
	const byNode = /* @__PURE__ */ new Map();
	fields.forEach((field, index) => {
		const source = field.type === "computed" ? {
			text: field.formula,
			target: "value",
			path: [
				"fields",
				index,
				"formula"
			]
		} : field.type === "resource" && field.max !== void 0 ? {
			text: field.max,
			target: "max",
			path: [
				"fields",
				index,
				"max"
			]
		} : void 0;
		if (!source) return;
		const parsed = parseFormula(source.text);
		if (!parsed.ok) {
			issues.push(issue$1("formula-invalida", source.path, `${parsed.error.message} (caractere ${parsed.error.position + 1})`));
			return;
		}
		const problems = checkFormula(parsed.value, fieldsByKey);
		for (const problem of problems) issues.push(issue$1(problem.code, source.path, problem.message));
		if (problems.length > 0) return;
		const refs = collectRefs(parsed.value);
		if (field.visibility !== "gm") {
			const secret = refs.find((ref) => fieldsByKey.get(ref.key)?.visibility === "gm");
			if (secret) {
				issues.push(issue$1("referencia-secreta", source.path, `@${secret.key} é visível só para o Mestre e não pode ser usado num campo que o jogador vê`));
				return;
			}
		}
		const compiled = {
			fieldId: field.id,
			target: source.target,
			ast: parsed.value
		};
		const node = nodeName(field.key, source.target);
		byNode.set(node, compiled);
		dependencies.set(node, refs.map((ref) => nodeName(ref.key, ref.prop === "max" && fieldsByKey.get(ref.key)?.type === "resource" ? "max" : "value")));
	});
	const order = topologicalSort(dependencies);
	if (order.ok) for (const node of order.value) formulas.push(byNode.get(node));
	else {
		const cycle = order.error.map((node) => `@${node}`).join(" → ");
		issues.push(issue$1("dependencia-circular", ["fields"], `Dependência circular: ${cycle}`));
	}
	if (template.checkDice !== void 0) {
		const dice = parseDice(template.checkDice);
		if (!dice.ok) issues.push(issue$1("dado-de-teste-invalido", ["checkDice"], dice.error.message));
	}
	const fieldIds = new Set(fieldsById.keys());
	validateLayout(template.layouts.full, ["layouts", "full"], fieldIds, issues);
	if (template.layouts.compact) validateLayout(template.layouts.compact, ["layouts", "compact"], fieldIds, issues);
	template.layouts.gmSummary?.forEach((fieldId, index) => {
		if (!fieldIds.has(fieldId)) issues.push(issue$1("campo-inexistente", [
			"layouts",
			"gmSummary",
			index
		], `Campo inexistente: "${fieldId}"`));
	});
	if (issues.length > 0) return err(issues);
	return ok({
		template,
		fieldsById,
		fieldsByKey,
		formulas
	});
}
//#endregion
//#region ../../packages/domain/src/template/validate.ts
/**
* Validação completa de um template vindo de fora ou do editor: formato (schema) e regras
* semânticas (`compileTemplate`). Nunca lança exceção.
*/
function validateTemplate$1(json) {
	let parsed;
	try {
		parsed = SystemTemplateSchema.safeParse(json);
	} catch (error) {
		if (error instanceof RangeError) return err([{
			code: "estrutura-invalida",
			path: [],
			message: "O arquivo tem uma estrutura inválida"
		}]);
		throw error;
	}
	if (!parsed.success) return err(parsed.error.issues.map((zodIssue) => ({
		code: "schema-invalido",
		path: zodIssue.path.filter((p) => typeof p !== "symbol"),
		message: zodIssue.message
	})));
	return compileTemplate(parsed.data);
}
//#endregion
//#region ../../packages/domain/src/sheet/schema.ts
/** Valor de um campo simples (também usado dentro de itens de lista). */
var PrimitiveValueSchema = union([
	FiniteNumberSchema,
	string().max(LIMITS.text),
	boolean(),
	array(IdSchema).max(LIMITS.selectOptions)
]);
var FieldValueSchema = union([
	PrimitiveValueSchema,
	object({
		current: FiniteNumberSchema,
		/** Presente apenas quando o template não define fórmula para o máximo. */
		max: FiniteNumberSchema.optional(),
		/** Pontos temporários (ex.: HP temporário). */
		temp: FiniteNumberSchema.optional()
	}),
	array(object({
		/** ID estável do item: permite mesclar edições concorrentes na mesma lista. */
		id: IdSchema,
		values: record(IdSchema, PrimitiveValueSchema)
	})).max(LIMITS.listItems)
]);
var CharacterSheetSchema = object({
	id: IdSchema,
	name: LabelSchema,
	/** Dispositivo/usuário local dono da ficha (não há contas). */
	ownerId: IdSchema,
	templateRef: TemplateRefSchema,
	/** Valores indexados pelo ID estável do campo. Campos calculados nunca aparecem aqui. */
	values: record(IdSchema, FieldValueSchema),
	/**
	* Valores de campos que deixaram de existir (ou mudaram de tipo) após atualizar o template.
	* Guardados para não perder dados; restaurados se o campo voltar.
	*/
	orphaned: record(IdSchema, FieldValueSchema).optional(),
	createdAt: TimestampSchema,
	updatedAt: TimestampSchema
});
//#endregion
//#region ../../packages/domain/src/version.ts
/** Comparação de versões semânticas simplificadas (MAJOR.MINOR.PATCH, já validadas). */
var parseVersion = (version) => version.split(".").map(Number);
/** Negativo se `a` < `b`, zero se iguais, positivo se `a` > `b`. */
function compareVersions(a, b) {
	const [x, y] = [parseVersion(a), parseVersion(b)];
	for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
	return 0;
}
//#endregion
//#region ../../packages/domain/src/campaign/schema.ts
/**
* Segredo da sala: 128 bits aleatórios em base64url (22 caracteres). Cifra a sessão e só
* viaja no fragmento (`#`) do link de convite, que os navegadores nunca enviam a servidores.
*/
var CampaignSecretSchema = string().regex(/^[A-Za-z0-9_-]{22}$/, "Segredo da campanha inválido");
object({
	id: IdSchema,
	name: LabelSchema,
	/** Usuário local do Mestre. */
	gmId: IdSchema,
	gmName: LabelSchema,
	/** Template oficial da campanha: toda ficha vinculada deve ser deste sistema. */
	templateRef: TemplateRefSchema,
	/** Nome do sistema, para exibir mesmo antes de ele estar instalado no dispositivo. */
	templateName: LabelSchema,
	secret: CampaignSecretSchema,
	members: array(object({
		userId: IdSchema,
		displayName: LabelSchema,
		/** Ficha vinculada à campanha. Ausente enquanto o jogador ainda não escolheu/criou uma. */
		sheetId: IdSchema.optional()
	})).max(LIMITS.members),
	createdAt: TimestampSchema,
	updatedAt: TimestampSchema
});
object({
	v: literal(1),
	campaignId: IdSchema,
	name: LabelSchema,
	gmId: IdSchema,
	gmName: LabelSchema,
	templateRef: TemplateRefSchema,
	templateName: LabelSchema,
	secret: CampaignSecretSchema
});
//#endregion
//#region ../../packages/domain/src/export/envelope.ts
var envelopeBase = {
	formatVersion: literal(1),
	/** Data de exportação em ISO 8601. Informativa. */
	exportedAt: datetime()
};
discriminatedUnion("kind", [object({
	...envelopeBase,
	kind: literal("tabula/template"),
	payload: SystemTemplateSchema
}), object({
	...envelopeBase,
	kind: literal("tabula/sheet"),
	payload: CharacterSheetSchema,
	/** Template da ficha, para que o arquivo seja autocontido. */
	template: SystemTemplateSchema.optional()
})]);
/** Tamanho máximo do arquivo de um template publicado (1 MB). */
var MAX_TEMPLATE_BYTES = 1048576;
/** Login de uma conta do GitHub. */
var GitHubLoginSchema = string().regex(/^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/, "Usuário do GitHub inválido");
var RegistryVersionSchema = object({
	version: SemVerSchema,
	/** Hash do arquivo: o app recusa um download que não corresponda (CDN adulterado ou corrompido). */
	sha256: string().regex(/^[0-9a-f]{64}$/, "Hash SHA-256 inválido"),
	size: number().int().positive().max(MAX_TEMPLATE_BYTES),
	publishedAt: datetime(),
	minAppVersion: SemVerSchema.optional()
});
var RegistryEntrySchema = object({
	id: IdSchema,
	/** Metadados da versão mais recente, para a busca não precisar baixar o template. */
	name: LabelSchema,
	description: string().max(LIMITS.description).optional(),
	author: LabelSchema,
	license: LabelSchema,
	language: string().max(10).optional(),
	tags: array(string().max(30)).max(LIMITS.tags).optional(),
	/** Conta do GitHub dona do sistema: só ela publica novas versões dele. */
	owner: GitHubLoginSchema,
	versions: array(RegistryVersionSchema).min(1).max(500)
});
object({
	formatVersion: literal(1),
	updatedAt: datetime(),
	templates: array(RegistryEntrySchema).max(1e4)
});
var emptyIndex = (updatedAt) => ({
	formatVersion: 1,
	updatedAt,
	templates: []
});
/** Versão mais recente publicada de um sistema. */
function latestVersion(entry) {
	return entry.versions.reduce((latest, current) => compareVersions(current.version, latest.version) > 0 ? current : latest);
}
/** Caminho do arquivo de uma versão no repositório. Versões publicadas nunca mudam. */
var templatePath = (id, version) => `templates/${id}/${version}.json`;
//#endregion
//#region ../../packages/domain/src/registry/operations.ts
var issue = (code, message, path = []) => ({
	code,
	path,
	message
});
function parseJson(text, maxBytes) {
	if (text.length > maxBytes) return err([issue("arquivo-grande-demais", `O arquivo excede ${maxBytes / 1024} KB`)]);
	try {
		return ok(JSON.parse(text));
	} catch {
		return err([issue("json-invalido", "O arquivo não é um JSON válido")]);
	}
}
/** Schema e regras semânticas (fórmulas, layout) de um template vindo de fora. */
function validateTemplate(json) {
	const result = validateTemplate$1(json);
	return result.ok ? ok(result.value.template) : result;
}
/**
* Lê o arquivo de uma versão publicada. Confere que é mesmo o sistema e a versão
* pedidos: um arquivo trocado no repositório não instala outra coisa no lugar.
*/
function parseTemplateFile(text, expected) {
	const json = parseJson(text, MAX_TEMPLATE_BYTES);
	if (!json.ok) return json;
	const template = validateTemplate(json.value);
	if (!template.ok) return template;
	if (template.value.id !== expected.id || template.value.version !== expected.version) return err([issue("arquivo-trocado", `Esperava ${expected.id}@${expected.version}, mas o arquivo contém ${template.value.id}@${template.value.version}`)]);
	return ok({
		...template.value,
		source: "community"
	});
}
/** Arquivo gravado no repositório: o template puro, legível e com diffs estáveis. */
var serializeTemplateFile = (template) => `${JSON.stringify(template, null, 2)}\n`;
var serializeIndex = (index) => `${JSON.stringify(index, null, 2)}\n`;
/**
* Valida um pedido de publicação: o arquivo exportado pelo app (ou o template puro),
* completado com as respostas do formulário. Devolve o template exatamente como será
* publicado.
*/
function prepareSubmission(text, context) {
	const json = parseJson(text, MAX_TEMPLATE_BYTES);
	if (!json.ok) return json;
	let payload = json.value;
	const kind = payload?.kind;
	if (kind === "tabula/sheet") return err([issue("ficha-em-vez-de-sistema", "Este arquivo é uma ficha. Exporte o sistema na tela \"Sistemas\" e envie esse arquivo.")]);
	if (kind === "tabula/template") payload = payload.payload;
	if (typeof payload !== "object" || payload === null || Array.isArray(payload)) return err([issue("schema-invalido", "O arquivo não contém um sistema do Tabula")]);
	const fromFile = payload;
	const validated = validateTemplate({
		...payload,
		source: "community",
		license: context.license?.trim() || fromFile.license,
		author: context.author?.trim() || fromFile.author || context.submitter
	});
	if (!validated.ok) return validated;
	const template = validated.value;
	const problems = [];
	if (!template.license) problems.push(issue("licenca-ausente", "Informe a licença do conteúdo", ["license"]));
	if (context.builtinIds.includes(template.id)) problems.push(issue("id-nativo", `"${template.id}" já vem com o app. Use outro id para o seu sistema.`, ["id"]));
	const existing = context.index.templates.find((entry) => entry.id === template.id);
	if (existing) {
		if (existing.owner.toLowerCase() !== context.submitter.toLowerCase()) problems.push(issue("id-de-outra-pessoa", `O id "${template.id}" já pertence a @${existing.owner}. Use outro id para o seu sistema.`, ["id"]));
		else {
			const latest = latestVersion(existing).version;
			if (compareVersions(template.version, latest) <= 0) problems.push(issue("versao-nao-e-nova", `A versão publicada mais recente é ${latest}. Aumente a versão (ex.: ${nextPatch(latest)}).`, ["version"]));
		}
	}
	return problems.length > 0 ? err(problems) : ok(template);
}
function nextPatch(version) {
	const [major, minor, patch] = version.split(".").map(Number);
	return `${major}.${minor}.${patch + 1}`;
}
/**
* Registra uma versão no catálogo (já validada por `prepareSubmission`). Os metadados
* exibidos na busca acompanham a versão mais recente.
*/
function addVersion(index, template, file) {
	const version = {
		version: template.version,
		sha256: file.sha256,
		size: file.size,
		publishedAt: file.publishedAt,
		...template.minAppVersion && { minAppVersion: template.minAppVersion }
	};
	const existing = index.templates.find((entry) => entry.id === template.id);
	const versions = [...existing?.versions.filter((v) => v.version !== template.version) ?? [], version].sort((a, b) => compareVersions(a.version, b.version));
	const isLatest = !existing || compareVersions(template.version, latestVersion(existing).version) > 0;
	const entry = {
		...existing && !isLatest ? existing : {
			id: template.id,
			name: template.name,
			...template.description && { description: template.description },
			author: template.author ?? file.owner,
			license: template.license ?? "",
			...template.language && { language: template.language },
			...template.tags && { tags: template.tags },
			owner: existing?.owner ?? file.owner
		},
		versions
	};
	return {
		...index,
		updatedAt: file.publishedAt,
		templates: [...index.templates.filter((e) => e.id !== template.id), entry].sort((a, b) => a.id.localeCompare(b.id))
	};
}
//#endregion
//#region ../../packages/domain/src/dice/log.ts
var SignSchema = union([literal(1), literal(-1)]);
var Int = (min, max) => number().int().min(min).max(max);
var TermResultSchema = discriminatedUnion("kind", [object({
	kind: literal("dados"),
	sign: SignSchema,
	count: Int(1, DICE_LIMITS.dice),
	sides: Int(1, DICE_LIMITS.sides),
	keep: object({
		mode: _enum(["maiores", "menores"]),
		count: Int(1, DICE_LIMITS.dice)
	}).optional(),
	results: array(object({
		value: Int(1, DICE_LIMITS.sides),
		dropped: boolean()
	})).max(DICE_LIMITS.dice),
	subtotal: number().int()
}), object({
	kind: literal("constante"),
	sign: SignSchema,
	value: Int(0, DICE_LIMITS.constant),
	subtotal: number().int()
})]);
var RollResultSchema = object({
	expression: string().max(200),
	terms: array(TermResultSchema).min(1).max(DICE_LIMITS.terms),
	total: number().int()
}).refine(isConsistent, "Rolagem inconsistente");
object({
	id: IdSchema,
	at: number().int().nonnegative(),
	authorId: IdSchema,
	authorName: LabelSchema,
	/** O que foi rolado: "Atletismo", "Espada longa: dano"… */
	label: string().max(120),
	result: RollResultSchema,
	/** Rolagem secreta do Mestre: não sai do aparelho dele. */
	secret: boolean()
});
/** Confere que o resultado é a soma dos dados declarados (e só deles). */
function isConsistent(result) {
	let total = 0;
	for (const term of result.terms) {
		if (term.kind === "constante") {
			if (term.subtotal !== term.sign * term.value) return false;
		} else {
			if (term.results.length !== term.count) return false;
			if (term.results.some((die) => die.value > term.sides)) return false;
			const dropped = term.results.filter((die) => die.dropped).length;
			const keep = term.keep?.count ?? term.count;
			if (keep > term.count || dropped !== term.count - keep) return false;
			const sum = term.results.reduce((s, die) => s + (die.dropped ? 0 : die.value), 0);
			if (term.subtotal !== term.sign * sum) return false;
		}
		total += term.subtotal;
	}
	const expression = result.terms.map((term) => term.kind === "constante" ? {
		kind: "constante",
		sign: term.sign,
		value: term.value
	} : {
		kind: "dados",
		sign: term.sign,
		count: term.count,
		sides: term.sides,
		...term.keep && { keep: term.keep }
	});
	return total === result.total && printDice(expression) === result.expression;
}
//#endregion
//#region ../../packages/templates/src/index.ts
/**
* Templates embutidos no app. Ficam em JSON (o mesmo formato dos templates da comunidade)
* e são validados ao carregar: um template nativo inválido é um bug e deve falhar cedo.
*/
var BUILTIN_TEMPLATES = [{
	id: "dnd5e-srd",
	version: "1.1.0",
	name: "D&D 5ª Edição (SRD 5.1)",
	description: "Ficha para personagens de D&D 5ª edição. This work includes material taken from the System Reference Document 5.1 (\"SRD 5.1\") by Wizards of the Coast LLC and available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License available at https://creativecommons.org/licenses/by/4.0/legalcode. Termos traduzidos para o português e organizados como ficha pelo projeto Tabula RPG.",
	author: "Tabula RPG",
	license: "CC-BY-4.0",
	language: "pt-BR",
	tags: [
		"fantasia",
		"d20",
		"dnd"
	],
	source: "builtin",
	fields: [
		{
			"id": "nome",
			"key": "nome",
			"label": "Nome do personagem",
			"type": "text"
		},
		{
			"id": "classe",
			"key": "classe",
			"label": "Classe",
			"type": "text"
		},
		{
			"id": "nivel",
			"key": "nivel",
			"label": "Nível",
			"type": "number",
			"default": 1,
			"min": 1,
			"max": 20,
			"integer": true
		},
		{
			"id": "raca",
			"key": "raca",
			"label": "Raça",
			"type": "text"
		},
		{
			"id": "antecedente",
			"key": "antecedente",
			"label": "Antecedente",
			"type": "text"
		},
		{
			"id": "alinhamento",
			"key": "alinhamento",
			"label": "Alinhamento",
			"type": "select",
			"options": [
				{
					"value": "lb",
					"label": "Leal e Bom"
				},
				{
					"value": "nb",
					"label": "Neutro e Bom"
				},
				{
					"value": "cb",
					"label": "Caótico e Bom"
				},
				{
					"value": "ln",
					"label": "Leal e Neutro"
				},
				{
					"value": "n",
					"label": "Neutro"
				},
				{
					"value": "cn",
					"label": "Caótico e Neutro"
				},
				{
					"value": "lm",
					"label": "Leal e Mau"
				},
				{
					"value": "nm",
					"label": "Neutro e Mau"
				},
				{
					"value": "cm",
					"label": "Caótico e Mau"
				}
			]
		},
		{
			"id": "xp",
			"key": "xp",
			"label": "Experiência",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "for",
			"key": "for",
			"label": "Força",
			"type": "number",
			"default": 10,
			"min": 1,
			"max": 30,
			"integer": true
		},
		{
			"id": "for_mod",
			"key": "for_mod",
			"label": "Mod. Força",
			"type": "computed",
			"formula": "floor((@for - 10) / 2)",
			"signed": true
		},
		{
			"id": "des",
			"key": "des",
			"label": "Destreza",
			"type": "number",
			"default": 10,
			"min": 1,
			"max": 30,
			"integer": true
		},
		{
			"id": "des_mod",
			"key": "des_mod",
			"label": "Mod. Destreza",
			"type": "computed",
			"formula": "floor((@des - 10) / 2)",
			"signed": true
		},
		{
			"id": "con",
			"key": "con",
			"label": "Constituição",
			"type": "number",
			"default": 10,
			"min": 1,
			"max": 30,
			"integer": true
		},
		{
			"id": "con_mod",
			"key": "con_mod",
			"label": "Mod. Constituição",
			"type": "computed",
			"formula": "floor((@con - 10) / 2)",
			"signed": true
		},
		{
			"id": "int",
			"key": "int",
			"label": "Inteligência",
			"type": "number",
			"default": 10,
			"min": 1,
			"max": 30,
			"integer": true
		},
		{
			"id": "int_mod",
			"key": "int_mod",
			"label": "Mod. Inteligência",
			"type": "computed",
			"formula": "floor((@int - 10) / 2)",
			"signed": true
		},
		{
			"id": "sab",
			"key": "sab",
			"label": "Sabedoria",
			"type": "number",
			"default": 10,
			"min": 1,
			"max": 30,
			"integer": true
		},
		{
			"id": "sab_mod",
			"key": "sab_mod",
			"label": "Mod. Sabedoria",
			"type": "computed",
			"formula": "floor((@sab - 10) / 2)",
			"signed": true
		},
		{
			"id": "car",
			"key": "car",
			"label": "Carisma",
			"type": "number",
			"default": 10,
			"min": 1,
			"max": 30,
			"integer": true
		},
		{
			"id": "car_mod",
			"key": "car_mod",
			"label": "Mod. Carisma",
			"type": "computed",
			"formula": "floor((@car - 10) / 2)",
			"signed": true
		},
		{
			"id": "bonus_prof",
			"key": "bonus_prof",
			"label": "Bônus de proficiência",
			"type": "computed",
			"formula": "ceil(@nivel / 4) + 1",
			"signed": true
		},
		{
			"id": "inspiracao",
			"key": "inspiracao",
			"label": "Inspiração",
			"type": "boolean"
		},
		{
			"id": "prof_salv_for",
			"key": "prof_salv_for",
			"label": "Proficiente em resistência de Força",
			"type": "boolean"
		},
		{
			"id": "salv_for",
			"key": "salv_for",
			"label": "Resistência de Força",
			"type": "computed",
			"formula": "@for_mod + if(@prof_salv_for, @bonus_prof, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"resistencias\"))",
			"signed": true
		},
		{
			"id": "prof_salv_des",
			"key": "prof_salv_des",
			"label": "Proficiente em resistência de Destreza",
			"type": "boolean"
		},
		{
			"id": "salv_des",
			"key": "salv_des",
			"label": "Resistência de Destreza",
			"type": "computed",
			"formula": "@des_mod + if(@prof_salv_des, @bonus_prof, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"resistencias\"))",
			"signed": true
		},
		{
			"id": "prof_salv_con",
			"key": "prof_salv_con",
			"label": "Proficiente em resistência de Constituição",
			"type": "boolean"
		},
		{
			"id": "salv_con",
			"key": "salv_con",
			"label": "Resistência de Constituição",
			"type": "computed",
			"formula": "@con_mod + if(@prof_salv_con, @bonus_prof, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"resistencias\"))",
			"signed": true
		},
		{
			"id": "prof_salv_int",
			"key": "prof_salv_int",
			"label": "Proficiente em resistência de Inteligência",
			"type": "boolean"
		},
		{
			"id": "salv_int",
			"key": "salv_int",
			"label": "Resistência de Inteligência",
			"type": "computed",
			"formula": "@int_mod + if(@prof_salv_int, @bonus_prof, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"resistencias\"))",
			"signed": true
		},
		{
			"id": "prof_salv_sab",
			"key": "prof_salv_sab",
			"label": "Proficiente em resistência de Sabedoria",
			"type": "boolean"
		},
		{
			"id": "salv_sab",
			"key": "salv_sab",
			"label": "Resistência de Sabedoria",
			"type": "computed",
			"formula": "@sab_mod + if(@prof_salv_sab, @bonus_prof, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"resistencias\"))",
			"signed": true
		},
		{
			"id": "prof_salv_car",
			"key": "prof_salv_car",
			"label": "Proficiente em resistência de Carisma",
			"type": "boolean"
		},
		{
			"id": "salv_car",
			"key": "salv_car",
			"label": "Resistência de Carisma",
			"type": "computed",
			"formula": "@car_mod + if(@prof_salv_car, @bonus_prof, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"resistencias\"))",
			"signed": true
		},
		{
			"id": "prof_acrobacia",
			"key": "prof_acrobacia",
			"label": "Proficiente em Acrobacia",
			"type": "boolean"
		},
		{
			"id": "esp_acrobacia",
			"key": "esp_acrobacia",
			"label": "Especialista em Acrobacia",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "acrobacia",
			"key": "acrobacia",
			"label": "Acrobacia (Des)",
			"type": "computed",
			"formula": "@des_mod + @bonus_prof * if(@prof_acrobacia, 1 + @esp_acrobacia, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_adestrar_animais",
			"key": "prof_adestrar_animais",
			"label": "Proficiente em Adestrar Animais",
			"type": "boolean"
		},
		{
			"id": "esp_adestrar_animais",
			"key": "esp_adestrar_animais",
			"label": "Especialista em Adestrar Animais",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "adestrar_animais",
			"key": "adestrar_animais",
			"label": "Adestrar Animais (Sab)",
			"type": "computed",
			"formula": "@sab_mod + @bonus_prof * if(@prof_adestrar_animais, 1 + @esp_adestrar_animais, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_arcanismo",
			"key": "prof_arcanismo",
			"label": "Proficiente em Arcanismo",
			"type": "boolean"
		},
		{
			"id": "esp_arcanismo",
			"key": "esp_arcanismo",
			"label": "Especialista em Arcanismo",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "arcanismo",
			"key": "arcanismo",
			"label": "Arcanismo (Int)",
			"type": "computed",
			"formula": "@int_mod + @bonus_prof * if(@prof_arcanismo, 1 + @esp_arcanismo, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_atletismo",
			"key": "prof_atletismo",
			"label": "Proficiente em Atletismo",
			"type": "boolean"
		},
		{
			"id": "esp_atletismo",
			"key": "esp_atletismo",
			"label": "Especialista em Atletismo",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "atletismo",
			"key": "atletismo",
			"label": "Atletismo (For)",
			"type": "computed",
			"formula": "@for_mod + @bonus_prof * if(@prof_atletismo, 1 + @esp_atletismo, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_atuacao",
			"key": "prof_atuacao",
			"label": "Proficiente em Atuação",
			"type": "boolean"
		},
		{
			"id": "esp_atuacao",
			"key": "esp_atuacao",
			"label": "Especialista em Atuação",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "atuacao",
			"key": "atuacao",
			"label": "Atuação (Car)",
			"type": "computed",
			"formula": "@car_mod + @bonus_prof * if(@prof_atuacao, 1 + @esp_atuacao, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_enganacao",
			"key": "prof_enganacao",
			"label": "Proficiente em Enganação",
			"type": "boolean"
		},
		{
			"id": "esp_enganacao",
			"key": "esp_enganacao",
			"label": "Especialista em Enganação",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "enganacao",
			"key": "enganacao",
			"label": "Enganação (Car)",
			"type": "computed",
			"formula": "@car_mod + @bonus_prof * if(@prof_enganacao, 1 + @esp_enganacao, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_furtividade",
			"key": "prof_furtividade",
			"label": "Proficiente em Furtividade",
			"type": "boolean"
		},
		{
			"id": "esp_furtividade",
			"key": "esp_furtividade",
			"label": "Especialista em Furtividade",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "furtividade",
			"key": "furtividade",
			"label": "Furtividade (Des)",
			"type": "computed",
			"formula": "@des_mod + @bonus_prof * if(@prof_furtividade, 1 + @esp_furtividade, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_historia",
			"key": "prof_historia",
			"label": "Proficiente em História",
			"type": "boolean"
		},
		{
			"id": "esp_historia",
			"key": "esp_historia",
			"label": "Especialista em História",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "historia",
			"key": "historia",
			"label": "História (Int)",
			"type": "computed",
			"formula": "@int_mod + @bonus_prof * if(@prof_historia, 1 + @esp_historia, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_intimidacao",
			"key": "prof_intimidacao",
			"label": "Proficiente em Intimidação",
			"type": "boolean"
		},
		{
			"id": "esp_intimidacao",
			"key": "esp_intimidacao",
			"label": "Especialista em Intimidação",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "intimidacao",
			"key": "intimidacao",
			"label": "Intimidação (Car)",
			"type": "computed",
			"formula": "@car_mod + @bonus_prof * if(@prof_intimidacao, 1 + @esp_intimidacao, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_intuicao",
			"key": "prof_intuicao",
			"label": "Proficiente em Intuição",
			"type": "boolean"
		},
		{
			"id": "esp_intuicao",
			"key": "esp_intuicao",
			"label": "Especialista em Intuição",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "intuicao",
			"key": "intuicao",
			"label": "Intuição (Sab)",
			"type": "computed",
			"formula": "@sab_mod + @bonus_prof * if(@prof_intuicao, 1 + @esp_intuicao, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_investigacao",
			"key": "prof_investigacao",
			"label": "Proficiente em Investigação",
			"type": "boolean"
		},
		{
			"id": "esp_investigacao",
			"key": "esp_investigacao",
			"label": "Especialista em Investigação",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "investigacao",
			"key": "investigacao",
			"label": "Investigação (Int)",
			"type": "computed",
			"formula": "@int_mod + @bonus_prof * if(@prof_investigacao, 1 + @esp_investigacao, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_medicina",
			"key": "prof_medicina",
			"label": "Proficiente em Medicina",
			"type": "boolean"
		},
		{
			"id": "esp_medicina",
			"key": "esp_medicina",
			"label": "Especialista em Medicina",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "medicina",
			"key": "medicina",
			"label": "Medicina (Sab)",
			"type": "computed",
			"formula": "@sab_mod + @bonus_prof * if(@prof_medicina, 1 + @esp_medicina, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_natureza",
			"key": "prof_natureza",
			"label": "Proficiente em Natureza",
			"type": "boolean"
		},
		{
			"id": "esp_natureza",
			"key": "esp_natureza",
			"label": "Especialista em Natureza",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "natureza",
			"key": "natureza",
			"label": "Natureza (Int)",
			"type": "computed",
			"formula": "@int_mod + @bonus_prof * if(@prof_natureza, 1 + @esp_natureza, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_percepcao",
			"key": "prof_percepcao",
			"label": "Proficiente em Percepção",
			"type": "boolean"
		},
		{
			"id": "esp_percepcao",
			"key": "esp_percepcao",
			"label": "Especialista em Percepção",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "percepcao",
			"key": "percepcao",
			"label": "Percepção (Sab)",
			"type": "computed",
			"formula": "@sab_mod + @bonus_prof * if(@prof_percepcao, 1 + @esp_percepcao, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_persuasao",
			"key": "prof_persuasao",
			"label": "Proficiente em Persuasão",
			"type": "boolean"
		},
		{
			"id": "esp_persuasao",
			"key": "esp_persuasao",
			"label": "Especialista em Persuasão",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "persuasao",
			"key": "persuasao",
			"label": "Persuasão (Car)",
			"type": "computed",
			"formula": "@car_mod + @bonus_prof * if(@prof_persuasao, 1 + @esp_persuasao, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_prestidigitacao",
			"key": "prof_prestidigitacao",
			"label": "Proficiente em Prestidigitação",
			"type": "boolean"
		},
		{
			"id": "esp_prestidigitacao",
			"key": "esp_prestidigitacao",
			"label": "Especialista em Prestidigitação",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "prestidigitacao",
			"key": "prestidigitacao",
			"label": "Prestidigitação (Des)",
			"type": "computed",
			"formula": "@des_mod + @bonus_prof * if(@prof_prestidigitacao, 1 + @esp_prestidigitacao, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_religiao",
			"key": "prof_religiao",
			"label": "Proficiente em Religião",
			"type": "boolean"
		},
		{
			"id": "esp_religiao",
			"key": "esp_religiao",
			"label": "Especialista em Religião",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "religiao",
			"key": "religiao",
			"label": "Religião (Int)",
			"type": "computed",
			"formula": "@int_mod + @bonus_prof * if(@prof_religiao, 1 + @esp_religiao, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_sobrevivencia",
			"key": "prof_sobrevivencia",
			"label": "Proficiente em Sobrevivência",
			"type": "boolean"
		},
		{
			"id": "esp_sobrevivencia",
			"key": "esp_sobrevivencia",
			"label": "Especialista em Sobrevivência",
			"type": "boolean",
			"description": "Dobra o bônus de proficiência. Só tem efeito se houver proficiência."
		},
		{
			"id": "sobrevivencia",
			"key": "sobrevivencia",
			"label": "Sobrevivência (Sab)",
			"type": "computed",
			"formula": "@sab_mod + @bonus_prof * if(@prof_sobrevivencia, 1 + @esp_sobrevivencia, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "percepcao_passiva",
			"key": "percepcao_passiva",
			"label": "Sabedoria (Percepção) passiva",
			"type": "computed",
			"formula": "10 + @percepcao"
		},
		{
			"id": "ca_total",
			"key": "ca_total",
			"label": "Classe de Armadura",
			"type": "computed",
			"formula": "@ca + sum(@equipamento.bonus_ca * @equipamento.equipado) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"ca\"))",
			"description": "CA base + bônus dos itens equipados + efeitos ativos."
		},
		{
			"id": "ca",
			"key": "ca",
			"label": "CA base (armadura)",
			"type": "number",
			"default": 10,
			"min": 0,
			"integer": true,
			"description": "CA da armadura (ou 10 + Destreza sem armadura). Escudos e itens mágicos entram pelo Equipamento, com Bônus de CA e Equipado."
		},
		{
			"id": "iniciativa",
			"key": "iniciativa",
			"label": "Iniciativa",
			"type": "computed",
			"formula": "@des_mod + @bonus_iniciativa + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"iniciativa\"))",
			"signed": true
		},
		{
			"id": "bonus_iniciativa",
			"key": "bonus_iniciativa",
			"label": "Bônus extra de iniciativa",
			"type": "number",
			"default": 0,
			"integer": true
		},
		{
			"id": "deslocamento",
			"key": "deslocamento",
			"label": "Deslocamento (m)",
			"type": "number",
			"default": 9,
			"min": 0
		},
		{
			"id": "hp",
			"key": "hp",
			"label": "Pontos de Vida",
			"type": "resource",
			"default": 10
		},
		{
			"id": "dados_vida",
			"key": "dados_vida",
			"label": "Dados de Vida",
			"type": "dice",
			"default": "1d8"
		},
		{
			"id": "dados_vida_restantes",
			"key": "dados_vida_restantes",
			"label": "Dados de Vida restantes",
			"type": "resource",
			"default": 1
		},
		{
			"id": "sucessos_morte",
			"key": "sucessos_morte",
			"label": "Testes contra a morte: sucessos",
			"type": "number",
			"default": 0,
			"min": 0,
			"max": 3,
			"integer": true
		},
		{
			"id": "falhas_morte",
			"key": "falhas_morte",
			"label": "Testes contra a morte: falhas",
			"type": "number",
			"default": 0,
			"min": 0,
			"max": 3,
			"integer": true
		},
		{
			"id": "condicoes",
			"key": "condicoes",
			"label": "Condições",
			"type": "select",
			"multiple": true,
			"options": [
				{
					"value": "agarrado",
					"label": "Agarrado"
				},
				{
					"value": "amedrontado",
					"label": "Amedrontado"
				},
				{
					"value": "atordoado",
					"label": "Atordoado"
				},
				{
					"value": "caido",
					"label": "Caído"
				},
				{
					"value": "cego",
					"label": "Cego"
				},
				{
					"value": "contido",
					"label": "Contido"
				},
				{
					"value": "enfeiticado",
					"label": "Enfeitiçado"
				},
				{
					"value": "envenenado",
					"label": "Envenenado"
				},
				{
					"value": "incapacitado",
					"label": "Incapacitado"
				},
				{
					"value": "inconsciente",
					"label": "Inconsciente"
				},
				{
					"value": "invisivel",
					"label": "Invisível"
				},
				{
					"value": "paralisado",
					"label": "Paralisado"
				},
				{
					"value": "petrificado",
					"label": "Petrificado"
				},
				{
					"value": "surdo",
					"label": "Surdo"
				}
			]
		},
		{
			"id": "exaustao",
			"key": "exaustao",
			"label": "Exaustão",
			"type": "number",
			"default": 0,
			"min": 0,
			"max": 6,
			"integer": true
		},
		{
			"id": "ataques",
			"key": "ataques",
			"label": "Ataques",
			"type": "list",
			"maxItems": 30,
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Nome",
					"type": "text"
				},
				{
					"id": "bonus",
					"key": "bonus",
					"label": "Bônus de ataque",
					"type": "number",
					"default": 0,
					"integer": true
				},
				{
					"id": "dano",
					"key": "dano",
					"label": "Dano",
					"type": "dice"
				},
				{
					"id": "tipo",
					"key": "tipo",
					"label": "Tipo de dano",
					"type": "text"
				},
				{
					"id": "notas",
					"key": "notas",
					"label": "Notas",
					"type": "text"
				}
			]
		},
		{
			"id": "atributo_conjuracao",
			"key": "atributo_conjuracao",
			"label": "Atributo de conjuração",
			"type": "select",
			"options": [
				{
					"value": "int",
					"label": "Inteligência"
				},
				{
					"value": "sab",
					"label": "Sabedoria"
				},
				{
					"value": "car",
					"label": "Carisma"
				}
			],
			"description": "Inteligência para magos, Sabedoria para clérigos e druidas, Carisma para bardos, feiticeiros, bruxos e paladinos."
		},
		{
			"id": "cd_magia",
			"key": "cd_magia",
			"label": "CD de resistência de magia",
			"type": "computed",
			"formula": "8 + @bonus_prof + @mod_conjuracao"
		},
		{
			"id": "ataque_magia",
			"key": "ataque_magia",
			"label": "Bônus de ataque com magia",
			"type": "computed",
			"formula": "@bonus_prof + @mod_conjuracao",
			"signed": true
		},
		{
			"id": "magias_preparadas",
			"key": "magias_preparadas",
			"label": "Magias preparadas",
			"type": "computed",
			"formula": "count(@magias.preparada)"
		},
		{
			"id": "mod_conjuracao",
			"key": "mod_conjuracao",
			"label": "Mod. de conjuração",
			"type": "computed",
			"formula": "is(@atributo_conjuracao, \"int\") * @int_mod + is(@atributo_conjuracao, \"sab\") * @sab_mod + is(@atributo_conjuracao, \"car\") * @car_mod",
			"signed": true
		},
		{
			"id": "espacos_1",
			"key": "espacos_1",
			"label": "Espaços de magia de 1º nível",
			"type": "resource",
			"default": 0
		},
		{
			"id": "espacos_2",
			"key": "espacos_2",
			"label": "Espaços de magia de 2º nível",
			"type": "resource",
			"default": 0
		},
		{
			"id": "espacos_3",
			"key": "espacos_3",
			"label": "Espaços de magia de 3º nível",
			"type": "resource",
			"default": 0
		},
		{
			"id": "espacos_4",
			"key": "espacos_4",
			"label": "Espaços de magia de 4º nível",
			"type": "resource",
			"default": 0
		},
		{
			"id": "espacos_5",
			"key": "espacos_5",
			"label": "Espaços de magia de 5º nível",
			"type": "resource",
			"default": 0
		},
		{
			"id": "espacos_6",
			"key": "espacos_6",
			"label": "Espaços de magia de 6º nível",
			"type": "resource",
			"default": 0
		},
		{
			"id": "espacos_7",
			"key": "espacos_7",
			"label": "Espaços de magia de 7º nível",
			"type": "resource",
			"default": 0
		},
		{
			"id": "espacos_8",
			"key": "espacos_8",
			"label": "Espaços de magia de 8º nível",
			"type": "resource",
			"default": 0
		},
		{
			"id": "espacos_9",
			"key": "espacos_9",
			"label": "Espaços de magia de 9º nível",
			"type": "resource",
			"default": 0
		},
		{
			"id": "magias",
			"key": "magias",
			"label": "Magias",
			"type": "list",
			"maxItems": 200,
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Nome",
					"type": "text"
				},
				{
					"id": "nivel",
					"key": "nivel",
					"label": "Nível",
					"type": "number",
					"default": 0,
					"min": 0,
					"max": 9,
					"integer": true
				},
				{
					"id": "preparada",
					"key": "preparada",
					"label": "Preparada",
					"type": "boolean"
				},
				{
					"id": "notas",
					"key": "notas",
					"label": "Notas",
					"type": "text"
				}
			]
		},
		{
			"id": "pc",
			"key": "pc",
			"label": "Peças de cobre",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "pp",
			"key": "pp",
			"label": "Peças de prata",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "pe",
			"key": "pe",
			"label": "Peças de electro",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "po",
			"key": "po",
			"label": "Peças de ouro",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "pl",
			"key": "pl",
			"label": "Peças de platina",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "equipamento",
			"key": "equipamento",
			"label": "Equipamento",
			"type": "list",
			"maxItems": 200,
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Item",
					"type": "text"
				},
				{
					"id": "qtd",
					"key": "qtd",
					"label": "Qtd.",
					"type": "number",
					"default": 1,
					"min": 0,
					"integer": true
				},
				{
					"id": "peso",
					"key": "peso",
					"label": "Peso (kg)",
					"type": "number",
					"default": 0,
					"min": 0
				},
				{
					"id": "bonus_ca",
					"key": "bonus_ca",
					"label": "Bônus de CA",
					"type": "number",
					"default": 0,
					"integer": true
				},
				{
					"id": "equipado",
					"key": "equipado",
					"label": "Equipado",
					"type": "boolean"
				}
			]
		},
		{
			"id": "carga",
			"key": "carga",
			"label": "Peso carregado (kg)",
			"type": "computed",
			"formula": "sum(@equipamento.peso * @equipamento.qtd)"
		},
		{
			"id": "capacidade_carga",
			"key": "capacidade_carga",
			"label": "Capacidade de carga (kg)",
			"type": "computed",
			"formula": "round(@for * 6.8)",
			"description": "Força × 15 libras (≈ 6,8 kg), pela regra do SRD."
		},
		{
			"id": "efeitos",
			"key": "efeitos",
			"label": "Efeitos temporários",
			"type": "list",
			"maxItems": 30,
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Efeito",
					"type": "text"
				},
				{
					"id": "alvo",
					"key": "alvo",
					"label": "Afeta",
					"type": "select",
					"options": [
						{
							"value": "ca",
							"label": "Classe de Armadura"
						},
						{
							"value": "iniciativa",
							"label": "Iniciativa"
						},
						{
							"value": "resistencias",
							"label": "Testes de resistência"
						},
						{
							"value": "pericias",
							"label": "Perícias"
						}
					]
				},
				{
					"id": "valor",
					"key": "valor",
					"label": "Valor",
					"type": "number",
					"default": 0
				},
				{
					"id": "ativo",
					"key": "ativo",
					"label": "Ativo",
					"type": "boolean",
					"default": true
				}
			]
		},
		{
			"id": "personalidade",
			"key": "personalidade",
			"label": "Traços de personalidade",
			"type": "longtext"
		},
		{
			"id": "ideais",
			"key": "ideais",
			"label": "Ideais",
			"type": "longtext"
		},
		{
			"id": "vinculos",
			"key": "vinculos",
			"label": "Vínculos",
			"type": "longtext"
		},
		{
			"id": "defeitos",
			"key": "defeitos",
			"label": "Defeitos",
			"type": "longtext"
		},
		{
			"id": "caracteristicas",
			"key": "caracteristicas",
			"label": "Características e talentos",
			"type": "longtext"
		},
		{
			"id": "proficiencias_idiomas",
			"key": "proficiencias_idiomas",
			"label": "Outras proficiências e idiomas",
			"type": "longtext"
		},
		{
			"id": "anotacoes",
			"key": "anotacoes",
			"label": "Anotações",
			"type": "longtext"
		}
	],
	layouts: {
		"full": [
			{
				"kind": "section",
				"title": "Personagem",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "nome",
						"span": 2
					},
					{
						"kind": "field",
						"fieldId": "classe"
					},
					{
						"kind": "field",
						"fieldId": "nivel"
					},
					{
						"kind": "field",
						"fieldId": "raca"
					},
					{
						"kind": "field",
						"fieldId": "antecedente"
					},
					{
						"kind": "field",
						"fieldId": "alinhamento"
					},
					{
						"kind": "field",
						"fieldId": "xp"
					}
				]
			},
			{
				"kind": "section",
				"title": "Atributos",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "for"
					},
					{
						"kind": "field",
						"fieldId": "for_mod"
					},
					{
						"kind": "field",
						"fieldId": "des"
					},
					{
						"kind": "field",
						"fieldId": "des_mod"
					},
					{
						"kind": "field",
						"fieldId": "con"
					},
					{
						"kind": "field",
						"fieldId": "con_mod"
					},
					{
						"kind": "field",
						"fieldId": "int"
					},
					{
						"kind": "field",
						"fieldId": "int_mod"
					},
					{
						"kind": "field",
						"fieldId": "sab"
					},
					{
						"kind": "field",
						"fieldId": "sab_mod"
					},
					{
						"kind": "field",
						"fieldId": "car"
					},
					{
						"kind": "field",
						"fieldId": "car_mod"
					},
					{
						"kind": "field",
						"fieldId": "bonus_prof"
					},
					{
						"kind": "field",
						"fieldId": "inspiracao"
					}
				]
			},
			{
				"kind": "section",
				"title": "Testes de resistência",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "prof_salv_for"
					},
					{
						"kind": "field",
						"fieldId": "salv_for"
					},
					{
						"kind": "field",
						"fieldId": "prof_salv_des"
					},
					{
						"kind": "field",
						"fieldId": "salv_des"
					},
					{
						"kind": "field",
						"fieldId": "prof_salv_con"
					},
					{
						"kind": "field",
						"fieldId": "salv_con"
					},
					{
						"kind": "field",
						"fieldId": "prof_salv_int"
					},
					{
						"kind": "field",
						"fieldId": "salv_int"
					},
					{
						"kind": "field",
						"fieldId": "prof_salv_sab"
					},
					{
						"kind": "field",
						"fieldId": "salv_sab"
					},
					{
						"kind": "field",
						"fieldId": "prof_salv_car"
					},
					{
						"kind": "field",
						"fieldId": "salv_car"
					}
				]
			},
			{
				"kind": "section",
				"title": "Perícias",
				"columns": 3,
				"children": [
					{
						"kind": "field",
						"fieldId": "prof_acrobacia"
					},
					{
						"kind": "field",
						"fieldId": "esp_acrobacia"
					},
					{
						"kind": "field",
						"fieldId": "acrobacia"
					},
					{
						"kind": "field",
						"fieldId": "prof_adestrar_animais"
					},
					{
						"kind": "field",
						"fieldId": "esp_adestrar_animais"
					},
					{
						"kind": "field",
						"fieldId": "adestrar_animais"
					},
					{
						"kind": "field",
						"fieldId": "prof_arcanismo"
					},
					{
						"kind": "field",
						"fieldId": "esp_arcanismo"
					},
					{
						"kind": "field",
						"fieldId": "arcanismo"
					},
					{
						"kind": "field",
						"fieldId": "prof_atletismo"
					},
					{
						"kind": "field",
						"fieldId": "esp_atletismo"
					},
					{
						"kind": "field",
						"fieldId": "atletismo"
					},
					{
						"kind": "field",
						"fieldId": "prof_atuacao"
					},
					{
						"kind": "field",
						"fieldId": "esp_atuacao"
					},
					{
						"kind": "field",
						"fieldId": "atuacao"
					},
					{
						"kind": "field",
						"fieldId": "prof_enganacao"
					},
					{
						"kind": "field",
						"fieldId": "esp_enganacao"
					},
					{
						"kind": "field",
						"fieldId": "enganacao"
					},
					{
						"kind": "field",
						"fieldId": "prof_furtividade"
					},
					{
						"kind": "field",
						"fieldId": "esp_furtividade"
					},
					{
						"kind": "field",
						"fieldId": "furtividade"
					},
					{
						"kind": "field",
						"fieldId": "prof_historia"
					},
					{
						"kind": "field",
						"fieldId": "esp_historia"
					},
					{
						"kind": "field",
						"fieldId": "historia"
					},
					{
						"kind": "field",
						"fieldId": "prof_intimidacao"
					},
					{
						"kind": "field",
						"fieldId": "esp_intimidacao"
					},
					{
						"kind": "field",
						"fieldId": "intimidacao"
					},
					{
						"kind": "field",
						"fieldId": "prof_intuicao"
					},
					{
						"kind": "field",
						"fieldId": "esp_intuicao"
					},
					{
						"kind": "field",
						"fieldId": "intuicao"
					},
					{
						"kind": "field",
						"fieldId": "prof_investigacao"
					},
					{
						"kind": "field",
						"fieldId": "esp_investigacao"
					},
					{
						"kind": "field",
						"fieldId": "investigacao"
					},
					{
						"kind": "field",
						"fieldId": "prof_medicina"
					},
					{
						"kind": "field",
						"fieldId": "esp_medicina"
					},
					{
						"kind": "field",
						"fieldId": "medicina"
					},
					{
						"kind": "field",
						"fieldId": "prof_natureza"
					},
					{
						"kind": "field",
						"fieldId": "esp_natureza"
					},
					{
						"kind": "field",
						"fieldId": "natureza"
					},
					{
						"kind": "field",
						"fieldId": "prof_percepcao"
					},
					{
						"kind": "field",
						"fieldId": "esp_percepcao"
					},
					{
						"kind": "field",
						"fieldId": "percepcao"
					},
					{
						"kind": "field",
						"fieldId": "prof_persuasao"
					},
					{
						"kind": "field",
						"fieldId": "esp_persuasao"
					},
					{
						"kind": "field",
						"fieldId": "persuasao"
					},
					{
						"kind": "field",
						"fieldId": "prof_prestidigitacao"
					},
					{
						"kind": "field",
						"fieldId": "esp_prestidigitacao"
					},
					{
						"kind": "field",
						"fieldId": "prestidigitacao"
					},
					{
						"kind": "field",
						"fieldId": "prof_religiao"
					},
					{
						"kind": "field",
						"fieldId": "esp_religiao"
					},
					{
						"kind": "field",
						"fieldId": "religiao"
					},
					{
						"kind": "field",
						"fieldId": "prof_sobrevivencia"
					},
					{
						"kind": "field",
						"fieldId": "esp_sobrevivencia"
					},
					{
						"kind": "field",
						"fieldId": "sobrevivencia"
					},
					{
						"kind": "field",
						"fieldId": "percepcao_passiva",
						"span": 3
					}
				]
			},
			{
				"kind": "section",
				"title": "Combate",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "ca_total"
					},
					{
						"kind": "field",
						"fieldId": "ca"
					},
					{
						"kind": "field",
						"fieldId": "iniciativa"
					},
					{
						"kind": "field",
						"fieldId": "bonus_iniciativa"
					},
					{
						"kind": "field",
						"fieldId": "deslocamento"
					},
					{
						"kind": "field",
						"fieldId": "hp",
						"span": 2
					},
					{
						"kind": "field",
						"fieldId": "dados_vida"
					},
					{
						"kind": "field",
						"fieldId": "dados_vida_restantes"
					},
					{
						"kind": "field",
						"fieldId": "sucessos_morte"
					},
					{
						"kind": "field",
						"fieldId": "falhas_morte"
					},
					{
						"kind": "field",
						"fieldId": "condicoes",
						"span": 2
					},
					{
						"kind": "field",
						"fieldId": "exaustao"
					}
				]
			},
			{
				"kind": "section",
				"title": "Efeitos temporários",
				"columns": 1,
				"children": [{
					"kind": "field",
					"fieldId": "efeitos",
					"span": 1
				}]
			},
			{
				"kind": "section",
				"title": "Ataques",
				"columns": 1,
				"children": [{
					"kind": "field",
					"fieldId": "ataques"
				}]
			},
			{
				"kind": "section",
				"title": "Conjuração",
				"columns": 3,
				"children": [
					{
						"kind": "field",
						"fieldId": "atributo_conjuracao"
					},
					{
						"kind": "field",
						"fieldId": "mod_conjuracao"
					},
					{
						"kind": "field",
						"fieldId": "cd_magia"
					},
					{
						"kind": "field",
						"fieldId": "ataque_magia"
					},
					{
						"kind": "field",
						"fieldId": "magias_preparadas"
					},
					{
						"kind": "field",
						"fieldId": "espacos_1"
					},
					{
						"kind": "field",
						"fieldId": "espacos_2"
					},
					{
						"kind": "field",
						"fieldId": "espacos_3"
					},
					{
						"kind": "field",
						"fieldId": "espacos_4"
					},
					{
						"kind": "field",
						"fieldId": "espacos_5"
					},
					{
						"kind": "field",
						"fieldId": "espacos_6"
					},
					{
						"kind": "field",
						"fieldId": "espacos_7"
					},
					{
						"kind": "field",
						"fieldId": "espacos_8"
					},
					{
						"kind": "field",
						"fieldId": "espacos_9"
					},
					{
						"kind": "field",
						"fieldId": "magias",
						"span": 3
					}
				]
			},
			{
				"kind": "section",
				"title": "Equipamento",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "pc"
					},
					{
						"kind": "field",
						"fieldId": "pp"
					},
					{
						"kind": "field",
						"fieldId": "pe"
					},
					{
						"kind": "field",
						"fieldId": "po"
					},
					{
						"kind": "field",
						"fieldId": "pl"
					},
					{
						"kind": "field",
						"fieldId": "carga"
					},
					{
						"kind": "field",
						"fieldId": "capacidade_carga"
					},
					{
						"kind": "field",
						"fieldId": "equipamento",
						"span": 4
					}
				]
			},
			{
				"kind": "section",
				"title": "Personalidade e características",
				"columns": 2,
				"children": [
					{
						"kind": "field",
						"fieldId": "personalidade"
					},
					{
						"kind": "field",
						"fieldId": "ideais"
					},
					{
						"kind": "field",
						"fieldId": "vinculos"
					},
					{
						"kind": "field",
						"fieldId": "defeitos"
					},
					{
						"kind": "field",
						"fieldId": "caracteristicas",
						"span": 2
					},
					{
						"kind": "field",
						"fieldId": "proficiencias_idiomas",
						"span": 2
					},
					{
						"kind": "field",
						"fieldId": "anotacoes",
						"span": 2
					}
				]
			}
		],
		"gmSummary": [
			"hp",
			"ca_total",
			"condicoes",
			"exaustao",
			"percepcao_passiva",
			"cd_magia"
		]
	}
}, {
	id: "lendas-d20-orc",
	version: "1.0.0",
	name: "Lendas d20 (ORC)",
	description: "Ficha para fantasia heroica d20 com graus de proficiência (destreinado a lendário), atributos como modificadores e três ações por turno. ORC Notice: This product is licensed under the ORC License held in the Library of Congress at TX 9-307-067 and available online at various locations including www.azoralaw.com/orclicense, www.gencon.com/orclicense and others. All warranties are disclaimed as set forth therein. Attribution: This product is based on the following Licensed Material: Player Core © 2023 Paizo Inc., Designed by Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter. Reserved Material: nomes, cenário e marcas da Paizo não são usados. Expressed Material: esta ficha (layout e textos) não é material licenciado.",
	author: "Tabula RPG",
	license: "ORC",
	language: "pt-BR",
	tags: [
		"fantasia",
		"d20",
		"orc"
	],
	source: "builtin",
	fields: [
		{
			"id": "nome",
			"key": "nome",
			"label": "Nome do personagem",
			"type": "text"
		},
		{
			"id": "jogador",
			"key": "jogador",
			"label": "Jogador",
			"type": "text"
		},
		{
			"id": "nivel",
			"key": "nivel",
			"label": "Nível",
			"type": "number",
			"default": 1,
			"min": 1,
			"max": 20,
			"integer": true
		},
		{
			"id": "ancestralidade",
			"key": "ancestralidade",
			"label": "Ancestralidade",
			"type": "text"
		},
		{
			"id": "heranca",
			"key": "heranca",
			"label": "Herança",
			"type": "text"
		},
		{
			"id": "formacao",
			"key": "formacao",
			"label": "Formação",
			"type": "text"
		},
		{
			"id": "classe",
			"key": "classe",
			"label": "Classe",
			"type": "text"
		},
		{
			"id": "tamanho",
			"key": "tamanho",
			"label": "Tamanho",
			"type": "select",
			"options": [
				{
					"value": "minusculo",
					"label": "Minúsculo"
				},
				{
					"value": "pequeno",
					"label": "Pequeno"
				},
				{
					"value": "medio",
					"label": "Médio"
				},
				{
					"value": "grande",
					"label": "Grande"
				},
				{
					"value": "enorme",
					"label": "Enorme"
				},
				{
					"value": "imenso",
					"label": "Imenso"
				}
			],
			"default": "medio"
		},
		{
			"id": "deslocamento",
			"key": "deslocamento",
			"label": "Deslocamento (m)",
			"type": "number",
			"default": 7.5,
			"min": 0
		},
		{
			"id": "px",
			"key": "px",
			"label": "Pontos de experiência",
			"type": "number",
			"default": 0,
			"min": 0,
			"max": 999,
			"integer": true,
			"description": "Ao chegar a 1000, suba de nível e subtraia 1000."
		},
		{
			"id": "heroismo",
			"key": "heroismo",
			"label": "Pontos de Heroísmo",
			"type": "resource",
			"default": 1,
			"max": "3",
			"description": "Gaste para rolar de novo ou para evitar a morte."
		},
		{
			"id": "idiomas",
			"key": "idiomas",
			"label": "Idiomas",
			"type": "text"
		},
		{
			"id": "tracos",
			"key": "tracos",
			"label": "Traços",
			"type": "text"
		},
		{
			"id": "for",
			"key": "for",
			"label": "Força",
			"type": "number",
			"default": 0,
			"min": -5,
			"max": 10,
			"integer": true,
			"description": "Modificador de atributo (o Remaster não usa valores)."
		},
		{
			"id": "des",
			"key": "des",
			"label": "Destreza",
			"type": "number",
			"default": 0,
			"min": -5,
			"max": 10,
			"integer": true,
			"description": "Modificador de atributo (o Remaster não usa valores)."
		},
		{
			"id": "con",
			"key": "con",
			"label": "Constituição",
			"type": "number",
			"default": 0,
			"min": -5,
			"max": 10,
			"integer": true,
			"description": "Modificador de atributo (o Remaster não usa valores)."
		},
		{
			"id": "int",
			"key": "int",
			"label": "Inteligência",
			"type": "number",
			"default": 0,
			"min": -5,
			"max": 10,
			"integer": true,
			"description": "Modificador de atributo (o Remaster não usa valores)."
		},
		{
			"id": "sab",
			"key": "sab",
			"label": "Sabedoria",
			"type": "number",
			"default": 0,
			"min": -5,
			"max": 10,
			"integer": true,
			"description": "Modificador de atributo (o Remaster não usa valores)."
		},
		{
			"id": "car",
			"key": "car",
			"label": "Carisma",
			"type": "number",
			"default": 0,
			"min": -5,
			"max": 10,
			"integer": true,
			"description": "Modificador de atributo (o Remaster não usa valores)."
		},
		{
			"id": "atributo_chave",
			"key": "atributo_chave",
			"label": "Atributo-chave da classe",
			"type": "select",
			"options": [
				{
					"value": "for",
					"label": "Força"
				},
				{
					"value": "des",
					"label": "Destreza"
				},
				{
					"value": "con",
					"label": "Constituição"
				},
				{
					"value": "int",
					"label": "Inteligência"
				},
				{
					"value": "sab",
					"label": "Sabedoria"
				},
				{
					"value": "car",
					"label": "Carisma"
				}
			],
			"default": "for"
		},
		{
			"id": "mod_chave",
			"key": "mod_chave",
			"label": "Mod. do atributo-chave",
			"type": "computed",
			"formula": "is(@atributo_chave, \"for\") * @for + is(@atributo_chave, \"des\") * @des + is(@atributo_chave, \"con\") * @con + is(@atributo_chave, \"int\") * @int + is(@atributo_chave, \"sab\") * @sab + is(@atributo_chave, \"car\") * @car",
			"signed": true
		},
		{
			"id": "prof_fortitude",
			"key": "prof_fortitude",
			"label": "Proficiência em Fortitude",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "treinado"
		},
		{
			"id": "fortitude",
			"key": "fortitude",
			"label": "Fortitude (Con)",
			"type": "computed",
			"formula": "@con + if(@prof_fortitude > 0, @prof_fortitude + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"resistencias\"))",
			"signed": true
		},
		{
			"id": "prof_reflexos",
			"key": "prof_reflexos",
			"label": "Proficiência em Reflexos",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "treinado"
		},
		{
			"id": "reflexos",
			"key": "reflexos",
			"label": "Reflexos (Des)",
			"type": "computed",
			"formula": "@des + if(@prof_reflexos > 0, @prof_reflexos + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"resistencias\"))",
			"signed": true
		},
		{
			"id": "prof_vontade",
			"key": "prof_vontade",
			"label": "Proficiência em Vontade",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "treinado"
		},
		{
			"id": "vontade",
			"key": "vontade",
			"label": "Vontade (Sab)",
			"type": "computed",
			"formula": "@sab + if(@prof_vontade > 0, @prof_vontade + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"resistencias\"))",
			"signed": true
		},
		{
			"id": "prof_percepcao",
			"key": "prof_percepcao",
			"label": "Proficiência em Percepção",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "treinado"
		},
		{
			"id": "percepcao",
			"key": "percepcao",
			"label": "Percepção (Sab)",
			"type": "computed",
			"formula": "@sab + if(@prof_percepcao > 0, @prof_percepcao + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"percepcao\"))",
			"signed": true
		},
		{
			"id": "ca",
			"key": "ca",
			"label": "Classe de Armadura",
			"type": "computed",
			"formula": "10 + min(@des, @limite_des) + if(@prof_armadura > 0, @prof_armadura + @nivel, 0) + @bonus_armadura + @escudo_erguido * @escudo_ca + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"ca\"))",
			"description": "10 + Destreza (até o limite da armadura) + proficiência + armadura + escudo erguido + efeitos."
		},
		{
			"id": "prof_armadura",
			"key": "prof_armadura",
			"label": "Proficiência na armadura",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "treinado"
		},
		{
			"id": "bonus_armadura",
			"key": "bonus_armadura",
			"label": "Bônus de item da armadura",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "limite_des",
			"key": "limite_des",
			"label": "Limite de Destreza",
			"type": "number",
			"default": 10,
			"min": 0,
			"integer": true,
			"description": "Da armadura vestida. Sem armadura, deixe alto."
		},
		{
			"id": "pv",
			"key": "pv",
			"label": "Pontos de Vida",
			"type": "resource",
			"default": 10,
			"max": "@pv_ancestralidade + (@pv_classe + @con) * @nivel"
		},
		{
			"id": "pv_temp",
			"key": "pv_temp",
			"label": "PV temporários",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "pv_ancestralidade",
			"key": "pv_ancestralidade",
			"label": "PV da ancestralidade",
			"type": "number",
			"default": 8,
			"min": 0,
			"integer": true
		},
		{
			"id": "pv_classe",
			"key": "pv_classe",
			"label": "PV da classe por nível",
			"type": "number",
			"default": 8,
			"min": 0,
			"integer": true
		},
		{
			"id": "moribundo",
			"key": "moribundo",
			"label": "Moribundo",
			"type": "resource",
			"default": 0,
			"max": "4 - @ferido",
			"description": "Chegar ao máximo é a morte. Ferido diminui o limite."
		},
		{
			"id": "ferido",
			"key": "ferido",
			"label": "Ferido",
			"type": "number",
			"default": 0,
			"min": 0,
			"max": 3,
			"integer": true
		},
		{
			"id": "prof_classe",
			"key": "prof_classe",
			"label": "Proficiência na CD de classe",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "treinado"
		},
		{
			"id": "cd_classe",
			"key": "cd_classe",
			"label": "CD de classe",
			"type": "computed",
			"formula": "10 + @mod_chave + if(@prof_classe > 0, @prof_classe + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"cd\"))"
		},
		{
			"id": "resistencias_dano",
			"key": "resistencias_dano",
			"label": "Resistências, fraquezas e imunidades",
			"type": "text"
		},
		{
			"id": "condicoes",
			"key": "condicoes",
			"label": "Condições",
			"type": "select",
			"multiple": true,
			"options": [
				{
					"value": "agarrado",
					"label": "Agarrado"
				},
				{
					"value": "amedrontado",
					"label": "Amedrontado"
				},
				{
					"value": "atordoado",
					"label": "Atordoado"
				},
				{
					"value": "caido",
					"label": "Caído"
				},
				{
					"value": "cego",
					"label": "Cego"
				},
				{
					"value": "confuso",
					"label": "Confuso"
				},
				{
					"value": "desprevenido",
					"label": "Desprevenido"
				},
				{
					"value": "enfraquecido",
					"label": "Enfraquecido"
				},
				{
					"value": "enjoado",
					"label": "Enjoado"
				},
				{
					"value": "escondido",
					"label": "Escondido"
				},
				{
					"value": "fatigado",
					"label": "Fatigado"
				},
				{
					"value": "imobilizado",
					"label": "Imobilizado"
				},
				{
					"value": "inconsciente",
					"label": "Inconsciente"
				},
				{
					"value": "lento",
					"label": "Lento"
				},
				{
					"value": "ofuscado",
					"label": "Ofuscado"
				},
				{
					"value": "paralisado",
					"label": "Paralisado"
				},
				{
					"value": "petrificado",
					"label": "Petrificado"
				},
				{
					"value": "rapido",
					"label": "Rápido"
				},
				{
					"value": "surdo",
					"label": "Surdo"
				}
			]
		},
		{
			"id": "escudo_erguido",
			"key": "escudo_erguido",
			"label": "Escudo erguido",
			"type": "boolean"
		},
		{
			"id": "escudo_ca",
			"key": "escudo_ca",
			"label": "Bônus de CA do escudo",
			"type": "number",
			"default": 2,
			"min": 0,
			"integer": true
		},
		{
			"id": "escudo_dureza",
			"key": "escudo_dureza",
			"label": "Dureza do escudo",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "escudo_pv",
			"key": "escudo_pv",
			"label": "PV do escudo",
			"type": "resource",
			"default": 0
		},
		{
			"id": "prof_acrobatismo",
			"key": "prof_acrobatismo",
			"label": "Proficiência em Acrobatismo",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "acrobatismo",
			"key": "acrobatismo",
			"label": "Acrobatismo (Des)",
			"type": "computed",
			"formula": "@des + if(@prof_acrobatismo > 0, @prof_acrobatismo + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_arcanismo",
			"key": "prof_arcanismo",
			"label": "Proficiência em Arcanismo",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "arcanismo",
			"key": "arcanismo",
			"label": "Arcanismo (Int)",
			"type": "computed",
			"formula": "@int + if(@prof_arcanismo > 0, @prof_arcanismo + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_atletismo",
			"key": "prof_atletismo",
			"label": "Proficiência em Atletismo",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "atletismo",
			"key": "atletismo",
			"label": "Atletismo (For)",
			"type": "computed",
			"formula": "@for + if(@prof_atletismo > 0, @prof_atletismo + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_diplomacia",
			"key": "prof_diplomacia",
			"label": "Proficiência em Diplomacia",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "diplomacia",
			"key": "diplomacia",
			"label": "Diplomacia (Car)",
			"type": "computed",
			"formula": "@car + if(@prof_diplomacia > 0, @prof_diplomacia + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_enganacao",
			"key": "prof_enganacao",
			"label": "Proficiência em Enganação",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "enganacao",
			"key": "enganacao",
			"label": "Enganação (Car)",
			"type": "computed",
			"formula": "@car + if(@prof_enganacao > 0, @prof_enganacao + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_furtividade",
			"key": "prof_furtividade",
			"label": "Proficiência em Furtividade",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "furtividade",
			"key": "furtividade",
			"label": "Furtividade (Des)",
			"type": "computed",
			"formula": "@des + if(@prof_furtividade > 0, @prof_furtividade + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_intimidacao",
			"key": "prof_intimidacao",
			"label": "Proficiência em Intimidação",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "intimidacao",
			"key": "intimidacao",
			"label": "Intimidação (Car)",
			"type": "computed",
			"formula": "@car + if(@prof_intimidacao > 0, @prof_intimidacao + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_ladinagem",
			"key": "prof_ladinagem",
			"label": "Proficiência em Ladinagem",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "ladinagem",
			"key": "ladinagem",
			"label": "Ladinagem (Des)",
			"type": "computed",
			"formula": "@des + if(@prof_ladinagem > 0, @prof_ladinagem + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_manufatura",
			"key": "prof_manufatura",
			"label": "Proficiência em Manufatura",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "manufatura",
			"key": "manufatura",
			"label": "Manufatura (Int)",
			"type": "computed",
			"formula": "@int + if(@prof_manufatura > 0, @prof_manufatura + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_medicina",
			"key": "prof_medicina",
			"label": "Proficiência em Medicina",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "medicina",
			"key": "medicina",
			"label": "Medicina (Sab)",
			"type": "computed",
			"formula": "@sab + if(@prof_medicina > 0, @prof_medicina + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_natureza",
			"key": "prof_natureza",
			"label": "Proficiência em Natureza",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "natureza",
			"key": "natureza",
			"label": "Natureza (Sab)",
			"type": "computed",
			"formula": "@sab + if(@prof_natureza > 0, @prof_natureza + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_ocultismo",
			"key": "prof_ocultismo",
			"label": "Proficiência em Ocultismo",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "ocultismo",
			"key": "ocultismo",
			"label": "Ocultismo (Int)",
			"type": "computed",
			"formula": "@int + if(@prof_ocultismo > 0, @prof_ocultismo + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_performance",
			"key": "prof_performance",
			"label": "Proficiência em Performance",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "performance",
			"key": "performance",
			"label": "Performance (Car)",
			"type": "computed",
			"formula": "@car + if(@prof_performance > 0, @prof_performance + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_religiao",
			"key": "prof_religiao",
			"label": "Proficiência em Religião",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "religiao",
			"key": "religiao",
			"label": "Religião (Sab)",
			"type": "computed",
			"formula": "@sab + if(@prof_religiao > 0, @prof_religiao + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_sobrevivencia",
			"key": "prof_sobrevivencia",
			"label": "Proficiência em Sobrevivência",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "sobrevivencia",
			"key": "sobrevivencia",
			"label": "Sobrevivência (Sab)",
			"type": "computed",
			"formula": "@sab + if(@prof_sobrevivencia > 0, @prof_sobrevivencia + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "prof_sociedade",
			"key": "prof_sociedade",
			"label": "Proficiência em Sociedade",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			],
			"default": "destreinado"
		},
		{
			"id": "sociedade",
			"key": "sociedade",
			"label": "Sociedade (Int)",
			"type": "computed",
			"formula": "@int + if(@prof_sociedade > 0, @prof_sociedade + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"pericias\"))",
			"signed": true
		},
		{
			"id": "saberes",
			"key": "saberes",
			"label": "Saberes",
			"type": "list",
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Saber",
					"type": "text"
				},
				{
					"id": "grau",
					"key": "grau",
					"label": "Grau",
					"type": "select",
					"options": [
						{
							"value": "destreinado",
							"label": "Destreinado",
							"number": 0
						},
						{
							"value": "treinado",
							"label": "Treinado",
							"number": 2
						},
						{
							"value": "especialista",
							"label": "Especialista",
							"number": 4
						},
						{
							"value": "mestre",
							"label": "Mestre",
							"number": 6
						},
						{
							"value": "lendario",
							"label": "Lendário",
							"number": 8
						}
					],
					"default": "treinado"
				},
				{
					"id": "bonus",
					"key": "bonus",
					"label": "Bônus total",
					"type": "number",
					"default": 0,
					"integer": true
				}
			]
		},
		{
			"id": "ataques",
			"key": "ataques",
			"label": "Golpes",
			"type": "list",
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Arma",
					"type": "text"
				},
				{
					"id": "bonus",
					"key": "bonus",
					"label": "Bônus de ataque",
					"type": "number",
					"default": 0,
					"integer": true
				},
				{
					"id": "dano",
					"key": "dano",
					"label": "Dano",
					"type": "dice"
				},
				{
					"id": "tipo",
					"key": "tipo",
					"label": "Tipo de dano",
					"type": "text"
				},
				{
					"id": "tracos",
					"key": "tracos",
					"label": "Traços",
					"type": "text"
				}
			]
		},
		{
			"id": "tradicao",
			"key": "tradicao",
			"label": "Tradição",
			"type": "select",
			"options": [
				{
					"value": "arcana",
					"label": "Arcana"
				},
				{
					"value": "divina",
					"label": "Divina"
				},
				{
					"value": "ocultista",
					"label": "Ocultista"
				},
				{
					"value": "primal",
					"label": "Primal"
				}
			]
		},
		{
			"id": "atributo_magia",
			"key": "atributo_magia",
			"label": "Atributo de magia",
			"type": "select",
			"options": [
				{
					"value": "int",
					"label": "Inteligência"
				},
				{
					"value": "sab",
					"label": "Sabedoria"
				},
				{
					"value": "car",
					"label": "Carisma"
				}
			],
			"default": "int"
		},
		{
			"id": "mod_magia",
			"key": "mod_magia",
			"label": "Mod. de magia",
			"type": "computed",
			"formula": "is(@atributo_magia, \"int\") * @int + is(@atributo_magia, \"sab\") * @sab + is(@atributo_magia, \"car\") * @car",
			"signed": true
		},
		{
			"id": "prof_magia",
			"key": "prof_magia",
			"label": "Proficiência em magia",
			"type": "select",
			"options": [
				{
					"value": "destreinado",
					"label": "Destreinado",
					"number": 0
				},
				{
					"value": "treinado",
					"label": "Treinado",
					"number": 2
				},
				{
					"value": "especialista",
					"label": "Especialista",
					"number": 4
				},
				{
					"value": "mestre",
					"label": "Mestre",
					"number": 6
				},
				{
					"value": "lendario",
					"label": "Lendário",
					"number": 8
				}
			]
		},
		{
			"id": "ataque_magia",
			"key": "ataque_magia",
			"label": "Ataque com magia",
			"type": "computed",
			"formula": "@mod_magia + if(@prof_magia > 0, @prof_magia + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"ataques\"))",
			"signed": true
		},
		{
			"id": "cd_magia",
			"key": "cd_magia",
			"label": "CD de magia",
			"type": "computed",
			"formula": "10 + @mod_magia + if(@prof_magia > 0, @prof_magia + @nivel, 0) + sum(@efeitos.valor * @efeitos.ativo * is(@efeitos.alvo, \"cd\"))"
		},
		{
			"id": "foco",
			"key": "foco",
			"label": "Pontos de Foco",
			"type": "resource",
			"default": 0,
			"max": "3"
		},
		{
			"id": "magias",
			"key": "magias",
			"label": "Magias",
			"type": "list",
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Magia",
					"type": "text"
				},
				{
					"id": "nivel",
					"key": "nivel",
					"label": "Grau",
					"type": "number",
					"default": 1,
					"min": 0,
					"max": 10,
					"integer": true,
					"description": "0 para truques."
				},
				{
					"id": "preparada",
					"key": "preparada",
					"label": "Preparada",
					"type": "boolean"
				},
				{
					"id": "acoes",
					"key": "acoes",
					"label": "Ações",
					"type": "text"
				}
			]
		},
		{
			"id": "talentos",
			"key": "talentos",
			"label": "Talentos e habilidades",
			"type": "list",
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Talento",
					"type": "text"
				},
				{
					"id": "tipo",
					"key": "tipo",
					"label": "Tipo",
					"type": "select",
					"options": [
						{
							"value": "ancestralidade",
							"label": "Ancestralidade"
						},
						{
							"value": "classe",
							"label": "Classe"
						},
						{
							"value": "pericia",
							"label": "Perícia"
						},
						{
							"value": "geral",
							"label": "Geral"
						},
						{
							"value": "formacao",
							"label": "Formação"
						},
						{
							"value": "outro",
							"label": "Outro"
						}
					]
				},
				{
					"id": "nivel",
					"key": "nivel",
					"label": "Nível",
					"type": "number",
					"default": 1,
					"min": 1,
					"max": 20,
					"integer": true
				},
				{
					"id": "descricao",
					"key": "descricao",
					"label": "Descrição",
					"type": "text"
				}
			]
		},
		{
			"id": "equipamento",
			"key": "equipamento",
			"label": "Equipamento",
			"type": "list",
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Item",
					"type": "text"
				},
				{
					"id": "qtd",
					"key": "qtd",
					"label": "Qtd.",
					"type": "number",
					"default": 1,
					"min": 0,
					"integer": true
				},
				{
					"id": "volume",
					"key": "volume",
					"label": "Volume",
					"type": "number",
					"default": 0,
					"min": 0,
					"description": "L (leve) conta 0,1."
				},
				{
					"id": "investido",
					"key": "investido",
					"label": "Investido",
					"type": "boolean"
				}
			]
		},
		{
			"id": "volume_total",
			"key": "volume_total",
			"label": "Volume carregado",
			"type": "computed",
			"formula": "floor(sum(@equipamento.volume * @equipamento.qtd))"
		},
		{
			"id": "limite_volume",
			"key": "limite_volume",
			"label": "Limite de volume",
			"type": "computed",
			"formula": "5 + @for",
			"description": "Acima disso, fica sobrecarregado."
		},
		{
			"id": "investidos",
			"key": "investidos",
			"label": "Itens investidos",
			"type": "computed",
			"formula": "count(@equipamento.investido)",
			"description": "Máximo de 10."
		},
		{
			"id": "po",
			"key": "po",
			"label": "Peças de ouro",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "pp",
			"key": "pp",
			"label": "Peças de prata",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "pc",
			"key": "pc",
			"label": "Peças de cobre",
			"type": "number",
			"default": 0,
			"min": 0,
			"integer": true
		},
		{
			"id": "efeitos",
			"key": "efeitos",
			"label": "Efeitos temporários",
			"type": "list",
			"itemFields": [
				{
					"id": "nome",
					"key": "nome",
					"label": "Efeito",
					"type": "text"
				},
				{
					"id": "alvo",
					"key": "alvo",
					"label": "Afeta",
					"type": "select",
					"options": [
						{
							"value": "ca",
							"label": "Classe de Armadura"
						},
						{
							"value": "ataques",
							"label": "Ataques"
						},
						{
							"value": "resistencias",
							"label": "Testes de resistência"
						},
						{
							"value": "pericias",
							"label": "Perícias"
						},
						{
							"value": "percepcao",
							"label": "Percepção"
						},
						{
							"value": "cd",
							"label": "CDs"
						}
					],
					"default": "ca"
				},
				{
					"id": "valor",
					"key": "valor",
					"label": "Valor",
					"type": "number",
					"default": 1,
					"integer": true,
					"description": "Negativo para penalidades (ex.: Amedrontado 1 = -1)."
				},
				{
					"id": "ativo",
					"key": "ativo",
					"label": "Ativo",
					"type": "boolean",
					"default": true
				}
			],
			"description": "Bônus e penalidades de magias, condições e itens. Somados nas fórmulas."
		},
		{
			"id": "personalidade",
			"key": "personalidade",
			"label": "Personalidade e crenças",
			"type": "longtext"
		},
		{
			"id": "anotacoes",
			"key": "anotacoes",
			"label": "Anotações",
			"type": "longtext"
		}
	],
	layouts: {
		"full": [
			{
				"kind": "section",
				"title": "Personagem",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "nome",
						"span": 2
					},
					{
						"kind": "field",
						"fieldId": "jogador"
					},
					{
						"kind": "field",
						"fieldId": "nivel"
					},
					{
						"kind": "field",
						"fieldId": "ancestralidade"
					},
					{
						"kind": "field",
						"fieldId": "heranca"
					},
					{
						"kind": "field",
						"fieldId": "formacao"
					},
					{
						"kind": "field",
						"fieldId": "classe"
					},
					{
						"kind": "field",
						"fieldId": "tamanho"
					},
					{
						"kind": "field",
						"fieldId": "deslocamento"
					},
					{
						"kind": "field",
						"fieldId": "px"
					},
					{
						"kind": "field",
						"fieldId": "heroismo"
					},
					{
						"kind": "field",
						"fieldId": "idiomas",
						"span": 2
					},
					{
						"kind": "field",
						"fieldId": "tracos",
						"span": 2
					}
				]
			},
			{
				"kind": "section",
				"title": "Atributos",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "for"
					},
					{
						"kind": "field",
						"fieldId": "des"
					},
					{
						"kind": "field",
						"fieldId": "con"
					},
					{
						"kind": "field",
						"fieldId": "int"
					},
					{
						"kind": "field",
						"fieldId": "sab"
					},
					{
						"kind": "field",
						"fieldId": "car"
					},
					{
						"kind": "field",
						"fieldId": "atributo_chave",
						"span": 2
					},
					{
						"kind": "field",
						"fieldId": "mod_chave"
					}
				]
			},
			{
				"kind": "section",
				"title": "Defesas e Percepção",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "prof_fortitude"
					},
					{
						"kind": "field",
						"fieldId": "fortitude"
					},
					{
						"kind": "field",
						"fieldId": "prof_reflexos"
					},
					{
						"kind": "field",
						"fieldId": "reflexos"
					},
					{
						"kind": "field",
						"fieldId": "prof_vontade"
					},
					{
						"kind": "field",
						"fieldId": "vontade"
					},
					{
						"kind": "field",
						"fieldId": "prof_percepcao"
					},
					{
						"kind": "field",
						"fieldId": "percepcao"
					}
				]
			},
			{
				"kind": "section",
				"title": "Combate",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "ca"
					},
					{
						"kind": "field",
						"fieldId": "prof_armadura"
					},
					{
						"kind": "field",
						"fieldId": "bonus_armadura"
					},
					{
						"kind": "field",
						"fieldId": "limite_des"
					},
					{
						"kind": "field",
						"fieldId": "pv"
					},
					{
						"kind": "field",
						"fieldId": "pv_temp"
					},
					{
						"kind": "field",
						"fieldId": "pv_ancestralidade"
					},
					{
						"kind": "field",
						"fieldId": "pv_classe"
					},
					{
						"kind": "field",
						"fieldId": "moribundo"
					},
					{
						"kind": "field",
						"fieldId": "ferido"
					},
					{
						"kind": "field",
						"fieldId": "prof_classe"
					},
					{
						"kind": "field",
						"fieldId": "cd_classe"
					},
					{
						"kind": "field",
						"fieldId": "resistencias_dano",
						"span": 4
					},
					{
						"kind": "field",
						"fieldId": "condicoes",
						"span": 4
					}
				]
			},
			{
				"kind": "section",
				"title": "Escudo",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "escudo_erguido"
					},
					{
						"kind": "field",
						"fieldId": "escudo_ca"
					},
					{
						"kind": "field",
						"fieldId": "escudo_dureza"
					},
					{
						"kind": "field",
						"fieldId": "escudo_pv"
					}
				]
			},
			{
				"kind": "section",
				"title": "Efeitos temporários",
				"columns": 1,
				"children": [{
					"kind": "field",
					"fieldId": "efeitos"
				}]
			},
			{
				"kind": "section",
				"title": "Golpes",
				"columns": 1,
				"children": [{
					"kind": "field",
					"fieldId": "ataques"
				}]
			},
			{
				"kind": "section",
				"title": "Perícias",
				"columns": 4,
				"children": [
					{
						"kind": "field",
						"fieldId": "prof_acrobatismo"
					},
					{
						"kind": "field",
						"fieldId": "acrobatismo"
					},
					{
						"kind": "field",
						"fieldId": "prof_arcanismo"
					},
					{
						"kind": "field",
						"fieldId": "arcanismo"
					},
					{
						"kind": "field",
						"fieldId": "prof_atletismo"
					},
					{
						"kind": "field",
						"fieldId": "atletismo"
					},
					{
						"kind": "field",
						"fieldId": "prof_diplomacia"
					},
					{
						"kind": "field",
						"fieldId": "diplomacia"
					},
					{
						"kind": "field",
						"fieldId": "prof_enganacao"
					},
					{
						"kind": "field",
						"fieldId": "enganacao"
					},
					{
						"kind": "field",
						"fieldId": "prof_furtividade"
					},
					{
						"kind": "field",
						"fieldId": "furtividade"
					},
					{
						"kind": "field",
						"fieldId": "prof_intimidacao"
					},
					{
						"kind": "field",
						"fieldId": "intimidacao"
					},
					{
						"kind": "field",
						"fieldId": "prof_ladinagem"
					},
					{
						"kind": "field",
						"fieldId": "ladinagem"
					},
					{
						"kind": "field",
						"fieldId": "prof_manufatura"
					},
					{
						"kind": "field",
						"fieldId": "manufatura"
					},
					{
						"kind": "field",
						"fieldId": "prof_medicina"
					},
					{
						"kind": "field",
						"fieldId": "medicina"
					},
					{
						"kind": "field",
						"fieldId": "prof_natureza"
					},
					{
						"kind": "field",
						"fieldId": "natureza"
					},
					{
						"kind": "field",
						"fieldId": "prof_ocultismo"
					},
					{
						"kind": "field",
						"fieldId": "ocultismo"
					},
					{
						"kind": "field",
						"fieldId": "prof_performance"
					},
					{
						"kind": "field",
						"fieldId": "performance"
					},
					{
						"kind": "field",
						"fieldId": "prof_religiao"
					},
					{
						"kind": "field",
						"fieldId": "religiao"
					},
					{
						"kind": "field",
						"fieldId": "prof_sobrevivencia"
					},
					{
						"kind": "field",
						"fieldId": "sobrevivencia"
					},
					{
						"kind": "field",
						"fieldId": "prof_sociedade"
					},
					{
						"kind": "field",
						"fieldId": "sociedade"
					},
					{
						"kind": "field",
						"fieldId": "saberes",
						"span": 2
					}
				]
			},
			{
				"kind": "section",
				"title": "Magia",
				"columns": 3,
				"children": [
					{
						"kind": "field",
						"fieldId": "tradicao"
					},
					{
						"kind": "field",
						"fieldId": "atributo_magia"
					},
					{
						"kind": "field",
						"fieldId": "mod_magia"
					},
					{
						"kind": "field",
						"fieldId": "prof_magia"
					},
					{
						"kind": "field",
						"fieldId": "ataque_magia"
					},
					{
						"kind": "field",
						"fieldId": "cd_magia"
					},
					{
						"kind": "field",
						"fieldId": "foco"
					},
					{
						"kind": "field",
						"fieldId": "magias",
						"span": 3
					}
				]
			},
			{
				"kind": "section",
				"title": "Talentos",
				"columns": 1,
				"children": [{
					"kind": "field",
					"fieldId": "talentos"
				}]
			},
			{
				"kind": "section",
				"title": "Equipamento",
				"columns": 3,
				"children": [
					{
						"kind": "field",
						"fieldId": "equipamento",
						"span": 4
					},
					{
						"kind": "field",
						"fieldId": "volume_total"
					},
					{
						"kind": "field",
						"fieldId": "limite_volume"
					},
					{
						"kind": "field",
						"fieldId": "investidos"
					},
					{
						"kind": "field",
						"fieldId": "po"
					},
					{
						"kind": "field",
						"fieldId": "pp"
					},
					{
						"kind": "field",
						"fieldId": "pc"
					}
				]
			},
			{
				"kind": "section",
				"title": "Personalidade e anotações",
				"columns": 2,
				"children": [{
					"kind": "field",
					"fieldId": "personalidade"
				}, {
					"kind": "field",
					"fieldId": "anotacoes"
				}]
			}
		],
		"gmSummary": [
			"pv",
			"ca",
			"percepcao",
			"fortitude",
			"reflexos",
			"vontade",
			"condicoes",
			"heroismo",
			"moribundo"
		]
	}
}].map((json) => SystemTemplateSchema.parse(json));
//#endregion
//#region src/issue-form.ts
/**
* Leitura do formulário de publicação (`.github/ISSUE_TEMPLATE/publicar.yml`). O GitHub
* transforma cada campo num título `### Rótulo` seguido da resposta.
*/
var FORM_LABELS = {
	file: "Arquivo do sistema",
	license: "Licença",
	author: "Autor"
};
var NO_RESPONSE = "_No response_";
/** Seções do corpo da issue, por título. */
function parseSections(body) {
	const sections = /* @__PURE__ */ new Map();
	const parts = body.replace(/\r\n/g, "\n").split(/^### +(.+)$/m);
	for (let i = 1; i < parts.length; i += 2) {
		const value = (parts[i + 1] ?? "").trim();
		sections.set(parts[i].trim(), value === NO_RESPONSE ? "" : value);
	}
	return sections;
}
function parsePublishForm(body) {
	const sections = parseSections(body);
	const optional = (label) => sections.get(label) || void 0;
	const license = optional(FORM_LABELS.license);
	return {
		file: sections.get(FORM_LABELS.file) ?? "",
		license: license === "A que está no arquivo" ? void 0 : license,
		author: optional(FORM_LABELS.author)
	};
}
/** Anexo enviado ao GitHub (arrastar o arquivo para o campo gera este link). */
var ATTACHMENT = /https:\/\/github\.com\/user-attachments\/files\/\d+\/[A-Za-z0-9._%()-]+\.json\b/;
/**
* Onde está o sistema: um anexo `.json` (o caminho normal) ou o JSON colado no campo,
* com ou sem bloco de código.
*/
function locateFile(field) {
	const attachment = ATTACHMENT.exec(field);
	if (attachment) return {
		kind: "anexo",
		url: attachment[0]
	};
	const fenced = /```[a-z]*\n([\s\S]*?)\n```/.exec(field);
	const text = (fenced ? fenced[1] : field)?.trim() ?? "";
	return text.startsWith("{") ? {
		kind: "texto",
		text
	} : null;
}
//#endregion
//#region src/repo.ts
/**
* Conteúdo do repositório da comunidade:
*
*   templates/<id>/<versão>.json   arquivo publicado (nunca muda depois de publicado)
*   templates/<id>/registro.json   dona do sistema e data de cada versão
*   index.json                     catálogo, gerado a partir dos anteriores
*
* Os pedidos de inclusão não tocam no `index.json` (que geraria conflitos entre pedidos
* simultâneos): ele é regenerado quando um pedido entra na `main`.
*/
var RecordSchema = object({
	owner: GitHubLoginSchema,
	versions: record(SemVerSchema, object({ publishedAt: datetime() }))
});
var recordPath = (id) => `templates/${id}/registro.json`;
var sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
var byName = (a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
async function readRepo(root) {
	const state = /* @__PURE__ */ new Map();
	let entries;
	try {
		entries = await readdir(join(root, "templates"), { withFileTypes: true });
	} catch {
		return state;
	}
	const visible = (name) => !name.startsWith(".");
	for (const entry of entries.filter((e) => visible(e.name)).sort(byName)) {
		const id = entry.name;
		if (!entry.isDirectory()) {
			state.set(id, {
				record: void 0,
				files: /* @__PURE__ */ new Map(),
				stray: [],
				isFile: true
			});
			continue;
		}
		const dir = join(root, "templates", id);
		const template = {
			record: void 0,
			files: /* @__PURE__ */ new Map(),
			stray: []
		};
		for (const name of (await readdir(dir)).filter(visible).sort()) {
			const path = `templates/${id}/${name}`;
			if (name === "registro.json") template.record = JSON.parse(await readFile(join(dir, name), "utf-8"));
			else if (SemVerSchema.safeParse(name.replace(/\.json$/, "")).success && name.endsWith(".json")) template.files.set(name.replace(/\.json$/, ""), await readFile(join(dir, name)));
			else template.stray.push(path);
		}
		state.set(id, template);
	}
	return state;
}
async function applyWrites(root, writes) {
	for (const { path, content } of writes) {
		await mkdir(dirname(join(root, path)), { recursive: true });
		await writeFile(join(root, path), content);
	}
}
var problem = (path, message) => ({
	code: "repositorio-invalido",
	path: [path],
	message
});
/**
* Gera o catálogo a partir dos arquivos, verificando tudo: cada versão é um template
* válido, está no caminho certo e consta do registro. Determinístico: os mesmos arquivos
* geram sempre o mesmo `index.json`.
*/
function buildIndex(state) {
	const problems = [];
	let index = emptyIndex((/* @__PURE__ */ new Date(0)).toISOString());
	let updatedAt = index.updatedAt;
	for (const [id, template] of state) {
		if (template.isFile) {
			problems.push(problem(`templates/${id}`, "Arquivo fora do padrão: cada sistema fica numa pasta"));
			continue;
		}
		if (!IdSchema.safeParse(id).success) {
			problems.push(problem(`templates/${id}`, "Pasta com id inválido"));
			continue;
		}
		for (const path of template.stray) problems.push(problem(path, "Arquivo fora do padrão"));
		const record = RecordSchema.safeParse(template.record);
		if (!record.success) {
			problems.push(problem(recordPath(id), "registro.json ausente ou inválido"));
			continue;
		}
		const recorded = Object.keys(record.data.versions);
		for (const version of recorded) if (!template.files.has(version)) problems.push(problem(recordPath(id), `A versão ${version} não tem arquivo`));
		const versions = [...template.files.keys()].sort(compareVersions);
		for (const version of versions) {
			const path = templatePath(id, version);
			const bytes = template.files.get(version);
			const published = record.data.versions[version];
			if (!published) {
				problems.push(problem(path, "Versão ausente do registro.json"));
				continue;
			}
			const parsed = parseTemplateFile(new TextDecoder().decode(bytes), {
				id,
				version
			});
			if (!parsed.ok) {
				for (const issue of parsed.error) problems.push({
					...issue,
					path: [path, ...issue.path]
				});
				continue;
			}
			index = addVersion(index, parsed.value, {
				sha256: sha256(bytes),
				size: bytes.byteLength,
				publishedAt: published.publishedAt,
				owner: record.data.owner
			});
			if (published.publishedAt > updatedAt) updatedAt = published.publishedAt;
		}
	}
	return problems.length > 0 ? {
		ok: false,
		error: problems
	} : {
		ok: true,
		value: {
			...index,
			updatedAt
		}
	};
}
//#endregion
//#region src/ingest.ts
var failure = (code, message) => ({
	ok: false,
	error: [{
		code,
		path: [],
		message
	}]
});
/**
* Transforma uma issue de publicação nos arquivos a incluir no repositório, com as
* mesmas regras que o app aplica ao instalar (e as de posse e versão do catálogo).
*/
async function ingest(input) {
	const form = parsePublishForm(input.body);
	const location = locateFile(form.file);
	if (!location) return failure("arquivo-ausente", "Não encontrei o arquivo do sistema. Arraste o arquivo `.json` exportado pelo app para o campo \"Arquivo do sistema\".");
	let text;
	if (location.kind === "texto") text = location.text;
	else try {
		text = await input.download(location.url, MAX_TEMPLATE_BYTES);
	} catch {
		return failure("download-falhou", "Não foi possível baixar o arquivo anexado.");
	}
	return publish(text, {
		...input,
		license: form.license,
		author: form.author
	});
}
/**
* Valida um sistema e gera os arquivos a incluir no repositório. Usado pela automação
* (issue de publicação) e pela moderação (`add`, para incluir um arquivo diretamente).
*/
function publish(text, input) {
	const index = buildIndex(input.repo);
	if (!index.ok) return failure("repositorio-invalido", "O repositório está inconsistente. Avise a moderação.");
	const prepared = prepareSubmission(text, {
		index: index.value,
		submitter: input.submitter,
		builtinIds: input.builtinIds,
		license: input.license,
		author: input.author
	});
	if (!prepared.ok) return prepared;
	const template = prepared.value;
	const existing = RecordSchema.safeParse(input.repo.get(template.id)?.record);
	const record = existing.success ? existing.data : {
		owner: input.submitter,
		versions: {}
	};
	record.versions[template.version] = { publishedAt: input.now };
	return {
		ok: true,
		value: {
			template,
			writes: [{
				path: templatePath(template.id, template.version),
				content: serializeTemplateFile(template)
			}, {
				path: recordPath(template.id),
				content: `${JSON.stringify(record, null, 2)}\n`
			}]
		}
	};
}
/** Comentário publicado na issue com o resultado da verificação. */
function report(result) {
	if (result.ok) {
		const { name, version } = result.value.template;
		return [
			`✅ **${name}** ${version} passou na verificação automática.`,
			"",
			"Um pedido de inclusão foi aberto. Depois da revisão, o sistema aparece em **Explorar comunidade**, dentro do app."
		].join("\n");
	}
	const lines = result.error.slice(0, 20).map((issue) => `- ${issue.path.length ? `\`${issue.path.join(".")}\`: ` : ""}${issue.message}`);
	if (result.error.length > 20) lines.push(`- … e mais ${result.error.length - 20} problema(s)`);
	return [
		"❌ O sistema não passou na verificação automática:",
		"",
		...lines,
		"",
		"Corrija e **edite esta issue** (anexando o arquivo novo) para verificar de novo."
	].join("\n");
}
//#endregion
//#region src/cli.ts
/**
* CLI usada pelos workflows do repositório da comunidade. Roda na raiz do repositório.
*
*   ingest <relatorio.md>   lê a issue do evento, grava os arquivos e escreve o relatório
*   index                   regenera o index.json
*   check                   verifica todos os arquivos (pedidos de inclusão feitos à mão)
*   add <arquivo> <dono>    moderação: inclui um sistema direto (sem issue), em nome de <dono>
*/
/**
* Baixa um anexo da issue. O endereço já foi conferido (`github.com/user-attachments`);
* o GitHub redireciona para o armazenamento dele. Anexos são limitados a 25 MB pelo GitHub.
*/
async function download(url, maxBytes) {
	const response = await fetch(url, { signal: AbortSignal.timeout(3e4) });
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	const bytes = new Uint8Array(await response.arrayBuffer());
	if (bytes.byteLength > maxBytes) throw new Error("Arquivo grande demais");
	return new TextDecoder().decode(bytes);
}
async function setOutputs(outputs) {
	const file = process.env.GITHUB_OUTPUT;
	const lines = Object.entries(outputs).map(([key, value]) => `${key}=${value}\n`);
	if (file) await appendFile(file, lines.join(""));
	else process.stdout.write(lines.join(""));
}
var printIssues = (issues) => {
	for (const issue of issues) console.error(`- ${issue.path.join(".")}: ${issue.message}`);
};
async function main() {
	const [command, arg] = process.argv.slice(2);
	const root = process.cwd();
	switch (command) {
		case "ingest": {
			const eventPath = process.env.GITHUB_EVENT_PATH;
			if (!eventPath || !arg) throw new Error("Uso: ingest <relatorio.md> (com GITHUB_EVENT_PATH)");
			const event = JSON.parse(await readFile(eventPath, "utf-8"));
			const result = await ingest({
				body: event.issue.body ?? "",
				submitter: event.issue.user.login,
				now: (/* @__PURE__ */ new Date()).toISOString(),
				repo: await readRepo(root),
				builtinIds: BUILTIN_TEMPLATES.map((template) => template.id),
				download
			});
			await writeFile(arg, report(result));
			if (result.ok) {
				await applyWrites(root, result.value.writes);
				const { id, version } = result.value.template;
				await setOutputs({
					ok: "true",
					id,
					version
				});
			} else {
				printIssues(result.error);
				await setOutputs({ ok: "false" });
			}
			return 0;
		}
		case "add": {
			const [, file, owner] = process.argv.slice(2);
			if (!file || !owner) throw new Error("Uso: add <arquivo.json> <usuário do GitHub>");
			const result = publish(await readFile(file, "utf-8"), {
				submitter: owner,
				now: (/* @__PURE__ */ new Date()).toISOString(),
				repo: await readRepo(root),
				builtinIds: BUILTIN_TEMPLATES.map((template) => template.id)
			});
			if (!result.ok) {
				printIssues(result.error);
				return 1;
			}
			await applyWrites(root, result.value.writes);
			const { id, version } = result.value.template;
			console.log(`${id} ${version} incluído. Rode "index" e faça o commit.`);
			return 0;
		}
		case "index":
		case "check": {
			const index = buildIndex(await readRepo(root));
			if (!index.ok) {
				console.error("Repositório com problemas:");
				printIssues(index.error);
				return 1;
			}
			if (command === "index") await writeFile("index.json", serializeIndex(index.value));
			console.log(`${index.value.templates.length} sistema(s) verificados.`);
			return 0;
		}
		default:
			console.error("Comandos: ingest <relatorio.md> | index | check | add <arquivo> <dono>");
			return 2;
	}
}
process.exitCode = await main();
//#endregion
export {};
