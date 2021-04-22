## Map

![Map](/img/readme-map.png)

Maps can take many [options](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions). `zoom` is defaulted to `12` and `center` is defaulted to Brisbane (as these options are required). The type of these is `google.maps.MapOptions`.

This component supports the following events:

- `@bounds-changed` _returns new bounds_
- `@center-changed` _returns new center_
- `@zoom-changed` _returns new zoom level_
- `@click` _returns event_
- `@double-click` _returns event_
- `@right-click` _returns event_
- `@mouseover` _returns event_
- `@mouseout` _returns event_

Once the map is loaded, it `$emit`'s itself (map instance) via the event `mounted` (thanks [thefoxie](https://github.com/thefoxie)).

The default template for the slot also has a slot prop of `map` which can be referred to.

```html
<template>
  <gmaps-map :options="mapOptions" />
</template>

<script>
  import { gmapsMap } from 'x5-gmaps';

  export default {
    components: { gmapsMap },
    data: () => ({
      mapOptions: {
        center: { lat: -27.47, lng: 153.025 },
        zoom: 12
      }
    })
  };
</script>
```
