# Advanced Topics

## Accessing the Google Maps API

While this should rarely be needed, if you need to access the Google Maps API, you must wait for it to be inserted and loaded. A promised is provided which should return that API when it's ready by importing `gmaps` (e.g. `import { gmaps } from 'x5-gmaps'`). Usually it should already be loaded and available via `window.google.maps`.

The return of this promise is the `maps` object of the `google` object most of Google's examples use.

```js
// Example
import { gmaps } from 'x5-gmaps';

export default {
  data: () => ({
    GooglePlacesService: null
  }),
  mounted() {
    gmaps().then(maps => {
      PlacesService = new maps.places.AutocompleteService();
    });
  }
};
```

<br/>

## Custom map slots

While you shouldn't see these for too long while the map loads (if at all), there are two customisable slots: _Loading_ and _Error_.

```html
<template>
  <gmaps-map>
    <template v-slot:loading>
      <div>
        <span>This is now loading...</span>
      </div>
    </template>
    <template v-slot:error="{ error }">
      <div>
        <span>You broke it: {{ error }}</span>
      </div>
    </template>
  </gmaps-map>
</template>
```
