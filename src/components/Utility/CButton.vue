<template>
    <button @click="onButtonClick($event)"
      :class="{
        button: true,
        disabled: disabled
      }"
      :style="{ '--color': color }">
      <slot></slot>
    </button>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'CButton',
  props: [
    'color',
    'disabled'
  ],
  methods: {
    onButtonClick(e) {
      this.$emit('onClick', e);
    }
  }
})
export default class CButton extends Vue {}

</script>

<style scoped lang="scss">

.button {
  background-color: var(--color);
  border: none;
  width: fit-content;
  color: rgb(236, 236, 236);
  letter-spacing: -1px;
  font-size: 2rem;
  outline: none;
  border-radius: 6px;
  padding: 0px 16px;
  transition: box-shadow .3s, letter-spacing .1s;
  cursor: pointer;
  box-shadow: inset 1px 1px 2px rgb(255, 255, 255);

  &.disabled {
    box-shadow: none!important;
    user-select: none;
    cursor: default;
    pointer-events: none;
    background-color: rgba(182, 182, 182, 0.76);
    color: rgb(133, 133, 133);
  }
  &:hover{
    box-shadow: inset -1px -1px 2px rgb(255, 255, 255);
  }
  &:active {
    box-shadow: inset -1px -1px 5px rgb(255, 255, 255);
  }
}  

</style>