## Cluster

![Cluster](~@img/readme-cluster.png)

::: warning
This component is at a proof of concept stage. If you have any issues or suggestions, please [create a new issue](https://github.com/xon52/x5-gmaps/issues).
:::

While Google Maps does not offer an inbuilt grouping/clustering feature, they recommend using their [clustering library](https://github.com/googlemaps/js-markerclustererplus) for clustering in their [clustering tutorial](https://developers.google.com/maps/documentation/javascript/marker-clustering).

While this is a great library, it has a few drawbacks:

- Has some performance limitations for number of points
- Has no Vue support (like the rest of Google Maps)
- Was rather large in size for what it does (IMO)
- Required additional dependencies
- Porting it into `x5-gmaps` was not pretty

So I made my own:

```html
<template>
  <gmaps-map>
    <gmaps-cluster :items="items" :options="options" />
  </gmaps-map>
</template>

<script>
  import { gmapsMap, gmapsCluster } from 'x5-gmaps';

  export default {
    components: { gmapsMap, gmapsCluster },
    data: () => ({
      options: {...},
      items: [
        { lat: -27.41, lng: 153.01 },
        { lat: -27.42, lng: 153.02 },
        ...,
        { lat: -27.48, lng: 153.08 },
        { lat: -27.49, lng: 153.09 },
      ],
    })
  };
</script>
```

::: tip
**Things to know:**

- The items given to the cluster component **must** have a `lat` and `lng` number property.
- You can provide an item a `title` property for a label when you hover over a pin
- You can provide an item an `id` property which is `$emit`'d when a pin is clicked.
- The only event presently supported is `@click`; which returns either the _optional_ item `id`, or else the item position as a `google.maps.LatLng`.
- If you click on a cluster, it will zoom into the center of that cluster.

:::

### Props

The only props the cluster component currently takes are `items` and `options`. `options` is an object with any of the following you want to override:

| Props          |  Type  | Default | Description                                                                    |
| :------------- | :----: | :-----: | :----------------------------------------------------------------------------- |
| minZoom        | Number |   `1`   | Zoom level _further_ clustering is disabled                                    |
| maxZoom        | Number |   `6`   | Zoom level clustering is disabled                                              |
| lowPercentage  | Number |   `3`   | Percentage of items in a cluster in a cluster to mark it as low (_blue color_) |
| highPercentage | Number |  `10`   | Percentage of items in a cluster to mark it as high (_red color_)              |
| tileSize\*     | Number | `0.55`  | Factor of clustering size                                                      |

_\* There is a known issue with this that appears to break the click to zoom function if it is higher than `0.55`_ 🤷‍♂️.
