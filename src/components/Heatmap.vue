<script>
export default {
  name: 'gmapsHeatmap',
  inject: ['getMap', 'handleError'],
  props: {
    colors: { type: Array, default: null },
    dissipating: { type: Boolean, default: true },
    items: { type: Array, required: true },
    maxIntensity: { type: [String, Number], default: null },
    opacity: { type: [String, Number], default: null },
    radius: { type: [String, Number], default: null },
    weightProp: { type: String, default: null }
  },
  data: () => ({ heatmap: null }),
  computed: {
    _options() {
      const options = { dissipating: this.dissipating }
      if (this.colors) options.gradient = ['rgba(0,0,0,0)', ...this.colors]
      if (this.maxIntensity) options.maxIntensity = +this.maxIntensity
      if (this.opacity) options.opacity = +this.opacity
      if (this.radius) options.radius = +this.radius
      return options
    }
  },
  methods: {
    getData(GMaps) {
      if (this.weightProp)
        return this.items.map(e => ({ location: new GMaps.LatLng(e.lat, e.lng), weight: e[this.weightProp] }))
      return this.items.map(e => new GMaps.LatLng(e.lat, e.lng))
    },
    updateData() {
      this.$GMaps()
        .then(GMaps => this.heatmap.setData(this.getData(GMaps)))
        .catch(e => this.handleError(e))
    }
  },
  mounted() {
    this.$GMaps()
      .then(GMaps => {
        this.heatmap = new GMaps.visualization.HeatmapLayer({
          map: this.getMap(),
          data: this.getData(GMaps),
          options: { ...this._options }
        })
      })
      .catch(e => this.handleError(e))
  },
  watch: {
    items() {
      this.updateData()
    },
    weightProp() {
      this.updateData()
    },
    _options(newVal) {
      this.heatmap.setOptions(newVal)
    }
  },
  beforeDestroy() {
    if (this.heatmap) this.heatmap.setMap(null)
  },
  render: () => null
}
</script>
