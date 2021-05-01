<template>
  <div>
    <gmaps-heatmap :items="items" />
    <template v-for="({ pos, items }, key) in clusters">
      <gmaps-popup v-if="items.length > 1" :key="key" :position="pos">
        {{ items.length }}
      </gmaps-popup>
      <gmaps-marker v-else :key="key" :position="pos" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';
import { expandBounds } from './helpers/map';
import { ClusterGroup, organiseClusters } from './helpers/clustering';
import gmapsMarker from './Marker';
import gmapsHeatmap from './Heatmap';
import gmapsPopup from './Popup.vue';

@Component({ components: { gmapsMarker, gmapsPopup, gmapsHeatmap } })
export default class GmapsCluster extends Vue {
  name = 'gmapsCluster';

  @Inject('getMap') private getMap!: () => google.maps.Map;

  @Prop({ required: true }) readonly items!: Array<{
    lat: number;
    lng: number;
  }>;
  @Prop({ default: 1 }) readonly minZoom!: number;
  @Prop({ default: 6 }) readonly maxZoom!: number;
  @Prop({ default: 0.5 }) readonly tileSize!: number;

  eventListener: google.maps.MapsEventListener[] = [];
  all: Record<string, ClusterGroup> = {};
  lastBounds = new window.google.maps.LatLngBounds();
  lastZoom = 0;
  clusters: Record<string, ClusterGroup> = {};
  clustered = false;

  shouldOrganise(force: boolean, zoom: number) {
    if (force) return true;
    if (zoom !== this.lastZoom) return true;
    return false;
  }
  shouldFilter(force: boolean, zoom: number, bounds: google.maps.LatLngBounds) {
    if (force) return true;
    if (zoom !== this.lastZoom) return true;
    if (!this.lastBounds.contains(bounds.getNorthEast())) return true;
    if (!this.lastBounds.contains(bounds.getSouthWest())) return true;
    return false;
  }

  refresh(force = false) {
    const _zoom = this.getMap().getZoom();
    const _bounds = this.getMap().getBounds()!;
    // Organise
    if (this.shouldOrganise(force, _zoom)) {
      this.all = organiseClusters(
        this.items,
        Math.max(_zoom, this.minZoom),
        this.maxZoom,
        this.tileSize
      );
    }
    // Filter
    if (this.shouldFilter(force, _zoom, _bounds)) {
      // Update what is visible in new bounds
      const _filtered: Record<string, ClusterGroup> = {};
      const _expansion = _zoom > this.maxZoom ? 0.5 : 0.2;
      const _newBounds = expandBounds(_bounds, _expansion);
      const _rand = Math.floor(Math.random() * 10000);
      for (const [key, value] of Object.entries(this.all)) {
        if (_newBounds.contains(value.pos))
          _filtered[`${key}-${_rand}`] = value;
      }
      // Update variables
      this.lastZoom = _zoom;
      this.lastBounds = _newBounds;
      this.clusters = _filtered;
    }
  }

  mounted() {
    this.refresh(true);
    this.eventListener.push(
      this.getMap().addListener('bounds_changed', () => this.refresh())
    );
  }

  beforeDestroy() {
    if (this.eventListener.length) this.eventListener.forEach(e => e.remove());
  }
}
</script>
