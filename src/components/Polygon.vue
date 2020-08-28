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
    path: { type: Array, required: true },
    strokeColor: { type: String, default: 'black' },
    strokeOpacity: { type: [String, Number], default: 1 },
    strokePosition: { type: [String, Number], default: 0 },
    strokeWeight: { type: [String, Number], default: 3 },
    visible: { type: Boolean, default: true },
    zIndex: { type: [String, Number], default: 0 }
  },
  data: () => ({ polygon: null }),
  computed: {
    _options: (vm) => ({
      clickable: vm.clickable,
      draggable: vm.draggable,
      editable: vm.editable,
      fillColor: vm.fillColor,
      fillOpacity: +vm.fillOpacity,
      geodesic: vm.geodesic,
      path: vm.path,
      strokeColor: vm.strokeColor,
      strokeOpacity: +vm.strokeOpacity,
      strokePosition: +vm.strokePosition,
      strokeWeight: +vm.strokeWeight,
      visible: vm.visible,
      zIndex: vm.zIndex
    })
  },
  methods: {
    changedPath() {
      if (this.polygon.getEditable()) {
        const result = this.polygon
          .getPath()
          .getArray()
          .map((e) => e.toJSON())
        this.polygon.setPath(result)
        this.$emit('pathChanged', result)
      }
    }
  },
  mounted() {
    this.$GMaps()
      .then((GMaps) => {
        this.polygon = new GMaps.Polygon({
          map: this.getMap(),
          options: { ...this._options }
        })
      })
      .then(() => this.polygon.addListener('click', (e) => this.$emit('click', e)))
      .then(() => this.polygon.addListener('dblclick', (e) => this.$emit('doubleClick', e)))
      .then(() => this.polygon.addListener('drag', (e) => this.$emit('drag', e)))
      .then(() => this.polygon.addListener('dragend', (e) => this.$emit('dragEnd', e)))
      .then(() => this.polygon.addListener('dragstart', (e) => this.$emit('dragStart', e)))
      .then(() => this.polygon.addListener('rightclick', (e) => this.$emit('rightClick', e)))
      // NOTE: path events insert_at and set_at only fired once so mouse up was more reliable (but mouse up doesn't trigger for remove event)
      .then(() => this.polygon.addListener('mouseup', () => this.changedPath()))
      .then(() => this.polygon.getPath().addListener('remove_at', () => this.changedPath()))
      .catch((e) => this.handleError(e))
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
