<template>
  <div  :class="{
          'entry':  true,
          'mb':    !d_flex,
          'd-flex': d_flex,
        }"
  >
    <h2>{{ entry.title }}</h2>
    <h1>{{ entry.content }}</h1>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Entry from '@/store/modules/helpers';

@Component({
  props: {
    entry: {
      type: Entry,
      default: () => {
        return {
          title: 'Title',
          content: 'Content',
          id: 'id',
        }
      },
    },
    d_flex: {
      type: Boolean,
      default: false,
    },
  },
})

export default class CEntry extends Vue {}
</script>

<style lang="scss" scoped>
.entry {
  width: 100%;
  text-align: left;
}
.mb {
  margin-bottom: 1rem;
}
.d-flex {
  display: flex;
  align-items: center;

  & h1, & h2 {
    margin-right: 1rem;
  }
}
h2 {
  font-size: 2rem;
}
h1 {
  font-size: 1.3rem;
}
</style>