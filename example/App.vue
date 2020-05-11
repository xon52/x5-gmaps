<template>
  <div class="wrapper">
    <div class="center">
      <img src="./img/logo.svg" width="300" />
      <h1>x5-gmaps Example</h1>
      <p>
        I have also written a tutorial on using this package to create a
        <a
          href="https://medium.com/javascript-in-plain-english/making-a-covid-map-using-vue-google-maps-89eb70a9f089"
          target="_blank"
          >COVID Heatmap</a
        >.
      </p>
    </div>
    <example-map />
    <example-map-options />
    <example-marker />
    <example-marker-options />
    <example-info-window />
    <example-popup />
    <example-heatmap />
    <example-heatmap-weighted />
  </div>
</template>

<script>
import ExampleMap from './ExampleMap'
import ExampleMapOptions from './ExampleMapOptions'
import ExampleMarker from './ExampleMarker'
import ExampleMarkerOptions from './ExampleMarkerOptions'
import ExampleInfoWindow from './ExampleInfoWindow'
import ExamplePopup from './ExamplePopup'
import ExampleHeatmap from './ExampleHeatmap'
import ExampleHeatmapWeighted from './ExampleHeatmapWeighted'

export default {
  name: 'Example-App',
  components: {
    ExampleMap,
    ExampleMapOptions,
    ExampleMarker,
    ExampleMarkerOptions,
    ExampleInfoWindow,
    ExamplePopup,
    ExampleHeatmap,
    ExampleHeatmapWeighted
  }
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 800px;
}
.center {
  text-align: center;
}
</style>

<style>
.instructions {
  border: 1px silver solid;
  background: #eee;
  padding: 10px;
}
.instructions-title {
  color: dodgerblue;
}
.instructions-title::before {
  content: 'ℹ ';
}
.instructions-action {
  display: inline-block;
  margin: 0 10px;
}
</style>
