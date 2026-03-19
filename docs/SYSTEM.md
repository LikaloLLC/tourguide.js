# Tourguide.js System Documentation

## Overview

Tourguide.js is a JavaScript library for creating guided tours of web applications. It provides a flexible framework for displaying step-by-step walkthroughs that highlight UI elements and provide contextual help to users. The library is written in TypeScript and supports multiple build formats (IIFE, ESM, UMD, CommonJS).

**Primary Use Cases:**
- Onboarding new users to web applications
- Demonstrating new features
- Providing contextual help within complex UIs
- Creating interactive documentation

## Architecture

### Core Concepts

Tourguide.js follows a component-based architecture with the following key abstractions:

| Concept | Description |
|---------|-------------|
| `Tour` | The main controller class that manages the tour lifecycle, step navigation, and event handling |
| `Step` | An abstract base class representing a single step in the tour; defines the interface for all step types |
| `ActionHandler` | A function that handles custom actions triggered by user interaction in step footers |
| `ContentDecorator` | A function that transforms content text with custom placeholders (e.g., dynamic values, styling) |
| `CacheManager` | An abstraction for persisting tour state (progress, completion status) across sessions |

### Directory Structure

```
tourguide.js/
├── src/                      # Source code
│   ├── Tour.ts              # Main Tour class (entry point)
│   ├── abstracts/           # Abstract base classes
│   │   ├── Step.ts          # Abstract Step class
│   │   ├── CacheManager.ts  # Abstract CacheManager class
│   │   └── index.ts
│   ├── step/                # Concrete step implementations
│   │   ├── PopoverStep.ts   # Step with popover positioned relative to target element
│   │   ├── CardStep.ts      # Step with card positioned independently of target
│   │   └── PopoverStep.scss # CSS styles for PopoverStep
│   ├── handler/             # Action handler factory
│   │   └── ActionHandler.ts
│   ├── decorator/           # Content decorator implementations
│   │   ├── ContentDecorator.ts
│   │   └── MarkdownDecorator.ts
│   ├── cachemanager/        # Cache manager implementations
│   │   └── InMemoryCacheManager.ts
│   ├── utils/               # Utility functions
│   │   ├── index.ts
│   │   ├── assert.ts
│   │   ├── clamp.ts
│   │   ├── color.ts
│   │   ├── dom.ts
│   │   ├── guid.ts
│   │   ├── position.ts      # Positioning logic using Floating UI
│   │   ├── scroll.ts
│   │   ├── style.ts
│   │   └── zindex.ts
│   └── lib/                 # Third-party library code
│       └── snarkdown.ts     # Markdown parser (fork)
├── @types/                  # TypeScript type definitions
│   ├── index.d.ts
│   ├── Tour.d.ts
│   ├── Step.d.ts
│   ├── ActionHandler.d.ts
│   ├── CacheManager.d.ts
│   ├── ContentDecorator.d.ts
│   ├── Helpers.d.ts
│   ├── Element.d.ts
│   └── scss.d.ts
├── docs/                    # Documentation
│   ├── README.md
│   ├── generate-docs.js
│   └── SYSTEM.md           # This file
└── tests/                   # Test files
    ├── Tour.test.ts
    ├── cachemanager/
    ├── decorator/
    ├── handler/
    ├── step/
    └── utils/
```

## Core Components

### 1. The Tour Class

**File:** `src/Tour.ts`

The `Tour` class is the central controller that manages the entire tour lifecycle.

#### Key Responsibilities:
- Initialize and configure the tour
- Load steps from various sources (DOM attributes, JSON, remote URL)
- Manage step navigation (next, previous, go to specific step)
- Handle events and callbacks
- Apply styling and theming
- Manage caching of tour state

#### Constructor Options

```typescript
interface TourOptions {
  identifier: string;              // Unique ID for the tour (used in caching)
  root?: HTMLElement | string;     // Root element for the tour (default: document)
  selector?: string;               // CSS selector for DOM-based steps
  selectorSteps?: Array<string>;   // Array of selectors (alternative to single selector)
  steps?: Array<StepData>;         // Inline step definitions (JSON format)
  src?: string;                    // URL to fetch step definitions from
  request?: RequestInit;           // Fetch options for remote step loading
  restoreinitialposition?: boolean; // Restore scroll position on tour stop
  preloadimages?: boolean;         // Preload images in steps
  resumeOnLoad?: boolean;          // Resume from last saved position
  keyboardNavigation?: KeyboardNavigationOptions; // Keyboard shortcuts
  stepFactory?: Array<StepClass>;  // Custom step types
  actionHandlers?: Array<ActionHandler>; // Custom action handlers
  contentDecorators?: Array<ContentDecorator>; // Content transformation functions
  cacheManagerFactory?: CacheManagerClass; // Custom cache implementation
  style?: TourStyle;               // Custom CSS variables
}
```

#### Key Methods:

| Method | Description |
|--------|-------------|
| `start(step?: number)` | Start the tour from a specific step (default: first step) |
| `stop()` | Stop the tour and cleanup |
| `next()` | Advance to the next step |
| `previous()` | Go back to the previous step |
| `go(stepNumber)` | Go to a specific step number |
| `complete()` | Mark tour as complete |
| `reset()` | Reset tour state |
| `add/removeEventListener(type, listener)` | Register event handlers |

#### Events:

| Event | Description |
|-------|-------------|
| `start` | Fires when tour starts |
| `stop` | Fires when tour stops |
| `complete` | Fires when tour completes |
| `step` | Fires when a step is activated |
| `action` | Fires when an action button is clicked |

#### Internal State:

| Property | Description |
|----------|-------------|
| `_options` | Merged options object |
| `_steps` | Array of Step instances |
| `_current` | Index of current step |
| `_active` | Whether tour is currently running |
| `_ready` | Whether tour is initialized |
| `_complete` | Whether tour was completed |
| `_containerElement` | Main container DOM element |
| `_shadowRoot` | Shadow DOM root (if used) |
| `_cacheManager` | Instance of CacheManager |
| `_helpers` | Helper utilities object |

### 2. Step Classes

**Files:** `src/abstracts/Step.ts`, `src/step/PopoverStep.ts`, `src/step/CardStep.ts`

#### Abstract Step Class

The `Step` class defines the interface that all step types must implement.

```typescript
abstract class Step<StepDataType> {
  readonly uid: string;        // Unique ID
  context: Tour;              // Reference to parent Tour
  index: number;              // Step index in tour
  active: boolean;            // Whether step is visible
  first: boolean;             // Whether this is the first step
  last: boolean;              // Whether this is the last step
  data: StepDataType;         // Step configuration data

  abstract attach(parent: Element): void;
  abstract remove(): void;
  show(): void;
  hide(): void;
}
```

#### StepData Interface

```typescript
interface StepData {
  type?: string;                // Step type (e.g., "card", "popover")
  index: number;                // Step position
  selector?: string | null;     // CSS selector for target element
  actions: Array<TourAction>;   // Action buttons for this step
}
```

#### PopoverStep

**File:** `src/step/PopoverStep.ts`

A step that displays a tooltip/popover positioned near a target DOM element using Floating UI.

**Key Features:**
- Positions relative to a target element (via CSS selector)
- Supports images, title, and content
- Customizable layout (horizontal/vertical)
- Navigation controls (prev/next/complete/close buttons)
- Dynamic positioning with auto-placement

**Step Data Properties:**
```typescript
interface PopoverStepData extends StepData {
  image: string;           // URL for optional image
  width?: number;          // Custom width
  height?: number;         // Custom height
  title: string;           // Step title (required)
  content: string;         // Step content (required)
  layout: "horizontal" | "vertical";  // Layout orientation
  alignment: "start" | "end";         // Text alignment
  navigation: boolean;     // Show navigation controls
  actions: TourAction[];   // Custom actions
}
```

#### CardStep

**File:** `src/step/CardStep.ts`

A step that displays a card positioned independently of any target element (typically centered on screen).

**Key Features:**
- Positioned relative to viewport (not a target element)
- Useful for welcome/summary steps
- Uses `CardStep.Type` = "card" for identification

### 3. Action Handlers

**File:** `src/handler/ActionHandler.ts`

Action handlers allow custom behavior when action buttons in step footers are clicked.

#### Action Interface

```typescript
interface TourAction {
  label: string;      // Button label text
  action: string;     // Action type (e.g., "next", "custom-action")
  primary?: boolean;  // Style as primary button
  href?: string;      // For link buttons
  attributes?: Record<string, string>; // Additional HTML attributes
}
```

#### Built-in Action Types:

| Action | Description |
|--------|-------------|
| `next` | Advance to next step |
| `previous` | Go to previous step |
| `stop` | Stop the tour |
| `complete` | Mark tour as complete |

#### Creating Custom Handlers

```typescript
import ActionHandler from "./handler/ActionHandler";

const customHandler = ActionHandler("my-action", (event, action, context) => {
  // Handle custom action
  // event: Click event
  // action: Action object
  // context: Tour instance
});

// Pass to Tour constructor
const tour = new Tour({
  actionHandlers: [customHandler],
  steps: [{
    actions: [{
      label: "Do Something",
      action: "my-action"
    }]
  }]
});
```

### 4. Content Decorators

**File:** `src/decorator/ContentDecorator.ts`

Content decorators transform text content by replacing placeholder patterns with dynamic content.

#### Usage Pattern

Placeholders are defined in the format `{name,property1,property2,...}`:

```json
{
  "title": "Hi {username},",
  "content": "Your {fontsize,16,name} has been {fontsize,20,updated}."
}
```

#### ContentDecorator Class

```typescript
class ContentDecorator {
  constructor(match: string | RegExp, decoratorFn: DecoratorFn);
  
  test(text: string): boolean;      // Check if text contains matches
  render(text: string, step, context): string;  // Apply transformation
}
```

#### Decorator Function Signature

```typescript
type DecoratorFn = (
  text: string,           // Full original text
  matches: Match[],       // Array of match information
  step: Step,             // Current step instance
  context: Tour           // Tour instance
) => string;              // Transformed text

interface Match {
  match: string;          // Full matched string
  start: number;          // Position in text
  length: number;         // Length of match
  properties: string[];   // Comma-separated properties
}
```

#### Built-in MarkdownDecorator

**File:** `src/decorator/MarkdownDecorator.ts`

Applies markdown parsing to step content using the embedded snarkdown parser.

```typescript
const tour = new Tour({
  contentDecorators: [MarkdownDecorator]
});
```

#### Markdown Parser

**File:** `src/lib/snarkdown.ts`

A lightweight markdown-to-HTML parser forked from snarkdown. Handles:
- Headers (`#`, `##`)
- Bold/italic text (`**`, `*`, `_`)
- Strikethrough (`~~`)
- Links and images
- Lists (`-`, `1.`)
- Blockquotes (`>`)
- Code blocks and inline code
- Horizontal rules (`---`)

#### Example: Username Decorator

```typescript
const usernameDecorator = new ContentDecorator(
  "username",
  (text, matches, step, context) => {
    let result = text;
    matches.forEach(match => {
      result = result.substring(0, match.start) +
               "John Doe" +
               result.substring(match.start + match.length);
    });
    return result;
  }
);
```

#### Example: Font Size Decorator

```typescript
const fontSizeDecorator = new ContentDecorator(
  "fontsize",
  (text, matches, step, context) => {
    let result = text;
    matches.forEach(match => {
      const size = match.properties[0];  // e.g., "16"
      const content = match.properties[1];  // e.g., "button"
      result = result.substring(0, match.start) +
               `<span style="font-size:${size}px">${content}</span>` +
               result.substring(match.start + match.length);
    });
    return result;
  }
);
```

### 5. Cache Manager

**File:** `src/abstracts/CacheManager.ts`, `src/cachemanager/InMemoryCacheManager.ts`

The cache manager stores tour state to enable resume functionality.

#### CacheManager Interface

```typescript
interface CacheManager {
  identifier: string;     // Identifier for this cache
  get<T>(key: string): T;
  set(key: string, value: any): void;
  clear(key: string): void;
}
```

#### Cache Keys

```typescript
enum CacheKeys {
  "LastInitilized" = "timestamp",
  "IsStarted" = "started",
  "CurrentProgress" = "progress"
}
```

#### Built-in Implementation: MemoryCacheManager

**File:** `src/cachemanager/InMemoryCacheManager.ts`

Simple in-memory cache using a JavaScript object.

#### Custom Cache Manager

To implement persistent caching (e.g., localStorage):

```typescript
import { AbstractCacheManager } from "./abstracts/CacheManager";

class LocalStorageCacheManager extends AbstractCacheManager {
  private _storage: Storage = localStorage;

  get<T>(key: string): T | undefined {
    const value = this._storage.getItem(`${this.identifier}-${key}`);
    return value ? JSON.parse(value) : undefined;
  }

  set(key: string, value: any): void {
    this._storage.setItem(
      `${this.identifier}-${key}`,
      JSON.stringify(value)
    );
  }

  clear(key: string): void {
    this._storage.removeItem(`${this.identifier}-${key}`);
  }
}

// Use with Tour
const tour = new Tour({
  identifier: "my-tour",
  resumeOnLoad: true,
  cacheManagerFactory: LocalStorageCacheManager
});
```

### 6. Utility Functions

**File:** `src/utils/`

#### Position Utility

**File:** `src/utils/position.ts`

Wraps the `@floating-ui/dom` library with custom positioning middleware.

**Key Functions:**
- `position(reference, tooltip, middleware)` - Compute and apply position
- `positionfixed()` - Fixed positioning middleware
- `positionabsolute()` - Absolute positioning middleware
- `autoPlacement()` - Auto-placement middleware
- `offset()` - Offset adjustment middleware
- `highlight()` - Element highlighting middleware
- `arrow()` - Arrow positioning middleware
- `keepinview()` - Viewport constraint middleware

#### DOM Utility

**File:** `src/utils/dom.ts`

```typescript
function getDataContents<T>(data: string, defaults: Record<string, string> = {}): T
// Parse data-tour attributes from DOM elements

function isElementVisibleOnPage(element: HTMLElement | undefined): boolean
// Check if element is visible in viewport
```

#### Assert Utility

**File:** `src/utils/assert.ts`

```typescript
function assert(condition: any, message: string): boolean
// Throw error if condition is false
```

#### Other Utilities

| Function | Purpose |
|----------|---------|
| `clamp(value, min, max?)` | Constrain value between min/max |
| `Color` module | Color manipulation utilities |
| `Style` module | CSS style utilities |
| `Scroll` module | Scroll position utilities |
| `zindex` module | Z-index management |
| `guid()` | Generate unique identifiers |

## Step Loading Mechanisms

### 1. DOM-Based Steps

Steps are defined directly on DOM elements using `data-tour` attributes:

```html
<button 
  data-tour="step: 1; title: Welcome; content: Click to get started"
  aria-label="Start"
>
  Get Started
</button>
```

The `Tour` class automatically detects and reads step data from the DOM when no `steps` or `src` option is provided.

### 2. JSON-Based Steps

Steps are defined inline as JSON:

```javascript
const steps = [
  {
    step: 1,
    selector: null,
    title: "Welcome to the App",
    content: "Let me show you around.",
    image: "/images/hero.png"
  },
  {
    step: 2,
    selector: "#dashboard-btn",
    title: "Dashboard",
    content: "This is your main dashboard."
  }
];

const tour = new Tour({ steps: steps });
```

### 3. Remote URL Steps

Steps are loaded from a remote JSON file:

```javascript
const tour = new Tour({
  src: "https://example.com/tours/onboarding.json",
  request: {
    mode: 'cors',
    cache: 'no-cache'
  }
});
```

The JSON response format matches the inline steps format.

## Step Factory

The `stepFactory` option allows custom step implementations:

```typescript
const tour = new Tour({
  stepFactory: [MyCustomStep]
});

class MyCustomStep extends Step<CustomStepData> {
  static Type = "custom";
  static Style = CustomStepStyles;
  
  attach(parent: Element) { /* ... */ }
  remove() { /* ... */ }
}
```

When a step's `type` property matches a factory's `Type`, the custom step class is instantiated.

## Styling

Tourguide.js uses CSS custom properties (variables) for styling, allowing easy theming.

### Default Style Variables

```typescript
interface TourStyle {
  fontFamily?: string;
  fontSize?: string;
  tooltipWidth?: string;
  stepCardRadius?: string;
  
  overlayColor?: string;           // Background overlay
  textColor?: string;              // Primary text color
  mutedTextColor?: string;         // Secondary text color
  accentColor?: string;            // Accent color
  
  borderColor?: string;            // Border color
  focusColor?: string;             // Focus ring color
  bulletColor?: string;            // Unvisited bullet
  bulletVisitedColor?: string;     // Visited bullet
  bulletCurrentColor?: string;     // Current bullet
  stepButtonCloseColor?: string;
  stepButtonPrevColor?: string;
  stepButtonNextColor?: string;
  stepButtonCompleteColor?: string;
  stepFooterColor?: string;
  stepCardPadding?: string;
  backgroundColor?: string;
}
```

### Customizing Styles

```javascript
const tour = new Tour({
  style: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    accentColor: "#4A90E2",
    overlayColor: "rgba(0, 0, 0, 0.7)"
  }
});
```

## Testing

**Test Framework:** Jest

**Test Files:**
- `tests/Tour.test.ts` - Core Tour functionality tests
- `tests/` subdirectories - Module-specific tests

**Running Tests:**
```bash
npm test
```

**Configuration:** `jest.config.js` uses ts-jest for TypeScript support.

## Build System

**Build Tool:** Rollup

**Configuration:** `rollup.config.js`

**Output Formats:**
1. IIFE (`tourguide.js`) - Browser global (Tourguide)
2. UMD (`tourguide.umd.js`) - Universal module definition
3. ESM (`tourguide.esm.js`) - ES modules
4. Minified CommonJS (`tourguide.min.js`)

**Build Commands:**
```bash
npm run build      # Build all formats
npm run devw       # Watch mode for development
npm run lint       # ESLint
npm run tsdoc      # Generate documentation
```

**Dependencies:**
- `@floating-ui/dom` - Positioning engine
- `umbrellajs` - DOM manipulation utility

**Transformations:**
- Babel for ES6+ to ES5 transpilation
- TypeScript compilation
- SCSS compilation
- Minification with Terser

## Integration with React/Angular/Vue

Tourguide.js can be integrated with framework wrappers or used directly:

```javascript
// React example
import { useEffect, useRef } from "react";
import Tourguide from "tourguidejs";

function MyComponent() {
  const tourRef = useRef(null);
  
  useEffect(() => {
    tourRef.current = new Tourguide({
      steps: [
        { title: "Step 1", content: "Content" }
      ]
    });
    
    return () => {
      if (tourRef.current) tourRef.current.remove();
    };
  }, []);
  
  return <button onClick={() => tourRef.current?.start()}>Start Tour</button>;
}
```

## Event Flow

### Tour Lifecycle

1. **Construction** - Tour instance created, options merged with defaults
2. **Initialization** - Steps loaded and instantiated
3. **Start** - Tour begins, first step displayed
4. **Navigation** - User advances through steps
5. **Stop/Complete** - Tour ends, cleanup performed

### Step Lifecycle

1. **Creation** - Step instantiated with data
2. **Attachment** - Step DOM elements created and appended
3. **Activation** - Step shown with positioning applied
4. **Interaction** - User clicks actions/buttons
5. **Deactivation** - Step hidden
6. **Removal** - Step DOM cleaned up

## Error Handling

Tourguide.js uses the `helpers.assert()` function for validation:

```typescript
helpers.assert(condition, message)
// Throws error with context if condition is false


Common error scenarios:
- Missing required step properties (title, content)
- Invalid selector (element not found)
- Invalid image URLs
- Invalid step data format

## Performance Considerations

1. **Image Preloading** - Set `preloadimages: true` to preload images before showing steps
2. **Cache Management** - Use `resumeOnLoad: true` with custom CacheManager for persistent state
3. **Shadow DOM** - Tours run in Shadow DOM by default for style isolation
4. **Memory Cleanup** - Always call `tour.remove()` when tour is no longer needed

## Extensibility Points

| Extension Type | File Location | Purpose |
|----------------|---------------|---------|
| Custom Step | `src/step/*.ts` | New step visualizations |
| Custom CacheManager | `src/cachemanager/*.ts` | Custom storage backend |
| Custom ActionHandler | `src/handler/ActionHandler.ts` | Custom button behaviors |
| Custom ContentDecorator | `src/decorator/ContentDecorator.ts` | Custom text transformations |
| Custom Positioning | `src/utils/position.ts` | Custom floating UI middleware |

## Version Information

- **Current Version:** 2.0.6
- **License:** BSD 3-Clause
- **Maintainer:** Likalo LLC
- **Repository:** https://github.com/LikaloLLC/tourguide.js

## Related Files

| File | Purpose |
|------|---------|
| `src/Tour.ts` | Main entry point, Tour class |
| `@types/index.d.ts` | TypeScript declarations |
| `rollup.config.js` | Build configuration |
| `docs/README.md` | User-facing documentation |
| `tests/Tour.test.ts` | Core tests |

