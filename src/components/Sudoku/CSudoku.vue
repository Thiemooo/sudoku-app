<template>
  <div class="sudoku-container">
    <div class="selection-bar-container" :style="{'--sHeight': getSudokuHeight }">
      <c-selection-bar :fieldWidth="getFieldWidth" :content="getNumberFields" @onSelectionBarClick="onNumberFieldClick"></c-selection-bar>
      <c-selection-bar :content="getActionFields" @onSelectionBarClick="onActionFieldClick"></c-selection-bar>
    </div>
    <div ref="sudoku" id="sudoku" class="sudoku">
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
    ...mapActions(['updateSelectedField', 'switchIfIsNoting', 'changeNotations', 'undoStep', 'onArrowKeyDown', 'setSudokuHeight', 'refreshSize']),
    onNumberFieldClick(numberField) {
      this.fillInContent(numberField.content);
    },
    fillInContent(content) {
      const selectedField = this.getSelectedField;
      if (selectedField.hidden) {
        if (this.getIfIsNoting) this.changeNotations({ field: selectedField, notation: content.toString() });
        else {
          if (selectedField.possibleContents.indexOf(content) != -1) {
            selectedField.hidden  = false;
            selectedField.wrong   = false;
            selectedField.content = content;
          }
          else {
            selectedField.wrong   = true;
            selectedField.wrongContent = content;
          }
        }
      }
      this.updateSelectedField({ newField: selectedField, onAction: false });
    },
    onActionFieldClick(actionField) {
      this.action(actionField.fieldID)
    },
    action(actionID) {
      const ActionFields = this.getActionFieldIDs;
      
      if (actionID == ActionFields.Delete) {
        const selectedField = this.getSelectedField;
        if (!selectedField.wrong) return;
        console.log(ActionFields.Delete);
        selectedField.wrongContent = 0;
        selectedField.wrong        = false;
        this.updateSelectedField({ newField: selectedField, onAction: true });
      }
      else if (actionID == ActionFields.Notation) {
        console.log(ActionFields.Notation);
        this.switchIfIsNoting();
      }
      else if (actionID == ActionFields.Clear) {
        console.log(ActionFields.Clear);
        const selectedField = this.getSelectedField;
        selectedField.notations = [];
        this.updateSelectedField({ newField: selectedField, onAction: true });        
      }
      else if (actionID == ActionFields.Undo) {
        this.undoStep();
      }
    },
    onWindowKeyDown(e) {
      if (this.getSelectedField.data == 'FALLBACK-FIELD') return;
      // If no field selected: return
      
      if (e.keyCode >= 37 && e.keyCode <= 40) this.onArrowKeyDown(e.key);
      else if (e.key == 'Delete') if (e.shiftKey) this.action(this.getActionFieldIDs.Clear); else this.action(this.getActionFieldIDs.Delete);
      else if (e.code == 'ShiftRight') this.switchIfIsNoting();
    },
    onWindowKeyPress(e) {
      if (this.getSelectedField.data == 'FALLBACK-FIELD') return;
      // If no field selected: return
      
      const Key = e.key;
      if (Key == "\u001a") {
        // If Ctrl + Z
        this.undoStep();
        return;
      }

      const numberKey = Number.parseInt(e.code.split("Digit")[1]);
      if (!isNaN(numberKey)) {
        // If input is a number
        if (numberKey != 0) {
          if (e.shiftKey) this.changeNotations({ field: this.getSelectedField, notation: numberKey.toString() });
          else this.fillInContent(numberKey);
        }
      }
    },
    onWindowResize() {
      this.refreshSize(this.$refs.sudoku.clientHeight);
    }
  },
  computed: {
    ...mapGetters(['getActionFieldIDs', 'getContent', 'getNumberFields', 'getActionFields', 'getSelectedField', 'getIfIsNoting', 'getSteps', 'getFieldWidth', 'getSudokuHeight']),
  },
  created() {
    window.addEventListener('keydown', this.onWindowKeyDown );
    window.addEventListener('keypress', this.onWindowKeyPress);
    window.addEventListener('resize', this.onWindowResize);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onWindowKeyDown );
    window.removeEventListener('keypress', this.onWindowKeyPress);
    window.removeEventListener('resize', this.onWindowResize);
  },
  mounted() {
    this.refreshSize(this.$refs.sudoku.clientHeight);
    setTimeout(() => {
      this.refreshSize(this.$refs.sudoku.clientHeight);
    }, 10);
  },
})
export default class CSudoku extends Vue {}
</script>

<style lang="scss">
.sudoku-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
}
.selection-bar-container {
  width: 25%;
  height: var(--sHeight);
  display: flex;
  justify-content: space-evenly;
}
.sudoku {
  width:  fit-content;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}
</style>