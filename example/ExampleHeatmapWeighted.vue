<template>
  <example-wrapper title="Weighted Heatmap">
    <template #description>
      <p>
        Each data point can also be given a weighting which will determine how "hot" that point is.<br />When using this, make sure you play around with the other props as it can be a little tricky to getting it looking good 👌.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-heatmap :items="items" weightProp="weight" radius="10" :dissipating="false" maxIntensity="800" />
      </gmaps-map>
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map>
  &lt;gmaps-heatmap
    :items="items"
    :dissipating="false"
    weightProp="weight"
    radius="10"
    maxIntensity="800" />
&lt;/gmaps-map>

...

items = [
  { lat: 12, lng: 107, weight: 249 },
  { lat: -10, lng: 61, weight: 834 },
  ...,
  { lat: -50, lng: 150, weight: 20 },
  { lat: 74, lng: -75, weight: 563 },
]
          </pre
        >
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './ExampleWrapper'
import { gmapsMap, gmapsHeatmap } from '../src' // import from 'x5-gmaps' for plugin

export default {
  name: 'ExampleHeatmapWeighted',
  components: { ExampleWrapper, gmapsMap, gmapsHeatmap },
  data: () => ({
    mapOptions: {
      center: { lat: 20, lng: 0 },
      zoom: 1,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    },
    items: []
  }),
  created() {
    for (let i = 0; i < 200; i++)
      this.items.push({
        lat: -50 + Math.random() * 130,
        lng: -180 + Math.random() * 360,
        weight: Math.ceil(Math.random() * 1000)
      })
  }
}
</script>
