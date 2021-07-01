# Installation

## Direct Download / CDN

[https://unpkg.com/x5-gmaps/x5-gmaps.min.js](https://unpkg.com/x5-gmaps/x5-gmaps.min.js)

Include `x5-gmaps` after Vue and it will install itself automatically:

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/x5-gmaps.min.js"></script>
```

<br/>

## npm

```bash
npm install x5-gmaps
```

This plugin can be installed using `Vue.use()`:

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

<br/>

## TypeScript

If you're using TypeScript, and want to use the Google Maps types, you will need to add you will need to add the dependency [@types/google.maps](https://www.npmjs.com/package/@types/google.maps) and make sure your `tsconfig.json` references the `@types` node_modules folder:

```js
{
  "compilerOptions": {
    "typeRoots": [
      "node_modules/@types"
    ],
  }
}
```

<br/>

## Quasar

For Quasar, because you cannot use `Vue.use()`, in a boot file you can import the default export as 'install' and run that with the Vue instance and options as the parameters:

```js
import { install } from 'x5-gmaps';

export default async ({ Vue }) => {
  install(Vue, 'XXXXXX');
  // install(Vue, { key: "XXXXXX", libraries: ["places"] });
};
```

<br/>

## Transpilation

::: warning
This plugin is not transpiled! If you want to make it compatible with legacy browsers (e.g. IE), you will need to add this to your `vue.config.js` file:

```js
module.exports = {
  transpileDependencies: ['x5-gmaps']
};
```

:::
