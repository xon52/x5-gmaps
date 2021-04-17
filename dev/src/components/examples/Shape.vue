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
  lat: -28,
  lng: 125
},
radius: 500000
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap, gmapsRectangle, gmapsCircle } from 'x5-gmaps'
import { mapOptions } from '../../helpers';

export default {
  name: 'ExampleShape',
  components: { ExampleWrapper, gmapsMap, gmapsRectangle, gmapsCircle },
  data: () => ({
    mapOptions,
    draggable: false,
    editable: false,
    bounds: {
      east: 145,
      north: -20,
      west: 132,
      south: -27
    },
    center: { lat: -28, lng: 125 },
    radius: 500000
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
