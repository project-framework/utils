import { jsonParser } from '../index';

describe('jsonParser', () => {
    it('should parse valid JSON string', () => {
        const jsonString = '{"name":"John","age":30,"city":"New York"}';
        const parsedObject = jsonParser(jsonString);
        expect(parsedObject).toEqual({ name: 'John', age: 30, city: 'New York' });
    });

    it('should handle reviver function', () => {
        const jsonString = '{"name":"John","age":30,"city":"New York"}';
        const reviver = (key: string, value: any) => {
            if (key === 'age') {
                return value + 10;
            }
            return value;
        };
        const parsedObject = jsonParser(jsonString, reviver);
        expect(parsedObject).toEqual({ name: 'John', age: 40, city: 'New York' });
    });

    it('should return null for invalid JSON string', () => {
        const invalidJsonString = '{name:"John",age:30,city:"New York"}';
        const parsedObject = jsonParser(invalidJsonString);
        expect(parsedObject).toBeNull();
    });

    it('should return null for non-string input', () => {
        const nonStringInput = 123;
        const parsedObject = jsonParser(nonStringInput as unknown as string);
        expect(parsedObject).toBeNull();
    });
});
