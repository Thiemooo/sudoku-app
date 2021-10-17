<template>
  <div class="container">
    <div class="button-container">
      <c-button @onClick="startSudoku" style="margin-bottom: 2rem;" :disabled="false" color="rgb(0, 0, 8)">Start</c-button>
    </div>
    <div class="sudoku-container">
      <c-selection-bar    v-if="!getIfFirst" style="margin-right: 7.5rem;" :content="getNumberFields" @onSelectionBarClick="fillInContent"></c-selection-bar>
      <c-selection-bar    v-if="!getIfFirst" style="margin-right: 7.5rem;" :content="getActionFields" @onSelectionBarClick="onActionClick"></c-selection-bar>
      <div class="sudoku" v-if="!getIfFirst">
        <c-sudoku-square  v-for="sC in this.getContent" 
                          :key="getContent.indexOf(sC)+1"
                          :squareID="getContent.indexOf(sC)+1" 
                          :squareContent="sC"
        ></c-sudoku-square>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import CSudokuSquare from './CSudokuSquare.vue';
import CSelectionBar from './CSelectionBar.vue';
import CButton from '../Utility/CButton.vue';

@Component({
  components: {
    CSudokuSquare,
    CSelectionBar,
    CButton,
  },
  methods: {
    ...mapActions(['createSudoku', 'hideSudoku', 'setIfIsFirst', 'updateSelectedField', 'switchIfIsNoting', 'changeNotations', 'undoStep']),
    startSudoku() {
      this.createSudoku();
      this.setIfIsFirst(false);
      this.hideSudoku();
    },
    fillInContent(numberField) { 
      const selectedField = this.getSelectedField;
      if (selectedField.hidden) {
        if (this.getIfIsNoting) this.changeNotations({ field: selectedField, notation: numberField.content.toString() });
        else {
          if (selectedField.content == numberField.content) {
            selectedField.hidden = false;
            selectedField.wrong  = false;
          }
          else {
            selectedField.wrong  = true;
            selectedField.wrongContent = numberField.content;
          }
        }
      }
      this.updateSelectedField(selectedField);
    },
    onActionClick(actionField) {
      const ActionFields = this.getActionFieldIDs;
      
      if (actionField.fieldID == ActionFields.Delete) {
        console.log(ActionFields.Delete);
        const selectedField = this.getSelectedField;
        selectedField.wrongContent = 0;
        selectedField.wrong        = false;
        this.updateSelectedField(selectedField);
      }
      else if (actionField.fieldID == ActionFields.Notation) {
        console.log(ActionFields.Notation);
        this.switchIfIsNoting();
      }
      else if (actionField.fieldID == ActionFields.Clear) {
        console.log(ActionFields.Clear);
        const selectedField = this.getSelectedField;
        selectedField.notations = [];
        this.updateSelectedField(selectedField);
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
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.button-container button {
  margin-left: 3rem;
  margin-right: 3rem;
}
.sudoku-container {
  display: flex;
  flex-direction: row;
}
.sudoku {
  width: 50rem;
  height: 50rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  user-select: none;
}
</style>