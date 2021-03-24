<template>
  <example-wrapper title="Drop a Marker on the map">
    <div class="instructions">
      <p class="instructions-title">Click on the map to add a marker</p>
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
    <template #code>
      <div>
        <pre>
&lt;gmaps-map @click="addMarker" />
  &lt;gmaps-marker
    v-for="(m, i) in markers"
    :options="m"
    :key="i"
     @click="removeMarker(i)"
  />
&lt;/gmaps-map>

...

addMarker($event) {
  // Stop last marker from bouncing
  if (this.markers.length) this.markers[this.markers.length - 1].animation = null
  // Add new marker with a bounce
  const position = $event.latLng.toJSON()
  this.markers.push({ position, animation: this.bounce })
},
removeMarker(index) {
  this.markers.splice(index, 1)
}
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap, gmapsMarker, gmaps } from 'x5-gmaps';

export default {
  name: 'ExampleMarkerOptions',
  components: { ExampleWrapper, gmapsMap, gmapsMarker },
  data: () => ({
    mapOptions: {
      center: { lat: -27.47, lng: 153.025 },
      zoom: 12,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    },
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
