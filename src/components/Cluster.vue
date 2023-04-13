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
import {
  X5ClusterGroup,
  X5ClusterItem,
  X5ClusterOptions
} from '../types/x5gmaps';
import { extendBounds, getBounds } from './helpers/map';
import { organiseClusters } from './helpers/clustering';
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

  @Prop({ default: true }) readonly zoomOnClick!: boolean;
  @Prop({ required: true }) readonly items!: X5ClusterItem[];
  @Prop({ default: () => ({}) }) readonly options!: X5ClusterOptions;

  @Watch('options', { immediate: true })
  optionsChanged(newOptions: X5ClusterOptions) {
    this.clusterOptions = { ...defaultOptions, ...newOptions };
    this.handleZoom();
    this.handlePan();
  }

  @Watch('items', { immediate: true })
  itemsChanged() {
    this.handleZoom();
    this.handlePan();
  }

  clusterOptions: X5ClusterOptions = { ...defaultOptions };
  eventListener: google.maps.MapsEventListener[] = [];
  all: Record<string, X5ClusterGroup> = {};
  clusters: Record<string, X5ClusterGroup> = {};
  clustered = false;

  handlePan() {
    const _bounds = this.getMap().getBounds();
    if (!_bounds) return;
    const _newbounds = extendBounds(_bounds);
    const _filtered: Record<string, X5ClusterGroup> = {};
    const _rand = Math.floor(Math.random() * 10000);
    for (const [key, value] of Object.entries(this.all))
      if (_newbounds && _newbounds.contains(value.pos))
        _filtered[`${key}-${_rand}`] = value;
    this.clusters = _filtered;
  }

  handleZoom() {
    const _zoom = this.getMap().getZoom()!;
    this.all = organiseClusters(
      this.items,
      Math.max(_zoom, this.clusterOptions.minZoom!),
      this.clusterOptions.maxZoom!,
      this.clusterOptions.tileSize!
    );
  }

  getColor(weight: number | undefined) {
    if (weight === undefined) return;
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
    if (this.zoomOnClick) {
      const _clusterBounds = getBounds(this.clusters[key].items);
      this.getMap().fitBounds(_clusterBounds);
    } else {
      this.$emit('click', this.clusters[key]);
    }
  }

  mounted() {
    this.handleZoom();
    this.eventListener.push(
      this.getMap().addListener('idle', () => this.handlePan()),
      this.getMap().addListener('zoom_changed', () => this.handleZoom())
    );
  }

  beforeDestroy() {
    if (this.eventListener.length)
      this.eventListener.forEach((e) => e.remove());
  }
}
</script>
