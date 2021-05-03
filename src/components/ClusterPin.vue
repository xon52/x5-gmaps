<template>
  <div class="gmaps-cluster-pin" @click.prevent="$emit('click')">
    <div class="gmaps-cluster-center" :style="{ ['--background']: background }">
      <span>
        {{ count }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { X5Pos } from 'src/types/x5gmaps';
import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';
import { createPopupClass, PopupType } from './popupClass';

@Component
export default class GmapsClusterPin extends Vue {
  name = 'gmapsClusterPin';

  @Inject('getMap') private getMap!: () => google.maps.Map;

  @Prop({ required: true }) readonly position!: X5Pos;
  @Prop({ required: true }) readonly count!: number;
  @Prop({ default: '#EEEEEE' }) readonly background!: string;

  private popup: PopupType | undefined;

  @Watch('position', { deep: true })
  positionChanged(newVal: google.maps.LatLngLiteral) {
    if (this.popup) this.popup.setPosition(newVal);
  }

  mounted() {
    const Popup = createPopupClass();
    this.popup = new Popup(this.position, this.$el);
    if (this.popup) this.popup.setMap(this.getMap());
  }

  beforeDestroy() {
    if (this.popup) this.popup.setMap(null);
  }

  render(): null {
    return null;
  }
}
</script>

<style lang="scss">
@import '../scss/cluster.scss';
</style>
