// eslint-disable-next-line @typescript-eslint/unbound-method
const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => toString.call(val) === `[object ${type}]`;

export const isDef = (val: any) => typeof val !== 'undefined';

export const isUnDef = (val: any): val is undefined => !isDef(val);

export const isNull = (val: any): val is null => val === null;

export const isNullOrUnDef = (val: any) => isUnDef(val) || isNull(val);

export const isObject = (val: any): val is Record<string, any> => val !== null && is(val, 'Object');

export const isString = (val: any): val is string => is(val, 'String');

export function isNumber(val: any): val is number {
    return is(val, 'Number');
}

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

export const isFunction = (val: any) => typeof val === 'function';
