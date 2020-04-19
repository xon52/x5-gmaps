<script>
export default {
  name: 'gmapsMarker',
  inject: ['getMap', 'handleError'],
  props: {
    icon: { type: String, default: null },
    label: { type: String, default: null },
    opacity: { type: [String, Number], default: null },
    options: { type: Object, default: () => ({}) },
    position: { type: Object, default: null },
    title: { type: String, default: null },
    visible: { type: Boolean, default: null },
    zIndex: { type: [String, Number], default: null }
  },
  data: () => ({ marker: null }),
  computed: {
    _options() {
      const options = { ...this.options }
      if (this.icon) options.icon = +this.icon
      if (this.label) options.label = +this.label
      if (this.position) options.position = this.position
      if (this.title) options.title = +this.title
      if (this.visible) options.visible = +this.visible
      if (this.zIndex) options.zIndex = +this.zIndex
      return options
    }
  },
  mounted() {
    if (!this.position && !this.options.position)
      throw new Error(
        'x5-gmaps: A position is required by every marker. Set this as either a position prop, or a position property of the options prop.'
      )
    this.$GMaps()
      .then(GMaps => (this.marker = new GMaps.Marker({ map: this.getMap(), ...this._options })))
      .then(() =>
        // Depreciated 19/04
        this.marker.addListener('position_changed', () => this.$emit('positionChanged', this.marker.getPosition()))
      )
      .then(() =>
        this.marker.addListener('position_changed', () => this.$emit('move', this.marker.getPosition().toJSON()))
      )
      .then(() => this.marker.addListener('click', e => this.$emit('click', e)))
      .then(() => this.marker.addListener('dblclick', e => this.$emit('doubleClick', e)))
      .then(() => this.marker.addListener('rightclick', e => this.$emit('rightClick', e)))
      .then(() => this.marker.addListener('mouseover', e => this.$emit('mouseover', e)))
      .then(() => this.marker.addListener('mouseout', e => this.$emit('mouseout', e)))
      .catch(e => this.handleError(e))
  },
  watch: {
    _options(newVal) {
      this.marker.setOptions(newVal)
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
