<template>
  <div class="wrapper">
    <!-- Banner / Selector -->
    <div class="banner">
      <div class="logo">
        <img src="../public/img/logo.png" alt="Logo" />
      </div>
      <div class="options">
        <select v-model="selected" @change="handleSelect($event.target.value)">
          <option
            v-for="(e, i) in examples"
            :key="i"
            :title="e.desc"
            :value="i"
          >
            {{ e.name }}
          </option>
        </select>
      </div>
    </div>
    <!-- Component -->
    <div class="map">
      <component :is="examples[selected].component" v-if="selected !== null" />
    </div>
  </div>
</template>

<script>
import examples from './examples/examples';

export default {
  name: 'ExampleApp',
  data: () => ({
    examples,
    selected: 6
  }),
  methods: {
    handleSelect(i) {
      this.selected = i;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
</style>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 800px;
}
.banner {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner .logo img {
  flex-basis: 40%;
  max-width: 100px;
}
.banner .options {
  flex-basis: 50%;
  padding-left: 20px;
}
.banner .options select {
  padding: 10px;
  width: 100%;
  font-size: 20px;
  border-radius: 10px;
}
@media screen and (max-width: 500px) {
  .banner {
    display: block;
  }
  .banner .logo {
    width: 100px;
    margin: 0 auto;
  }
  .banner .options {
    padding-top: 20px;
    padding-left: 0;
  }
}
</style>

<style>
.instructions {
  border: 1px silver solid;
  background: #eee;
  padding: 10px;
}
.instructions-title {
  color: dodgerblue;
}
.instructions-title::before {
  content: 'ℹ ';
}
.instructions-action {
  display: inline-block;
  margin: 0 10px;
}
</style>
