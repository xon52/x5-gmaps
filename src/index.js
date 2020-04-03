import { init, getMap } from './init.js'
import gmapsMap from './components/Map.vue'
import gmapsInfoWindow from './components/InfoWindow.vue'
import gmapsMarker from './components/Marker.vue'
import gmapsPopup from './components/Popup.vue'
import './scss/index.scss'

export default function(Vue, options) {
  if (!options) throw new Error(`x5-gmaps :: (Google API) 'key' is required for plugin install.`)
  const key = options.key || options
  const opt = { ...options }
  init(key, opt)
  Vue.prototype.$GMaps = () => getMap()
}

export { gmapsMap, gmapsInfoWindow, gmapsMarker, gmapsPopup }
