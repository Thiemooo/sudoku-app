<template>
  <div class="content">
    <p v-for="contentElement in content" :key="contentElement">{{ contentElement }}</p>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: [
    'content',
  ],
})
export default class CContent extends Vue {}
</script>