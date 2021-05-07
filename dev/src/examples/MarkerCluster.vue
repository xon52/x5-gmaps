<template>
  <example-wrapper title="Marker Cluster">
    <div class="instructions">
      <p>
        Number of items:
        <button :disabled="count === 200" @click="updateCount(200)">
          200
        </button>
        <button :disabled="count === 2000" @click="updateCount(2000)">
          2000
        </button>
        <button :disabled="count === 20000" @click="updateCount(20000)">
          20000
        </button>
      </p>
      <p>Current zoom level: {{ zoom }}</p>
      <p>
        MaxZoom (zoom level clustering is disabled):
        {{ clusterOptions.maxZoom }}
      </p>
      <p>
        MinZoom (zoom level further clustering is disabled):
        {{ clusterOptions.minZoom }}
      </p>
      <p>Pin Clicked: {{ pinClicked }}</p>
    </div>
    <template #description>
      <p>
        Markers can also be clustered together on a map.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions" @zoom-changed="zoom = $event">
        <gmaps-cluster :items="items" :options="clusterOptions" @click="test" />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './Wrapper';
import { gmapsMap, gmapsCluster } from 'x5-gmaps';
import { mapOptions } from './helpers';

export default {
  name: 'ExampleCluster',
  components: { ExampleWrapper, gmapsMap, gmapsCluster },
  data: () => ({
    mapOptions,
    clusterOptions: {
      minZoom: 1,
      maxZoom: 7,
      highPercentage: 10,
      lowPercentage: 3
    },
    items: [],
    count: 0,
    pinClicked: null,
    zoom: mapOptions.zoom
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
          lng: -180 + Math.random() * 360,
          id: `Pin_${i}`
        });
    },
    test(e) {
      this.pinClicked = e;
    }
  }
};
</script>
