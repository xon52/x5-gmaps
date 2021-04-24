## Data / GeoJSON

![Data / GeoJSON](~@img/readme-geojson.png)

[GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) is an open standard format designed for representing simple geographical features, along with their non-spatial attributes.
It can be used in Google Maps, and now in this libary using two new components: _GmapsData_, and _GmapsDataGeoJson_.

Because of how Google implements this feature, this library limits you to only one _GmapsData_ element per map. That element will take any global styles and emit all the event listeners. The _GmapsDataGeoJson_ is the element where actual GeoJSON data can be added, along with any overriding styles.

The full [Google Maps API for Data](https://developers.google.com/maps/documentation/javascript/reference/data) has not been incorporated (no drawing yet), but it's certainly able to display any GeoJSON you have.

_GmapsData_ supports the following events:
`@click`, `contextmenu`, `@dblclick`, `mousedown`, `mouseout`, `mouseover`, `mouseup`, `rightclick`
(which are most of those [available](https://developers.google.com/maps/documentation/javascript/reference/data#Data-Events))

Each returns Google's `google.maps.data.MouseEvent` which includes the feature hit and latLng.

_GmapsData_ presently only takes an `options` prop which is of type [google.maps.data.StyleOptions](https://developers.google.com/maps/documentation/javascript/reference/data#Data.StyleOptions). This will effectively be the default style for all Features imported into the data. To override this, you need to set the options for the individual Feature in the _GmapsDataGeoJson_ component.

_GmapsDataGeoJson_ does not have events (all events are emited together from the _GmapsData_ if you include it).

_GmapsData_ also only takes an `options` prop which is of type [google.maps.data.StyleOptions](https://developers.google.com/maps/documentation/javascript/reference/data#Data.StyleOptions). This is the override style for the Feature(s) defined in this component..

| Props   |                                                             Type                                                              | Default | Description                                                              |
| :------ | :---------------------------------------------------------------------------------------------------------------------------: | :-----: | :----------------------------------------------------------------------- |
| geoJson |                                                            Object                                                             |    -    | A parsed GeoJSON object                                                  |
| options | [google.maps.data.StyleOptions](https://developers.google.com/maps/documentation/javascript/reference/data#Data.StyleOptions) |    -    | This is the override style for the Feature(s) defined in this component. |

```html
<template>
  <gmaps-map>
    <gmaps-data>
      <gmaps-data-geo-json :geo-json="geoJson" />
      <gmaps-data-geo-json :geo-json="geoJson2" :options="geoJson2Style" />
    </gmaps-data>
  </gmaps-map>
</template>

<script>
  import { gmapsMap, gmapsData, gmapsDataGeoJson } from 'x5-gmaps';

  import geoJson from '../data/geoJsonData.json';
  import geoJsonL from '../data/geoJsonDataL.json';

  export default {
    name: 'ExampleGeoJson',
    components: { gmapsMap, gmapsData, gmapsDataGeoJson },
    data: () => ({
      geoJson,
      geoJsonL,
      geoJsonLStyle: { fillColor: 'black' }
    })
  };
</script>
```
