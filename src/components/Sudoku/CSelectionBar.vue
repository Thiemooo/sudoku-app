<template>
  <div class="selection-bar" :style="{'--count': content.length}">
    <c-sudoku-field v-for="nF in content" 
                    :key="nF.number"
                    :field="nF"
                    :selected="false"
                    @onFieldClick="onSelectionBarClick"
                    :class="{
                      numberField: nF.data    == 'NUMBER-FIELD',
                      actionField: nF.data    == 'ACTION-FIELD',
                      active:      nF.fieldID == getActionFieldIDs.Notation && getIfIsNoting,
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
    }
  },
  computed: {
    ...mapGetters(['getIfIsNoting', 'getActionFieldIDs']),
  }
})
export default class CSelectionBar extends Vue {}
</script>

<style lang="scss" scoped>
.selection-bar {
  display: grid;
  // flex-direction: column;

  & div {
    border: 1px solid rgb(153, 146, 179);
  }
}
</style>