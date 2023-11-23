/* eslint-disable max-len */
import { searchParams } from '../index';

describe('searchParams', () => {
    test('should return an object with null for specified keys when search is empty', () => {
        const result = searchParams('', 'key1', 'key2');
        expect(result).toEqual({ key1: null, key2: null });
    });

    test('should return an object with null for specified keys when search does not contain any specified keys', () => {
        const result = searchParams('param1=value1&param2=value2', 'key1', 'key2');
        expect(result).toEqual({ key1: null, key2: null });
    });

    test('should return an object with values for specified keys when search contains those keys', () => {
        const result = searchParams('param1=value1&key1=value2&key2=value3', 'key1', 'key2');
        expect(result).toEqual({ key1: 'value2', key2: 'value3' });
    });

    test('should return null for keys that are not present in the search', () => {
        const result = searchParams('param1=value1&key1=value2', 'key1', 'key2');
        expect(result).toEqual({ key1: 'value2', key2: null });
    });

    // Add more test cases as needed
});
