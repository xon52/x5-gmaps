<template>
  <div class="gmaps-map">
    <!-- Error slot -->
    <template v-if="error">
      <slot name="error" :error="error">
        <span class="gmaps-error">Error: {{ error }}</span>
      </slot>
    </template>
    <!-- Loading slot -->
    <template v-else-if="loading">
      <slot name="loading">
        <span class="gmaps-spinner"></span>
      </slot>
    </template>
    <!-- Map -->
    <div v-show="!error && !loading" class="gmaps-map" ref="gmap">
      <slot v-if="map" />
    </div>
  </div>
</template>

<script>
const defaultOptions = {
  center: { lat: -27.5, lng: 153 },
  zoom: 12
}

export default {
  name: 'gmapsMap',
  provide: function() {
    return {
      getMap: () => this.getMap(),
      handleError: e => this.handleError(e)
    }
  },
  props: { options: { type: Object, default: () => ({}) } },
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
        if (this.map) this.map.setOptions(options)
      }
    }
  },
  mounted() {
    this.$GMaps()
      .then(GMaps => (this.map = new GMaps.Map(this.$refs.gmap, { ...defaultOptions, ...this.options })))
      .then(() => this.map.addListener('bounds_changed', () => this.$emit('boundsChanged', this.map.getBounds())))
      .then(() => this.map.addListener('center_changed', () => this.$emit('centerChanged', this.map.getCenter())))
      .then(() => this.map.addListener('click', e => this.$emit('click', e)))
      .then(() => this.map.addListener('dblclick', e => this.$emit('doubleClick', e)))
      .then(() => this.map.addListener('rightclick', e => this.$emit('rightClick', e)))
      .catch(e => this.handleError(e))
      .finally(() => setTimeout(() => (this.loading = false), 100))
  },
  beforeDestroy() {
    if (this.map)
      this.$GMaps()
        .then(GMaps => GMaps.event.clearInstanceListeners(this.map))
        .catch(e => this.handleError(e))
  }
}
</script>
