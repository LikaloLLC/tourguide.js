const assert = require('chai').assert

// Load the full build.
const _ = require('lodash');

debugger;
let Tourguide = require("../tourguide.umd.js");
const markdownSteps = require("./markdown/steps.json");

let steps = [
  {
    "selector": "[data-component=angular-conduit-intro]",
    "step": 1,
    "title": "Lets take a moment to get the look and feel of Tourguide.js",
    "content": "Click <kbd>&gt;</kbd> button to advance to the next step of this tour.<br/>To stop this tour at any time click <kbd>×</kbd> button in the top-right corner.",
    "image": ""
  },
  {
    "selector": "[data-component=your-feed]",
    "step": 2,
    "title": "This is 'Your Feed' block",
    "content": "You can define a JSON and let Tourguide define the flow of your application.",
    "image": ""
  },
  {
    "selector": "[data-component=global-feed]",
    "step": 3,
    "title": "This is 'Global Feed' block",
    "content": "You can define a JSON and let Tourguide define the flow of your application.",
    "image": ""
  },
  {
    "selector": "[data-component=article-list]",
    "step": 4,
    "title": "This is 'Article List' block",
    "content": "You can define a JSON and let Tourguide define the flow of your application.",
    "image": ""
  },
  {
    "selector": "[data-component=popular-tags]",
    "step": 5,
    "title": "This is 'Popular Tags' block",
    "content": "You can define a JSON and let Tourguide define the flow of your application.",
    "image": ""
  },
]

describe('Tourguide', function () {

  let optionStepsLength = steps.length;

  let tourguide = new Tourguide({
    "steps": steps
  });

  let jsdomScrollTo

  before(() => {
    jsdomScrollTo = window.scrollTo
    window.scrollTo = () => {}
  })

  describe('Constructor', function () {

    // check for instance type created
    it('Creates A New Tour Instance', function () {
      assert.strictEqual(tourguide instanceof Tourguide, true);
    });

    // verify steps length returned by Tourguide options steps
    it("TourGuide Steps Array Length " + tourguide._steps.length + " Should Match With Steps Array Length " + steps.length + " In Options", () => {
      assert.strictEqual(tourguide._steps.length, steps.length)

    })

    // verify the order and fields of steps added
    tourguide._steps.forEach((step) => {
      it("TourGuide Steps Order " + step.index + " Should Be The Same As Steps Sequence In Options " + steps[step.index - 1].step, () => {
        assert.strictEqual(step.index, steps[step.index - 1].step)
      })

      // verify fields in each step are consistent and are as expected
      it("Step " + step.index + " Returned From Tour Constructor Should Contain Certain Default JSON Fields", () => {

        // get keys of tourguide.steps at a given index
        const stepKeys = Object.keys(step);

        const expectedStepKeys = [
          "index", "first", "last", "_target", "container", "highlight", "tooltip", "arrow", "rect",
          "image", "title", "content", "active", "context", "visible", "selector", "actiontarget",
          "_timerHandler", "_scrollCancel", "_selector", "actions"
        ];

        // Check that all fields in step returned from constructor are as expected
        const difference = _.difference(stepKeys, expectedStepKeys);

        // check that difference.length is 0, _difference does not care in what order the elements are in array
        assert.strictEqual(difference.length, 0, `Expected ${JSON.stringify(expectedStepKeys)}, but received ${JSON.stringify(stepKeys)}. Extra keys: ${JSON.stringify(difference)}`);
      })
    })

    // verify first field is set to true for step [0]
    // last field to be set to true for step[n-1]
    it('Checks If The Tourguide._steps 0th and Last Element Returned Are As Expected', function () {

      assert.strictEqual(tourguide._steps[0].first, true);

      assert.strictEqual(tourguide._steps[optionStepsLength - 1].last, true);
    })

    // check for default _options returned
    it('checks if the default tourguide _options returned are as expected', function () {

      // get keys of tourguide._options
      const _options = Object.keys(tourguide._options);

      // these are the default keys that should present in tourguide._options
      const tourConstructorOptions = ['root', 'selector', 'animationspeed', 'padding', 'steps', 'src', 'restoreinitialposition',
        'preloadimages', 'request', 'onStart', 'onComplete', 'onStep', 'onAction', 'onStop', 'colors', 'keyboardNavigation'];

      // Check that all options returned from constructor are as expected
      const difference = _.difference(_options, tourConstructorOptions);

      // check that difference.length is 0, _difference does not care in what order the elements are in array
      assert.strictEqual(difference.length, 0, `Expected ${JSON.stringify(tourConstructorOptions)}, but received ${JSON.stringify(_options)}. Extra keys: ${JSON.stringify(difference)}`);
    });

    // check some more options returned from tourguide constructor
    it('checks if the tourguide constructor has fields returned  as expected', function () {

      const tourGuideFields = ["_current", "_active", "_stepsSrc", "_ready", "_initialposition", "start", "action",
        "next", "previous", "go", "stop", "complete", "_steps", "_options", "_background", "_overlay", "_keyboardHandler"];

      // get keys of tourguide._options
      const tourGuideKeys = Object.keys(tourguide);

      // Check that all options returned from constructor are as expected
      const difference = _.difference(tourGuideKeys, tourGuideFields);

      // check that difference.length is 0, _difference does not care in what order the elements are in array
      assert.strictEqual(difference.length, 0, `Expected ${JSON.stringify(tourGuideFields)}, but received ${JSON.stringify(tourGuideKeys)}. Extra keys: ${JSON.stringify(difference)}`);
    });

  })

  describe("Methods", function () {

    // start at any step and call tourguide.reset()
    describe("tourGuide.init()", function() {

      it("should verify that tour is initialized and ready to start", function () {
        tourguide.init();

        // init() func sets _active to false, verify them
        assert.strictEqual(tourguide._active, false);
      })
    })

    describe("tourGuide.start()", function () {

      describe('should verify changes after running tourGuide.start()', function () {

        // call tourguide.start() and check how it affects tourguide constructor obj
        tourguide.start();

        // tourguide.start() changes certain fields values in tourguide constructor obj, verify for such changes
        // after starting tour, each step's "container", "highlight", "tooltip", "arrow" 
        // and step1's "first", lastStep's "last" change 
        // and fields like "_active", "_initialposition" change

        // [[verify changes in steps array]]
        // verify the order and fields of steps added
        tourguide._steps.forEach((step) => {

          it("tourGuide step " + step.index + "'s certain fields should be of type object", () => {

            // step.index and steps[i].step to verify steps order
            assert.strictEqual(typeof step.container, "object")
            // console.log("typeof step.container", typeof step.container, JSON.stringify(step.container))
            assert.strictEqual(typeof step.highlight, "object")
            // console.log("typeof step.highlight", typeof step.highlight, JSON.stringify(step.highlight))
            assert.strictEqual(typeof step.tooltip, "object")
            // console.log("typeof step.tooltip", typeof step.tooltip, JSON.stringify(step.tooltip))
            assert.strictEqual(typeof step.arrow, "object")
            // console.log("typeof step.arrow", typeof step.arrow, JSON.stringify(step.arrow))
          })
        })
      });
    });

    let i = 0;

    describe("tourGuide.next()", function () {
      // [[verify changes to tourguide constructor fields]]

      // [[check for changes in _current]]
      // iterate over steps and call next() in each itertion and verify the _current field
      // being changed from that of previous one

      while (i < optionStepsLength - 1) {

        // before calling next() func, _current would be 0
        let tourPrev = Object.assign({}, tourguide);

        tourguide.next();

        // call this to go to next step in tourguide
        let tourAfter = Object.assign({}, tourguide);

        it("tourGuide went from step " + tourPrev._current + " to step " + tourAfter._current, function () {

          // after starting the tourguide, .next() helps to go over rest of the steps
          // .next() only changes on variable which is _current

          assert.strictEqual(tourPrev._current + 1, tourAfter._current);
        })

        i++;
      }
    })

    describe("tourGuide.previous()", function () {
      // [[verify changes to tourguide constructor fields]]

      // [[check for changes in _current]]
      // iterate over steps and call next() in each itertion and verify the _current field
      // being changed from that of previous one

      while (i > 0) {

        // before calling next() func, _current would be 0
        let tourPrev = Object.assign({}, tourguide);

        tourguide.previous();

        // call this to go to next step in tourguide
        let tourAfter = Object.assign({}, tourguide);

        it("tourGuide went from step " + tourPrev._current + " to step " + tourAfter._current, function () {

          // after starting the tourguide, .next() helps to go over rest of the steps
          // .next() only changes on variable which is _current

          assert.strictEqual(tourPrev._current - 1, tourAfter._current);
        })

        i--;
      }
    })

    describe("tourGuide.close()", function () {

      // [[verify changes to tourguide constructor fields]]

      it("should verify that tourGuide is stopped", function () {

        // tourguide.start();

        tourguide.stop();

        // after closing tourguide, _active is set to false, verify that
        assert.strictEqual(tourguide._active, false);
      })
    })

    // start at any position with a provided step number
    describe("tourGuide.start(" + 1 + ")", function () {

      it("tourGuide is started at " + 1, function () {

        tourguide.start(1);

        assert.strictEqual(tourguide._current, 1);
      })
    })

    // go to last step
    describe("tourGuide.go(" + (steps.length - 1) + ")", function () {

      it("tourGuide has gone to step " + (steps.length - 1), function () {

        tourguide.go(steps.length - 1);

        assert.strictEqual(tourguide._current, steps.length - 1);
      })
    })

    // complete the tour
    describe("tourGuide.complete()", function () {

      it("should verify that tour is complete", function () {

        // tourguide.start(2);

        tourguide.complete();

        // complete() func sets _active to false
        assert.strictEqual(tourguide._active, false);
      })
    })

    // start at any step and call tourguide.reset()
    describe("tourGuide.reset()", function() {

      it("should verify that tour is reset, after starting at a step", function () {

        tourguide.start(2);

        tourguide.reset();

        // reset() func sets _active to false and sets _current to 0, verify them
        assert.strictEqual(tourguide._active, false);
        assert.strictEqual(tourguide._current, 0);
      })
    })
  })

  describe("Markdown", function () {
    before(() => {
      tourguide = new Tourguide({
        steps: markdownSteps,
      });
      optionStepsLength = markdownSteps.length
      tourguide.start();
    })

    describe("Check contents are correct", function () {
      it("Heading level 1 should be 'h1' tag", function () {
        const heads = document.querySelectorAll(".guided-tour-step .guided-tour-step-content h1");

        assert.strictEqual(!!heads, true);
        assert.strictEqual(heads.length > 1, true);
        let index = 0;
        for (; index < heads.length; index++) {
          const element = heads[index];
          if(element.textContent === 'Heading level 1') {
            break;
          }
        }
        assert.strictEqual(index < heads.length, true);
      });

      it("Heading level 2 should be 'h2' tag", function () {
        const heads = document.querySelectorAll(".guided-tour-step .guided-tour-step-content h2");

        assert.strictEqual(!!heads, true);
        assert.strictEqual(heads.length > 1, true);

        let index = 0;
        for (; index < heads.length; index++) {
          const element = heads[index];
          if(element.textContent === 'Heading level 2') {
            break;
          }
        }
        assert.strictEqual(index < heads.length, true);
      });
    });

    after(() => {
      tourguide.reset();
    })
  });

  after(() => {
    window.scrollTo = jsdomScrollTo
  })
});