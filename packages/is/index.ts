// eslint-disable-next-line @typescript-eslint/unbound-method
const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => toString.call(val) === `[object ${type}]`;

export const isDef = (val: any) => typeof val !== 'undefined';

export const isUnDef = (val: any): val is undefined => !isDef(val);

export const isNull = (val: any): val is null => val === null;

export const isNullOrUnDef = (val: any) => isUnDef(val) || isNull(val);

export const isString = (val: any): val is string => is(val, 'String');

export function isNumber(val: any): val is number {
    return is(val, 'Number');
}

export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean');
}

export const isObject = (val: any): val is Record<string, any> => val !== null && is(val, 'Object');

export const isArray = (val: any): val is any[] => Boolean(val) && Array.isArray(val);

export const isEmpty = (val: any) => {
    if (isNullOrUnDef(val)) return true;

    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }

    return false;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
    return typeof val === 'function';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isDate(val: unknown): val is Date {
    return is(val, 'Date');
}

export function isRegExp(val: unknown): val is RegExp {
    return is(val, 'RegExp');
}

export function isWindow(val: any): val is Window {
    return typeof window !== 'undefined' && is(val, 'Window');
}

export function isElement(val: unknown): val is Element {
    return isObject(val) && !!val.tagName;
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;
