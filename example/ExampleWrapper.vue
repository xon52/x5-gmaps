<template>
  <div class="wrapper" :id="anchor">
    <h2 v-if="title" class="title">{{ title }} <a :href="`#${anchor}`">#</a></h2>
    <div class="description">
      <slot name="description"></slot>
    </div>
    <div class="sides">
      <div class="side">
        <slot name="map"></slot>
      </div>
      <div class="side">
        <div class="code">
          <h4>Code:</h4>
          <slot name="code"></slot>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ExampleWrapper',
  props: {
    title: { type: String, default: null }
  },
  computed: {
    anchor() {
      return this.title.toLowerCase().replace(/\s/g, '')
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 20px 0;
  width: auto;
}
.title {
  text-align: center;
  margin: 0;
}
.description {
  text-align: center;
}
.side {
  width: 50%;
  height: 300px;
  display: inline-block;
  max-height: 100%;
  overflow: auto;
}
.sides {
  border: 2px ridge silver;
  background: #eee;
}
.code {
  padding: 0 20px;
}
@media screen and (max-width: 600px) {
  .side {
    width: 100%;
  }
}
</style>