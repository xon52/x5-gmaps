import { VueConstructor, PluginFunction } from 'vue';
import { init, gmaps } from './init';
import gmapsMap from './components/Map.vue';
import gmapsCircle from './components/Circle';
import gmapsCluster from './components/Cluster.vue';
import gmapsData from './components/Data';
import gmapsDataGeoJson from './components/DataGeoJson';
import gmapsInfoWindow from './components/InfoWindow';
import gmapsMarker from './components/Marker';
import gmapsPolygon from './components/Polygon';
import gmapsPolyline from './components/Polyline';
import gmapsPopup from './components/Popup.vue';
import gmapsHeatmap from './components/Heatmap';
import gmapsRectangle from './components/Rectangle';
import { OptionsInterface } from './types/OptionsInterface';

// install function executed by Vue.use()
const install: PluginFunction<any> = function installX5Gmaps(
  Vue: VueConstructor,
  options: string | OptionsInterface
) {
  if (!options)
    throw new Error(
      `x5-gmaps :: (Google API) 'key' is required for plugin install.`
    );
  if (typeof options === 'string') init({ key: options, libraries: [] });
  else init(options);
  Vue.prototype.$GMaps = (): (() => Promise<typeof google.maps>) => gmaps;
};

export {
  install,
  gmaps,
  gmapsMap,
  gmapsCircle,
  gmapsCluster,
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
