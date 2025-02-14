import Tour from '@types';
import { ContentDecorator } from '../../src/decorator/ContentDecorator';

describe('ContentDecorator', () => {
    const mockMatch = 'example';
    const mockDecoratorFn = (text: string, _matches: any[]) => text;
    let mockContext: Tour;

    beforeEach(() => {
        mockContext = {} as Tour;
    });

    it('should create a new instance of ContentDecorator', () => {
        const decorator = new ContentDecorator(mockMatch, mockDecoratorFn);
        expect(decorator).toBeInstanceOf(ContentDecorator);
    });

    it('should return true if match is not provided and no regex error occurs', () => {
        const text = 'This is a test string with an example.';
        const decorator = new ContentDecorator('', mockDecoratorFn);
        expect(decorator.test(text)).toBeTruthy();
    });

    it('should return false if match does not exist in the text', () => {
        const text = 'This is a test string without example.';
        const decorator = new ContentDecorator('username', mockDecoratorFn);
        expect(decorator.test(text)).toBeFalsy();
    });

    it('should return true if match exists in the text', () => {
        const text = 'This is a test {username} with an example.';
        const decorator = new ContentDecorator('username', mockDecoratorFn);
        expect(decorator.test(text)).toBeTruthy();
    });

    it('should render matches correctly', () => {
        const text = 'This is a test string with an example.';
        const decorator = new ContentDecorator('example', (text, _matches) => {
            return text.replace(/example/g, 'replaced');
        });
        expect(decorator.render(text, null, mockContext)).toBe('This is a test string with an replaced.');
    });
});
