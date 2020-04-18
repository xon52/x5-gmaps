import { init, getMap } from './init.js'
export { default as gmapsMap } from './components/Map.vue'
export { default as gmapsInfoWindow } from './components/InfoWindow.vue'
export { default as gmapsMarker } from './components/Marker.vue'
export { default as gmapsHeatmap } from './components/Heatmap.vue'
export { default as gmapsPopup } from './components/Popup.vue'
import './scss/index.scss'

export default function(Vue, options) {
  if (!options) throw new Error(`x5-gmaps :: (Google API) 'key' is required for plugin install.`)
  const key = options.key || options
  const opt = { ...options }
  init(key, opt)
  Vue.prototype.$GMaps = () => getMap()
}
