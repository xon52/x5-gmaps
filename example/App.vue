<template>
  <div class="wrapper">
    <div class="center">
      <img src="./img/logo.svg" width="300" @click.ctrl="testMode = !testMode" />
      <h1>x5-gmaps Example</h1>
    </div>
    <e-tutorials />
    <e-bug-test v-if="testMode" />
    <e-examples v-else />
  </div>
</template>

<script>
import EExamples from './Examples'
import ETutorials from './Tutorials'
import EBugTest from './BugTest'

export default {
  name: 'Example-App',
  components: {
    EExamples,
    ETutorials,
    EBugTest
  },
  data: () => ({
    testMode: false
  })
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  max-width: 800px;
}
.center {
  text-align: center;
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
