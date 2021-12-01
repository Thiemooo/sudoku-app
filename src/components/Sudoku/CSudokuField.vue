<template>
  <div class="sudoku-field" 
      :class="{
        'sudoku-field': true,
        'selected': this.selected,
        'selectedIncorrect': this.selected && this.field.wrong,
        'incorrect': !this.selected && this.field.wrong,
      }"

      @click="fieldClick" :style="{'--width': width}">
    <div class="notations" v-if="field.hidden">
      <span v-for="notation in getNotations" 
            :key="notation"
            :class="{
              hidden: !field.notations.includes(notation) //|| (squareContains(notation) || rowContains(notation) || columnContains(notation)), 
            }"
      >{{ notation }}
      </span>
    </div>
    <div v-if="!this.field.wrong">
      {{ this.field.hidden ? '?' : this.field.content }}
    </div>
    <div v-else>
      {{ this.field.wrongContent }}
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
    'width'
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
  border: 1px solid var(--border);
  border-radius: 3px;
  font-size: 3rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 100%;
  position: relative;
  width: var(--width);
  height: var(--width);

  &.disabled {
  color: rgba($color: var(--primary-color), $alpha: 0.4);
  border: 1px solid rgba($color: #9992b3, $alpha: 0.4);
  cursor: default;

  &:hover {
    color: rgba($color: var(--primary-color), $alpha: 0.4);
    background: var(--background);
  }
}
}
.row, .column {
  border: 1px solid var(--row-column-border);
  box-shadow: inset 0 0 5px var(--row-column);
}
.sameContent {
  border: 1px solid var(--same-number-border);
  box-shadow: inset 0 0 15px var(--same-number);
}
.selected {
  border: 1px solid rgb(255, 255, 255);
  box-shadow: inset 0 0 10px rgb(233, 233, 233);
}
.hidden {
  color: transparent;
}
.selectedIncorrect {
  background-color: var(--primary-incorrect);
  color: var(--incorrect-color);
}
.incorrect {
  background-color: var(--secondary-incorrect);
  color: var(--incorrect-color);
}
.numberField, .actionField {
  transition: background-color 0.2s, color 0.2s;

  &:active {
    color: white;
  }

  &:hover  {
    color: var(--background);
    background-color: var(--primary-color);
  }
}
.active {
  color: var(--background);
  background-color: var(--primary-color);
}
.notations {
  position: absolute;
  width: var(--width);
  height: var(--width);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  color: rgb(119, 119, 119);
  font-size: 0.7rem;
  font-weight: bolder;
  
  & span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media only screen and (max-width: 500px) {
  .numberField, .actionField {
    &:hover {
      color: inherit;
      background-color: inherit;
    }
  }
  .active, .active:hover {
    color: var(--background);
    background-color: var(--primary-color);
  }
  .sudoku-field {
    font-size: 1.5rem;
  }
  .notations {
    font-size: 0.4rem;
  }
}
@media only screen and (min-width: 500px) and (max-width: 750px) {
  .sudoku-field {
    font-size: 1.8rem;
  }
  .notations {
    font-size: 0.6rem;
  }
}
</style>