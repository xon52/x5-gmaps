import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';

@Component
export default class GmapsInfoWindow extends Vue {
  name = 'gmapsInfoWindow';

  @Inject('getMap') private getMap!: () => google.maps.Map;
  @Inject('handleError') private handleError!: (e: Error) => void;

  @Prop({ default: () => ({}) })
  readonly options!: google.maps.InfoWindowOptions;

  private infoW: google.maps.InfoWindow | undefined;

  public open() {
    if (this.infoW) this.infoW.open(this.getMap());
  }

  @Watch('options', { immediate: true, deep: true })
  optionsChanged(newVal: google.maps.InfoWindowOptions) {
    if (this.infoW) this.infoW.setOptions(newVal);
  }

  mounted() {
    if (!this.options.position)
      return this.handleError(
        new Error('InfoWindow options require a position property.')
      );
    this.infoW = new globalThis.google.maps.InfoWindow({
      content: this.$el,
      ...this.options
    });

    this.infoW.addListener('closeclick', () => this.$emit('closed'));
    this.open();
  }

  beforeDestroy() {
    if (this.infoW) this.infoW.close();
    if (this.infoW) globalThis.google.maps.event.clearInstanceListeners(this.infoW);
  }

  public render(h: CreateElement): VNode {
    return h('div', this.$slots.default);
  }
}
