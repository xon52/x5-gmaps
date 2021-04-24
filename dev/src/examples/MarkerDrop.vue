<template>
  <example-wrapper title="Drop a Marker on the map">
    <div class="instructions">
      <p class="instructions-title">Click on the map to add a marker.</p>
      <p class="instructions-title">Click on a marker to remove it.</p>
    </div>
    <template #map>
      <gmaps-map :options="mapOptions" @click="addMarker">
        <gmaps-marker
          v-for="(m, i) in markers"
          :key="i"
          :options="m"
          @click="removeMarker(i)"
        />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './Wrapper';
import { gmapsMap, gmapsMarker } from 'x5-gmaps';
import { mapOptions } from './helpers';

export default {
  name: 'ExampleMarkerOptions',
  components: { ExampleWrapper, gmapsMap, gmapsMarker },
  data: () => ({
    mapOptions,
    markers: []
  }),
  methods: {
    addMarker($event) {
      // Stop last marker from bouncing
      if (this.markers.length)
        this.markers[this.markers.length - 1].animation = null;
      // Add new marker with a bounce
      const position = $event.latLng.toJSON();
      this.markers.push({ position, animation: 1 });
    },
    removeMarker(index) {
      this.markers.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.eventsExample {
  border: 1px silver solid;
  background: #eee;
  padding: 10px;
}
.eventsExample p {
  display: inline-block;
}
</style>
