import { clone } from 'lodash-es';
import { isObject, isArray } from '@/is';
import { getElement, type Container } from './utils';

interface CanvasSize {
    width: number;
    height: number;
}

export type CanvasAttributes = Partial<CanvasRenderingContext2D & CanvasSize> & {
    lineGradient?: Array<{ value: number; color: string }>;
    rotate?: number;
};

export interface WatermarkOptions {
    title?: string | number;
    container?: Container; // 水印的容器，不传则内建一个 div
    wrapper?: Container; // 指定水印挂载的节点，默认 document.body
    canvasAttrs?: CanvasAttributes;
}

export type RenderOptions = Pick<WatermarkOptions, 'title' | 'canvasAttrs'> &
    Partial<{
        containerWidth: number;
        containerHeight: number;
        forceRender: boolean;
    }>;

const defaultCanvasAttrs: CanvasAttributes = {
    width: 240,
    height: 160,
    font: '15px Reggae One',
    fillStyle: 'rgba(0, 0, 0, 0.4)',
};

export default class Watermark {
    private readonly domSymbol = Symbol('watermark-dom');

    title = '';

    container: Element | null = null;

    wrapper = document.body;

    canvasAttrs = clone(defaultCanvasAttrs);

    // 备份初始化的配置项（用于 reset 重置）
    private _initCanvasAttrs: CanvasAttributes = {};

    constructor(options: WatermarkOptions) {
        const { title, container, wrapper, canvasAttrs } = options;
        if (title) this.title = String(title);

        const cont = getElement(container);
        if (cont) this.container = cont;

        const wrap = getElement(wrapper);
        if (wrap) this.wrapper = wrap;
        this.wrapper.style.position = 'relative';

        if (isObject(canvasAttrs)) {
            const initCanvasAttrs = Object.assign(this.canvasAttrs, canvasAttrs);
            this._initCanvasAttrs = clone(initCanvasAttrs);
        }
    }

    /** @description 创建 Canvas 并生成 Data URL */
    createDataURL() {
        const { width = 240, height = 160, ...restAttrs } = this.canvasAttrs;
        const canvas = document.createElement('canvas');
        Object.assign(canvas, { width, height });

        const ctx = canvas.getContext('2d');
        if (ctx) {
            const startPointX = width / 5;
            const startPointY = height / 2;
            const {
                font,
                fillStyle,
                globalAlpha = 0.7,
                rotate = 30,
                shadowBlur = 0,
                shadowColor = 'rgba(0, 0, 0, 0.7)',
                shadowOffsetX = 10,
                shadowOffsetY = 5,
                lineGradient,
            } = restAttrs;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.font = font as string;
            ctx.globalAlpha = globalAlpha;
            ctx.fillStyle = fillStyle as string;
            // 旋转
            if (rotate) {
                /** [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/rotate) */
                ctx.translate(-startPointX, startPointY);
                ctx.rotate((-rotate * Math.PI) / 180);
            }
            // 阴影（shadowBlur 不为 0，才会绘制）
            if (shadowBlur) {
                /** [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur) */
                ctx.shadowBlur = shadowBlur;
                ctx.shadowColor = shadowColor;
                ctx.shadowOffsetX = shadowOffsetX;
                ctx.shadowOffsetY = shadowOffsetY;
            }
            // 线性渐变
            if (isArray(lineGradient)) {
                /** [MDN Reference](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient) */
                const gradient = ctx.createLinearGradient(0, 0, width, 0);
                lineGradient.forEach(({ value, color }) => {
                    gradient.addColorStop(value, color);
                });
                ctx.fillStyle = gradient;
            }
            ctx.fillText(this.title, startPointX, startPointY);
        }
        return canvas.toDataURL('image/png');
    }

    render({
        title,
        containerWidth: width,
        containerHeight: height,
        canvasAttrs,
        forceRender = false,
    }: RenderOptions = {}) {
        if (this.container instanceof HTMLElement) {
            let isRender = forceRender;

            // container 宽高铺满 wrapper 挂载节点
            if (width) this.container.style.width = width + 'px';
            if (height) this.container.style.height = height + 'px';

            // 更新 title
            if (title) {
                // eslint-disable-next-line no-param-reassign
                title = String(title);
                if (title !== this.title) {
                    this.title = title;
                    isRender = true;
                }
            }

            // 更新 canvasAttrs
            if (isObject(canvasAttrs)) {
                Object.assign(this.canvasAttrs, canvasAttrs);
                isRender = true;
            }

            // 强制更新、新 title、新 canvasAttrs 三种情况下会渲染 canvas
            if (isRender) {
                // 将 Canvas 用做 container 的背景图
                const url = this.createDataURL();
                this.container.style.background = `url(${url}) left top repeat`;
            }
        }
    }

    set() {
        if (!(this.container instanceof HTMLElement)) {
            const div = document.createElement('div');
            div.id = this.domSymbol.toString();
            div.style.pointerEvents = 'none';
            div.style.top = '0px';
            div.style.left = '0px';
            div.style.position = 'absolute';
            div.style.zIndex = '100000';
            this.container = div;
        }

        this.render({
            containerWidth: this.wrapper.clientWidth,
            containerHeight: this.wrapper.clientHeight,
            forceRender: true,
        });

        this.wrapper.appendChild(this.container);
    }

    // 恢复成一开始实例化时的样子
    reset() {
        this.canvasAttrs = clone(this._initCanvasAttrs);
        this.render({ forceRender: true });
    }

    // clear 会删除水印，移除所有配置项并初始化成默认值
    clear() {
        if (this.container instanceof HTMLElement && this.wrapper.contains(this.container)) {
            this.wrapper.removeChild(this.container);
            this.container = null;
            this.wrapper = document.body;
            this.title = '';
            this.canvasAttrs = clone(defaultCanvasAttrs);
            this._initCanvasAttrs = {};
        }
    }
}
