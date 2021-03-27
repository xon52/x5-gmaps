<template>
  <example-wrapper title="GeoJSON Data in a Map">
    <template #description>
      <p>
        This map uses the GmapsData and GmapsDataGeoJson components to display
        <a href="https://en.wikipedia.org/wiki/GeoJSON" target="_blank">
          GeoJSON
        </a>
        data.
      </p>
      <h3>
        This is an advanced component and requires some reading of how
        <a
          href="https://developers.google.com/maps/documentation/javascript/reference/data"
          target="_blank"
        >
          Google does it
        </a>
        and maybe some code diving for how it's been implemented here.
      </h3>
      <p>
        You do not have to nest GmapsDataGeoJson's in GmapsData like in this
        example, but there can only be one GmapsData per map (and that controls
        the provided mouse events).
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-data :options="applyColor" @click="handleClick">
          <gmaps-data-geo-json :geo-json="geoJson" />
          <gmaps-data-geo-json :geo-json="geoJsonL" :options="geoJsonLStyle" />
        </gmaps-data>
      </gmaps-map>
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map :options="mapOptions">
  &lt;gmaps-data @click="handleClick" :options="applyColor">
    &lt;gmaps-data-geo-json :geo-json="geoJson" />
    &lt;gmaps-data-geo-json :geo-json="geoJsonL" :options="geoJsonLStyle" />
  &lt;/gmaps-data>
&lt;/gmaps-map>

...

import geoJson from 'path/to/geoJsonData.json';
import geoJsonL from 'path/to/geoJsonDataL.json';

...

data: () => ({
  mapOptions,
  geoJson,
  geoJsonL,
  geoJsonLStyle: {
    clickable: false,
    fillColor: 'black',
    fillOpacity: 1,
    strokeColor: 'red',
    strokeWeight: 3,
    strokeOpacity: 1
  }
}),
methods: {
  handleClick(e) {
    console.log('data', e);
  },
  applyColor: (feature) => ({
    fillColor: feature.getProperty('color'),
    strokeWeight: 1
  })
}
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap, gmapsData, gmapsDataGeoJson } from 'lib'; // import from 'x5-gmaps' for plugin
import { mapOptions } from '../../helpers';

import geoJson from '../../../public/assets/geoJsonData.js'; // Can be JSON - just JS because of Webpack build
import geoJsonL from '../../../public/assets/geoJsonDataL.js'; // Can be JSON - just JS because of Webpack build

export default {
  name: 'ExampleGeoJson',
  components: { ExampleWrapper, gmapsMap, gmapsData, gmapsDataGeoJson },
  data: () => ({
    mapOptions,
    geoJson,
    geoJsonL,
    geoJsonLStyle: {
      clickable: false,
      fillColor: 'black',
      fillOpacity: 1,
      strokeColor: 'red',
      strokeWeight: 3,
      strokeOpacity: 1
    }
  }),
  methods: {
    handleClick(e) {
      console.log('data', e); // eslint-disable-line no-console
    },
    applyColor: (feature) => ({
      fillColor: feature.getProperty('color'),
      strokeWeight: 1
    })
  }
};
</script>
