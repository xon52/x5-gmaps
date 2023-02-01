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
        <span class="gmaps-spinner"></span>
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
import { getGoogleAPI } from '../install/api'

const defaultOptions = {
  center: { lat: -27.5, lng: 153 },
  zoom: 12
};

@Component
export default class GmapsMap extends Vue {
  name = 'gmapsMap';

  @Prop({ default: () => ({}) }) readonly options!: google.maps.MapOptions;

  error: string | null = null;
  loading = true;
  public map: google.maps.Map | undefined;
  public getMap(): google.maps.Map {
    if (this.map) return this.map;
    throw new Error('Map not found.');
  }
  private _handleError(e: Error) {
    this.error = e.message;
  }

  @Provide('getMap') provideMap = (): google.maps.Map => this.getMap();
  @Provide('handleError') handleError = (e: Error) => this._handleError(e);

  @Watch('options', { immediate: true, deep: true })
  optionsChanged(newVal: google.maps.MapOptions) {
    if (this.map) this.map.setOptions(newVal);
  }

  mounted() {
    getGoogleAPI()
      .then((maps: any) => {
        this.map = new maps.Map(this.$refs.gmap as Element, {
          ...defaultOptions,
          ...this.options
        });
        this.$emit('mounted', this.map);
        this.map!.addListener('idle', () =>
          this.$emit('idle', true)
        );
        this.map!.addListener('bounds_changed', () =>
          this.$emit('bounds-changed', this.map!.getBounds())
        );
        this.map!.addListener('center_changed', () =>
          this.$emit('center-changed', this.map!.getCenter())
        );
        this.map!.addListener('click', (e: google.maps.MapMouseEvent) =>
          this.$emit('click', e)
        );
        this.map!.addListener('dblclick', (e: google.maps.MapMouseEvent) =>
          this.$emit('double-click', e)
        );
        this.map!.addListener('rightclick', (e: google.maps.MapMouseEvent) =>
          this.$emit('right-click', e)
        );
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
        this.map!.addListener('dblclick', (e: google.maps.MapMouseEvent) =>
          this.$emit('doubleClick', e)
        ); // eslint-disable-line
        this.map!.addListener('rightclick', (e: google.maps.MapMouseEvent) =>
          this.$emit('rightClick', e)
        ); // eslint-disable-line
        this.map!.addListener('zoom_changed', () =>
          this.$emit('zoomChanged', this.map!.getZoom())
        ); // eslint-disable-line
        setTimeout(() => (this.loading = false), 100);
      })
      .catch((e: Error) => this._handleError(e as Error));
  }

  beforeDestroy() {
    if (this.map) globalThis.google.maps.event.clearInstanceListeners(this.map);
  }
}
</script>

<style lang="scss">
@import '../scss/map.scss';
</style>
