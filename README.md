# Tourguide.js

######  Library for creating guided tours for your web, apps and more.

>  A **tour guide** is a person who provides assistance, information on cultural, historical and  contemporary heritage to people on organized [tours](https://en.wikipedia.org/wiki/Tourism)  and individual clients at educational establishments, religious and  historical sites, museums, and at venues of other significant interest,  attractions sites. [[https://en.wikipedia.org/wiki/Tour_guide](https://en.wikipedia.org/wiki/Tour_guide)]

## Examples

### Fiddle with It

Want to see how it works right away? [Try on JSFiddle](https://jsfiddle.net/eugenetrue/q465gb7L/) 

### React

You can look at some react examples here: [React examples](examples/example_reactjs).

## Install Tourguide.js

```
npm i tourguidejs
```

or add it from jsdelivr <br>
https://cdn.jsdelivr.net/npm/tourguidejs@1.0.1/tourguide.min.js <br>
https://cdn.jsdelivr.net/npm/tourguidejs@1.0.1/tourguide.js

## Why do I need Tourguide.js

Every time you build you next awesome web app, you sit back and stare lovingly at your handy-work :) But then inevitably someone comes along asking one and the same inconvenient question: *"So, how do I use it?"*

You try to explain, but people are just not getting it! You write [how-tos](https://docsie.io), [lengthy docs](https://docsie.io), and [step-by-step guides](https://docsie.io), and yet, nothing seems to be enough.

This is why we built **Tourguide.js** - a simple yet powerful explainer utility, designed to help you make the reply a little bit less painful. Because, let's face it - picture is worth a 1000 words:

![](https://cdn.docsie.io/tourgudie_demo.png)

## Getting started

There are a few ways you can use **Tourguide.js**

### Fiddle with it

Want to see how it works right away? [Try on JSFiddle](https://jsfiddle.net/eugenetrue/q465gb7L/) 

###  CommonJS

Download `tourguide.min.js`, add it to your project libraries, and then include it on page:

```
<script src="tourguide.min.js"></script>
```
### ES Module support

If you use ES modules in your project ([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org)) import **Tourguide.js** like so:

```
import Tourguide from "tourguidejs";
```
## Usage

Before use, **Tourguide.js** must be instantiated:

```
var tourguide = new Tourguide({options});
```
Tour constructor accepts the following options:
```
const defaultOptions: {
  root?: HTMLElement | string; // Optional, if you don't provide a selector, the tour will be initialized on `document`;
  selector?: string; // Required for DOM steps. The selector used to pick up HTML elements that represent your steps
  selectorSteps?: Array<string>; // If provided, will be used instead of a single selector. Useful if you have multiple steps on the same page
  contentDecorators?: Function[] // An array of functions that are responsible for decorating your step content (optional)
  style?: Object // A styles object applied to the container element (optional)
  actionHandlers?: Array<{name: string, fn: Function}> // An array of custom actions you can define on your tour (optional)
  request?: RequestInit | null; // An object containing various browser settings for the fetch() call if using `src` option. (default is { mode: 'cors' })
  keyboardNavigation?: Object // Keyboard navigation configuration
    next?: string | undefined; // name of the keyboard shortcut used to navigate to the next step; the default value is 'ArrowRight'
    prev?: string | undefined; // name of the keyboard shortcut used to navigate to the previous step; the default value is 'ArrowLeft'
    first?: string | undefined; // name of the keyboard shortcut used to navigate to the first step; the default value is 'Home'
    last?: string | undefined; // name of the keyboard shortcut used to navigate to the last step; the default value is 'End'
    stop?: string | undefined; // name of the keyboard shortcut used to stop the tour; the default value is 'Escape'
    complete?: string | undefined; // name of the keyboard shortcut used to stop the tour
  stepFactory?: Array<any> // An array of classes for creating your steps. (optional)
    Type?: string; // Defines the type of the step to create, for example "card"
    Style?: string; // Defines the styles applied to the created step
  resumeOnLoad?: boolean; // If true, will start tour from last known position if one is saved. (default false)
  restoreinitialposition?: boolean; // If true, when the tour stops, it will restore the initial scroll position of the page (default false)
}
```

Once instantiated you can use tourguide instance a several different ways:

### Content based approach

Simplest approach is to read the descriptions right off the elements on page. This works best if you are using an [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) approach in your application. Simply add tour descriptions to the [HTML](https://en.wikipedia.org/wiki/HTML) elements in your page template:

```
<button aria-label="Collaborate" data-tour="step: 1; title: Step1; content: Lorem ipsum dolor sit amet">
  Collaborate
</button>
```

In this mode you can simply use **Tourguide.js** as-is:

```
var tourguide = new Tourguide();
tourguide.start();
```

About step details, See [Step](#Step) section.

### JSON based approach

You may also write your own steps definition using [JSON](https://www.json.org/) notation:

```
`[`
`  {`
`    "selector": null,`
`    "step": 1,`
`    "title": "Lets take a moment and look around Docsie library",`
`    "content": "Click a button to advance to the next step of this tour.<br/> To stop this tour at any time click a button in the top-right corner.",`
`    "image": "https://somehost.com/image.jpeg"`
`  },`
`  {`
`    "selector": "[data-component=library]:first-of-type",`
`    "step": 2,`
`    "title": "Shelf",`
`    "content": "Just like a real library &lt;mark&gt;Docsie&lt;/mark&gt; starts with &lt;dfn&gt;shelves&lt;/dfn&gt;. Each &lt;dfn&gt;shelf&lt;/dfn&gt; represnts a separate collection of ideas. You may think of them as individual websites, or website sections."`
`  }`
`]`
```

Once you have the complete JSON description for each of your tour steps you will have to initialize **Tourguide.js** passing your JSON as `steps:` property:

```
var steps = [...];
var tourguide = new Tourguide({steps: steps});
tourguide.start();
```

About step details, See [Step](#Step) section.

### Remote URL approach

You may also want to load the steps remotely. To do so simply provide the target `src` as one of the **Tourguide.js** init params:

```
var tourguide = new Tourguide({src: "https://somedomain.com/tours/guide.json"});
tourguide.start();
```

About step details, See [Step](#Step) section.

### Step Class Constructor

The **Tourguide.js** library includes two default steps: `PopoverStep` and `CardStep`. Here is the code for these steps:

## Content decorators

Both step title and content properties support content decorators defined in the following format:
```
	title: "Text ... {placeholder} ... more text.",
	content: "Text ... {fontsize,16,text} ... more text."
```

To render the decorated content you must provide your own custom content decorator when you initialize the tour.
To create a custom decorator simply use the provided `Tourguide.ContentDecorator` class:
```
	const decorator = new Tourguide.ContentDecorator(
          "decorator",
          function (text, matches, step, context) {
			 ... do something to the text property
            return text;
          }
        );
```
Decorator class requires two properties:
* `match<string | RegExp>`: either a plain string or a RegExp object identifying the decorator in text
* `decoratorFn<Function(text, matches, step, context)>`: function decorator will call when match has been found
	* `text<string>`: full text of the step content
	* `matches<Array<Match>>`: an array of matches found in content text
```
	Match {
		match: exact decorator string matched
		start: position in text where the 
		length: total length of the matched string
		properties?: optional array of additional properties 
	}
```
	* `step<Step>`: complete current step object
	* `context<Tour>`: complete tour object

### Dynamic Username example

Say you would like to make your tour more user friendly and display a name of the current user in one of the tour steps:
```
{
	title: "Hi {username},"
}
```
To render an actual user name in place to the decorator placeholder you need to pass the following decorator into the your Tour initialization options:
```
contentDecorators: [
        new Tourguide.ContentDecorator(
          "username",
          function (text, matches, step, context) {
            let _text = text;
            matches.forEach(match => {
              _text = _text.substring(0, match.start)
                + "User Name"
                + _text.substring(match.start + match.length);
            })
            return _text;
          }
        ),
]
```
### Dynamic font size example

It's also possible to use the same technique to change some aspects of tour step text styling:
```
{
	"content": "**Click** the {fontsize,16,button} to see the {fontsize,20,result}"
}
```
In this example the script will match `fontsize` and parse two variables: `16` and `button`. You may then use these in your decorator function:
```
        new Tourguide.ContentDecorator(
          "fontsize",
          function (text, matches, step, context) {
            let _text = text;
            matches.forEach(match => {
              _text = _text.substring(0, match.start)
                + `<span style="font-size:${match.properties[0]}px">${match.properties[1]}</span>`
                + _text.substring(match.start + match.length);
            })
            return _text;
          }
        )
```

## Handling tour actions

Tour actions provide you with an ability to display and handle additional actions in your tour steps.
Action object has the following format:
```
Action {
	label: string;
	action: ActionType | string;
	primary?: boolean;
	[key: string]: any;
}
```

Passing an array of Action[] into a tour step will result in tour rendering a row of actions in the step footer, where the button label will be the `action.label`, and tour action may be one of the following:
```
enum ActionType {
	next, // Advance tour progress by one step
	previous, // Go back to a previous step, if any
	stop // Stop the tour
}
```

Furthermore you can handle custom actions you may define yourself.

To handle add custom actions to the tour you may use the provided `Tourguide.ActionHandler` class.

```
	Tourguide.ActionHandler(actionName, actionHandlerFN);
```
Where `actionName` is the name of your action that must match with the `action` property to passed in your `Action` array. For instance if you pass `{label: "Custom", action: "custom"}` you must then pass the following action handler as part of your tour initialization options
```
actionHandlers: [
	Tourguide.ActionHandler(
		"custom",
		function (event, action, context) {
			... do something
		}
	)
]
```

### Link action example
Let's suppose you would like to add a link into a step footer. You may do so by passing the following action into the step object:
```
{
    "actions": [
      {
        "label": "Go to Google",
        "action": "link",
		 "href": "https://google.ca"
      }
    ]
}
```
Now to handle this action we need to create a custom handler:
```
actionHandlers: [
	new Tourguide.ActionHandler(
		"link",
		function (event, action, context) {
			event.preventDefault();
			window.location = action.href;
		}
	)
]
```

## Controlling the tour

Once your tour has started you have several ways to manually control the tour flow:

### tourguide.start([step])

Start the tour at any time by calling start(). You may optionally provide the step number to start the tour at a specific step (by default a tour always starts at step 1):

```
tourguide.start(2)
```
### tourguide.stop()

Stop the tour at any moment by calling stop()

### tourguide.next()

Causes tour to go to the next step in the sequence

### tourguide.previous()

Causes tour to go to the previous step in the sequence

### tourguide.go(step)

Causes tour to go to the step specified

```
tourguide.go(2)
```

## Attaching callbacks

**Tourguide.js** supports several helpful [callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) to help you better control the tour. You may optionally pass the callback functions into the tour instance at initialization time:

```
var tourguide = new Tourguide({...});
tourguide.addEventListener('start', function(options){...});
```
### Available events:
* start - Fires when the guided tour is started.
* stop - Fires when the guided tour stops.
* complete - Fires when the guided tour is complete.
* step - Fires when tour step is activated.
* action - Fires when an action is triggered (next/previous/go/custom).

## Detailed documentation:
For more detailed documentation, please refer to the [documentation markdown file located at /docs/README.md](https://github.com/LikaloLLC/tourguide.js/docs/README.md).

## License

**Tourguide.js** is licensed under BSD 3-Clause "New" or "Revised" License

 A permissive license similar to the BSD 2-Clause License, but with a 3rd  clause that prohibits others from using the name of the project or its  contributors to promote derived products without written consent. 

