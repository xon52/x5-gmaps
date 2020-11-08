<template>
  <div class="wrapper">
    <e-header />
    <e-tutorials />
    <e-examples />
  </div>
</template>

<script>
import EExamples from './Examples'
import EHeader from './Header'
import ETutorials from './Tutorials'

export default {
  name: 'Example-App',
  components: {
    EExamples,
    EHeader,
    ETutorials
  }
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 800px;
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
