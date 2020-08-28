<script>
export default {
  name: 'gmapsPolyline',
  inject: ['getMap', 'handleError'],
  props: {
    clickable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    geodesic: { type: Boolean, default: false },
    icons: { type: Array, default: () => [] },
    path: { type: Array, required: true },
    strokeColor: { type: String, default: 'black' },
    strokeOpacity: { type: [String, Number], default: 1 },
    strokeWeight: { type: [String, Number], default: 3 },
    visible: { type: Boolean, default: true },
    zIndex: { type: [String, Number], default: 0 }
  },
  data: () => ({ polyline: null }),
  computed: {
    _options: (vm) => ({
      clickable: vm.clickable,
      draggable: vm.draggable,
      editable: vm.editable,
      geodesic: vm.geodesic,
      icons: vm.icons,
      path: vm.path,
      strokeColor: vm.strokeColor,
      strokeOpacity: +vm.strokeOpacity,
      strokeWeight: +vm.strokeWeight,
      visible: vm.visible,
      zIndex: vm.zIndex
    })
  },
  methods: {
    changedPath() {
      if (this.polyline.getEditable()) {
        const result = this.polyline
          .getPath()
          .getArray()
          .map((e) => e.toJSON())
        this.$emit('pathChanged', result)
      }
    }
  },
  mounted() {
    this.$GMaps()
      .then((GMaps) => {
        this.polyline = new GMaps.Polyline({
          map: this.getMap(),
          options: { ...this._options }
        })
      })
      .then(() => this.polyline.addListener('click', (e) => this.$emit('click', e)))
      .then(() => this.polyline.addListener('dblclick', (e) => this.$emit('doubleClick', e)))
      .then(() => this.polyline.addListener('drag', (e) => this.$emit('drag', e)))
      .then(() => this.polyline.addListener('dragend', (e) => this.$emit('dragEnd', e)))
      .then(() => this.polyline.addListener('dragstart', (e) => this.$emit('dragStart', e)))
      .then(() => this.polyline.addListener('mouseover', (e) => this.$emit('mouseover', e)))
      .then(() => this.polyline.addListener('rightclick', (e) => this.$emit('rightClick', e)))
      // NOTE: path events insert_at and set_at only fired once so mouse up was more reliable (but mouse up doesn't trigger for remove event)
      .then(() => this.polyline.addListener('mouseup', () => this.changedPath()))
      .then(() => this.polyline.getPath().addListener('remove_at', () => this.changedPath()))
      .catch((e) => this.handleError(e))
  },
  watch: {
    _options(newVal) {
      this.polyline.setOptions(newVal)
    }
  },
  beforeDestroy() {
    if (this.polyline) this.polyline.setMap(null)
  },
  render: () => null
}
</script>
