<template>
  <div class="gmaps-popup-container" @click.prevent="$emit('click')">
    <div class="gmaps-popup-bubble-anchor" :style="`color: ${background};`">
      <div
        class="gmaps-popup-bubble"
        :style="`background: ${background}; maxWidth:${width}; maxHeight:${height};`"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';
import { createPopupClass, PopupType } from './popupClass';

@Component
export default class GmapsPopup extends Vue {
  name = 'gmapsPopup';

  @Inject('getMap') private getMap!: () => google.maps.Map;

  @Prop({ required: true }) readonly position!: google.maps.LatLngLiteral;
  @Prop({ default: '#EEEEEE' }) readonly background!: string;
  @Prop({ default: '200px' }) readonly width!: string;
  @Prop({ default: '60px' }) readonly height!: string;

  private popup: PopupType | undefined;

  @Watch('position', { deep: true })
  positionChanged(newVal: google.maps.LatLngLiteral): void {
    if (this.popup) this.popup.setPosition(newVal);
  }

  mounted(): void {
    const Popup = createPopupClass();
    this.popup = new Popup(this.position, this.$el);
    if (this.popup) this.popup.setMap(this.getMap());
  }

  beforeDestroy(): void {
    if (this.popup) this.popup.setMap(null);
  }

  render(): null {
    return null;
  }
}
</script>


<style lang="scss">
@import '../scss/popup.scss';
</style>
