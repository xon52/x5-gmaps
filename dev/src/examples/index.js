export default [
  {
    id: 'map',
    name: 'Map',
    component: () => import('./Map.vue'),
    desc: 'The core map component'
  },
  {
    id: 'map-with-options',
    name: 'Map with Options',
    component: () => import('./MapOptions.vue'),
    desc: 'The core map component with some options'
  },
  {
    id: 'move-to-location',
    name: 'Move to Location',
    component: () => import('./SetPosition.vue'),
    desc: 'Set center of map to current location'
  },
  {
    id: 'markers',
    name: 'Markers',
    component: () => import('./Marker.vue'),
    desc: 'Include a collection of markers on the map'
  },
  {
    id: 'markers-with-options',
    name: 'Markers with Options',
    component: () => import('./MarkerOptions.vue'),
    desc: 'Fancy markers'
  },
  {
    id: 'drop-a-marker',
    name: 'Drop a Marker',
    component: () => import('./MarkerDrop.vue'),
    desc: 'Drop a marker where you click'
  },
  {
    id: 'info-windows',
    name: 'InfoWindows',
    component: () => import('./InfoWindow.vue'),
    desc: 'An info window component'
  },
  {
    id: 'popup',
    name: 'DOM Elements / Popup',
    component: () => import('./Popup.vue'),
    desc: 'Adding DOM elements to the map'
  },
  {
    id: 'heatmap',
    name: 'Heatmap',
    component: () => import('./Heatmap.vue'),
    desc: 'A heatmap component to visualise data'
  },
  {
    id: 'weighted-heatmap',
    name: 'Weighted Heatmap',
    component: () => import('./HeatmapWeighted.vue'),
    desc: 'A heatmap component with custom weighting to data'
  },
  {
    id: 'polylines',
    name: 'Polylines and Polygons',
    component: () => import('./Polyline.vue'),
    desc: 'Polyline and polygon map components'
  },
  {
    id: 'shapes',
    name: 'Rectangles and Circles',
    component: () => import('./Shape.vue'),
    desc: 'Rectangle and circle map components'
  },
  {
    id: 'geo-json',
    name: 'GeoJSON Data',
    component: () => import('./GeoJson.vue'),
    desc: 'An example using the data property of the map for GeoJSON data.'
  }
];
