import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';

@Component
export default class GmapsRectangle extends Vue {
  name = 'gmapsRectangle';

  @Inject('getMap') private getMap!: () => google.maps.Map;

  @Prop({ default: 0.001 }) readonly sensitivity!: string | number;
  @Prop({ required: true }) readonly bounds!: google.maps.LatLngBoundsLiteral;
  @Prop({ default: true }) readonly clickable!: boolean;
  @Prop({ default: false }) readonly draggable!: boolean;
  @Prop({ default: false }) readonly editable!: boolean;
  @Prop({ default: 'black' }) readonly fillColor!: string;
  @Prop({ default: 0.3 }) readonly fillOpacity!: string | number;
  @Prop({ default: 'black' }) readonly strokeColor!: string;
  @Prop({ default: 1.0 }) readonly strokeOpacity!: string | number;
  @Prop({ default: 0 }) readonly strokePosition!: string | number;
  @Prop({ default: 3 }) readonly strokeWeight!: string | number;
  @Prop({ default: true }) readonly visible!: boolean;
  @Prop({ default: 0 }) readonly zIndex!: string | number;

  private rectangle: google.maps.Rectangle | undefined;
  private tempBounds: google.maps.LatLngBoundsLiteral = this.bounds;

  get _options(): google.maps.RectangleOptions {
    return {
      bounds: this.bounds,
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
  }

  @Watch('_options', {
    immediate: true,
    deep: true
  })
  _optionsChanged(newVal: google.maps.RectangleOptions) {
    if (this.rectangle) this.rectangle.setOptions(newVal);
  }

  public changedBounds(): void {
    if (!this.rectangle) return;
    // This is fired when the component is replaced and may not have a tempBounds
    const oldBounds = this.tempBounds || {
      north: -1,
      south: -1,
      east: -1,
      west: -1
    };
    const newBounds = this.rectangle.getBounds().toJSON();
    if (
      Math.abs(newBounds.north - oldBounds.north) > this.sensitivity ||
      Math.abs(newBounds.south - oldBounds.south) > this.sensitivity ||
      Math.abs(newBounds.east - oldBounds.east) > this.sensitivity ||
      Math.abs(newBounds.west - oldBounds.west) > this.sensitivity
    ) {
      this.tempBounds = newBounds;
      this.$emit('bounds-changed', newBounds);
      // TODO: Remove in major release
      this.$emit('boundsChanged', newBounds); // eslint-disable-line
    }
  }

  mounted() {
    this.rectangle = new window.google.maps.Rectangle({
      map: this.getMap(),
      ...this._options
    });
    this.rectangle.addListener('bounds_changed', () => this.changedBounds());
    this.rectangle.addListener('click', e => this.$emit('click', e));
    this.rectangle.addListener('dblclick', e => this.$emit('double-click', e));
    this.rectangle.addListener('drag', e =>
      this.$emit('drag', e.latLng.toJSON())
    );
    this.rectangle.addListener('dragend', e =>
      this.$emit('drag-end', e.latLng.toJSON())
    );
    this.rectangle.addListener('dragstart', e =>
      this.$emit('drag-start', e.latLng.toJSON())
    );
    this.rectangle.addListener('mouseover', e => this.$emit('mouseover', e));
    this.rectangle.addListener('rightclick', e => this.$emit('right-click', e));
    // TODO: Remove in major release
    this.rectangle.addListener('dblclick', e => this.$emit('doubleClick', e)); // eslint-disable-line
    this.rectangle.addListener('dragend', e =>
      this.$emit('dragEnd', e.latLng.toJSON())
    ); // eslint-disable-line
    this.rectangle.addListener('dragstart', e =>
      this.$emit('dragStart', e.latLng.toJSON())
    ); // eslint-disable-line
    this.rectangle.addListener('rightclick', e => this.$emit('rightClick', e)); // eslint-disable-line
  }

  beforeDestroy() {
    if (this.rectangle) this.rectangle.setMap(null);
  }

  render() {
    return null;
  }
}
