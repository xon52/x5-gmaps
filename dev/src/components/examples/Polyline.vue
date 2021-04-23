<template>
  <example-wrapper title="Polylines and Polygons">
    <div class="instructions">
      <p class="instructions-title">
        Polygons are basically the same as polylines but are able to be filled
        in.
      </p>

      <button class="instructions-action" @click="polygon = !polygon">
        Switch to {{ polygon ? 'Polyline' : 'Polygon' }}
      </button>
      <button class="instructions-action" @click="generatePoints">
        Regenerate points
      </button>
      <label><input v-model="editable" type="checkbox" /> Editable</label>
    </div>
    <template #description>
      <p>We can also add polylines.</p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-polygon
          v-if="polygon"
          :editable="editable"
          :path="items"
          fill-color="red"
          stroke-color="dodgerblue"
          stroke-weight="5"
          @pathChanged="items = $event"
        />
        <gmaps-polyline
          v-else
          :editable="editable"
          :icons="icons"
          :path="items"
          stroke-color="dodgerblue"
          stroke-weight="5"
          @pathChanged="items = $event"
        />
      </gmaps-map>
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map>
  &lt;gmaps-polyline
    :editable="editable"
    :icons="icons"
    :path="items"
    stroke-color="dodgerblue"
    stroke-weight="5"
    @pathChanged="items = $event"
  />
&lt;/gmaps-map>

...

icon = {
  path: 'M -2,0 0,-2 2,0 0,2 z',
  strokeColor: '#F00',
  fillColor: '#F00',
  fillOpacity: 1
}

items = [
  { lat: -32, lng: 125 },
  { lat: -34, lng: 128 },
  ...,
  { lat: -28, lng: 126 },
  { lat: -30, lng: 130 },
]

icons: [
  { icon, offset: '0%' },
  { icon, offset: '100%' }
]
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap, gmapsPolyline, gmapsPolygon } from 'x5-gmaps';
import { mapOptions } from '../../helpers';

const icon = {
  path: 'M -2,0 0,-2 2,0 0,2 z',
  strokeColor: '#F00',
  fillColor: '#F00',
  fillOpacity: 1
};

export default {
  name: 'ExamplePolyline',
  components: { ExampleWrapper, gmapsMap, gmapsPolyline, gmapsPolygon },
  data: () => ({
    mapOptions,
    polygon: false,
    editable: false,
    items: [],
    icons: [
      { icon, offset: '0%' },
      { icon, offset: '100%' }
    ]
  }),
  created() {
    this.generatePoints();
  },
  methods: {
    generatePoints() {
      const temp = [];
      for (let i = 0; i < 5; i++)
        temp.push({
          lat: -32 + Math.random() * 15,
          lng: 120 + Math.random() * 25
        });
      this.items = temp;
    }
  }
};
</script>
