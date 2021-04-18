<template>
  <div class="gmaps-map">
    <!-- Error slot -->
    <template v-if="error">
      <slot name="error" :error="error">
        <span class="gmaps-error">Error: {{ error }}</span>
      </slot>
    </template>
    <!-- Loading slot -->
    <template v-else-if="loading">
      <slot name="loading">
        <span class="gmaps-spinner" />
      </slot>
    </template>
    <!-- Map -->
    <div v-show="!error" ref="gmap" class="gmaps-map">
      <slot v-if="!error && !loading && !!map" :map="map" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { gmaps } from '../init';

const defaultOptions = {
  center: { lat: -27.5, lng: 153 },
  zoom: 12
};

@Component
export default class GmapsMap extends Vue {
  name = 'gmapsMap';

  @Prop({ default: () => ({}) }) readonly options!: google.maps.MapOptions;

  private error: string | null = null;
  private loading = true;
  private map: google.maps.Map | undefined;
  public getMap(): google.maps.Map {
    if (this.map) return this.map;
    throw new Error('Map not found.');
  }
  private _handleError(e: Error): void {
    this.error = e.message;
  }

  @Provide('getMap') private provideMap = (): google.maps.Map => this.getMap();
  @Provide('handleError') private handleError = (e: Error): void =>
    this._handleError(e);

  @Watch('options', { immediate: true, deep: true })
  optionsChanged(newVal: google.maps.MapOptions): void {
    if (this.map) this.map.setOptions(newVal);
  }

  mounted(): void {
    gmaps()
      .then((maps: any) => {
        this.map = new maps.Map(this.$refs.gmap as Element, {
          ...defaultOptions,
          ...this.options
        });
        this.$emit('mounted', this.map);
        this.map!.addListener('bounds_changed', () =>
          this.$emit('bounds-changed', this.map!.getBounds())
        );
        this.map!.addListener('center_changed', () =>
          this.$emit('center-changed', this.map!.getCenter())
        );
        this.map!.addListener('click', e => this.$emit('click', e));
        this.map!.addListener('dblclick', e => this.$emit('double-click', e));
        this.map!.addListener('rightclick', e => this.$emit('right-click', e));
        this.map!.addListener('zoom_changed', () =>
          this.$emit('zoom-changed', this.map!.getZoom())
        );
        // TODO: Remove in major release
        this.map!.addListener('bounds_changed', () =>
          this.$emit('boundsChanged', this.map!.getBounds())
        ); // eslint-disable-line
        this.map!.addListener('center_changed', () =>
          this.$emit('centerChanged', this.map!.getCenter())
        ); // eslint-disable-line
        this.map!.addListener('dblclick', e => this.$emit('doubleClick', e)); // eslint-disable-line
        this.map!.addListener('rightclick', e => this.$emit('rightClick', e)); // eslint-disable-line
        this.map!.addListener('zoom_changed', () =>
          this.$emit('zoomChanged', this.map!.getZoom())
        ); // eslint-disable-line
        setTimeout(() => (this.loading = false), 100);
      })
      .catch((e: Error) => this._handleError(e as Error));
  }

  beforeDestroy(): void {
    if (this.map) window.google.maps.event.clearInstanceListeners(this.map);
  }
}
</script>


<style lang="scss">
@import '../scss/map.scss';
</style>
