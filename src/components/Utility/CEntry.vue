<template>
  <div  :class="{
          'entry':  true,
          'mb':    !d_flex,
          'd-flex': d_flex,
        }"
  >
    <h3>{{ entry.title }}</h3>
    <h4>{{ entry.content }}</h4>
    <slot></slot>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Entry } from '@/store/modules/types';

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

<style lang="css" scoped>
/* .entry {
  width: 100%;
  text-align: left;
}
.mb {
  margin-bottom: 1rem;
}
.d-flex {
  display: flex;
  align-items: center;

  & h3, & h4 {
    margin-right: 1rem;
  }
} */

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
}
 .d-flex h3, .d-flex h4 {
   margin-right: 1rem;
}
</style>