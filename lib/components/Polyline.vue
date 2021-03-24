<script lang="ts">
import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';

@Component
export default class GmapsPolyline extends Vue {
  name = 'gmapsPolyline';

  @Inject('getMap') private getMap!: () => google.maps.Map;
  @Inject('handleError') private handleError!: (e: Error) => void;

  @Prop({ default: () => ({}) }) readonly options!: google.maps.PolylineOptions;
  @Prop({ default: true }) readonly clickable!: boolean;
  @Prop({ default: false }) readonly draggable!: boolean;
  @Prop({ default: false }) readonly editable!: boolean;
  @Prop({ default: undefined }) readonly icons!: google.maps.IconSequence[];
  @Prop({ default: false }) readonly geodesic!: boolean;
  @Prop({ required: true }) readonly path!: google.maps.LatLngLiteral[];
  @Prop({ default: 'black' }) readonly strokeColor!: string;
  @Prop({ default: 1.0 }) readonly strokeOpacity!: string | number;
  @Prop({ default: 3 }) readonly strokeWeight!: string | number;
  @Prop({ default: true }) readonly visible!: boolean;
  @Prop({ default: 0 }) readonly zIndex!: string | number;

  private polyline: google.maps.Polyline | undefined;

  get _options() {
    const options: google.maps.PolylineOptions = {
      ...this.options,
      geodesic: this.geodesic,
      path: this.path,
      clickable: this.clickable,
      draggable: this.draggable,
      editable: this.editable,
      strokeColor: this.strokeColor,
      strokeOpacity: +this.strokeOpacity,
      strokeWeight: +this.strokeWeight,
      visible: this.visible,
      zIndex: +this.zIndex
    };
    if (this.icons) options.icons = this.icons;
    return options;
  }

  @Watch('_options', {
    immediate: true,
    deep: true
  })
  _optionsChanged(newVal: google.maps.PolylineOptions) {
    if (this.polyline) this.polyline.setOptions(newVal);
  }

  public changedPath() {
    if (this.polyline && this.polyline.getEditable()) {
      const result = this.polyline
        .getPath()
        .getArray()
        .map(e => e.toJSON());
      this.polyline.setPath(result);
      this.$emit('path-changed', result);
      // TODO: Remove in major release
      this.$emit('pathChanged', result); // eslint-disable-line
    }
  }

  mounted() {
    this.polyline = new window.google.maps.Polyline({
      map: this.getMap(),
      ...this._options
    });
    this.polyline.addListener('click', e => this.$emit('click', e));
    this.polyline.addListener('dblclick', e => this.$emit('double-click', e));
    this.polyline.addListener('dragend', e => this.$emit('drag-end', e));
    this.polyline.addListener('dragstart', e => this.$emit('drag-start', e));
    this.polyline.addListener('rightclick', e => this.$emit('right-click', e));
    // NOTE: path events insert_at and set_at only fired once so mouse up was more reliable (but mouse up doesn't trigger for remove event)
    this.polyline.addListener('mouseup', () => this.changedPath());
    this.polyline.getPath().addListener('remove_at', () => this.changedPath());
    // TODO: Remove in major release
    this.polyline.addListener('dblclick', e => this.$emit('doubleClick', e)); // eslint-disable-line
    this.polyline.addListener('dragend', e => this.$emit('dragEnd', e)); // eslint-disable-line
    this.polyline.addListener('dragstart', e => this.$emit('dragStart', e)); // eslint-disable-line
    this.polyline.addListener('rightclick', e => this.$emit('rightClick', e)); // eslint-disable-line
  }

  beforeDestroy() {
    if (this.polyline) this.polyline.setMap(null);
  }

  render() {
    return null;
  }
}
</script>
