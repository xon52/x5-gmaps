# Guide

## Basic Usage

```html
<template>
  <gmaps-map>
    <gmaps-marker :position="{ lat: -27, lng: 153 }" />
  </gmaps-map>
</template>
```

```js
import { gmapsMap, gmapsMarker } from 'x5-gmaps';

export default {
  components: { gmapsMap, gmapsMarker }
};
```

### See <a href="/api/">Components</a> for other components to use.

### Or <a href="/demo.md">Demo</a> for live examples.

<br>

## Google Places Library

As mentioned above, additional libraries can be used in conjunction with this package, and as an example, this is how you would include the [Places Library](https://developers.google.com/maps/documentation/javascript/places).

```js
// main.js
Vue.use(x5GMaps, { key: 'YOUR_GOOGLE_KEY', libraries: ['places'] });
```

<br/>

## Tutorials

These use slightly older versions of this package but are similar enough for you to get the idea. Read below for the latest on how to use each component.

- [Tutorial creating a COVID Heatmap](https://medium.com/javascript-in-plain-english/making-a-covid-map-using-vue-google-maps-89eb70a9f089)
- [Address Autocomplete Example](https://xon5.medium.com/vue-google-maps-and-autocomplete-e9bf0fa3c42e)
