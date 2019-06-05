const assert = require('assert')

const fetch = require("node-fetch")

let Tourguide = require("./build/main.bundle");

// Load the full build.
const _ = require('lodash');

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

describe('TourGuideJs', function () {

  let optionStepsLength = steps.length;

  let tourguide = new Tourguide.default({
    "steps": steps
  });

  // console.log("document", document, "window", window.scrollTo);

  describe('Constructor', function () {

    // check for instance type created
    it('Creates A New Tour Instance', function () {

      // console.log("Tourguide.default", tourguide);

      // console.log("tourguide instanceof Tourguide.default", tourguide instanceof Tourguide.default);

      assert.equal(tourguide instanceof Tourguide.default, true);
    });

    // verify steps length returned by Tourguide.default options steps
    it("TourGuide Steps Array Length " + tourguide._steps.length + " Should Match With Steps Array Length " + steps.length + " In Options", () => {

      assert.equal(tourguide._steps.length, steps.length)

    })

    // verify the order and fields of steps added
    tourguide._steps.forEach((step) => {

      // console.log("found step from tourguide.js", step.index)

      it("TourGuide Steps Order " + step.index + " Should Be The Same As Steps Sequence In Options " + steps[step.index - 1].step, () => {

        // step.index and steps[i].step to verify steps order
        assert.equal(step.index, steps[step.index - 1].step)
      })

      // verify fields in each step are consistent and are as expected
      it("Step " + step.index + " Returned From Tour Constructor Should Contain Certain Default JSON Fields", () => {

        // get keys of tourguide.steps at a given index
        const stepKeys = Object.keys(step);

        const expectedStepKeys = [
          "index", "first", "last", "_target", "container", "highlight", "tooltip", "arrow", "rect",
          "image", "title", "content", "active", "context", "visible", "selector", "actiontarget"
        ]

        // console.log("found step keys", stepKeys);

        // Check that all fields in step returned from constructor are as expected
        const difference = _.difference(stepKeys, expectedStepKeys);

        // check that difference.length is 0, _difference does not care in what order the elements are in array
        assert.equal(difference.length, 0);
      })
    })

    // verify first field is set to true for step [0]
    // last field to be set to true for step[n-1]
    it('Checks If The Tourguide._steps 0th and Last Element Returned Are As Expected', function () {

      assert.equal(tourguide._steps[0].first, true);

      assert.equal(tourguide._steps[optionStepsLength - 1].last, true);
    })

    // check for default _options returned
    it('checks if the default tourguide _options returned are as expected', function () {

      // console.log("tourguide", tourguide);

      // get keys of tourguide._options
      const _options = Object.keys(tourguide._options);

      // these are the default keys that should present in tourguide._options
      const tourConstructorOptions = ['root', 'selector', 'animationspeed', 'padding', 'steps', 'src', 'restoreinitialposition',
        'preloadimages', 'request', 'onStart', 'onComplete', 'onStep', 'onAction', 'onStop'];

      // console.log("found options keys from tour constructor", _options);

      // console.log("_.difference(_options, tourConstructorOptions)", _.difference(_options, tourConstructorOptions));

      // Check that all options returned from constructor are as expected
      const difference = _.difference(_options, tourConstructorOptions);

      // check that difference.length is 0, _difference does not care in what order the elements are in array
      assert.equal(difference.length, 0);
    });

    // check some more options returned from tourguide constructor
    it('checks if the tourguide constructor has fields returned  as expected', function () {

      const tourGuideFields = ["_current", "_active", "_stepsSrc", "_ready", "_initialposition", "start", "action",
        "next", "previous", "go", "stop", "complete", "_steps", "_options"];

      // get keys of tourguide._options
      const tourGuideKeys = Object.keys(tourguide);

      // Check that all options returned from constructor are as expected
      const difference = _.difference(tourGuideKeys, tourGuideFields);

      // check that difference.length is 0, _difference does not care in what order the elements are in array
      assert.equal(difference.length, 0);
    });

  })

  describe("Methods", function () {

    // start at any step and call tourguide.reset()
    describe("tourGuide.init()", function() {

      it("should verify that tour is initialized and ready to start", function () {

        // console.log("before tourguide.init", tourguide);

        const jsdomAlert = window.scrollTo;  // remember the jsdom alert

        window.scrollTo = () => { };

        tourguide.init();

        // console.log("after tourguide.init", tourguide);

        window.scrollTo = jsdomAlert;

        // init() func sets _active to false, verify them
        assert.equal(tourguide._active, false);
      })
    })

    describe("tourGuide.start()", function () {

      describe('should verify changes after running tourGuide.start()', function () {

        // console.log("tourguide before calling start()", tourguide, "Object.keys(tourguide)", Object.keys(tourguide));

        // call tourguide.start() and check how it affects tourguide constructor obj
        tourguide.start();

        // console.log("tourguide after calling start()", tourguide, "Object.keys(tourguide)", Object.keys(tourguide));

        // tourguide.start() changes certain fields values in tourguide constructor obj, verify for such changes
        // after starting tour, each step's "container", "highlight", "tooltip", "arrow" 
        // and step1's "first", lastStep's "last" change 
        // and fields like "_active", "_initialposition" change

        // [[verify changes in steps array]]
        // verify the order and fields of steps added
        tourguide._steps.forEach((step) => {

          // console.log("found step from tourguide.js", step.index)

          it("tourGuide step " + step.index + "'s certain fields should be of type object", () => {

            // step.index and steps[i].step to verify steps order
            assert.equal(typeof step.container, "object")
            // console.log("typeof step.container", typeof step.container, JSON.stringify(step.container))
            assert.equal(typeof step.highlight, "object")
            // console.log("typeof step.highlight", typeof step.highlight, JSON.stringify(step.highlight))
            assert.equal(typeof step.tooltip, "object")
            // console.log("typeof step.tooltip", typeof step.tooltip, JSON.stringify(step.tooltip))
            assert.equal(typeof step.arrow, "object")
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

      // console.log("Length of Steps configured", optionStepsLength);

      while (i < optionStepsLength - 1) {

        // before calling next() func, _current would be 0
        let tourPrev = Object.assign({}, tourguide);

        // console.log("tourPrev._current", tourPrev._current);

        tourguide.next();

        // call this to go to next step in tourguide
        let tourAfter = Object.assign({}, tourguide);

        // console.log("tourAfter._current", tourAfter._current);

        it("tourGuide went from step " + tourPrev._current + " to step " + tourAfter._current, function () {

          // after starting the tourguide, .next() helps to go over rest of the steps
          // .next() only changes on variable which is _current

          assert.equal(tourPrev._current + 1, tourAfter._current);
        })

        i++;
      }
    })

    describe("tourGuide.previous()", function () {
      // [[verify changes to tourguide constructor fields]]

      // [[check for changes in _current]]
      // iterate over steps and call next() in each itertion and verify the _current field
      // being changed from that of previous one

      // console.log("Length of Steps configured", optionStepsLength);

      while (i > 0) {

        // before calling next() func, _current would be 0
        let tourPrev = Object.assign({}, tourguide);

        // console.log("tourPrev._current", tourPrev._current);

        tourguide.previous();

        // call this to go to next step in tourguide
        let tourAfter = Object.assign({}, tourguide);

        // console.log("tourAfter._current", tourAfter._current);

        it("tourGuide went from step " + tourPrev._current + " to step " + tourAfter._current, function () {

          // after starting the tourguide, .next() helps to go over rest of the steps
          // .next() only changes on variable which is _current

          assert.equal(tourPrev._current - 1, tourAfter._current);
        })

        i--;
      }
    })

    describe("tourGuide.close()", function () {

      // [[verify changes to tourguide constructor fields]]

      it("should verify that tourGuide is stopped", function () {

        // tourguide.start();

        // console.log("tourguide constructor value before closing", tourguide);

        // [[this is a workaround for window.scrollTo not implemented error, since this is unit tests, reassign scrollTo
        // to window as show below, to implement a sample scrollTo function, that lets the test case work]]
        const jsdomAlert = window.scrollTo;  // remember the jsdom alert

        window.scrollTo = () => { };

        tourguide.stop();

        window.scrollTo = jsdomAlert;

        // console.log("tourguide constructor value after closing", tourguide);

        // after closing tourguide, _active is set to false, verify that
        assert.equal(tourguide._active, false);
      })
    })

    // start at any position with a provided step number
    describe("tourGuide.start(" + 1 + ")", function () {

      it("tourGuide is started at " + 1, function () {

        tourguide.start(1);

        // console.log("tourguide, check _current", tourguide);

        assert.equal(tourguide._current, 1);
      })
    })

    // go to last step
    describe("tourGuide.go(" + (steps.length - 1) + ")", function () {

      it("tourGuide has gone to step " + (steps.length - 1), function () {

        tourguide.go(steps.length - 1);

        // console.log("tourguide, check _current", tourguide);

        assert.equal(tourguide._current, steps.length - 1);
      })
    })

    // complete the tour
    describe("tourGuide.complete()", function () {

      it("should verify that tour is complete", function () {

        // console.log("before tourguide.complete", tourguide);

        const jsdomAlert = window.scrollTo;  // remember the jsdom alert

        window.scrollTo = () => { };

        // tourguide.start(2);

        tourguide.complete();

        window.scrollTo = jsdomAlert;

        // console.log("after tourguide.complete", tourguide);

        // complete() func sets _active to false
        assert.equal(tourguide._active, false);
      })
    })

    // start at any step and call tourguide.reset()
    describe("tourGuide.reset()", function() {

      it("should verify that tour is reset, after starting at a step", function () {

        // console.log("before tourguide.reset", tourguide);

        const jsdomAlert = window.scrollTo;  // remember the jsdom alert

        window.scrollTo = () => { };

        tourguide.start(2);

        // console.log("after tourguide.start, about to reset tour", tourguide);

        tourguide.reset();

        // console.log("after tourguide.reset", tourguide);

        window.scrollTo = jsdomAlert;

        // reset() func sets _active to false and sets _current to 0, verify them
        assert.equal(tourguide._active, false);
        assert.equal(tourguide._current, 0);
      })
    })
  })
});