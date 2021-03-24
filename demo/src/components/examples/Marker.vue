<template>
  <example-wrapper title="Markers">
    <template #description>
      <p>
        Inside that map we can add Google Map objects like the simple marker.<br />As
        a minimum, markers require a position object in its options prop or as a
        prop itself.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-marker v-for="(item, i) in items" :key="i" :position="item" />
      </gmaps-map>
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map>
  &lt;gmaps-marker
    v-for="(item, i) in items"
    :key="i"
    :position="item.position"
  />
&lt;/gmaps-map>

...

items = [
  { lat: -27.41, lng: 153.01 },
  { lat: -27.42, lng: 153.02 },
  ...,
  { lat: -27.48, lng: 153.08 },
  { lat: -27.49, lng: 153.09 },
]
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap, gmapsMarker } from 'x5-gmaps';

export default {
  name: 'ExampleMarker',
  components: { ExampleWrapper, gmapsMap, gmapsMarker },
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
    items: []
  }),
  created() {
    for (let i = 0; i < 20; i++)
      this.items.push({
        lat: -27.5 + Math.random() / 10 - 0.05,
        lng: 153 + Math.random() / 10 - 0.05
      });
  }
};
</script>
