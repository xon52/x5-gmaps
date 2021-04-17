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
  { lat: -32, lng: 125 },
  { lat: -34, lng: 128 },
  ...,
  { lat: -28, lng: 126 },
  { lat: -30, lng: 130 },
]
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap, gmapsMarker } from 'x5-gmaps'
import { mapOptions } from '../../helpers';

export default {
  name: 'ExampleMarker',
  components: { ExampleWrapper, gmapsMap, gmapsMarker },
  data: () => ({
    mapOptions,
    items: []
  }),
  created() {
    for (let i = 0; i < 20; i++)
      this.items.push({
        lat: -34 + Math.random() * 15,
        lng: 120 + Math.random() * 25
      });
  }
};
</script>
