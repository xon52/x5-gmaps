<template>
  <example-wrapper title="Weighted Heatmap">
    <template #description>
      <p>
        Each data point can also be given a weighting which will determine how
        "hot" that point is.<br />When using this, make sure you play around
        with the other props as it can be a little tricky to getting it looking
        good 👌.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-heatmap
          :dissipating="false"
          :items="items"
          max-intensity="800"
          radius="10"
          weight-prop="weight"
        />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './Wrapper';
import { gmapsMap, gmapsHeatmap } from 'x5-gmaps';
import { mapOptions } from './helpers';

export default {
  name: 'ExampleHeatmapWeighted',
  components: { ExampleWrapper, gmapsMap, gmapsHeatmap },
  data: () => ({
    mapOptions,
    items: []
  }),
  created() {
    for (let i = 0; i < 50; i++)
      this.items.push({
        lat: -38 + Math.random() * 30,
        lng: 118 + Math.random() * 30,
        weight: Math.ceil(Math.random() * 1000)
      });
  }
};
</script>
