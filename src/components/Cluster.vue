<template>
  <div>
    <template v-for="({ pos, items, weight }, key) in clusters">
      <gmaps-cluster-pin
        v-if="items.length > 1"
        :key="`c-${key}`"
        :count="items.length"
        :position="pos"
        :background="getColor(weight)"
        @click="clusterClickHandler(key)"
      />
      <gmaps-marker
        v-else
        :key="`m-${key}`"
        :position="pos"
        :title="items[0].title || items[0].id"
        :visible="items[0].visible"
        :icon="items[0].icon"
        :label="items[0].label"
        :opacity="items[0].opacity"
        :z-index="items[0].zIndex"
        :options="items[0].options"
        @click="$emit('click', items[0].id || $event)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';
import { X5ClusterGroup, X5ClusterItem, X5ClusterOptions } from '../types/x5gmaps';
import { getBounds } from './helpers/map';
import { organiseClusters, getAveragePosition } from './helpers/clustering';
import gmapsMarker from './Marker';
import gmapsClusterPin from './ClusterPin.vue';

const defaultOptions: X5ClusterOptions = {
  minZoom: -1,
  maxZoom: 8,
  tileSize: 0.4, // TODO: Seems to break the click to zoom above this number??
  highPercentage: 10,
  lowPercentage: 3
};

@Component({ components: { gmapsMarker, gmapsClusterPin } })
export default class GmapsCluster extends Vue {
  name = 'gmapsCluster';

  @Inject('getMap') private getMap!: () => google.maps.Map;

  @Prop({ required: true }) readonly items!: X5ClusterItem[];
  @Prop({ default: () => ({}) }) readonly options!: X5ClusterOptions;

  @Watch('options', { immediate: true })
  optionsChanged(newOptions: X5ClusterOptions) {
    this.clusterOptions = { ...defaultOptions, ...newOptions };
    this.refresh(true);
  }

  @Watch('items', { immediate: true })
  itemsChanged() {
    this.refresh(true);
  }

  clusterOptions: X5ClusterOptions = { ...defaultOptions };
  eventListener: google.maps.MapsEventListener[] = [];
  all: Record<string, X5ClusterGroup> = {};
  lastBounds = new globalThis.google.maps.LatLngBounds();
  lastZoom = 0;
  clusters: Record<string, X5ClusterGroup> = {};
  clustered = false;

  shouldOrganise(force: boolean, zoom: number) {
    if (force) return true;
    if (zoom !== this.lastZoom) return true;
    return false;
  }

  shouldFilter(force: boolean, zoom: number, bounds: google.maps.LatLngBounds) {
    if (!bounds) return false;
    if (force) return true;
    if (zoom !== this.lastZoom) return true;
    if (!this.lastBounds.contains(bounds.getNorthEast())) return true;
    if (!this.lastBounds.contains(bounds.getSouthWest())) return true;
    return false;
  }

  refresh(force = false) {
    const _zoom = this.getMap().getZoom() || this.lastZoom;
    const _bounds = this.getMap().getBounds()!;
    // Organise
    if (this.shouldOrganise(force, _zoom)) {
      this.all = organiseClusters(
        this.items,
        Math.max(_zoom, this.clusterOptions.minZoom!),
        this.clusterOptions.maxZoom!,
        this.clusterOptions.tileSize!
      );
    }
    // Filter
    if (this.shouldFilter(force, _zoom, _bounds)) {
      // Update what is visible in new bounds
      const _filtered: Record<string, X5ClusterGroup> = {};
      const _rand = Math.floor(Math.random() * 10000);
      for (const [key, value] of Object.entries(this.all))
        if (_bounds?.contains(value.pos)) _filtered[`${key}-${_rand}`] = value;
      // Update variables
      this.lastZoom = _zoom;
      this.lastBounds = _bounds;
      this.clusters = _filtered;
    }
  }

  getColor(weight: number) {
    if (
      !this.clusterOptions.highPercentage &&
      !this.clusterOptions.lowPercentage
    )
      return;
    if (
      this.clusterOptions.highPercentage &&
      weight >= this.clusterOptions.highPercentage
    )
      return '#FBB3BD';
    if (
      this.clusterOptions.lowPercentage &&
      weight <= this.clusterOptions.lowPercentage
    )
      return '#CCF1FF';
    return '#F1E0B0';
  }

  clusterClickHandler(key: string) {
    const _clusterBounds = getBounds(this.clusters[key].items, 0.1);
    const _clusterCenter = getAveragePosition(this.clusters[key].items);
    this.getMap().fitBounds(_clusterBounds, 1);
    this.getMap().setCenter(_clusterCenter);
  }

  mounted() {
    this.refresh(true);
    this.eventListener.push(
      this.getMap().addListener('idle', () => this.refresh())
    );
  }

  beforeDestroy() {
    if (this.eventListener.length) this.eventListener.forEach(e => e.remove());
  }
}
</script>
