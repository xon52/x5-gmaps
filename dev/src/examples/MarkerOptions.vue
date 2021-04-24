<template>
  <example-wrapper title="Markers with Options">
    <div class="instructions">
      <p class="instructions-title">
        Click on the flag to increase it's opacity (and it resets after being
        100%)
      </p>
      <p class="instructions-title">
        Move the bouncing pin to update its position data below
      </p>
      <p>
        {{
          `Lat: ${positionA.lat.toFixed(2)} | Lng: ${positionA.lng.toFixed(2)}`
        }}
      </p>
    </div>
    <template #description>
      <p>
        As with the map, there are also many
        <a
          href="https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions"
          target="_blank"
        >
          options
        </a>
        available for markers.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-marker :options="optionsA" @move="updatePosition" />
        <gmaps-marker :options="optionsB" @click="increaseOpacity" />
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
    optionsA: {
      position: { lat: -25, lng: 130 },
      icon: require('../../public/img/marker.png'),
      title: 'Marker A',
      draggable: true,
      animation: 1
    },
    optionsB: {
      position: { lat: -30, lng: 138 },
      icon: require('../../public/img/marker2.png'),
      title: 'Marker B',
      opacity: 0.7
    },
    positionA: { lat: -25, lng: 130 }
  }),
  methods: {
    increaseOpacity() {
      const op = this.optionsB.opacity;
      this.optionsB.opacity = op > 0.9 ? 0.5 : op + 0.1;
    },
    updatePosition(pos) {
      this.positionA = pos;
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
