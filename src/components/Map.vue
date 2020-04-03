<template>
  <div class="gmaps-map">
    <span v-if="error" class="gmaps-error">Error: {{ error }}</span>
    <div v-else-if="loading" class="gmaps-spinner"></div>
    <div v-show="!error && !loading" class="gmaps-map" ref="gmap">
      <slot v-if="map" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'gmapsMap',
  provide: function() {
    return {
      getMap: () => this.getMap(),
      handleError: e => this.handleError(e)
    }
  },
  props: { options: { type: Object, required: true } },
  data: () => ({
    error: null,
    loading: true,
    map: null
  }),
  methods: {
    handleError(e) {
      this.error = e.message ? e.message : e
    },
    getMap() {
      return this.map
    }
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        this.map.setOptions(options)
      }
    }
  },
  mounted() {
    if (!this.options.zoom) return this.handleError('Map options require a zoom property.')
    if (!this.options.center) return this.handleError('Map options require a center property.')
    this.$GMaps()
      .then(GMaps => (this.map = new GMaps.Map(this.$refs.gmap, this.options)))
      .then(() => this.map.addListener('bounds_changed', () => this.$emit('boundsChanged', this.map.getBounds())))
      .then(() => this.map.addListener('center_changed', () => this.$emit('centerChanged', this.map.getCenter())))
      .catch(e => this.handleError(e))
      .finally(() => (this.loading = false))
  },
  beforeDestroy() {
    if (this.map)
      this.$GMaps()
        .then(GMaps => GMaps.event.clearInstanceListeners(this.map))
        .catch(e => this.handleError(e))
  }
}
</script>
