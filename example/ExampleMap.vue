<template>
  <example-wrapper title="Minimal Map">
    <template #description>
      <p>
        This is just a map with the minimal options required (a center and a zoom level)
      </p>
    </template>
    <template #map>
      <gmaps-map />
    </template>
    <template #code>
      <div>
        <pre>
&lt;gmaps-map />
          </pre
        >
      </div>
    </template>
  </example-wrapper>
</template>

<script>
import ExampleWrapper from './ExampleWrapper'
import { gmapsMap } from '../dist'

export default {
  name: 'ExampleMap',
  components: { ExampleWrapper, gmapsMap }
}
</script>
