<template>
  <example-wrapper title="Marker Cluster">
    <div class="instructions">
      <p>
        Number of items:
        <button :disabled="count === 200" @click="updateCount(200)">200</button>
        <button :disabled="count === 2000" @click="updateCount(2000)">
          2000
        </button>
        <button :disabled="count === 20000" @click="updateCount(20000)">
          20000
        </button>
      </p>
    </div>
    <template #description>
      <p>
        Markers can also be clustered together on a map.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-cluster :items="items" />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './Wrapper';
import { gmapsMap } from 'x5-gmaps';
import gmapsCluster from '../../../src/components/Cluster';
import { mapOptions } from './helpers';

export default {
  name: 'ExampleHeatmap',
  components: { ExampleWrapper, gmapsMap, gmapsCluster },
  data: () => ({
    mapOptions,
    items: [],
    count: 0
  }),
  mounted() {
    this.updateCount(2000);
  },
  methods: {
    updateCount(c) {
      this.count = c;
      this.items = [];
      for (let i = 0; i < c; i++)
        this.items.push({
          lat: -85 + Math.random() * 170,
          lng: -180 + Math.random() * 360
        });
    }
  }
};
</script>
