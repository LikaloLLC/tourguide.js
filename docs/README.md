## :toolbox: Functions

- [assert](#gear-assert)
- [clamp](#gear-clamp)
- [getMaxZIndex](#gear-getmaxzindex)
- [GUID](#gear-guid)
- [default](#gear-default)
- [default](#gear-default)
- [getDataContents](#gear-getdatacontents)

### :gear: assert

Asserts that a given condition is true. If the condition is false, it throws an error with the provided message.

| Function | Type |
| ---------- | ---------- |
| `assert` | `(condition: any, message: string) => boolean` |

Parameters:

* `condition`: - The condition to be evaluated. Can be of type boolean, string, number, or any other type.
* `message`: - The error message to be displayed if the condition is false.


[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/utils/assert.ts#L10)

### :gear: clamp

Clamps a number between a minimum and maximum value.

| Function | Type |
| ---------- | ---------- |
| `clamp` | `(value: number, min?: number, max?: number) => number` |

Parameters:

* `value`: - The number to clamp.
* `min`: - Optional minimum limit. If not provided, it defaults to the value itself.
* `max`: - Optional maximum limit. If not provided, it defaults to the value itself.


[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/utils/clamp.ts#L9)

### :gear: getMaxZIndex

Returns the maximum z-index value of all elements in the document.

| Function | Type |
| ---------- | ---------- |
| `getMaxZIndex` | `() => number` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/utils/zindex.ts#L6)

### :gear: GUID

Generates a GUID (Globally Unique Identifier) in string format.

| Function | Type |
| ---------- | ---------- |
| `GUID` | `() => string` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/utils/guid.ts#L5)

### :gear: default

Generates a function that creates an ActionHandler object for use in a tour.

| Function | Type |
| ---------- | ---------- |
| `default` | `(name: string, handlerFn: ActionHandlerFn) => ActionHandlerType` |

Parameters:

* `name`: - The unique identifier for the action handler.
* `handlerFn`: - The function that will handle the actions defined by the tour.


[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/handler/ActionHandler.ts#L12)

### :gear: default

Parse Markdown into an HTML String.

| Function | Type |
| ---------- | ---------- |
| `default` | `(md: string, prevLinks?: Record<string, string> or undefined) => string` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/lib/snarkdown.ts#L56)

### :gear: getDataContents

Parses a data string into an object with default values.

| Function | Type |
| ---------- | ---------- |
| `getDataContents` | `<T>(data?: string, defaults?: Record<string, string>) => T` |

Parameters:

* `data`: - The input data string, where key-value pairs are separated by ";".
* `defaults`: - An optional object containing default key-value pairs.


[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/utils/dom.ts#L7)


## :wrench: Constants

- [popoverStepDataDefaults](#gear-popoverstepdatadefaults)
- [MarkdownDecorator](#gear-markdowndecorator)
- [defaultKeyNavOptions](#gear-defaultkeynavoptions)
- [defaultStyle](#gear-defaultstyle)
- [defaultOptions](#gear-defaultoptions)

### :gear: popoverStepDataDefaults

| Constant | Type |
| ---------- | ---------- |
| `popoverStepDataDefaults` | `PopoverStepData` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/step/PopoverStep.ts#L23)

### :gear: MarkdownDecorator

| Constant | Type |
| ---------- | ---------- |
| `MarkdownDecorator` | `ContentDecorator` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/decorator/MarkdownDecorator.ts#L4)

### :gear: defaultKeyNavOptions

| Constant | Type |
| ---------- | ---------- |
| `defaultKeyNavOptions` | `KeyboardNavigationOptions` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/Tour.ts#L32)

### :gear: defaultStyle

| Constant | Type |
| ---------- | ---------- |
| `defaultStyle` | `TourStyle` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/Tour.ts#L41)

### :gear: defaultOptions

Default options for a guided tour in the application.

| Constant | Type |
| ---------- | ---------- |
| `defaultOptions` | `TourOptions` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/Tour.ts#L65)


## :factory: AbstractCacheManager

Abstract base class for CacheManager

The `CacheManager` class serves as a template for managing caching mechanisms, particularly useful when tracking user interactions during a guided tour. This could include storing data such as:
- User progress through the tour steps
- Completion status of the tour
- Preferences or settings related to the tour (e.g., whether users want to skip certain steps)
- Any other relevant interaction details that might enhance用户体验 or improve future iterations of the guided tour.

By implementing this abstract class, specific caching strategies can be developed for different environments (e.g., browser local storage, server-side storage, in-memory cache). This flexibility allows for efficient and scalable handling of user interactions across various platforms and devices.

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/CacheManager.ts#L14)

### Constructors

`public`: Creates an instance of AbstractCacheManager.

Parameters:

* `identifier`: - A string to identify the cache manager.


### Properties

- [identifier](#gear-identifier)

#### :gear: identifier

The unique identifier for this cache manager.

| Property | Type |
| ---------- | ---------- |
| `identifier` | `string` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/CacheManager.ts#L25)

## :factory: Step

Represents an abstract step in a tour. 
This is an interface that defines the basic structure and properties
for all steps within a tour. It includes properties such as id (a unique identifier), title, description, element
to highlight (which should be an instance of Element from umbrellajs), and a callback function that will execute
when the step is completed. This abstract class can be extended to create additional step types, each with their
own specific properties and behaviors, allowing for customization based on different user experiences or application needs.

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L13)

### Methods

- [show](#gear-show)
- [hide](#gear-hide)

#### :gear: show

Shows the step, setting its active state to true if it is not already active.

| Method | Type |
| ---------- | ---------- |
| `show` | `() => void` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L61)

#### :gear: hide

Hides the step, setting its active state to false if it is currently active.

| Method | Type |
| ---------- | ---------- |
| `hide` | `() => void` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L67)

### Properties

- [Type](#gear-type)
- [Style](#gear-style)
- [context](#gear-context)
- [index](#gear-index)
- [active](#gear-active)
- [first](#gear-first)
- [last](#gear-last)
- [data](#gear-data)

#### :gear: Type

The type of the step, defaults to "default".

| Property | Type |
| ---------- | ---------- |
| `Type` | `string` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L17)

#### :gear: Style

The style or appearance of the step, represented as a string.

| Property | Type |
| ---------- | ---------- |
| `Style` | `string` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L21)

#### :gear: context

The context in which the step is placed, typically a Tour object.

| Property | Type |
| ---------- | ---------- |
| `context` | `Tour` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L29)

#### :gear: index

The index of the step within its container.

| Property | Type |
| ---------- | ---------- |
| `index` | `number` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L33)

#### :gear: active

Indicates whether the step is currently active.

| Property | Type |
| ---------- | ---------- |
| `active` | `boolean` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L37)

#### :gear: first

Indicates whether the step is the first in its sequence.

| Property | Type |
| ---------- | ---------- |
| `first` | `boolean` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L41)

#### :gear: last

Indicates whether the step is the last in its sequence.

| Property | Type |
| ---------- | ---------- |
| `last` | `boolean` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L45)

#### :gear: data

The data associated with the step, which must be provided when creating a new instance.

| Property | Type |
| ---------- | ---------- |
| `data` | `StepDataType` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/abstracts/Step.ts#L49)

## :factory: ContentDecorator

The `ContentDecorator` class is designed to apply a custom decoration function to specific patterns within text. It supports both regular expressions and literal strings as match patterns, allowing for flexible content manipulation.

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/decorator/ContentDecorator.ts#L45)

### Constructors

`public`: Constructs a new `ContentDecorator` instance.

Parameters:

* `match`: - A string or regular expression pattern to be matched in the text. If provided as a string, it is wrapped in a regular expression with global and case-insensitive flags.
* `decoratorFn`: - The function that will be applied to the matched content. It receives the entire text, an array of matches, additional step data, and context information.


### Methods

- [test](#gear-test)
- [render](#gear-render)

#### :gear: test

Tests whether the given text matches the configured pattern.

| Method | Type |
| ---------- | ---------- |
| `test` | `(text: string) => boolean` |

Parameters:

* `text`: - The string to be tested against the match pattern.


[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/decorator/ContentDecorator.ts#L68)

#### :gear: render

Applies the decorator function to the text based on the configured match pattern and properties.

| Method | Type |
| ---------- | ---------- |
| `render` | `(text: string, step: any, context: Tour) => string` |

Parameters:

* `text`: - The input text in which matches are to be found and decorated.
* `step`: - Additional data or context that might be used by the decorator function during rendering.
* `context`: - A broader context object that can include additional information necessary for decoration.


[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/decorator/ContentDecorator.ts#L79)

## :tropical_drink: Interfaces

- [PopoverStepData](#gear-popoverstepdata)
- [Match](#gear-match)

### :gear: PopoverStepData



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `image` | `string` |  |
| `width` | `number or undefined` |  |
| `height` | `number or undefined` |  |
| `title` | `string` |  |
| `content` | `string` |  |
| `layout` | `PopoverLayout` |  |
| `alignment` | `Alignment` |  |
| `navigation` | `boolean` |  |


### :gear: Match



| Property | Type | Description |
| ---------- | ---------- | ---------- |
| `match` | `string` |  |
| `start` | `number` |  |
| `length` | `number` |  |
| `properties` | `string[]` |  |


## :cocktail: Types

- [Alignment](#gear-alignment)
- [PopoverLayout](#gear-popoverlayout)
- [ActionHandlerFn](#gear-actionhandlerfn)
- [DecoratorFn](#gear-decoratorfn)

### :gear: Alignment

| Type | Type |
| ---------- | ---------- |
| `Alignment` | `'start' or 'end'` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/step/PopoverStep.ts#L9)

### :gear: PopoverLayout

| Type | Type |
| ---------- | ---------- |
| `PopoverLayout` | `horizontal" or "vertical` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/step/PopoverStep.ts#L10)

### :gear: ActionHandlerFn

| Type | Type |
| ---------- | ---------- |
| `ActionHandlerFn` | `(event: Event, action: TourAction, context: Tour) => void` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/handler/ActionHandler.ts#L3)

### :gear: DecoratorFn

| Type | Type |
| ---------- | ---------- |
| `DecoratorFn` | `(text: string, matches: Array<Match>, step: any, context: any) => string` |

[:link: Source](https://github.com/LikaloLLC/tourguide.js/tree/main/src/decorator/ContentDecorator.ts#L10)

