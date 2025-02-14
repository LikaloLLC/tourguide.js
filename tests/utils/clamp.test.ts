import { clamp } from '../../src/utils/clamp';

describe('clamp', () => {
    it('should return the value within the bounds when min and max are defined', () => {
        expect(clamp(5, 1, 10)).toBe(5);
        expect(clamp(0, -1, 1)).toBe(0);
        expect(clamp(-5, -10, -1)).toBe(-5);
    });

    it('should return the min value when the input is less than both bounds', () => {
        expect(clamp(-10, -20, -5)).toBe(-10);
    });

    it('should return the max value when the input is greater than both bounds', () => {
        expect(clamp(20, 15, 30)).toBe(20);
    });

    it('should default to the input value if min and max are not defined', () => {
        expect(clamp(15)).toBe(15);
    });
});
