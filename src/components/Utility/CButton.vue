<template>
    <button @click="onButtonClick($event)"
      :class="{
        button: true,
        disabled: disabled
      }">
      <slot></slot>
    </button>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'CButton',
  props: {
    disabled: {
      // Whether the button should be disabled or not.
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onButtonClick(e) {
      this.$emit('onClick', e);
    }
  }
})
export default class CButton extends Vue {}

</script>

<style lang="css" scoped>
/* .button {
  color: var(--button-color);
  background-color: var(--button-background);
  border: none;
  width: fit-content;
  letter-spacing: -1px;
  font-size: var(--button-font-size);
  outline: none;
  border-radius: 6px;
  padding: 0px 16px;
  transition: box-shadow .3s, letter-spacing .1s;
  cursor: pointer;
  box-shadow: inset 1px 1px 2px rgb(185, 185, 185);

  &.disabled {
    box-shadow: none!important;
    user-select: none;
    cursor: default;
    pointer-events: none;
    background-color: rgba(182, 182, 182, 0.76);
    color: rgb(133, 133, 133);
  }
  &:hover{
    box-shadow: inset -1px -1px 2px rgb(170, 170, 170);
  }
  &:active {
    box-shadow: inset -1px -1px 5px rgb(255, 255, 255);
  }
}   */
.button {
   color: var(--button-color);
   background-color: var(--button-background);
   border: none;
   width: fit-content;
   letter-spacing: -1px;
   font-size: var(--button-font-size);
   outline: none;
   border-radius: 6px;
   padding: 0px 16px;
   transition: box-shadow 0.3s, letter-spacing 0.1s;
   cursor: pointer;
   box-shadow: inset 1px 1px 2px #b9b9b9;
}
 .button.disabled {
   box-shadow: none !important;
   user-select: none;
   cursor: default;
   pointer-events: none;
   background-color: rgba(182, 182, 182, 0.76);
   color: #858585;
}
 .button:hover {
   box-shadow: inset -1px -1px 2px #aaa;
}
 .button:active {
   box-shadow: inset -1px -1px 5px #fff;
}
 
</style>