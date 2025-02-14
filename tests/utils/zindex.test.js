import { getMaxZIndex } from '../../src/utils/zindex';

describe('getMaxZIndex', () => {
    it('should return the maximum z-index value of all elements on the page', () => {
        // Mock the document and window objects to simulate DOM and window environment
        global.document = {
            querySelectorAll: jest.fn(() => [
                { style: { getComputedStyle: jest.fn(() => ({ zIndex: '100' })) }, nodeType: 1 },
                { style: { getComputedStyle: jest.fn(() => ({ zIndex: '50' })) }, nodeType: 1 },
            ]),
        };
        global.window = { parseFloat: jest.fn((value) => parseFloat(value)) };

        expect(getMaxZIndex()).toBe(100);
    });
});
