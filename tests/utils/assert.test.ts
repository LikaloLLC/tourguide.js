import { assert } from '../../src/utils/assert';

describe('assert function', () => {
    it('should throw an error if condition is false', () => {
        try {
            assert(false, 'Test message');
        } catch (e) {
            expect(e).toEqual('TourguideJS: Test message');
        }
    });

    it('should return true if condition is true', () => {
        const result = assert(true, 'Test message');
        expect(result).toBeTruthy();
    });
});
