<template>
  <div class="rule">
    <h2>{{ title }}</h2>
    <h1>{{ content }}</h1>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    content: {
      type: String,
      default: 'Content',
    },
  }
})

export default class CEntry extends Vue {}
</script>

<style lang="scss" scoped>
.rule {
  width: 50%;
  text-align: left;
  margin-bottom: 1rem;
}
h2 {
  font-size: 2rem;
}
h1 {
  font-size: 1.3rem;
}
</style>