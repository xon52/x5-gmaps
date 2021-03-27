<template>
  <div class="container">
    <h2>Examples</h2>
    <ul>
      <li v-for="(e, i) in examples" :key="i">
        • <a :title="e.desc" @click="select(i)">{{ e.name }}</a>
      </li>
    </ul>
    <component :is="examples[selected].component" v-if="selected !== null" />
  </div>
</template>

<script>
export default {
  name: 'ExampleApp',
  data: () => ({
    selected: null,
    examples: [
      { name: 'Map', component: () => import('./examples/Map'), desc: 'The core map component' },
      {
        name: 'Map with Options',
        component: () => import('./examples/MapOptions'),
        desc: 'The core map component with some options'
      },
      {
        name: 'Move to Location',
        component: () => import('./examples/SetPosition'),
        desc: 'Set center of map to current location'
      },
      {
        name: 'Markers',
        component: () => import('./examples/Marker'),
        desc: 'Include a collection of markers on the map'
      },
      { name: 'Markers with Options', component: () => import('./examples/MarkerOptions'), desc: 'Fancy markers' },
      {
        name: 'Drop a Marker',
        component: () => import('./examples/MarkerDrop'),
        desc: 'Drop a marker where you click'
      },
      { name: 'InfoWindows', component: () => import('./examples/InfoWindow'), desc: 'An info window component' },
      {
        name: 'DOM Elements / Popup',
        component: () => import('./examples/Popup'),
        desc: 'Adding DOM elements to the map'
      },
      { name: 'Heatmap', component: () => import('./examples/Heatmap'), desc: 'A heatmap component to visualise data' },
      {
        name: 'Weighted Heatmap',
        component: () => import('./examples/HeatmapWeighted'),
        desc: 'A heatmap component with custom weighting to data'
      },
      {
        name: 'Polylines and Polygons',
        component: () => import('./examples/Polyline'),
        desc: 'Polyline and polygon map components'
      },
      {
        name: 'Rectangles and Circles',
        component: () => import('./examples/Shape'),
        desc: 'Rectangle and circle map components'
      },
      {
        name: 'GeoJSON Data',
        component: () => import('./examples/GeoJson'),
        desc: 'An example using the data property of the map for GeoJSON data.'
      }
    ]
  }),
  methods: {
    select(i) {
      this.selected = i
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: underline;
  color: mediumblue;
  cursor: pointer;
}
li {
  width: 33%;
  display: inline-block;
}
@media screen and (max-width: 900px) {
  li {
    width: 50%;
  }
}
@media screen and (max-width: 500px) {
  li {
    width: 100%;
  }
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
