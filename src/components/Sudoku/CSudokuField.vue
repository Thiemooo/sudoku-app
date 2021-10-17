<template>
  <div class="sudoku-field" @click="fieldClick">
    <div class="notations" v-if="field.hidden">
      <span v-for="notation in getNotations" 
            :key="notation"
            :class="{
              hidden: !field.notations.includes(notation),
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
    'selected'
  ],
  methods: {
    fieldClick() {
      this.$emit('onFieldClick', this.$props.field);
    }
  },
  computed: {
    ...mapGetters(['getNotations']),
  }
})
export default class CSudokuField extends Vue {}
</script>

<style lang="scss" scoped>
.sudoku-field {
  border: 1px solid rgb(153, 146, 179);
  border-radius: 3px;
  font-size: 3.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 0 0 100%;
}
.row, .column {
  background-color: rgb(0, 10, 20);
}
.sameSquare {
  background-color: rgb(0, 0, 14);
}
.sameContent {
  color: rgb(0, 0, 8);
  background-color: #2c3e50;
}
.selected {
  width: 100%;
  height: 100%;
  background-color: #dddddd;
}
.hidden {
  color: transparent;
}
.selectedIncorrect {
  width: 100%;
  height: 100%;
  background-color: #e08383;
  color: rgb(0, 0, 8);
}
.incorrect {
  width: 100%;
  height: 100%;
  background-color: #8f2525;
  color: rgb(0, 0, 8);
}
.numberField, .actionField {
  transition: background-color 0.2s, color 0.2s;
}
.numberField:hover, .actionField:hover, .active {
  color: rgb(0, 0, 8);
  background-color: #2c3e50;
}
.numberField:active {
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