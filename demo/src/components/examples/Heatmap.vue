<template>
  <example-wrapper title="Heatmap">
    <template #description>
      <p>
        We can create heatmaps that depend on concentrations of points.<br />Each
        point requires a lat and lng property.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-heatmap :items="items" />
      </gmaps-map>
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map>
  &lt;gmaps-heatmap :items="items" />
&lt;/gmaps-map>

...

items = [
  { lat: -27.41, lng: 153.01 },
  { lat: -27.42, lng: 153.02 },
  ...,
  { lat: -27.48, lng: 153.08 },
  { lat: -27.49, lng: 153.09 },
]
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap, gmapsHeatmap } from 'x5-gmaps';

export default {
  name: 'ExampleHeatmap',
  components: { ExampleWrapper, gmapsMap, gmapsHeatmap },
  data: () => ({
    mapOptions: {
      center: { lat: -27.5, lng: 153 },
      zoom: 11,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    },
    items: []
  }),
  created() {
    for (let i = 0; i < 200; i++)
      this.items.push({
        lat: -27.5 + Math.random() / 10 - 0.05,
        lng: 153 + Math.random() / 10 - 0.05
      });
  }
};
</script>
