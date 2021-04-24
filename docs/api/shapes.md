## Rectangles / Circles

![Rectangles/Circles](~@img/readme-shapes.png)

Rectangles/circles are placed within Maps and have several props which are derived from Google's [Rectangle Options](https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions) and [Circle Options](https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions).

This component supports the following events:

- `@bounds-changed` _(Only rectangles) returns new bounds_
- `@center-changed` _(Only circles) returns new center_
- `@radius-changed` _(Only circles) returns new radius_
- `@click` _returns [PolyMouseEvent](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent)_
- `@double-click` _returns [PolyMouseEvent](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent)_
- `@drag` _returns [MouseEvent](https://developers.google.com/maps/documentation/javascript/reference/map#MouseEvent)_
- `@drag-end` _returns [MouseEvent](https://developers.google.com/maps/documentation/javascript/reference/map#MouseEvent)_
- `@drag-start` _returns [MouseEvent](https://developers.google.com/maps/documentation/javascript/reference/map#MouseEvent)_
- `@mouseover` _returns [PolyMouseEvent](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent)_
- `@right-click` _returns [PolyMouseEvent](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent)_

| Props          |  Type   |   Default    | Description                                                                                                         |
| :------------- | :-----: | :----------: | :------------------------------------------------------------------------------------------------------------------ |
| bounds         |  Array  | **required** | _(Only rectangles)_ Position of rectangle: `{ east, north, south, west }` (Type: `google.maps.LatLngBoundsLiteral`) |
| center         | Object  | **required** | _(Only circles)_ The center of circle: `{ lat: number, lng: number }` (Type: `google.maps.LatLngLiteral`)           |
| radius         | Number  | **required** | _(Only circles)_ The radius in meters on the Earth's surface                                                        |
| clickable      | Boolean |    `true`    | Indicates whether this Polyline handles mouse events                                                                |
| draggable      | Boolean |   `false`    | Allow the shape to be dragged over the map                                                                          |
| editable       | Boolean |   `false`    | Allow editing the shape by dragging the control points                                                              |
| fillColor      | String  |    black     | The fill color \*\*\*                                                                                               |
| fillOpacity    | Number  |    `0.3`     | The fill opacity between 0.0 and 1.0                                                                                |
| strokeColor    | String  |    black     | The stroke color \*\*\*                                                                                             |
| strokePosition | Number  |     `0`      | The stroke position along the path (0 = CENTER / 1 = INSIDE / 2 = OUTSIDE)                                          |
| strokeOpacity  | Number  |    `1.0`     | The stroke opacity between 0.0 and 1.0                                                                              |
| strokeWeight   | Number  |      -       | The stroke width in pixels                                                                                          |
| visible        | Boolean |    `true`    | Whether this polyline is visible on the map                                                                         |
| zIndex         | Number  |     `0`      | The zIndex compared to other polys                                                                                  |

\*\*\* All CSS3 colors are supported except for extended named colors

```html
<template>
  <gmaps-map>
    <gmaps-rectangle :bounds="bounds" :strokeColor="blue" :fillColor="red" />
    <gmaps-circle
      :center="center"
      :radius="radius"
      :strokeColor="green"
      :fillColor="yellow"
    />
  </gmaps-map>
</template>

<script>
  import { gmapsMap, gmapsRectangle, gmapsCircle } from 'x5-gmaps';

  export default {
    components: { gmapsMap, gmapsPolyline, gmapsPolygon },
    data: () => ({
      bounds: {
        east: 153.12,
        north: -27.44,
        west: 153.0,
        south: -27.58
      },
      center: { lat: -27.479, lng: 152.937 },
      radius: 5000
    })
  };
</script>
```
