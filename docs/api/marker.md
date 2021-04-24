## Marker

![Marker](~@img/readme-marker.png)

Markers are placed within Maps and can take many [options](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions). A `position` option is required within the options prop or as its own prop.

This component supports the following events:

- `@move` _returns new position { lat, lng }_
- `@click` _returns event_
- `@double-click` _returns event_
- `@right-click` _returns event_
- ~~`@positionChanged`~~ (depreciated) _returns new position_

| Props       |      Type       | Default | Description                                                                                                                     |
| :---------- | :-------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------ |
| options\*   |     Object      |    -    | Type: `google.maps.MarkerOptions`                                                                                               |
| icon        | String / Object |    -    | Marker icon URL / [Icon Interface](https://developers.google.com/maps/documentation/javascript/reference/marker#Icon)           |
| label       | String / Object |    -    | Marker label text / [Label Interface](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel) |
| opacity     |     Number      |  `1.0`  | Opacity of the marker                                                                                                           |
| position    |     Object      |    -    | `{ lat: number, lng: number }` (Type: `google.maps.LatLngLiteral`)                                                              |
| sensitivity |     Number      | `0.001` | Changes movement sensitivity to save processing when there are a lot of items on the map                                        |
| title       |     String      |    -    | Marker title (shown on hover)                                                                                                   |
| visible     |     Boolean     | `true`  | If marker is visible                                                                                                            |
| zIndex      |     Number      |    -    | Override position in DOM                                                                                                        |

_\* If you want to change values on the fly, use the named props instead of within the options prop. Changing named props will trigger an update._

```html
<template>
  <gmaps-map>
    <gmaps-marker v-for="(item, i) in items" :key="i" :options="item.options" />
  </gmaps-map>
</template>

<script>
  import { gmapsMap, gmapsMarker } from 'x5-gmaps'

  export default {
    components: { gmapsMap, gmapsMarker },
    data: () => ({
      items: [
        { options: { position: { lat: -27.41, lng: 153.01 } } },
        { options: { position: { lat: -27.42, lng: 153.02 } } },
        ...,
        { options: { position: { lat: -27.48, lng: 153.08 } } },
        { options: { position: { lat: -27.49, lng: 153.09 } } },
      ],
    }),
  }
</script>
```
