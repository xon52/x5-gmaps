<template>
  <example-wrapper title="Map with options and events">
    <div class="instructions">
      <p class="instructions-title">
        Move the map to see a live update of its center.
      </p>
      <button class="instructions-action" @click="reset">
        Reset
      </button>
      <span>Center: {{ center }}</span>
    </div>
    <template #description>
      <p>
        You can add many
        <a
          href="https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions"
          target="_blank"
        >
          options
        </a>
        for the map in an options property object.<br />e.g. All controls turned
        off
      </p>
    </template>
    <template #map>
      <gmaps-map
        ref="map"
        :options="mapOptions"
        @centerChanged="centerChanged"
      />
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './Wrapper';
import { gmapsMap } from 'x5-gmaps';

export default {
  name: 'ExampleMapOptions',
  components: { ExampleWrapper, gmapsMap },
  data: () => ({
    center: { lat: -27.47, lng: 153.025 },
    mapOptions: {
      center: { lat: -27.47, lng: 153.025 },
      zoom: 12,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    }
  }),
  methods: {
    centerChanged(center) {
      this.center = center.toJSON();
    },
    reset() {
      this.mapOptions = { ...this.mapOptions };
    }
  }
};
</script>
