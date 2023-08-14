<template>
  <div class="selection-bar" :style="{'--count': content.length, '--fieldWidth': fieldWidth}">
    <c-sudoku-field v-for="nF in content" 
                    :key="nF.number"
                    :field="nF"
                    :selected="false"
                    @onFieldClick="onSelectionBarClick"
                    :class="{
                      numberField: nF.data    == 'NUMBER-FIELD',
                      actionField: nF.data    == 'ACTION-FIELD',
                      active:      nF.fieldID == getActionFieldIDs.Notation && getIfIsNoting,
                      disabled:    shouldDisable(nF.content),
                    }"
                    :width="fieldWidth"
    ></c-sudoku-field>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import CSudokuField from './CSudokuField.vue';

@Component({
  components: {
    CSudokuField,
  },
  props: [
    'content',
    'sudokuHeight',
    'fieldWidth'
  ],
  methods: {
    onSelectionBarClick(selectionBarField) {
      this.$emit('onSelectionBarClick', selectionBarField);
    },
    shouldDisable(number) {
      return this.getFinishedNumbers.indexOf(number) != -1;
    }
  },
  computed: {
    ...mapGetters(['getIfIsNoting', 'getActionFieldIDs', 'getFinishedNumbers']),
  }
})
export default class CSelectionBar extends Vue {}
</script>

<style lang="css">
.selection-bar {
  display: grid;
  grid-row-gap: calc(50px/9);
}

@media only screen and (max-width: 500px) {
  .selection-bar {
    grid-template-columns: repeat(var(--count), 1fr);
    grid-column-gap: calc(50px/9);
    padding-top: 10px;
  }
}
</style>