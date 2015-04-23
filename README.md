[![Build Status](https://travis-ci.org/ikr/react-star-rating-input.svg?branch=master)](https://travis-ci.org/ikr/react-star-rating-input)

# About

React.js component for entering 0-N stars (N is 5 by default). See
[the demo](http://ikr.su/h/react-star-rating-input/demo.html).

# Installation

Made for [Browserify](http://browserify.org/); graphics and CSS bundled.

    npm install --save react-star-rating-input

# Usage

See [the code](https://github.com/ikr/react-star-rating-input/blob/master/demo.js) of the demo
mentioned above.

## Props

Static layout

* `size` -- how many stars to display. The default value is 5
* `showClear` -- hides the "Clear" link when `false`. The default value is `true`

Interaction

* `value` -- how many stars are selected
* `onChange: function (value) {...}` -- your `value` change handler

## Internationalization

[react-intl](https://github.com/yahoo/react-intl)-based. To translate the component, please pass the
`messages` property, containing:

```js
{
    'react-star-rating-input': {
        clear: 'Clear',
        clearHint: 'Reset value to no stars'
    }
}
```

Why have a `react-intl` dependency instead of just setting the `clear` and `clearHint` text as
props?

Well, that allows using `react-star-rating-input` uniformly in bigger applications, and passing all
the namespaced translations, from the root, down the React components hierarchy, -- automatically,
with the help of `IntlMixin`.

Please note, that `react-intl` depends on global `Intl` object. You can polyfill it with
[intl](https://github.com/andyearnshaw/Intl.js) package:

```
if (!global.Intl) {
    require('intl');
}
```
