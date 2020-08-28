<template>
  <example-wrapper title="Polylines and Polygons">
    <div class="instructions">
      <p class="instructions-title">Polygons are basically the same as polylines but are able to be filled in.</p>

      <button class="instructions-action" @click="polygon = !polygon">
        Switch to {{ polygon ? 'Polyline' : 'Polygon' }}
      </button>
      <button class="instructions-action" @click="generatePoints">Regenerate points</button>
      <label><input type="checkbox" v-model="editable" /> Editable</label>
    </div>
    <template #description>
      <p>
        We can also add polylines.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-polygon
          v-if="polygon"
          :editable="editable"
          :path="items"
          @pathChanged="items = $event"
          fillColor="red"
          strokeColor="dodgerblue"
          strokeWeight="5"
        />
        <gmaps-polyline
          v-else
          :editable="editable"
          :icons="icons"
          :path="items"
          @pathChanged="items = $event"
          strokeColor="dodgerblue"
          strokeWeight="5"
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
    @pathChanged="items = $event"
    strokeColor="dodgerblue"
    strokeWeight="5"
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
  { lat: -27.41, lng: 153.01 },
  { lat: -27.42, lng: 153.02 },
  ...,
  { lat: -27.48, lng: 153.08 },
  { lat: -27.49, lng: 153.09 },
]

icons: [
  { icon, offset: '0%' },
  { icon, offset: '100%' }
]
          </pre
        >
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './ExampleWrapper'
import { gmapsMap, gmapsPolyline, gmapsPolygon } from '../src' // import from 'x5-gmaps' for plugin

const icon = {
  path: 'M -2,0 0,-2 2,0 0,2 z',
  strokeColor: '#F00',
  fillColor: '#F00',
  fillOpacity: 1
}

export default {
  name: 'ExamplePolyline',
  components: { ExampleWrapper, gmapsMap, gmapsPolyline, gmapsPolygon },
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
    polygon: false,
    editable: false,
    items: [],
    icons: [
      { icon, offset: '0%' },
      { icon, offset: '100%' }
    ]
  }),
  methods: {
    generatePoints() {
      const temp = []
      for (let i = 0; i < 5; i++) temp.push({ lat: -27.6 + Math.random() / 5, lng: 152.9 + Math.random() / 5 })
      this.items = temp
    }
  },
  created() {
    this.generatePoints()
  }
}
</script>
