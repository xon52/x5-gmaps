<script>
export default {
  name: 'gmapsMarker',
  inject: ['getMap', 'handleError'],
  props: { options: { type: Object, required: true } },
  data: () => ({ marker: null }),
  mounted() {
    if (!this.options.position) return this.handleError('Marker options require a position property.')
    this.$GMaps()
      .then(GMaps => (this.marker = new GMaps.Marker({ map: this.getMap(), ...this.options })))
      .then(() => this.marker.addListener('position_changed', () => this.$emit('positionChanged', this.marker.getPosition())))
      .then(() => this.marker.addListener('click', e => this.$emit('click', e)))
      .then(() => this.marker.addListener('dblclick', e => this.$emit('doubleClick', e)))
      .then(() => this.marker.addListener('rightclick', e => this.$emit('rightClick', e)))
      .then(() => this.marker.addListener('mouseover', e => this.$emit('mouseover', e)))
      .then(() => this.marker.addListener('mouseout', e => this.$emit('mouseout', e)))
      .catch(e => this.handleError(e))
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.marker.setOptions(this.options)
      }
    }
  },
  beforeDestroy() {
    if (this.marker) {
      this.marker.setMap(null)
      this.$GMaps()
        .then(GMaps => GMaps.event.clearInstanceListeners(this.marker))
        .catch(e => this.handleError(e))
    }
  },
  render: () => null
}
</script>
