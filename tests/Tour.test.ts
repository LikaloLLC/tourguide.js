import Tour, { defaultOptions } from '../src/Tour';

jest.mock("@types", () => ({
  CacheKeys: {
    "LastInitilized": "timestamp",
    "IsStarted": "started",
    "CurrentProgress": "progress"
  },
  Direction: {
    FORWARD: 0,
    BACKWARD: 1
  },
  TourStopState: {
    COMPLETE: 0,
    INCOMPLETE: 1,
    SKIPPED: 2
  },
  StepsSource: {
    DOM: 0,
    JSON: 1,
    REMOTE: 2
  }
}));

describe('Tour Constructor', () => {
  it('should initialize with default options when no input is provided', () => {
    const tour = new Tour();
    expect(tour.options).toEqual(defaultOptions);
  });

  it('should override default options when provided', () => {
    const customOptions = { root: document.body, selector: '.test-selector' };
    const tour = new Tour(customOptions as any);
    expect(tour.options.root).toEqual(document.body);
    expect(tour.options.selector).toEqual('.test-selector');
  });

  // Add more tests to cover different initialization scenarios
  it('should initialize with custom options when provided', () => {
    const customOptions = { root: document.body, selector: '.custom-selector' };
    const tour = new Tour(customOptions as any);
    expect(tour.options.root).toEqual(document.body);
    expect(tour.options.selector).toEqual('.custom-selector');
  });

  it('should initialize with default options and custom step when provided', () => {
    const customStep = [{ id: 'step1', content: 'Custom Step Content' }];
    const tour = new Tour({ steps: customStep as any });
    expect(tour.options.steps).toEqual(customStep);
  });

  it('should initialize with default options, custom root and selector when provided', () => {
    const customOptions = { root: document.body, selector: '.specific-selector' };
    const tour = new Tour(customOptions as any);
    expect(tour.options.root).toEqual(document.body);
    expect(tour.options.selector).toEqual('.specific-selector');
  });

  it('should initialize with default options, custom steps and root when provided', () => {
    const customSteps = [{ id: 'step1', content: 'Custom Step Content' }];
    const customOptions = { root: document.body, steps: customSteps };
    const tour = new Tour(customOptions as any);
    expect(tour.options.steps).toEqual(customSteps);
  });
});

describe('_initSteps', () => {
  it('should initialize steps correctly from provided data', () => {
    const tour = new Tour({ steps: [{ type: 'default' } as any] });
    expect(tour.steps.length).toBeGreaterThan(0);
  });
});

describe('start', () => {
  it('should start the tour from a specified step', () => {
    const tour = new Tour({ steps: [{ type: 'default' } as any, { type: 'default' } as any] });
    tour.start(1); // Assuming there are at least two steps
    expect((tour as any)._current).toBe(1);
  });
});

describe('navigation methods', () => {
  it('should navigate to the next step correctly', () => {
    const tour = new Tour({ steps: [{ type: 'default' } as any, { type: 'default' } as any] });
    tour.start();
    tour.next();
    expect((tour as any)._current).toBe(1);
  });

  it('should navigate to the previous step correctly', () => {
    const tour = new Tour({ steps: [{ type: 'default' } as any, { type: 'default' } as any] });
    tour.start(1);
    tour.previous();
    expect((tour as any)._current).toBe(0);
  });
});

describe('go', () => {
  it('should go to a specific step correctly', () => {
    const tour = new Tour({ steps: [{ type: 'default' } as any, { type: 'default' } as any] });
    tour.start();
    tour.go(1);
    expect((tour as any)._current).toBe(1);
  });
});

describe('stop and complete', () => {
  it('should stop the tour correctly', () => {
    const tour = new Tour({ steps: [{ type: 'default' } as any, { type: 'default' } as any] });
    tour.start();
    tour.stop();
    expect((tour as any)._active).toBeFalsy();
  });

  it('should complete the tour correctly', () => {
    const tour = new Tour({ steps: [{ type: 'default' } as any, { type: 'default' } as any] });
    tour.start();
    tour.complete();
    expect((tour as any)._complete).toBeTruthy();
  });
});

