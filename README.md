[![Build Status](https://travis-ci.org/ikr/react-star-rating-input.svg?branch=master)](https://travis-ci.org/ikr/react-star-rating-input)

# About

React.js components for entering 0—N stars (N is 5 by default), or displaying 0—N stars. See [the
demo](http://ikr.su/h/react-star-rating-input/demo.html).

It's published to npm compiled to ES5, and should work in IE11, if `Promise` gets polyfilled.

# Installation

    npm install --save react-star-rating-input

The two main exports are: `{StarRatingInput, StarRating}`. The former is for an interactive input
control, the latter is for passive star rating display. Star rasters and CSS is exported as the
`{css}` string.

# Usage

See [the code](https://github.com/ikr/react-star-rating-input/blob/master/src/demo.tsx) of the demo
mentioned above.

## StarRatingInput props

Static layout

* `size` — how many stars to display. The default value is 5

Interaction

* `value` — how many stars are selected
* `onChange: (value: number) => void` — your `value` change handler

## StarRating props

* `value` — how many stars are displayed
