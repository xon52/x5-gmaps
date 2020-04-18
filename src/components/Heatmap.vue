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
    options() {
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
    }
  },
  mounted() {
    this.$GMaps()
      .then(GMaps => {
        this.heatmap = new GMaps.visualization.HeatmapLayer({
          map: this.getMap(),
          data: this.getData(GMaps),
          ...this.options
        })
      })
      .catch(e => this.handleError(e))
  },
  watch: {
    data() {
      this.$GMaps()
        .then(GMaps => this.heatmap.setData(this.getData(GMaps)))
        .catch(e => this.handleError(e))
    },
    options() {
      this.heatmap.setOptions(this.options)
    }
  },
  beforeDestroy() {
    if (this.heatmap) this.heatmap.setMap(null)
  },
  render: () => null
}
</script>
