import { VueConstructor } from 'vue';
import { init, gmaps } from './init';
import { OptionsInterface } from './types/OptionsInterface';
import gmapsMap from './components/Map.vue';
import gmapsCircle from './components/Circle.vue';
import gmapsInfoWindow from './components/InfoWindow.vue';
import gmapsMarker from './components/Marker.vue';
import gmapsPolygon from './components/Polygon.vue';
import gmapsPolyline from './components/Polyline.vue';
import gmapsPopup from './components/Popup.vue';
import gmapsHeatmap from './components/Heatmap.vue';
import gmapsRectangle from './components/Rectangle.vue';
import './scss/index.scss';

const install = (Vue: VueConstructor, options: string | OptionsInterface) => {
  if (!options)
    throw new Error(
      `x5-gmaps :: (Google API) 'key' is required for plugin install.`
    );
  if (typeof options === 'string') init({ key: options, libraries: [] });
  else init(options);
  Vue.prototype.$GMaps = () => gmaps;
};

export {
  gmaps,
  gmapsMap,
  gmapsCircle,
  gmapsHeatmap,
  gmapsInfoWindow,
  gmapsMarker,
  gmapsPolygon,
  gmapsPolyline,
  gmapsPopup,
  gmapsRectangle
};
export default install;
