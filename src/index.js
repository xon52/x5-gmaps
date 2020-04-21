import { init, getMap } from './init.js'
export { default as gmapsMap } from './components/Map.vue'
export { default as gmapsInfoWindow } from './components/InfoWindow.vue'
export { default as gmapsMarker } from './components/Marker.vue'
export { default as gmapsHeatmap } from './components/Heatmap.vue'
export { default as gmapsPopup } from './components/Popup.vue'
import './scss/index.scss'

const install = (Vue, options) => {
  if (!options) throw new Error(`x5-gmaps :: (Google API) 'key' is required for plugin install.`)
  const key = options.key || options
  const opt = { ...options }
  init(key, opt)
  Vue.prototype.$GMaps = () => getMap()
  if (process.env.NODE_ENV === 'development')
    console.warn('x5-gmaps note: marker @positionChanged event has been depreciated; please use @move instead.') // eslint-disable-line no-console
}

export default install
