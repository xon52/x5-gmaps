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
      <p class="instructions-title">
        The Australian Flag is a demonstration of how to show and scale an external image as a marker.
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
        <gmaps-marker :options="optionsC" />
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './Wrapper';
import { gmapsMap, gmapsMarker, gmaps } from 'x5-gmaps';
import { mapOptions } from './helpers';

export default {
  name: 'ExampleMarkerOptions',
  components: { ExampleWrapper, gmapsMap, gmapsMarker },
  data: () => ({
    mapOptions,
    optionsA: {
      position: { lat: -25, lng: 130 },
      icon: require('../../public/img/marker.png'),
      title: 'Drag Me!',
      draggable: true,
      animation: 1
    },
    optionsB: {
      position: { lat: -30, lng: 138 },
      icon: require('../../public/img/marker2.png'),
      title: 'Click me!',
      opacity: 0.7
    },
    optionsC: {
      position: { lat: -30, lng: 124 },
      title: 'Custom Image'
    },
    positionA: { lat: -25, lng: 130 }
  }),
  async mounted() {
    gmaps().then(
      (x) =>
        (this.optionsC.icon = {
          url: 'https://www.seekpng.com/png/detail/122-1228243_australian-flag-png-australia-flag-png.png',
          scaledSize: new x.Size(80, 50),
          origin: new x.Point(10, 10)
        })
    );
  },
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
