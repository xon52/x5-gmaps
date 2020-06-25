<script>
export default {
  name: 'gmapsPolygon',
  inject: ['getMap', 'handleError'],
  props: {
    clickable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    fillColor: { type: String, default: 'black' },
    fillOpacity: { type: [String, Number], default: 0.3 },
    geodesic: { type: Boolean, default: false },
    icons: { type: Array, default: () => [] },
    path: { type: Array, required: true },
    strokeColor: { type: String, default: 'black' },
    strokePosition: { type: [String, Number], default: 0 },
    strokeOpacity: { type: [String, Number], default: 1 },
    strokeWeight: { type: [String, Number], default: 3 },
    visible: { type: Boolean, default: true },
    zIndex: { type: [String, Number], default: 0 }
  },
  data: () => ({ polygon: null }),
  computed: {
    _options: vm => ({
      clickable: vm.clickable,
      draggable: vm.draggable,
      editable: vm.editable,
      fillColor: vm.fillColor,
      fillOpacity: +vm.fillOpacity,
      geodesic: vm.geodesic,
      icons: vm.icons,
      path: vm.path,
      strokeColor: vm.strokeColor,
      strokePosition: +vm.strokePosition,
      strokeOpacity: +vm.strokeOpacity,
      strokeWeight: +vm.strokeWeight,
      visible: vm.visible,
      zIndex: vm.zIndex
    })
  },
  mounted() {
    this.$GMaps()
      .then(GMaps => {
        this.polygon = new GMaps.Polygon({
          map: this.getMap(),
          options: { ...this._options }
        })
      })
      .then(() => this.polygon.addListener('click', e => this.$emit('click', e)))
      .then(() => this.polygon.addListener('dblclick', e => this.$emit('doubleClick', e)))
      .then(() => this.polygon.addListener('drag', e => this.$emit('drag', e)))
      .then(() => this.polygon.addListener('dragend', e => this.$emit('dragEnd', e)))
      .then(() => this.polygon.addListener('dragstart', e => this.$emit('dragStart', e)))
      .then(() => this.polygon.addListener('mouseover', e => this.$emit('mouseover', e)))
      .then(() => this.polygon.addListener('rightclick', e => this.$emit('rightClick', e)))
      .catch(e => this.handleError(e))
  },
  watch: {
    _options(newVal) {
      this.polygon.setOptions(newVal)
    }
  },
  beforeDestroy() {
    if (this.polygon) this.polygon.setMap(null)
  },
  render: () => null
}
</script>
