<template>
  <example-wrapper title="Info Windows">
    <div class="instructions">
      <p class="instructions-title">
        While the close button is built into InfoWindows, you can listen to a
        close event (@closed) and access the open function (using Vue refs) to
        re-open.
      </p>
      <span>Close the second InfoWindow and re-open it here:</span>
      <button class="instructions-action" :disabled="!bClosed" @click="openB">
        Re-open
      </button>
    </div>
    <template #description>
      <p>
        As with markers, there are also a few
        <a
          href="https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions"
          target="_blank"
        >
          options
        </a>
        available for InfoWindows
      </p>
      <p>(they also require a position option)</p>
    </template>
    <template #map>
      <gmaps-map :options="mapOptions">
        <gmaps-info-window :options="optionsA">
          <p>
            Any <span style="background: yellow">HTML</span> can<br />go in
            <strong>these</strong>.
          </p>
        </gmaps-info-window>
        <gmaps-info-window
          ref="b"
          :options="optionsB"
          style="background: #bbf0ff"
          @closed="bClosed = true"
        >
          <p>
            Even a whole Vue component<img
              src="../../public/img/marker2.png"
              height="20px"
            />
          </p>
          <p>
            <em>
              (but they're locked in the white Google bubble with a close
              button)
            </em>
          </p>
        </gmaps-info-window>
      </gmaps-map>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './Wrapper';
import { gmapsMap, gmapsInfoWindow } from 'x5-gmaps';
import { mapOptions } from './helpers';

export default {
  name: 'ExampleInfoWindow',
  components: { ExampleWrapper, gmapsMap, gmapsInfoWindow },
  data: () => ({
    mapOptions,
    optionsA: {
      position: { lat: -21, lng: 130 }
    },
    optionsB: {
      position: { lat: -32, lng: 133 }
    },
    bClosed: false
  }),
  methods: {
    openB() {
      this.$refs.b.open();
      this.bClosed = false;
    }
  }
};
</script>
