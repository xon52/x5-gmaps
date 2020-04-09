<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'gmapsInfoWindow',
  inject: ['getMap', 'handleError'],
  props: { options: { type: Object, required: true } },
  data: () => ({ infoW: null }),
  methods: {
    open() {
      this.infoW.open(this.getMap())
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.marker.setOptions(this.options)
      }
    }
  },
  mounted() {
    if (!this.options.position) return this.handleError('InfoWindow options require a position property.')
    this.$GMaps()
      .then(GMaps => (this.infoW = new GMaps.InfoWindow({ content: this.$el, ...this.options })))
      .then(() => this.infoW.addListener('closeclick', () => this.$emit('closed')))
      .then(() => this.open())
      .catch(e => this.handleError(e))
  },
  beforeDestroy() {
    if (this.infoW) this.infoW.close()
  },
  render: () => null
}
</script>