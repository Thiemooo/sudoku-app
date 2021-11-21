<template>
  <div class="sudoku-field" @click="fieldClick">
    <div class="notations" v-if="field.hidden">
      <span v-for="notation in getNotations" 
            :key="notation"
            :class="{
              hidden: !field.notations.includes(notation) || (squareContains(notation) || rowContains(notation) || columnContains(notation)), 
            }"
      >{{ notation }}
      </span>
    </div>
    <div v-if="!this.field.wrong" :class="{selected: this.selected}">
      {{ this.field.hidden ? '?' : this.field.content }}
    </div>
    <div v-else :class="{
                  selectedIncorrect: this.selected,
                  incorrect: !this.selected
                }"
    >{{ this.field.wrongContent }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: [
    'field',
    'selected',
  ],
  methods: {
    fieldClick() {
      this.$emit('onFieldClick', this.$props.field);
    },
    squareContains(notation) {
      const squareContentUnhidden = [];
      Object.entries(new Array(this.getContent[this.$props.field.square-1])[0]).forEach((e) => {
        if (!e[1].hidden) squareContentUnhidden.push(e[1].content);
      });
      for (let i = 0; i < squareContentUnhidden.length; i++) 
        if (squareContentUnhidden[i] == notation) return true;
      
      return false;
    },
    rowContains(notation) {
      const selectedRow = this.$props.field.row;
      const rowContentUnhidden = [];
      const content = Object.entries(new Array(this.getContent)[0]);
      content.forEach((square) => {
        Object.entries(square[1]).forEach((e) => {
          if (e[1].row == selectedRow && !e[1].hidden) rowContentUnhidden.push(e[1].content);
        });
      });
      for (let i = 0; i < rowContentUnhidden.length; i++) 
        if (rowContentUnhidden[i] == notation) return true;
      
      return false;
    },
    columnContains(notation) {
      const selectedColumn = this.$props.field.column;
      const columnContentUnhidden = [];
      const content = Object.entries(new Array(this.getContent)[0]);
      content.forEach((square) => {
        Object.entries(square[1]).forEach((e) => {
          if (e[1].column == selectedColumn && !e[1].hidden) columnContentUnhidden.push(e[1].content);
        });
      });
      for (let i = 0; i < columnContentUnhidden.length; i++) 
        if (columnContentUnhidden[i] == notation) return true;
      
      return false;
    },
  },
  computed: {
    ...mapGetters(['getNotations', 'getContent']),
  },
})
export default class CSudokuField extends Vue {}
</script>

<style lang="scss" scoped>
.sudoku-field {
  border: 1px solid rgb(153, 146, 179);
  border-radius: 3px;
  font-size: 3rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 100%;
  position: relative;
  width: 100%;
  height: 100%;
}
.row, .column {
  border: 1px solid rgb(197, 52, 190);
  box-shadow: inset 0 0 5px rgb(92, 28, 89);
}
.sameContent {
  border: 1px solid rgb(216, 105, 210);
  box-shadow: inset 0 0 15px rgb(201, 134, 197);
}
.selected {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(255, 255, 255);
  box-shadow: inset 0 0 10px rgb(233, 233, 233);
}
.hidden {
  color: transparent;
}
.selectedIncorrect {
  width: 100%;
  height: 100%;
  background-color: #dd6565;
  color: rgb(0, 0, 8);
}
.incorrect {
  width: 100%;
  height: 100%;
  // background-color: #8f2525;
  background-color: #830000;
  color: rgb(0, 0, 8);
}
.numberField, .actionField {
  transition: background-color 0.2s, color 0.2s;
}
.numberField:hover, .actionField:hover, .active {
  color: rgb(0, 0, 8);
  background-color: #af4e9a;
}
.numberField:active, .actionField:active {
  color: white;
}
.notations {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 15px;
  color: rgb(94, 94, 94);
  font-size: 1.25rem;
}
</style>