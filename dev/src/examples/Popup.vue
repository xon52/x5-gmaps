<template>
  <example-wrapper title="DOM Elements / Popups">
    <template #description>
      <p>
        <a
          href="https://developers.google.com/maps/documentation/javascript/reference/overlay-view"
          target="_blank"
        >
          DOM Elements
        </a>
        are basically anything you want to go on the map.
      </p>
      <p>
        They are not standard and have to be created from the
        google.maps.OverlayView class, which can be a little tricky.
      </p>
      <p>
        I made my own borderless InfoWindow with no close button (Popup) and
        you're encouraged to check out
        <a
          href="https://developers.google.com/maps/documentation/javascript/examples/overlay-popup"
          target="_blank"
        >
          Google's example
        </a>
        of how to do this. Also check out my source code to see how I did it if
        you need to see how it's integrated.
      </p>
      <p>
        My popup class requires a 'position' property, and also takes
        background, height, and width properties.
      </p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-popup :position="{ lat: -25, lng: 130 }" background="#BBF0FF">
          {{ text }}
        </gmaps-popup>
        <gmaps-popup :position="{ lat: -30, lng: 138 }" height="100px;">
          <button @click="text = 'Aussie Aussie Aussie'">Anything can</button>
          <br />
          <button @click="text = 'Oi Oi Oi'">Go here</button>
        </gmaps-popup>
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './Wrapper';
import { gmapsMap, gmapsPopup } from 'x5-gmaps';
import { mapOptions } from './helpers';

export default {
  name: 'ExamplePopup',
  components: { ExampleWrapper, gmapsMap, gmapsPopup },
  data: () => ({
    mapOptions,
    text: 'This is just text'
  })
};
</script>
