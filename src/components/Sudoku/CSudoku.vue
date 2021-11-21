<template>
  <div class="sudoku-container" v-if="!getIfFirst">
    <div class="selection-bar-container">
      <c-selection-bar    v-if="!getIfFirst" :content="getNumberFields" @onSelectionBarClick="fillInContent"></c-selection-bar>
      <c-selection-bar    v-if="!getIfFirst" :content="getActionFields" @onSelectionBarClick="onActionClick"></c-selection-bar>
    </div>
    <div class="sudoku">
      <c-sudoku-square  v-for="sC in this.getContent" 
                        :key="getContent.indexOf(sC)+1"
                        :squareID="getContent.indexOf(sC)+1" 
                        :squareContent="sC"
      ></c-sudoku-square>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import CSudokuSquare from './CSudokuSquare.vue';
import CSelectionBar from './CSelectionBar.vue';

@Component({
  components: {
    CSudokuSquare,
    CSelectionBar,
  },
  methods: {
    ...mapActions(['updateSelectedField', 'switchIfIsNoting', 'changeNotations', 'undoStep']),
    fillInContent(numberField) { 
      const selectedField = this.getSelectedField;
      if (selectedField.hidden) {
        if (this.getIfIsNoting) this.changeNotations({ field: selectedField, notation: numberField.content.toString() });
        else {
          if (selectedField.possibleContents.indexOf(numberField.content) != -1) {
            selectedField.hidden  = false;
            selectedField.wrong   = false;
            selectedField.content = numberField.content;
          }
          else {
            selectedField.wrong   = true;
            selectedField.wrongContent = numberField.content;
          }
        }
      }
      this.updateSelectedField({ newField: selectedField, onAction: false });
    },
    onActionClick(actionField) {
      const ActionFields = this.getActionFieldIDs;
      
      if (actionField.fieldID == ActionFields.Delete) {
        console.log(ActionFields.Delete);
        const selectedField = this.getSelectedField;
        selectedField.wrongContent = 0;
        selectedField.wrong        = false;
        this.updateSelectedField({ newField: selectedField, onAction: true });
      }
      else if (actionField.fieldID == ActionFields.Notation) {
        console.log(ActionFields.Notation);
        this.switchIfIsNoting();
      }
      else if (actionField.fieldID == ActionFields.Clear) {
        console.log(ActionFields.Clear);
        const selectedField = this.getSelectedField;
        selectedField.notations = [];
        this.updateSelectedField({ newField: selectedField, onAction: true });        
      }
      else if (actionField.fieldID == ActionFields.Undo) {
        console.log(ActionFields.Undo + ' is calling undoStep!');
        this.undoStep();
      }
    }
  },
  computed: {
    ...mapGetters(['getActionFieldIDs', 'getContent', 'getIfFirst', 'getNumberFields', 'getActionFields', 'getSelectedField', 'getIfIsNoting', 'getSteps']),
  },
})
export default class CSudoku extends Vue {}
</script>

<style lang="scss" scoped>
.sudoku-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.selection-bar-container {
  width: 25%;
  display: flex;
  justify-content: space-evenly;
}
.sudoku {
  width:  50rem;
  height: 50rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}
</style>