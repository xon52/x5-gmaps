## Heatmap

![Heatmap](/img/readme-heatmap.png)

Heatmaps are placed within Maps and have several props which are derived from Google's [Heatmap Options](https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions). Some are named differently as they have been enhanced/simplified.

| Props        |     Type     |   Default    | Description                                                                           |
| :----------- | :----------: | :----------: | :------------------------------------------------------------------------------------ |
| items        | Array/Object | **required** | An array of `{ lat: number, lng: number }` (Type: `google.maps.LatLngLiteral`)        |
| colors       | Array/String |      -       | An array of one or more colors to color heatmap _e.g. ['red','#0F0','rgba(0,0,0,0)`]_ |
| dissipating  |   Boolean    |    `true`    | Specifies whether heatmaps dissipate on zoom                                          |
| opacity      |    Number    |    `0.6`     | Opacity of the heatmap                                                                |
| maxIntensity |    Number    |      -       | Number of points in one spot to reach "maximum heat" color                            |
| radius       |    Number    |      -       | The radius of influence for each data point, in pixels                                |
| weightProp   |    String    |      -       | The property of items that should be used as the weight (Numbers > 0)                 |

This component does not have any events.

\*\* Note require to include the "visualization" library as described in [Deployment](#deployment)

```html
<template>
  <gmaps-map>
    <gmaps-heatmap :data="items" :opacity="0.8" />
  </gmaps-map>
</template>

<script>
  import { gmapsMap, gmapsHeatmap } from 'x5-gmaps'

  export default {
    components: { gmapsMap, gmapsHeatmap },
    data: () => ({
      items: [
        { lat: -27.41, lng: 153.01 },
        { lat: -27.42, lng: 153.02 },
        ...,
        { lat: -27.48, lng: 153.08 },
        { lat: -27.49, lng: 153.09 },
      ],
    }),
  }
</script>
```
