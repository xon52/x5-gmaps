import { VueConstructor } from 'vue';
import { init, gmaps } from './init';
import { OptionsInterface } from './types/OptionsInterface';
import gmapsMap from './components/Map.vue';
import gmapsCircle from './components/Circle';
import gmapsData from './components/Data.vue';
import gmapsDataGeoJson from './components/DataGeoJson';
import gmapsInfoWindow from './components/InfoWindow.vue';
import gmapsMarker from './components/Marker';
import gmapsPolygon from './components/Polygon';
import gmapsPolyline from './components/Polyline';
import gmapsPopup from './components/Popup.vue';
import gmapsHeatmap from './components/Heatmap';
import gmapsRectangle from './components/Rectangle';
import './scss/index.scss';

const install = (
  Vue: VueConstructor,
  options: string | OptionsInterface
): void => {
  if (!options)
    throw new Error(
      `x5-gmaps :: (Google API) 'key' is required for plugin install.`
    );
  if (typeof options === 'string') init({ key: options, libraries: [] });
  else init(options);
  Vue.prototype.$GMaps = (): (() => Promise<typeof window.google.maps>) =>
    gmaps;
};

export {
  install,
  gmaps,
  gmapsMap,
  gmapsCircle,
  gmapsData,
  gmapsDataGeoJson,
  gmapsHeatmap,
  gmapsInfoWindow,
  gmapsMarker,
  gmapsPolygon,
  gmapsPolyline,
  gmapsPopup,
  gmapsRectangle
};
export default install;
