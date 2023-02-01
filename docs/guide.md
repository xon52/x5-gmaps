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

### See [Configuration](/configuration/) for how to include Google Maps options like Libraries, Version, Region, Language, and Callback.

### See [Components](/api/) for other components to use.

### Or [Demo](/demo.md) for live examples.

<br>

<br/>

## Tutorials

These use slightly older versions of this package but are similar enough for you to get the idea. Read below for the latest on how to use each component.

- [Tutorial creating a COVID Heatmap](https://medium.com/javascript-in-plain-english/making-a-covid-map-using-vue-google-maps-89eb70a9f089)
- [Address Autocomplete Example](https://xon5.medium.com/vue-google-maps-and-autocomplete-e9bf0fa3c42e)
