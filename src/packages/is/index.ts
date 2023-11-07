const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => {
    return toString.call(val) === `[object ${type}]`;
};

export const isDef = val => {
    return typeof val !== 'undefined';
};

export const isUnDef = val => {
    return !isDef(val);
};

export const isNull = val => {
    return val === null;
};

export const isNullOrUnDef = val => {
    return isUnDef(val) || isNull(val);
};

export const isObject = val => {
    return val !== null && is(val, 'Object');
};

export const isString = val => {
    return is(val, 'String');
};

export function isNumber(val) {
    return is(val, 'Number');
}

export const isArray = val => {
    return val && Array.isArray(val);
};

export const isEmpty = val => {
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }

    if (isNullOrUnDef) return true;

    return false;
};

export const isFunction = val => {
    return typeof val === 'function';
};
