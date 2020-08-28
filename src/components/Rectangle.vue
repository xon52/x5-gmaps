<script>
export default {
  name: 'gmapsRectangle',
  inject: ['getMap', 'handleError'],
  props: {
    bounds: { type: Object, required: true },
    clickable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    fillColor: { type: String, default: 'black' },
    fillOpacity: { type: [String, Number], default: 0.3 },
    strokeColor: { type: String, default: 'black' },
    strokeOpacity: { type: [String, Number], default: 1 },
    strokePosition: { type: [String, Number], default: 0 },
    strokeWeight: { type: [String, Number], default: 3 },
    visible: { type: Boolean, default: true },
    zIndex: { type: [String, Number], default: 0 }
  },
  data: (vm) => ({
    rectangle: null,
    tempBounds: vm.bounds
  }),
  computed: {
    _options: (vm) => ({
      bounds: vm.bounds,
      clickable: vm.clickable,
      draggable: vm.draggable,
      editable: vm.editable,
      fillColor: vm.fillColor,
      fillOpacity: +vm.fillOpacity,
      strokeColor: vm.strokeColor,
      strokeOpacity: +vm.strokeOpacity,
      strokePosition: +vm.strokePosition,
      strokeWeight: +vm.strokeWeight,
      visible: vm.visible,
      zIndex: vm.zIndex
    })
  },
  methods: {
    changedBounds() {
      const oldBounds = this.tempBounds
      const newBounds = this.rectangle.getBounds().toJSON()
      if (
        Math.abs(newBounds.north - oldBounds.north) > 0.001 ||
        Math.abs(newBounds.south - oldBounds.south) > 0.001 ||
        Math.abs(newBounds.east - oldBounds.east) > 0.001 ||
        Math.abs(newBounds.west - oldBounds.west) > 0.001
      ) {
        this.tempBounds = newBounds
        this.$emit('boundsChanged', newBounds)
      }
    }
  },
  mounted() {
    this.$GMaps()
      .then((GMaps) => {
        this.rectangle = new GMaps.Rectangle({
          map: this.getMap(),
          options: { ...this._options }
        })
      })
      .then(() => this.rectangle.addListener('bounds_changed', () => this.changedBounds()))
      .then(() => this.rectangle.addListener('click', (e) => this.$emit('click', e)))
      .then(() => this.rectangle.addListener('dblclick', (e) => this.$emit('doubleClick', e)))
      .then(() => this.rectangle.addListener('drag', (e) => this.$emit('drag', e.latLng.toJSON())))
      .then(() => this.rectangle.addListener('dragend', (e) => this.$emit('dragEnd', e.latLng.toJSON())))
      .then(() => this.rectangle.addListener('dragstart', (e) => this.$emit('dragStart', e.latLng.toJSON())))
      .then(() => this.rectangle.addListener('mouseover', (e) => this.$emit('mouseover', e)))
      .then(() => this.rectangle.addListener('rightclick', (e) => this.$emit('rightClick', e)))
      .catch((e) => this.handleError(e))
  },
  watch: {
    _options(newVal) {
      this.rectangle.setOptions(newVal)
    }
  },
  beforeDestroy() {
    if (this.rectangle) this.rectangle.setMap(null)
  },
  render: () => null
}
</script>
