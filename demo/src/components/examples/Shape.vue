<template>
  <example-wrapper title="Rectangles and Circles">
    <div class="instructions">
      <label><input v-model="editable" type="checkbox" /> Editable</label>
      <label><input v-model="draggable" type="checkbox" /> Draggable</label>
    </div>
    <template #description>
      <p>We can also add rectangles and circles.</p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-rectangle
          :bounds="bounds"
          :draggable="draggable"
          :editable="editable"
          fill-color="red"
          stroke-color="dodgerblue"
          stroke-weight="5"
          @boundsChanged="bounds = $event"
        />
        <gmaps-circle
          :center="center"
          :draggable="draggable"
          :editable="editable"
          :radius="radius"
          fill-color="yellow"
          stroke-color="green"
          stroke-weight="5"
          @centerChanged="centerChanged"
          @radiusChanged="radiusChanged"
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
    fill-color="red"
    stroke-color="dodgerblue"
    stroke-weight="5"
    @boundsChanged="bounds = $event"
  />
  &lt;gmaps-circle
    :center="center"
    :draggable="draggable"
    :editable="editable"
    :radius="radius"
    fill-color="yellow"
    stroke-color="green"
    stroke-weight="5"
    @centerChanged="centerChanged"
    @radiusChanged="radiusChanged"
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
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap, gmapsRectangle, gmapsCircle } from 'x5-gmaps';

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
      this.radius = e;
    },
    centerChanged(e) {
      this.center = e;
    }
  }
};
</script>
