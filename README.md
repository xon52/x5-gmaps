# x5-gmaps ([Docs](https://xon52.github.io/x5-gmaps))

### This is a lightweight library to simplify the use of [Google Maps](https://developers.google.com/maps/) in [Vue.js](http://vuejs.org) 🤏🗺️🧩

<p>
  <a href="https://npmjs.com/package/x5-gmaps"><img class="center" src="https://img.shields.io/bundlephobia/minzip/x5-gmaps" alt="Bundle size"/></a>
  <a href="https://npmjs.com/package/x5-gmaps"><img src="https://img.shields.io/npm/dm/x5-gmaps.svg?style=flat" alt="NPM downloads"></a>
  <a href="https://npmjs.com/package/x5-gmaps"><img src="https://img.shields.io/npm/l/x5-gmaps.svg?style=flat" alt="License"></a>
</p>

<br/>

## Guide / Demo / Tutorials

- Guide: [x5-gmaps documentation](https://xon52.github.io/x5-gmaps/guide.html)
- Demo on [codesandbox.io](https://codesandbox.io/s/x5-gmaps-demo-6xww1)
- [Tutorial creating a COVID Heatmap](https://medium.com/javascript-in-plain-english/making-a-covid-map-using-vue-google-maps-89eb70a9f089)
- [Address Autocomplete Example](https://xon5.medium.com/vue-google-maps-and-autocomplete-e9bf0fa3c42e)

<br/>

## Installation

```bash
# npm
npm install x5-gmaps
```

## Deployment

This plugin can be installed like any Vue plugin:

```js
import x5GMaps from 'x5-gmaps';
// Option 1: Just your key
Vue.use(x5GMaps, 'YOUR_GOOGLE_KEY');
// Option 2: With libraries
Vue.use(x5GMaps, { key: 'YOUR_GOOGLE_KEY', libraries: ['places'] });

new Vue({
  el: '#app',
  render: h => h(App)
});
```

## Usage

```html
<template>
  <gmaps-map>
    <gmaps-marker :position="{ lat: -27, lng: 153 }" />
  </gmaps-map>
</template>
```

```js
import { gmapsMap, gmapsMarker } from 'x5-gmaps';

export default {
  components: { gmapsMap, gmapsMarker }
};
```

## Provided components

- [Map](https://xon52.github.io/x5-gmaps/api/map.html)
- [Marker](https://xon52.github.io/x5-gmaps/api/marker.html)
- [InfoWindow](https://xon52.github.io/x5-gmaps/api/infowindow.html)
- [Popup](https://xon52.github.io/x5-gmaps/api/popup.html)
- [Heatmap](https://xon52.github.io/x5-gmaps/api/heatmap.html)
- [Polylines / Polygons](https://xon52.github.io/x5-gmaps/api/polylines.html)
- [Rectangles / Circles](https://xon52.github.io/x5-gmaps/api/shapes.html)
- [Data / GeoJSON](https://xon52.github.io/x5-gmaps/api/data.html)

<br/>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Authors

- [Keagan Chisnall](https://github.com/xon52)

## Support

<a href="https://www.buymeacoffee.com/chisnallio" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 30px !important;width: 107px !important;" ></a>
