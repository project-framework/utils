/**
 * @jest-environment jsdom
 */
import { searchParams } from '../index'

describe('searchParams', () => {
  test('should return an empty object when search is empty', () => {
    const result = searchParams('', 'key1', 'key2');
    expect(result).toEqual({});
  });

  test('should return an empty object when search does not contain any specified keys', () => {
    const result = searchParams('param1=value1&param2=value2', 'key1', 'key2');
    expect(result).toEqual({});
  });

  test('should return an object with values for specified keys when search contains those keys', () => {
    const result = searchParams('param1=value1&key1=value2&key2=value3', 'key1', 'key2');
    expect(result).toEqual({ key1: 'value2', key2: 'value3' });
  });

  test('should return undefined for keys that are not present in the search', () => {
    const result = searchParams('param1=value1&key1=value2', 'key1', 'key2');
    expect(result).toEqual({ key1: 'value2', key2: undefined });
  });

  // Add more test cases as needed
});
