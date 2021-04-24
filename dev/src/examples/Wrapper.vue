<template>
  <div class="wrapper">
    <div class="description">
      <slot name="description" />
    </div>
    <div class="map">
      <slot name="map" />
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: {
    title: { type: String, default: null }
  }
};
</script>

<style scoped>
.wrapper {
  padding: 20px 0;
  width: auto;
}
.description {
  text-align: center;
}
.map {
  width: 100%;
  height: 300px;
  display: inline-block;
  max-height: 100%;
  overflow: auto;
  border: 2px ridge silver;
  background-color: rgb(229, 227, 223);
}
@media screen and (max-width: 500px) {
  .description {
    display: none;
  }
}
</style>
