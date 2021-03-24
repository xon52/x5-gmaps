<template>
  <example-wrapper title="Set center of map to current location">
    <div class="instructions">
      <p class="instructions-title">
        Press the button below to center the map on your location. Make sure you
        grant access to your location if asked!
      </p>
      <button class="instructions-action" @click="getLocation">
        Move to my location
      </button>
      <span>Center: {{ center }}</span>
    </div>
    <template #description>
      <p>
        You can add many
        <a
          href="https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions"
          target="_blank"
        >
          options
        </a>
        for the map in an options property object.<br />e.g. All controls turned
        off
      </p>
    </template>
    <template #map>
      <gmaps-map ref="map" :options="mapOptions" />
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map  :options="mapOptions" />
&lt;button @click="getLocation">Move to my location&lt;/button>

...

mapOptions = {
    center: { lat: -27.47, lng: 153.025 },
    zoom: 14,
    fullscreenControl: false,
    mapTypeControl: false,
    rotateControl: false,
    scaleControl: false,
    streetViewControl: false,
    zoomControl: false
}

...

getLocation() {
  if (navigator.geolocation) navigator.geolocation.getCurrentPosition(this.setLocation, this.locationError)
  else alert('Geolocation is not supported by this browser.')
},
setLocation(pos) {
  this.mapOptions = { ...this.mapOptions, center: { lat: pos.coords.latitude, lng: pos.coords.longitude } }
  this.center = { lat: pos.coords.latitude, lng: pos.coords.longitude }
},
locationError(error) {
  if (error.PERMISSION_DENIED) alert('User denied the request for Geolocation.')
  else if (error.POSITION_UNAVAILABLE) alert('Location information is unavailable.')
  else if (error.TIMEOUT) alert('The request to get user location timed out.')
  else alert('An unknown error occurred.')
}
        </pre>
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from '../Wrapper';
import { gmapsMap } from 'x5-gmaps';

export default {
  name: 'ExampleMapOptions',
  components: { ExampleWrapper, gmapsMap },
  data: () => ({
    center: null,
    mapOptions: {
      center: { lat: -27.47, lng: 153.025 },
      zoom: 12,
      fullscreenControl: false,
      mapTypeControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false
    }
  }),
  methods: {
    getLocation() {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(
          this.setLocation,
          this.locationError
        );
      else alert('Geolocation is not supported by this browser.');
    },
    setLocation(pos) {
      this.mapOptions = {
        ...this.mapOptions,
        center: { lat: pos.coords.latitude, lng: pos.coords.longitude }
      };
      this.center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    },
    locationError(error) {
      if (error.PERMISSION_DENIED)
        alert('User denied the request for Geolocation.');
      else if (error.POSITION_UNAVAILABLE)
        alert('Location information is unavailable.');
      else if (error.TIMEOUT)
        alert('The request to get user location timed out.');
      else alert('An unknown error occurred.');
    }
  }
};
</script>
