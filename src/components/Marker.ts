import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';

@Component
export default class GmapsMarker extends Vue {
  name = 'gmapsMarker';

  @Inject('getMap') getMap!: () => google.maps.Map;
  @Inject('handleError') handleError!: (e: Error) => void;

  @Prop({ default: () => ({}) }) readonly options!: google.maps.MarkerOptions;
  @Prop({ default: 0.001 }) readonly sensitivity!: string | number;
  @Prop({ default: true }) readonly visible!: boolean;
  @Prop({ default: undefined }) readonly icon!: string | google.maps.Icon;
  @Prop({ default: undefined }) readonly label!: string | google.maps.Icon;
  @Prop({ default: undefined }) readonly opacity!: string | number;
  @Prop({ default: undefined }) readonly position!: google.maps.LatLngLiteral;
  @Prop({ default: undefined }) readonly title!: string;
  @Prop({ default: undefined }) readonly zIndex!: string | number;

  marker: google.maps.Marker | undefined;

  get _options(): google.maps.MarkerOptions {
    const options: google.maps.MarkerOptions = { ...this.options };
    if (this.visible) options.visible = this.visible;
    if (this.icon) options.icon = this.icon;
    if (this.label) options.label = this.label.toString();
    if (this.opacity) options.opacity = +this.opacity;
    if (this.position) options.position = this.position;
    if (this.title) options.title = this.title;
    if (this.zIndex) options.zIndex = +this.zIndex;
    return options;
  }

  @Watch('_options', { immediate: true, deep: true })
  _optionsChanged(newVal: google.maps.MarkerOptions) {
    if (this.marker) this.marker.setOptions(newVal);
  }

  public changedPosition(): false | google.maps.LatLngLiteral {
    const oldPosition = this._options.position as google.maps.LatLngLiteral;
    // This function is fired when a marker is replaced by Vue (and options is undefined)
    if (!oldPosition) return false;
    const newPosition = this.marker!.getPosition()!.toJSON();
    return (Math.abs(newPosition.lat - oldPosition.lat) > this.marker.sensitivity) ||
        (Math.abs(newPosition.lng - oldPosition.lng) > this.marker.sensitivity) ? newPosition : false;
  }

  mounted() {
    // Early return for no position
    if (!this._options.position)
      return this.handleError(
        new Error(
          'x5-gmaps: A position is required by every marker. Set this as either a position prop, or a position property of the options prop.'
        )
      );
    this.marker = new globalThis.google.maps.Marker({
      map: this.getMap(),
      ...this._options
    });
    this.marker.addListener('position_changed', () => {
      const position = this.changedPosition();
      if (position) {
        this.$emit('move', position);
        // Depreciated 19/04
        this.$emit('position-changed', position);
      }
    });
    this.marker.addListener('click', (e: google.maps.MapMouseEvent) =>
      this.$emit('click', e)
    );
    this.marker.addListener('dblclick', (e: google.maps.MapMouseEvent) =>
      this.$emit('double-click', e)
    );
    this.marker.addListener('rightclick', (e: google.maps.MapMouseEvent) =>
      this.$emit('right-click', e)
    );
    this.marker.addListener('mouseover', (e: google.maps.MapMouseEvent) =>
      this.$emit('mouseover', e)
    );
    this.marker.addListener('mouseout', (e: google.maps.MapMouseEvent) =>
      this.$emit('mouseout', e)
    );
    // TODO: Remove in major release
    this.marker.addListener('dblclick', (e: google.maps.MapMouseEvent) =>
      this.$emit('doubleClick', e)
    ); // eslint-disable-line
    this.marker.addListener('rightclick', (e: google.maps.MapMouseEvent) =>
      this.$emit('rightClick', e)
    ); // eslint-disable-line
  }

  beforeDestroy() {
    if (this.marker) google.maps.event.clearInstanceListeners(this.marker);
    if (this.marker) this.marker.setMap(null);
  }

  render(): null {
    return null;
  }
}
