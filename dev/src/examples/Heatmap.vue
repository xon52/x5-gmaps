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
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './Wrapper';
import { gmapsMap, gmapsHeatmap } from 'x5-gmaps';
import { mapOptions } from './helpers';

export default {
  name: 'ExampleHeatmap',
  components: { ExampleWrapper, gmapsMap, gmapsHeatmap },
  data: () => ({
    mapOptions,
    items: []
  }),
  created() {
    for (let i = 0; i < 200; i++)
      this.items.push({
        lat: -32 + Math.random() * 15,
        lng: 120 + Math.random() * 25
      });
  }
};
</script>
