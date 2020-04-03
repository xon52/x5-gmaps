<template>
  <example-wrapper title="Markers">
    <template #description>
      <p>Inside that map we can add Google Map objects like the simple marker.<br />As a minimum, markers require a position object in its options.</p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-marker :options="optionsA" />
        <gmaps-marker :options="optionsB" />
      </gmaps-map>
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map lat="-27.47" lng="153.025" zoom="14">
  &lt;gmaps-marker :options="optionsA" />
  &lt;gmaps-marker :options="optionsB" />
&lt;/gmaps-map>

...

optionsA = { position: { lat: -27.46, lng: 153.02 } }
optionsB = { position: { lat: -27.48, lng: 153.03 } }
          </pre
        >
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './ExampleWrapper'
import { gmapsMap, gmapsMarker } from '../dist'

export default {
  name: 'ExampleMarker',
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
    optionsA: { position: { lat: -27.46, lng: 153.02 } },
    optionsB: { position: { lat: -27.48, lng: 153.03 } }
  })
}
</script>
