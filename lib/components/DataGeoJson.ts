import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';

@Component
export default class GmapsDataGeoJson extends Vue {
  name = 'gmapsDataGeoJson';

  @Inject('getMap') private getMap!: () => google.maps.Map;

  // NOTE: https://developers.google.com/maps/documentation/javascript/reference/data#Data.GeoJsonOptions
  @Prop({ default: undefined })
  readonly options!: google.maps.Data.StyleOptions;
  @Prop({ default: undefined }) readonly geoJson!: GeoJSON.GeoJSON;

  private features: google.maps.Data.Feature[] = [];

  public updateGeoJson() {
    // Clear feature list
    this.clear();
    if (!this.geoJson) return;
    // Add whatever was given and store returned features
    this.features = this.getMap().data.addGeoJson(this.geoJson);
    this.updateStyles();
  }

  public updateStyles() {
    this.features.forEach(e =>
      this.getMap().data.overrideStyle(e, this.options)
    );
  }

  public clear() {
    // TODO: Test whether this function can handle removing non-existent features
    this.features.forEach(e => this.getMap().data.remove(e));
  }

  @Watch('geoJson', { immediate: true, deep: true })
  _geoJsonChanged() {
    this.updateGeoJson();
  }
  @Watch('styleOptions', { immediate: true, deep: true })
  _styleOptionsChanged() {
    this.updateStyles();
  }

  mounted() {
    this.updateGeoJson();
  }

  beforeDestroy() {
    this.clear();
  }

  render() {
    return null;
  }
}
