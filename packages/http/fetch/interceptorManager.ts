/** 拦截器的实现 */
type ResolvedFn<T = any> = (val: T) => T | Promise<T>;

type RejectedFn = (error: any) => any;

export interface Interceptor<T> {
    resolved: ResolvedFn<T>;
    rejected?: RejectedFn;
}

export default class InterceptorManager<T> {
    private stack: Array<Interceptor<T> | null>;

    constructor() {
        // 拦截器数组栈
        this.stack = [];
    }

    /**
     * @description 收集拦截器
     * @return { number } 用栈最后一个 index 表示当前执行的拦截器的 ID
     */
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
        this.stack.push({
            resolved,
            rejected,
        });

        // 返回一个 ID，可用于删除拦截器
        return this.stack.length - 1;
    }

    /** @desctiption 遍历拦截器（可以跳过已被 eject 删除的拦截器） */
    forEach(fn: (interceptor: Interceptor<T>) => void): void {
        this.stack.forEach(interceptor => {
            if (interceptor !== null) {
                fn(interceptor);
            }
        });
    }

    /**
     * @description 删除拦截器
     * @param { number } id use 返回的 id
     */
    eject(id: number): void {
        if (this.stack[id]) {
            // 置为null，不能直接删除
            this.stack[id] = null;
        }
    }
}
