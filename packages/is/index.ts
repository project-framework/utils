const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => {
    return toString.call(val) === `[object ${type}]`;
};

export const isDef = (val: any) => {
    return typeof val !== 'undefined';
};

export const isUnDef = (val: any) => {
    return !isDef(val);
};

export const isNull = (val: any) => {
    return val === null;
};

export const isNullOrUnDef = (val: any) => {
    return isUnDef(val) || isNull(val);
};

export const isObject = (val: any) => {
    return val !== null && is(val, 'Object');
};

export const isString = (val: any) => {
    return is(val, 'String');
};

export function isNumber(val: any) {
    return is(val, 'Number');
}

export const isArray = (val: any) => {
    return val && Array.isArray(val);
};

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

export const isFunction = (val: any) => {
    return typeof val === 'function';
};
