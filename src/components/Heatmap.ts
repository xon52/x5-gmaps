import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';

@Component
export default class GmapsHeatmap extends Vue {
  name = 'gmapsHeatmap';

  @Inject('getMap') private getMap!: () => google.maps.Map;

  @Prop({ default: undefined }) readonly dissipating!: boolean;
  @Prop({ default: undefined }) readonly maxIntensity!: string | number;
  @Prop({ default: 0.6 }) readonly opacity!: string | number;
  @Prop({ default: undefined }) readonly radius!: string | number;
  @Prop({ required: true }) readonly items!: Array<{
    lat: number;
    lng: number;
  }>;
  @Prop({ default: undefined }) readonly colors!: string[];
  @Prop({ default: undefined }) readonly weightProp!: string;

  private heatmap: google.maps.visualization.HeatmapLayer | undefined;

  public getData(): (
    | google.maps.LatLng
    | google.maps.visualization.WeightedLocation
  )[] {
    return this.items.map(e => {
      if (this.weightProp)
        return {
          location: new window.google.maps.LatLng(e.lat, e.lng),
          // TODO: No idea how to remove this any
          weight: (e as any)[this.weightProp]
        };
      return new window.google.maps.LatLng(e.lat, e.lng);
    });
  }

  public updateData(): void {
    if (this.heatmap) this.heatmap.setData(this.getData());
  }

  get _options(): google.maps.visualization.HeatmapLayerOptions {
    const options: google.maps.visualization.HeatmapLayerOptions = {
      data: this.getData()
    };
    if (this.colors) options.gradient = this.colors;
    if (this.dissipating) options.dissipating = this.dissipating;
    if (this.maxIntensity) options.maxIntensity = +this.maxIntensity;
    if (this.opacity) options.opacity = +this.opacity;
    if (this.radius) options.radius = +this.radius;
    return options;
  }

  @Watch('_options', { immediate: true, deep: true })
  _optionsChanged(newVal: google.maps.visualization.HeatmapLayerOptions): void {
    if (this.heatmap) this.heatmap.setOptions(newVal);
  }

  mounted(): void {
    this.heatmap = new window.google.maps.visualization.HeatmapLayer({
      map: this.getMap(),
      ...this._options
    });
  }

  beforeDestroy(): void {
    if (this.heatmap) this.heatmap.setMap(null);
  }

  render(): null {
    return null;
  }
}
