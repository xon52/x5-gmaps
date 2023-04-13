## Popup

![Popup](/img/readme-popup.png)

A Popup is a custom [DOM Element](https://developers.google.com/maps/documentation/javascript/reference/overlay-view). It is here primarily as an example of what is needed when creating your own map objects, but serves as a cleaner InfoWindow for Vue.

It takes the following props:

| Props      |  Type  |  Default  | Description                                                        |
| :--------- | :----: | :-------: | :----------------------------------------------------------------- |
| position   | Object |     -     | `{ lat: number, lng: number }` (Type: `google.maps.LatLngLiteral`) |
| background | String | `#EEEEEE` | Background style                                                   |
| height     | String |  `200px`  | Height style                                                       |
| width      | String |  `60px`   | Width style                                                        |

All events are registered from the markup/component you place inside it rather than the popup itself.

```html
<template>
  <gmaps-map :options="mapOptions">
    <gmaps-popup :position="position" background="#BBF0FF">
      <span @click="doSomething()">Do Something</span>
    </gmaps-popup>
  </gmaps-map>
</template>

<script>
  import { gmapsMap, gmapsPopup } from 'x5-gmaps';

  export default {
    components: { gmapsMap, gmapsPopup },
    data: () => ({
      position: { lat: -27.46, lng: 153.02 },
      mapOptions: {
        center: { lat: -27.47, lng: 153.025 },
        zoom: 12
      }
    })
  };
</script>
```
