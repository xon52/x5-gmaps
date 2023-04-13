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
  _optionsChanged(newVal: google.maps.CircleOptions) {
    if (this.circle) this.circle.setOptions(newVal);
  }

  public changedCenter() {
    if (!this.circle) return;
    // This is fired when the component is replaced and may not have a tempCenter
    const newCenter = this.circle.getCenter()!.toJSON();
    if (
      !this.tempCenter ||
      Math.abs(newCenter.lat - this.tempCenter.lat) > +this.sensitivity ||
      Math.abs(newCenter.lng - this.tempCenter.lng) > +this.sensitivity
    ) {
      this.tempCenter = newCenter;
      this.$emit('center-changed', newCenter);
      // TODO: Remove in major release
      this.$emit('centerChanged', newCenter); // eslint-disable-line
    }
  }
  public changedRadius() {
    if (!this.circle) return;
    // This is fired when the component is replaced and may not have a tempCenter
    const newRadius = this.circle.getRadius();
    if (!this.tempRadius || Math.abs(newRadius - this.tempRadius) > 1) {
      this.tempRadius = newRadius;
      this.$emit('radius-changed', newRadius);
      // TODO: Remove in major release
      this.$emit('radiusChanged', newRadius); // eslint-disable-line
    }
  }

  mounted() {
    this.circle = new globalThis.google.maps.Circle({
      map: this.getMap(),
      ...this._options
    });
    this.circle.addListener('center_changed', () => this.changedCenter());
    this.circle.addListener('radius_changed', () => this.changedRadius());
    this.circle.addListener('click', (e: google.maps.MapMouseEvent) =>
      this.$emit('click', e)
    );
    this.circle.addListener('dblclick', (e: google.maps.MapMouseEvent) =>
      this.$emit('double-click', e)
    );
    this.circle.addListener('drag', (e: google.maps.MapMouseEvent) =>
      this.$emit('drag', e.latLng ? e.latLng.toJSON() : null)
    );
    this.circle.addListener('dragend', (e: google.maps.MapMouseEvent) =>
      this.$emit('drag-end', e.latLng ? e.latLng.toJSON() : null)
    );
    this.circle.addListener('dragstart', (e: google.maps.MapMouseEvent) =>
      this.$emit('drag-start', e.latLng ? e.latLng.toJSON() : null)
    );
    this.circle.addListener('mouseover', (e: google.maps.MapMouseEvent) =>
      this.$emit('mouseover', e)
    );
    this.circle.addListener('rightclick', (e: google.maps.MapMouseEvent) =>
      this.$emit('right-click', e)
    );
    // TODO: Remove in major release
    this.circle.addListener('dblclick', (e: google.maps.MapMouseEvent) =>
      this.$emit('doubleClick', e)
    ); // eslint-disable-line
    this.circle.addListener('dragend', (e: google.maps.MapMouseEvent) =>
      this.$emit('dragEnd', e.latLng ? e.latLng.toJSON() : null)
    ); // eslint-disable-line
    this.circle.addListener('dragstart', (e: google.maps.MapMouseEvent) =>
      this.$emit('dragStart', e.latLng ? e.latLng.toJSON() : null)
    ); // eslint-disable-line
    this.circle.addListener('rightclick', (e: google.maps.MapMouseEvent) =>
      this.$emit('rightClick', e)
    ); // eslint-disable-line
  }

  beforeDestroy() {
    if (this.circle) this.circle.setMap(null);
  }

  render(): null {
    return null;
  }
}
