<template>
  <example-wrapper title="Minimal Map">
    <template #description>
      <p>
        This is just a map with the minimal options required (a center and a zoom level)
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions" />
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map :options="mapOptions"/>

...

mapOptions = {
    center: { lat: -27.47, lng: 153.025 },
    zoom: 12
}
          </pre
        >
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './ExampleWrapper'
import { gmapsMap } from '../dist'

export default {
  name: 'ExampleMap',
  components: { ExampleWrapper, gmapsMap },
  data: () => ({
    mapOptions: {
      center: { lat: -27.47, lng: 153.025 },
      zoom: 12
    }
  })
}
</script>
