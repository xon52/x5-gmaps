<template>
  <example-wrapper title="Markers with Options">
    <div class="instructions">
      <p class="instructions-title">Click on the flag to increase it's opacity (and it resets after being 100%)</p>
      <p class="instructions-title">Move the bouncing pin to update its position data below</p>
      <p>Marker A Position: {{ positionA }}</p>
    </div>
    <template #description>
      <p>
        As with the map, there are also many
        <a
          href="https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions"
          target="_blank"
          >options</a
        >
        available for markers.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-marker :options="optionsA" @move="updatePosition" />
        <gmaps-marker :options="optionsB" @click="increaseOpacity" />
      </gmaps-map>
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map />
  &lt;gmaps-marker
    :options="optionsA"
    @move="updatePosition"
  />
  &lt;gmaps-marker
    :options="optionsB"
    @click="increaseOpacity"
  />
&lt;/gmaps-map>

...

optionsA = {
  position: { lat: -27.46, lng: 153.02 },
  icon: require('./marker.png'),
  title: 'Marker A'
}
optionsB = {
  position: { lat: -27.48, lng: 153.03 },
  icon: require('./marker2.png'),
  title: 'Marker B',
  opacity: 0.7
}

...

increaseOpacity() {
  const op = this.optionsB.opacity * 10
  this.optionsB.opacity = Math.round(op > 9 ? 5 : op + 1) / 10
}
updatePosition(pos) {
  this.positionA = pos
}

...

// Animation must be added after initiation
// because it relies on GMaps to be already loaded
mounted() {
  this.$GMaps()
    .then(GMaps=>this.optionsA.animation = GMaps.Animation.BOUNCE)
}
          </pre
        >
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './ExampleWrapper'
import { gmapsMap, gmapsMarker } from '../src' // import from 'x5-gmaps' for plugin

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
    optionsA: {
      position: { lat: -27.46, lng: 153.02 },
      icon: require('./img/marker.png'),
      title: 'Marker A',
      draggable: true
    },
    optionsB: {
      position: { lat: -27.48, lng: 153.03 },
      icon: require('./img/marker2.png'),
      title: 'Marker B',
      opacity: 0.7
    },
    positionA: null
  }),
  methods: {
    increaseOpacity() {
      const op = this.optionsB.opacity * 10
      this.optionsB.opacity = Math.round(op > 9 ? 5 : op + 1) / 10
    },
    updatePosition(pos) {
      this.positionA = pos
    }
  },
  mounted() {
    this.$GMaps().then(GMaps => (this.optionsA.animation = GMaps.Animation.BOUNCE))
  }
}
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
