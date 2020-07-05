<script>
export default {
  name: 'gmapsCircle',
  inject: ['getMap', 'handleError'],
  props: {
    center: { type: Object, required: true },
    clickable: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    fillColor: { type: String, default: 'black' },
    fillOpacity: { type: [String, Number], default: 0.3 },
    radius: { type: [String, Number], required: true },
    strokeColor: { type: String, default: 'black' },
    strokeOpacity: { type: [String, Number], default: 1 },
    strokePosition: { type: [String, Number], default: 0 },
    strokeWeight: { type: [String, Number], default: 3 },
    visible: { type: Boolean, default: true },
    zIndex: { type: [String, Number], default: 0 }
  },
  data: () => ({ circle: null }),
  computed: {
    _options: vm => ({
      center: vm.center,
      clickable: vm.clickable,
      draggable: vm.draggable,
      editable: vm.editable,
      fillColor: vm.fillColor,
      fillOpacity: +vm.fillOpacity,
      radius: +vm.radius,
      strokeColor: vm.strokeColor,
      strokeOpacity: +vm.strokeOpacity,
      strokePosition: +vm.strokePosition,
      strokeWeight: +vm.strokeWeight,
      visible: vm.visible,
      zIndex: vm.zIndex
    })
  },
  methods: {
    changedCenter() {
      const oldCenter = this.center
      const newCenter = this.circle.getCenter().toJSON()
      return Math.abs(newCenter.lat - oldCenter.lat) > 0.001 || Math.abs(newCenter.lng - oldCenter.lng) > 0.001
        ? newCenter
        : false
    },
    changedRadius() {
      const oldRadius = +this.radius
      const newRadius = this.circle.getRadius()
      return Math.abs(newRadius - oldRadius) > 1 ? newRadius : false
    }
  },
  mounted() {
    this.$GMaps()
      .then(GMaps => {
        this.circle = new GMaps.Circle({
          map: this.getMap(),
          options: { ...this._options }
        })
      })
      .then(() =>
        this.circle.addListener('center_changed', () => {
          const center = this.changedCenter()
          if (center) this.$emit('centerChanged', center)
        })
      )
      .then(() =>
        this.circle.addListener('radius_changed', () => {
          const radius = this.changedRadius()
          if (radius) this.$emit('radiusChanged', radius)
        })
      )
      .then(() => this.circle.addListener('click', e => this.$emit('click', e)))
      .then(() => this.circle.addListener('dblclick', e => this.$emit('doubleClick', e)))
      .then(() => this.circle.addListener('drag', e => this.$emit('drag', e)))
      .then(() => this.circle.addListener('dragend', e => this.$emit('dragEnd', e)))
      .then(() => this.circle.addListener('dragstart', e => this.$emit('dragStart', e)))
      .then(() => this.circle.addListener('mouseover', e => this.$emit('mouseover', e)))
      .then(() => this.circle.addListener('rightclick', e => this.$emit('rightClick', e)))
      .catch(e => this.handleError(e))
  },
  watch: {
    _options(newVal) {
      this.circle.setOptions(newVal)
    }
  },
  beforeDestroy() {
    if (this.circle) this.circle.setMap(null)
  },
  render: () => null
}
</script>
