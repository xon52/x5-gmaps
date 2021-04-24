## InfoWindow

![InfoWindow](~@img/readme-info-window.png)

InfoWindows are placed with Maps can take a few [options](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions) using the type `google.maps.InfoWindowOptions`. A `position` option `{ lat: number, lng: number }` (Type: `google.maps.LatLngLiteral`) is required.

They are used to put HTML in and have a close/dismiss button built-in.

This component only supports a `@closed` event _(for when someone closes the window)_

```html
<template>
  <gmaps-map :options="mapOptions">
    <gmaps-info-window :options="options">
      <p>Example Text</p>
    </gmaps-info-window>
  </gmaps-map>
</template>

<script>
  import { gmapsMap, gmapsInfoWindow } from 'x5-gmaps';

  export default {
    components: { gmapsMap, gmapsInfoWindow },
    data: () => ({
      options: {
        position: { lat: -27.46, lng: 153.02 }
      },
      mapOptions: {
        center: { lat: -27.47, lng: 153.025 },
        zoom: 12
      }
    })
  };
</script>
```
