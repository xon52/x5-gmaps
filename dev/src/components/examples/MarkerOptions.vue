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
      <p>Marker A Position: {{ positionA }}</p>
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
  position: { lat: -25, lng: 130 },
  icon: require('../marker.png'),
  title: 'Marker A'
}
optionsB = {
  position: { lat: -30, lng: 138 },
  icon: require('../marker2.png'),
  title: 'Marker B',
  opacity: 0.7
}

...

increaseOpacity() {
  const op = this.optionsB.opacity;
  this.optionsB.opacity = op > 0.9 ? 0.5 : op + 0.1;
}
updatePosition(pos) {
  this.positionA = pos
}

...

// Animation must be added after initiation
// because it relies on GMaps to be already loaded
mounted() {
  gmaps()
    .then(GMaps=>this.optionsA.animation = GMaps.Animation.BOUNCE)
}
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap, gmapsMarker } from 'x5-gmaps';
import { mapOptions } from '../../helpers';

export default {
  name: 'ExampleMarkerOptions',
  components: { ExampleWrapper, gmapsMap, gmapsMarker },
  data: () => ({
    mapOptions,
    optionsA: {
      position: { lat: -25, lng: 130 },
      icon: require('../../../public/img/marker.png'),
      title: 'Marker A',
      draggable: true,
      animation: 1
    },
    optionsB: {
      position: { lat: -30, lng: 138 },
      icon: require('../../../public/img/marker2.png'),
      title: 'Marker B',
      opacity: 0.7
    },
    positionA: null
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
