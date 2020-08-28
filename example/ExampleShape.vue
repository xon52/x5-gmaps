<template>
  <example-wrapper title="Rectangles and Circles">
    <div class="instructions">
      <label><input type="checkbox" v-model="editable" /> Editable</label>
      <label><input type="checkbox" v-model="draggable" /> Draggable</label>
    </div>
    <template #description>
      <p>
        We can also add rectangles and circles.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-rectangle
          :bounds="bounds"
          :draggable="draggable"
          :editable="editable"
          @boundsChanged="bounds = $event"
          fillColor="red"
          strokeColor="dodgerblue"
          strokeWeight="5"
        />
        <gmaps-circle
          :center="center"
          :draggable="draggable"
          :editable="editable"
          :radius="radius"
          @centerChanged="centerChanged"
          @drag="dragChanged"
          @radiusChanged="radiusChanged"
          fillColor="yellow"
          strokeColor="green"
          strokeWeight="5"
        />
      </gmaps-map>
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map>
  &lt;gmaps-rectangle
    :bounds="bounds"
    :draggable="draggable"
    :editable="editable"
    @boundsChanged="bounds = $event"
    fillColor="red"
    strokeColor="dodgerblue"
    strokeWeight="5"
  />
  &lt;gmaps-circle
    :center="center"
    :draggable="draggable"
    :editable="editable"
    @centerChanged="center = $event"
    @radiusChanged="radius = $event"
    fillColor="yellow"
    strokeColor="green"
    strokeWeight="5"
  />
&lt;/gmaps-map>

...

bounds: {
  east: 153.12,
  north: -27.44,
  west: 153.00,
  south: -27.58
},

center: {
  lat: -27.479,
  lng: 152.937
},
radius: 5000
          </pre
        >
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './ExampleWrapper'
import { gmapsMap, gmapsRectangle, gmapsCircle } from '../src' // import from 'x5-gmaps' for plugin

export default {
  name: 'ExampleShape',
  components: { ExampleWrapper, gmapsMap, gmapsRectangle, gmapsCircle },
  data: () => ({
    mapOptions: {
      center: { lat: -27.5, lng: 153 },
      zoom: 11,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    },
    draggable: false,
    editable: false,
    bounds: {
      east: 153.12,
      north: -27.44,
      west: 153.0,
      south: -27.58
    },
    center: { lat: -27.479, lng: 152.937 },
    radius: 5000
  }),
  methods: {
    radiusChanged(e) {
      console.log('radius', e)
      this.radius = e
    },
    centerChanged(e) {
      console.log('center', e)
      this.center = e
    },
    dragChanged(e) {
      console.log('drag', e)
    }
  }
}
</script>
