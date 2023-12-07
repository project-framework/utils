import { isNull } from '../index';

describe('isNull', () => {
    it('should return true if the value is null', () => {
        const result = isNull(null);
        expect(result).toBe(true);
    });

    it('should return false if the value is not null', () => {
        const result = isNull('some value');
        expect(result).toBe(false);
    });
});
