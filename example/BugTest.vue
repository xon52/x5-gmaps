<template>
  <div style="height: 500px">
    <gmaps-map :options="mapOptions">
      <gmaps-marker v-for="(marker, markerIndex) in items" :key="'marker-' + markerIndex" :options="marker" />
    </gmaps-map>
  </div>
</template>

<script>
import { gmapsMap, gmapsMarker } from '@/' // import from 'x5-gmaps' for plugin

export default {
  name: 'BugTest',
  components: { gmapsMap, gmapsMarker },
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
    items: [],
    markerSize: null
  }),
  created() {
    this.$GMaps().then((GMaps) => {
      const markerSize = 30

      for (let i = 0; i < 5; i++)
        this.items.push({
          position: {
            lat: -27.5 + Math.random() / 10 - 0.05,
            lng: 153 + Math.random() / 10 - 0.05
          },
          icon: {
            url: 'https://cdn0.iconfinder.com/data/icons/entypo/89/small18-128.png',
            size: new GMaps.Size(markerSize, markerSize),
            scaledSize: new GMaps.Size(markerSize, markerSize),
            anchor: new GMaps.Point(markerSize / 2, 0)
          }
        })
    })
  }
}
</script>
