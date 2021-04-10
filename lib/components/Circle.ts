import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';

@Component
export default class GmapsCircle extends Vue {
  name = 'gmapsCircle';

  @Inject('getMap') private getMap!: () => google.maps.Map;

  @Prop({ default: 0.001 }) readonly sensitivity!: string | number;
  @Prop({ required: true }) readonly center!: google.maps.LatLngLiteral;
  @Prop({ required: true }) readonly radius!: string | number;
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

  private circle: google.maps.Circle | undefined;
  private tempCenter: google.maps.LatLngLiteral = this.center;
  private tempRadius: number = +this.radius;

  get _options(): google.maps.CircleOptions {
    return {
      center: this.center,
      clickable: this.clickable,
      draggable: this.draggable,
      editable: this.editable,
      fillColor: this.fillColor,
      fillOpacity: +this.fillOpacity,
      radius: +this.radius,
      strokeColor: this.strokeColor,
      strokeOpacity: +this.strokeOpacity,
      strokePosition: +this.strokePosition,
      strokeWeight: +this.strokeWeight,
      visible: this.visible,
      zIndex: +this.zIndex
    };
  }

  @Watch('_options', { immediate: true, deep: true })
  _optionsChanged(newVal: google.maps.CircleOptions): void {
    if (this.circle) this.circle.setOptions(newVal);
  }

  public changedCenter(): void {
    if (!this.circle) return;
    // This is fired when the component is replaced and may not have a tempCenter
    const oldCenter = this.tempCenter || -1;
    const newCenter = this.circle.getCenter().toJSON();
    if (
      Math.abs(newCenter.lat - oldCenter.lat) > this.sensitivity ||
      Math.abs(newCenter.lng - oldCenter.lng) > this.sensitivity
    ) {
      this.tempCenter = newCenter;
      this.$emit('center-changed', newCenter);
      // TODO: Remove in major release
      this.$emit('centerChanged', newCenter); // eslint-disable-line
    }
  }
  public changedRadius(): void {
    if (!this.circle) return;
    // This is fired when the component is replaced and may not have a tempCenter
    const oldRadius = this.tempRadius || -1;
    const newRadius = this.circle.getRadius();
    if (Math.abs(newRadius - oldRadius) > 1) {
      this.tempRadius = newRadius;
      this.$emit('radius-changed', newRadius);
      // TODO: Remove in major release
      this.$emit('radiusChanged', newRadius); // eslint-disable-line
    }
  }

  mounted(): void {
    this.circle = new window.google.maps.Circle({
      map: this.getMap(),
      ...this._options
    });
    this.circle.addListener('center_changed', () => this.changedCenter());
    this.circle.addListener('radius_changed', () => this.changedRadius());
    this.circle.addListener('click', e => this.$emit('click', e));
    this.circle.addListener('dblclick', e => this.$emit('double-click', e));
    this.circle.addListener('drag', e => this.$emit('drag', e.latLng.toJSON()));
    this.circle.addListener('dragend', e =>
      this.$emit('drag-end', e.latLng.toJSON())
    );
    this.circle.addListener('dragstart', e =>
      this.$emit('drag-start', e.latLng.toJSON())
    );
    this.circle.addListener('mouseover', e => this.$emit('mouseover', e));
    this.circle.addListener('rightclick', e => this.$emit('right-click', e));
    // TODO: Remove in major release
    this.circle.addListener('dblclick', e => this.$emit('doubleClick', e)); // eslint-disable-line
    this.circle.addListener('dragend', e =>
      this.$emit('dragEnd', e.latLng.toJSON())
    ); // eslint-disable-line
    this.circle.addListener('dragstart', e =>
      this.$emit('dragStart', e.latLng.toJSON())
    ); // eslint-disable-line
    this.circle.addListener('rightclick', e => this.$emit('rightClick', e)); // eslint-disable-line
  }

  beforeDestroy(): void {
    if (this.circle) this.circle.setMap(null);
  }

  render(): null {
    return null;
  }
}
