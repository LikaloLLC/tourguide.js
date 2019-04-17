# tourguide.js
A simple, clean and small guided tour for the web
## Table of contents
1. [Introduction](#introduction)

# Introduction
#### GuidedTours.js is a simple, lightweight library for creating guided tours in your apps and sites. We built it for our product docsie.io as current open source alternatives are either unmaintained, heavy, commercialized, or didn't do what we wanted them to do.  This is the simple alternative.

This is what it looks like on out site.

![Image](https://cdn.docsie.io/boo_n1TwSJpcgsSAN001Z/4e0b6646-8ae1-b0a7-be73-294555171710guided_tours_gif.gif).gif

You can see a demo implemented in our own app by following this link. 

Guidedtours.js is configured using simple json format

```
[
    {
        "id": "libraryintro",
        "name": "Introduction",
        "autorun": true,
        "steps": [
            {
                "selector": null,
                "step": 1,
                "title": "Lets take a moment and look around Docsie library",
                "content": "Click &lt;kbd&gt;&gt;&lt;/kbd&gt; button to advance to the next step of this tour.&lt;br/&gt;To stop this tour at any time click &lt;kbd&gt;×&lt;/kbd&gt; button in the top-right corner.",
                "image": ""
            },
            {
                "selector": "[data-component=library]:first-of-type",
                "step": 2,
                "title": "Shelf",
                "content": "Just like a real library &lt;mark&gt;Docsie&lt;/mark&gt; starts with &lt;dfn&gt;shelves&lt;/dfn&gt;. Each &lt;dfn&gt;shelf&lt;/dfn&gt; represnts a separate collection of ideas. You may think of them as individual websites, or website sections."
            }
}]
```



