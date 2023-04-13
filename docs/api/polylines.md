## Polylines / Polygons

![Polyline](/img/readme-polyline.png)
![Polygon](/img/readme-polygon.png)

Polylines/polygons are placed within Maps and have several props which are derived from Google's [Polyline Options](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions) and [Polygon Options](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions).

This component supports the following events:

- `@click` _returns [PolyMouseEvent](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent)_
- `@double-click` _returns [PolyMouseEvent](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent)_
- `@drag` _returns [MouseEvent](https://developers.google.com/maps/documentation/javascript/reference/map#MouseEvent)_
- `@drag-end` _returns [MouseEvent](https://developers.google.com/maps/documentation/javascript/reference/map#MouseEvent)_
- `@drag-start` _returns [MouseEvent](https://developers.google.com/maps/documentation/javascript/reference/map#MouseEvent)_
- `@mouseover` _returns [PolyMouseEvent](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent)_
- `@right-click` _returns [PolyMouseEvent](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent)_
- `@path-changed` _returns array of points_

| Props          |  Type   |   Default    | Description                                                                                  |
| :------------- | :-----: | :----------: | :------------------------------------------------------------------------------------------- |
| clickable      | Boolean |    `true`    | Indicates whether this Polyline handles mouse events                                         |
| draggable      | Boolean |   `false`    | Allow the shape to be dragged over the map                                                   |
| editable       | Boolean |   `false`    | Allow editing the shape by dragging the control points                                       |
| fillColor      | String  |    black     | _(Only polygons)_ The fill color \*\*\*                                                      |
| fillOpacity    | Number  |    `0.3`     | _(Only polygons)_ The fill opacity between 0.0 and 1.0                                       |
| geodesic       | Boolean |   `false`    | When true, lines will follow the curvature of the Earth                                      |
| icons          |  Array  |      []      | _(Only polylines)_ Add icons along your path \*\*                                            |
| path           |  Array  | **required** | Array of `{ lat: number, lng: number }` (Type: `google.maps.LatLngLiteral`)                  |
| strokeColor    | String  |    black     | The stroke color \*\*\*                                                                      |
| strokePosition | Number  |     `0`      | _(Only polygons)_ The stroke position along the path (0 = CENTER / 1 = INSIDE / 2 = OUTSIDE) |
| strokeOpacity  | Number  |    `1.0`     | The stroke opacity between 0.0 and 1.0                                                       |
| strokeWeight   | Number  |      -       | The stroke width in pixels                                                                   |
| visible        | Boolean |    `true`    | Whether this polyline is visible on the map                                                  |
| zIndex         | Number  |     `0`      | The zIndex compared to other polys                                                           |

\*\* Note this is one of those things you're surprised Google couldn't do right. It doesn't take images like all the rest of the icon properties of other components. [Here's their example](https://developers.google.com/maps/documentation/javascript/examples/overlay-symbol-custom)\
\*\*\* All CSS3 colors are supported except for extended named colors

```html
<template>
  <gmaps-map>
    <gmaps-polygon :path="items" :strokeColor="blue" :fillColor="red" />
    <gmaps-polyline :path="items" :strokeColor="blue" />
  </gmaps-map>
</template>

<script>
  import { gmapsMap, gmapsPolyline, gmapsPolygon } from 'x5-gmaps'

  export default {
    components: { gmapsMap, gmapsPolyline, gmapsPolygon },
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
