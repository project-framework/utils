// 解析 JSON
export function jsonParser(text: string, reviver?: (this: any, key: string, value: any) => any) {
    if (typeof text === 'string') {
        try {
            return JSON.parse(text, reviver);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`${text} is not a JSON`);
            return null;
        }
    }
    return null;
}
