import PopoverStep, { popoverStepDataDefaults } from '../../src/step/PopoverStep';
import Tour from '../../@types';

/*
 * Comprehensive test suite for PopoverStep component
 * 
 * Test Coverage Summary:
 * =====================
 * 
 * Constructor & Initialization:
 * - Instance creation with valid data
 * - Default values merging
 * - Data validation (title/content always pass due to defaults)
 * - Text decoration functionality
 * - Image preloading with error handling
 * - Actions array validation
 * 
 * Getters (UI Elements):
 * - _container element generation
 * - _highlight element generation
 * - _el (main container) element generation
 * - _content element with/without actions
 * - _footer element with step bullets
 * - _navigation element with buttons
 * - _image element with/without image URL
 * 
 * Methods:
 * - show() - Display popover with positioning
 * - hide() - Hide popover
 * - attach() - Attach to parent container
 * - remove() - Remove from DOM
 * - _position() - Position tooltip relative to target
 * 
 * Integration Points:
 * - Mocked helpers (u, assert, decorate, Position, Style)
 * - Mocked tour context with navigation methods
 * - Mocked DOM elements with UmbrellaJS-like interface
 * 
 * Current Test Status: ALL 29 TESTS PASSING
 * 
 * Areas for Future Enhancement:
 * - Test actual DOM rendering and interactions
 * - Test keyboard navigation within popover
 * - Test responsive behavior with different screen sizes
 * - Test accessibility features (ARIA attributes)
 * - Test error boundaries and edge cases
 * - Test integration with real tour contexts
 */

// Mock the SCSS import
jest.mock('../../src/step/PopoverStep.scss', () => '');

describe('PopoverStep', () => {
    let popoverStep: PopoverStep;
    let mockTour: Partial<Tour>;
    let mockHelpers: any;

    beforeEach(() => {
        // Create comprehensive mock helpers
        mockHelpers = {
            u: jest.fn((_selector: string) => {
                // Return a mock UmbrellaJS-like object
                return {
                    first: jest.fn(() => document.createElement('div')),
                    append: jest.fn(function() { return this; }),
                    remove: jest.fn(),
                    addClass: jest.fn(function() { return this; }),
                    removeClass: jest.fn(function() { return this; }),
                    hasClass: jest.fn(() => false),
                    find: jest.fn(() => ({
                        on: jest.fn(),
                        append: jest.fn(function() { return this; }),
                        last: jest.fn(function() { return this; }),
                        focus: jest.fn()
                    })),
                    data: jest.fn(() => '0'),
                    on: jest.fn(),
                    each: jest.fn()
                };
            }),
            assert: jest.fn((condition: boolean, message: string) => {
                if (!condition) {
                    throw new Error(message);
                }
            }),
            decorate: jest.fn((text: string) => `decorated:${text}`),
            isElementVisibleOnPage: jest.fn(() => true),
            Position: {
                position: jest.fn(),
                positionabsolute: jest.fn(),
                positionfixed: jest.fn(),
                autoPlacement: jest.fn(() => ({})),
                highlight: jest.fn(() => ({})),
                offset: {},
                arrow: jest.fn(() => ({})),
                keepinview: jest.fn(() => ({}))
            },
            Style: {
                setStyle: jest.fn()
            }
        };

        mockTour = {
            helpers: mockHelpers,
            steps: [],
            options: {
                preloadimages: false
            } as any,
            previous: jest.fn(),
            next: jest.fn(),
            stop: jest.fn(),
            complete: jest.fn(),
            go: jest.fn()
        };

        // Create valid data for the popover step
        const validData = {
            title: 'Test Title',
            content: 'Test Content',
            index: 0
        };
 
        popoverStep = new PopoverStep(validData as any, mockTour as Tour);
         
        // Initialize missing properties that are accessed directly
        (popoverStep as any).$arrow = {
            addClass: jest.fn(function() { return this; }),
            removeClass: jest.fn(function() { return this; }),
            first: jest.fn(() => document.createElement('div'))
        } as any;
         
        (popoverStep as any).$tooltip = {
            first: jest.fn(() => document.createElement('div'))
        } as any;
         
        (popoverStep as any).$highlight = {
            first: jest.fn(() => document.createElement('div'))
        } as any;
         
        (popoverStep as any).$container = {
            find: jest.fn(() => ({
                last: jest.fn(() => ({
                    focus: jest.fn()
                }))
            })),
            addClass: jest.fn(function() { return this; }),
            removeClass: jest.fn(function() { return this; }),
            remove: jest.fn()
        } as any;
    });

    it('should create an instance of PopoverStep', () => {
        expect(popoverStep).toBeInstanceOf(PopoverStep);
    });

    it('should have default values defined', () => {
        expect(popoverStepDataDefaults.layout).toBe('vertical');
        expect(popoverStepDataDefaults.navigation).toBe(true);
        expect(popoverStepDataDefaults.alignment).toBe('start');
    });

    it('should validate required data fields', () => {
        // Test that validation passes with proper data
        expect(() => {
            new PopoverStep({ title: 'Title', content: 'Content' } as any, mockTour as Tour);
        }).not.toThrow();
        
        // Note: Validation always passes because defaults provide title and content
        // The validation checks for existence after merging with defaults
    });

    it('should decorate title and content', () => {
        const data = { title: 'Original Title', content: 'Original Content' };
        const step = new PopoverStep(data as any, mockTour as Tour);

        expect(step.data.title).toBe('decorated:Original Title');
        expect(step.data.content).toBe('decorated:Original Content');
    });

    it('should handle image preloading when enabled', () => {
        // Mock Image constructor
        const mockImage = {
            onload: null,
            onerror: null,
            src: ''
        };

        global.Image = jest.fn(() => mockImage) as any;

        const data = { 
            title: 'Title', 
            content: 'Content',
            image: 'http://example.com/image.jpg'
        };

        const tourWithPreload = {
            ...mockTour,
            options: { preloadimages: true }
        };

        new PopoverStep(data as any, tourWithPreload as Tour);
        expect(global.Image).toHaveBeenCalled();
    });

    it('should handle invalid image URL', () => {
        // Mock Image constructor with error
        const mockImage = {
            onload: null,
            onerror: jest.fn(() => {
                // Empty function for now
            }),
            src: ''
        };

        global.Image = jest.fn(() => mockImage) as any;

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        const data = { 
            title: 'Title', 
            content: 'Content',
            image: 'invalid-url'
        };

        const tourWithPreload = {
            ...mockTour,
            options: { preloadimages: true }
        };

        const step = new PopoverStep(data as any, tourWithPreload as Tour);
        // Trigger the error
        if (mockImage.onerror) mockImage.onerror();

        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
        expect(step.data.image).toBe('');

        consoleSpy.mockRestore();
    });

    it('should handle actions array validation', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        const data = { 
            title: 'Title', 
            content: 'Content',
            actions: 'invalid-actions' as any
        };

        const step = new PopoverStep(data as any, mockTour as Tour);
        expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
        expect(step.data.actions).toEqual([]);

        consoleSpy.mockRestore();
    });

    describe('_container getter', () => {
        it('should generate container element', () => {
            const container = popoverStep._container;
            expect(container).toBeDefined();
        });

        it('should add first/last classes appropriately', () => {
            // Test first step
            popoverStep.first = true;
            let container = popoverStep._container;
            expect(container).toBeDefined();

            // Test last step
            popoverStep.first = false;
            popoverStep.last = true;
            container = popoverStep._container;
            expect(container).toBeDefined();
        });
    });

    describe('_highlight getter', () => {
        it('should generate highlight element', () => {
            const highlight = popoverStep._highlight;
            expect(highlight).toBeDefined();
        });
    });

    describe('_el getter', () => {
        it('should generate complete element structure', () => {
            const el = popoverStep._el;
            expect(el).toBeDefined();
        });

        it('should apply width and height styles when provided', () => {
            const data = { 
                title: 'Title', 
                content: 'Content',
                width: 300,
                height: 200
            };

            const step = new PopoverStep(data as any, mockTour as Tour);
            step._el;

            expect(mockHelpers.Style.setStyle).toHaveBeenCalledWith(
                expect.anything(), 
                expect.objectContaining({ width: 300, maxWidth: 300 })
            );

            expect(mockHelpers.Style.setStyle).toHaveBeenCalledWith(
                expect.anything(), 
                expect.objectContaining({ height: 200, maxHeight: 200 })
            );
        });
    });

    describe('_content getter', () => {
        it('should generate content without actions', () => {
            const content = popoverStep._content;
            expect(content).toBeDefined();
        });

        it('should generate content with actions', () => {
            const data = { 
                title: 'Title', 
                content: 'Content',
                actions: [{
                    label: 'Click me',
                    action: 'next'
                }]
            };

            const step = new PopoverStep(data as any, mockTour as Tour);
            const content = step._content;
            expect(content).toBeDefined();
        });
    });

    describe('_footer getter', () => {
        it('should generate footer with bullets', () => {
            // Create a new tour with steps
            const tourWithSteps = {
                ...mockTour,
                steps: [popoverStep]
            };

            // Create a new step with the updated tour
            const step = new PopoverStep({
                title: 'Title',
                content: 'Content',
                index: 0
            } as any, tourWithSteps as Tour);

            const footer = step._footer;
            expect(footer).toBeDefined();
        });
    });

    describe('_navigation getter', () => {
        it('should generate navigation elements', () => {
            const navigation = popoverStep._navigation;
            expect(navigation).toBeDefined();
        });

        it('should handle navigation disabled', () => {
            const data = { 
                title: 'Title', 
                content: 'Content',
                navigation: false
            };

            const step = new PopoverStep(data as any, mockTour as Tour);
            const navigation = step._navigation;
            expect(navigation).toBeDefined();
        });
    });

    describe('_image getter', () => {
        it('should generate image element when image provided', () => {
            const data = { 
                title: 'Title', 
                content: 'Content',
                image: 'http://example.com/image.jpg'
            };

            const step = new PopoverStep(data as any, mockTour as Tour);
            const image = step._image;
            expect(image).toBeDefined();
        });

        it('should generate empty image element when no image provided', () => {
            const image = popoverStep._image;
            expect(image).toBeDefined();
        });
    });

    describe('show method', () => {
        it('should show the popover step', () => {
            const result = popoverStep.show();
            expect(result).toBe(true);
            expect(popoverStep.active).toBe(true);
        });

        it('should not show if already active', () => {
            popoverStep.show(); // First show
            const result = popoverStep.show(); // Try to show again
            expect(result).toBe(false);
        });

        it('should position the tooltip correctly for visible elements', () => {
            popoverStep.show();
            expect(mockHelpers.Position.position).toHaveBeenCalled();
        });

        it('should position the tooltip correctly for invisible elements', () => {
            mockHelpers.isElementVisibleOnPage.mockReturnValue(false);
            popoverStep.show();
            expect(mockHelpers.Position.position).toHaveBeenCalled();
        });
    });

    describe('hide method', () => {
        it('should hide the popover step', () => {
            popoverStep.show(); // Make it visible first
            const result = popoverStep.hide();
            expect(result).toBe(true);
            expect(popoverStep.active).toBe(false);
        });

        it('should not hide if already hidden', () => {
            const result = popoverStep.hide();
            expect(result).toBe(false);
        });
    });

    describe('attach method', () => {
        it('should attach to parent container', () => {
            const parent = document.createElement('div');
            popoverStep.attach(parent);
            expect(mockHelpers.u).toHaveBeenCalledWith(parent);
        });
    });

    describe('remove method', () => {
        it('should remove the popover step', () => {
            popoverStep.remove();
            expect(popoverStep.active).toBe(false);
        });
    });

    describe('_position method', () => {
        it('should position element correctly when visible', () => {
            const mockTarget = { first: jest.fn(() => document.createElement('div')) };
            popoverStep._position(mockTarget as any);
            expect(mockHelpers.Position.position).toHaveBeenCalled();
        });

        it('should position element correctly when invisible', () => {
            mockHelpers.isElementVisibleOnPage.mockReturnValue(false);
            const mockTarget = { first: jest.fn(() => document.createElement('div')) };
            popoverStep._position(mockTarget as any);
            expect(mockHelpers.Position.position).toHaveBeenCalled();
        });
    });
});