/* eslint-disable max-len */
import { decimalCompute } from '../decimal';

describe('decimalCompute', () => {
    test('should correctly decimalCompute addition', () => {
        const result = decimalCompute('+', 0.1, 0.2).result;
        expect(result).toBe(0.3);
    });

    test('should correctly decimalCompute subtraction', () => {
        const result = decimalCompute('-', 0.3, 0.1).result;
        expect(result).toBe(0.2);
    });

    test('should correctly decimalCompute multiplication', () => {
        const result = decimalCompute('*', 0.123, 0.3).result;
        expect(result).toBe(0.0369);
    });

    test('should correctly decimalCompute division', () => {
        const result = decimalCompute('/', 0.3, 10000).result;
        expect(result).toBe(0.00003);
    });

    test('should correctly chain computations', () => {
        const result = decimalCompute('+', 0.1, 0.2).next('*', 0.12).result;
        expect(result).toBe(0.036);
    });
});
