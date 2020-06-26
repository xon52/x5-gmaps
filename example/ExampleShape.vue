<template>
  <example-wrapper title="Rectangles and Circles">
    <div class="instructions">
      <label><input type="checkbox" v-model="editable" /> Editable</label>
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
          :editable="editable"
          strokeColor="dodgerblue"
          strokeWeight="5"
          fillColor="red"
          @boundsChanged="bounds = $event"
        />
        <gmaps-circle
          :center="center"
          :radius="radius"
          :editable="editable"
          strokeColor="green"
          strokeWeight="5"
          fillColor="yellow"
          @centerChanged="center = $event"
          @radiusChanged="radius = $event"
        />
      </gmaps-map>
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map>
  &lt;gmaps-rectangle
    :bounds="bounds"
    :editable="editable"
    strokeColor="dodgerblue"
    strokeWeight="5"
    fillColor="red"
    @boundsChanged="bounds = $event"
  />
  &lt;gmaps-circle
    :center="center"
    :editable="editable"
    strokeColor="green"
    strokeWeight="5"
    fillColor="yellow"
    @centerChanged="center = $event"
    @radiusChanged="radius = $event"
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
    editable: false,
    bounds: {
      east: 153.12,
      north: -27.44,
      west: 153.0,
      south: -27.58
    },
    center: { lat: -27.479, lng: 152.937 },
    radius: 5000
  })
}
</script>
