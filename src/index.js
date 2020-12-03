import { init, gmaps } from './init.js'
export { gmaps }
export { default as gmapsCircle } from './components/Circle.vue'
export { default as gmapsHeatmap } from './components/Heatmap.vue'
export { default as gmapsInfoWindow } from './components/InfoWindow.vue'
export { default as gmapsMap } from './components/Map.vue'
export { default as gmapsMarker } from './components/Marker.vue'
export { default as gmapsPolyline } from './components/Polyline.vue'
export { default as gmapsPolygon } from './components/Polygon.vue'
export { default as gmapsPopup } from './components/Popup.vue'
export { default as gmapsRectangle } from './components/Rectangle.vue'
import './scss/index.scss'

const install = (Vue, options) => {
  if (!options) throw new Error(`x5-gmaps :: (Google API) 'key' is required for plugin install.`)
  if (typeof options === 'string') init({ key: options })
  else init(options)
  Vue.prototype.$GMaps = () => gmaps()
}

export default install
