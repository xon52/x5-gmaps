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
  data: () => ({
    marker: null,
    GMaps: null
  }),
  computed: {
    _options() {
      const options = { ...this.options }
      if (this.icon) options.icon = this.icon
      if (this.label) options.label = this.label
      if (this.opacity) options.opacity = this.opacity
      if (this.position) options.position = this.position
      if (this.title) options.title = this.title
      if (this.visible) options.visible = this.visible
      if (this.zIndex) options.zIndex = +this.zIndex
      return options
    }
  },
  methods: {
    changedPosition() {
      const oldPosition = this.options.position
      // This function is fired when a marker is replaced by Vue (and options is undefined)
      if (!oldPosition) return
      const newPosition = this.marker.getPosition().toJSON()

      return Math.abs(newPosition.lat - oldPosition.lat) > 0.001 || Math.abs(newPosition.lng - oldPosition.lng) > 0.001
        ? newPosition
        : false
    }
  },
  mounted() {
    if (!this.position && !this.options.position)
      throw new Error(
        'x5-gmaps: A position is required by every marker. Set this as either a position prop, or a position property of the options prop.'
      )
    this.$GMaps()
      .then((GMaps) => (this.GMaps = GMaps))
      .then(() => (this.marker = new this.GMaps.Marker({ map: this.getMap(), ...this._options })))
      .then(() =>
        this.marker.addListener('position_changed', () => {
          const position = this.changedPosition()
          if (position) {
            this.$emit('move', position)
            // Depreciated 19/04
            this.$emit('positionChanged', position)
          }
        })
      )
      .then(() => this.marker.addListener('click', (e) => this.$emit('click', e)))
      .then(() => this.marker.addListener('dblclick', (e) => this.$emit('doubleClick', e)))
      .then(() => this.marker.addListener('rightclick', (e) => this.$emit('rightClick', e)))
      .then(() => this.marker.addListener('mouseover', (e) => this.$emit('mouseover', e)))
      .then(() => this.marker.addListener('mouseout', (e) => this.$emit('mouseout', e)))
      .catch((e) => this.handleError(e))
  },
  watch: {
    _options(newVal) {
      this.marker.setOptions(newVal)
    }
  },
  beforeDestroy() {
    try {
      this.marker.setMap(null)
      this.GMaps.event.clearInstanceListeners(this.marker)
    } catch (e) {
      this.handleError(e)
    }
  },
  render: () => null
}
</script>
