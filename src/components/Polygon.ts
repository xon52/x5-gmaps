import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';

@Component
export default class GmapsPolygon extends Vue {
  name = 'gmapsPolygon';

  @Inject('getMap') private getMap!: () => google.maps.Map;

  @Prop({ default: () => ({}) }) readonly options!: google.maps.PolygonOptions;
  @Prop({ default: true }) readonly clickable!: boolean;
  @Prop({ default: false }) readonly draggable!: boolean;
  @Prop({ default: false }) readonly editable!: boolean;
  @Prop({ default: 'black' }) readonly fillColor!: string;
  @Prop({ default: 0.3 }) readonly fillOpacity!: string | number;
  @Prop({ default: false }) readonly geodesic!: boolean;
  @Prop({ required: true }) readonly path!: google.maps.LatLngLiteral[];
  @Prop({ default: 'black' }) readonly strokeColor!: string;
  @Prop({ default: 1.0 }) readonly strokeOpacity!: string | number;
  @Prop({ default: 0 }) readonly strokePosition!: string | number;
  @Prop({ default: 3 }) readonly strokeWeight!: string | number;
  @Prop({ default: true }) readonly visible!: boolean;
  @Prop({ default: 0 }) readonly zIndex!: string | number;

  private polygon: google.maps.Polygon | undefined;

  get _options(): google.maps.PolygonOptions {
    const options: google.maps.PolygonOptions = {
      ...this.options,
      geodesic: this.geodesic,
      paths: [this.path],
      clickable: this.clickable,
      draggable: this.draggable,
      editable: this.editable,
      fillColor: this.fillColor,
      fillOpacity: +this.fillOpacity,
      strokeColor: this.strokeColor,
      strokeOpacity: +this.strokeOpacity,
      strokePosition: +this.strokePosition,
      strokeWeight: +this.strokeWeight,
      visible: this.visible,
      zIndex: +this.zIndex
    };
    return options;
  }

  @Watch('_options', { immediate: true, deep: true })
  _optionsChanged(newVal: google.maps.PolygonOptions) {
    if (this.polygon) this.polygon.setOptions(newVal);
  }

  private changedPath() {
    if (this.polygon && this.polygon.getEditable()) {
      const result = this.polygon
        .getPath()
        .getArray()
        .map(e => e.toJSON());
      this.polygon.setPath(result);
      this.$emit('path-changed', result);
      // TODO: Remove in major release
      this.$emit('pathChanged', result); // eslint-disable-line
    }
  }

  mounted() {
    this.polygon = new globalThis.google.maps.Polygon({
      map: this.getMap(),
      ...this._options
    });
    this.polygon.addListener('click', e => this.$emit('click', e));
    this.polygon.addListener('dblclick', e => this.$emit('double-click', e));
    this.polygon.addListener('dragend', e => this.$emit('drag-end', e));
    this.polygon.addListener('dragstart', e => this.$emit('drag-start', e));
    this.polygon.addListener('rightclick', e => this.$emit('right-click', e));
    // NOTE: path events insert_at and set_at only fired once so mouse up was more reliable (but mouse up doesn't trigger for remove event)
    this.polygon.addListener('mouseup', () => this.changedPath());
    this.polygon.getPath().addListener('remove_at', () => this.changedPath());
    // TODO: Remove in major release
    this.polygon.addListener('dblclick', e => this.$emit('doubleClick', e)); // eslint-disable-line
    this.polygon.addListener('dragend', e => this.$emit('dragEnd', e)); // eslint-disable-line
    this.polygon.addListener('dragstart', e => this.$emit('dragStart', e)); // eslint-disable-line
    this.polygon.addListener('rightclick', e => this.$emit('rightClick', e)); // eslint-disable-line
  }

  beforeDestroy() {
    if (this.polygon) this.polygon.setMap(null);
  }

  render(): null {
    return null;
  }
}
