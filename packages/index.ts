export { default as NProgress } from './progress';

export { default as FetchHttp } from './http';
export type { Interceptor, FetchRequestConfig, FetchReadMethod } from './http';

export {
    is,
    isDef,
    isUnDef,
    isNull,
    isNullOrUnDef,
    isObject,
    isString,
    isNumber,
    isArray,
    isEmpty,
    isFunction,
    isBoolean,
    isPromise,
    isDate,
    isRegExp,
    isWindow,
    isElement,
    isServer,
    isClient,
} from './is';

export { jsonParser } from './json';

export { searchParams, concatParams } from './location';

export { getBrowser } from './browser';
export type { BrowserInfo, BrowserEnums } from './browser';

export { downloadByUrl } from './download';

export { findLatestNode, collectLatestNodes, filterNodes, getNodesByProp } from './dataHandler';

export { decimalCompute } from './math';
export type { ComputeType, DecimalCompute } from './math';

export { handleUnknownError, HttpError } from './error';
export type { HttpErrorProps } from './error';

export { openLink } from './link';
export type { Target } from './link';

export { storageSession, storageLocal } from './storage';

export { buildUUID, buildShortUUID } from './uuid';

export { default as Watermark } from './watermark';
export type { CanvasAttributes, WatermarkOptions, RenderOptions } from './watermark';
