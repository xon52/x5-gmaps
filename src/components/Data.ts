import { CreateElement, VNode } from 'vue';
import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';

@Component
export default class GmapsData extends Vue {
  name = 'gmapsData';

  @Inject('getMap') private getMap!: () => google.maps.Map;
  @Inject('handleError') private handleError!: (e: Error) => void;

  // NOTE: https://developers.google.com/maps/documentation/javascript/reference/data#Data.GeoJsonOptions
  @Prop({ default: undefined }) readonly options!:
    | google.maps.Data.StyleOptions
    | google.maps.Data.StylingFunction;

  @Watch('options', { immediate: true, deep: true })
  optionsChanged(
    newVal: google.maps.Data.StyleOptions | google.maps.Data.StylingFunction
  ) {
    this.getMap().data.setStyle(newVal);
  }

  mounted() {
    // NOTE: This is to enforce only one GmapsData element per map
    if (this.getMap().data.getFeatureById('_gmapsDataCollection'))
      return this.handleError(
        new Error(
          'There can only be one GmapsData element per GmapsMap. Use GmapsDataGeoJson elements to add more GeoJSON data.'
        )
      );
    this.getMap().data.add(
      new globalThis.google.maps.Data.Feature({ id: '_gmapsDataCollection' })
    );
    // NOTE: Events occur on the whole data object, not individual features
    this.getMap().data.addListener('click', (e: google.maps.MapMouseEvent) =>
      this.$emit('click', e)
    );
    this.getMap().data.addListener(
      'contextmenu',
      (e: google.maps.MapMouseEvent) => this.$emit('contextmenu', e)
    );
    this.getMap().data.addListener('dblclick', (e: google.maps.MapMouseEvent) =>
      this.$emit('dblclick', e)
    );
    this.getMap().data.addListener(
      'mousedown',
      (e: google.maps.MapMouseEvent) => this.$emit('mousedown', e)
    );
    this.getMap().data.addListener('mouseout', (e: google.maps.MapMouseEvent) =>
      this.$emit('mouseout', e)
    );
    this.getMap().data.addListener(
      'mouseover',
      (e: google.maps.MapMouseEvent) => this.$emit('mouseover', e)
    );
    this.getMap().data.addListener('mouseup', (e: google.maps.MapMouseEvent) =>
      this.$emit('mouseup', e)
    );
    this.getMap().data.addListener(
      'rightclick',
      (e: google.maps.MapMouseEvent) => this.$emit('rightclick', e)
    );
  }

  beforeDestroy() {
    const mainFeature = this.getMap().data.getFeatureById(
      '_gmapsDataCollection'
    );
    if (mainFeature) this.getMap().data.remove(mainFeature);
  }

  public render(h: CreateElement): VNode {
    return h('div', this.$slots.default);
  }
}
