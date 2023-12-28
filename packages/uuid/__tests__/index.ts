import { buildUUID, buildShortUUID } from '../index';

describe('buildUUID', () => {
    it('should return a valid UUID', () => {
        const uuid = buildUUID();
        const regex = /^[0-9a-f]{8}[0-9a-f]{4}4[0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/i;
        expect(uuid).toMatch(regex);
    });

    it('should return a different UUID on each call', () => {
        const uuid1 = buildUUID();
        const uuid2 = buildUUID();
        expect(uuid1).not.toBe(uuid2);
    });
});

describe('buildShortUUID', () => {
    it('should return a string with the correct format', () => {
        const uuid = buildShortUUID();
        const regex = /^_[0-9]{9}[0-9]{1}[0-9]{13}$/;
        expect(uuid).toMatch(regex);
    });

    it('should return a string with the correct prefix', () => {
        const prefix = 'TEST';
        const uuid = buildShortUUID(prefix);
        expect(uuid.startsWith(prefix)).toBe(true);
    });

    it('should return different strings on each call', () => {
        const uuid1 = buildShortUUID();
        const uuid2 = buildShortUUID();
        expect(uuid1).not.toBe(uuid2);
    });
});
