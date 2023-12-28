import { isFunction, isHTMLElement } from '@/is';

export type Container = string | HTMLElement | (() => HTMLElement);

export function getElement(container: Container | undefined | null) {
    let el = null;

    if (typeof container === 'string') {
        el = document.querySelector(container) as HTMLElement;
    } else if (isHTMLElement(container)) {
        el = container;
    } else if (isFunction(container)) {
        el = container() ?? null;
    }

    return el;
}
