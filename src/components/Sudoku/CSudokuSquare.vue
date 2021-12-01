<template>
  <div class="sudoku-square">
    <c-sudoku-field v-for="fC in this.squareContent" 
                    :key="fC.fieldID"
                    :field="fC"
                    :selected="fC.fieldID == getSelectedField.fieldID"
                    :class="{
                      sameContent: fC.content == getSelectedField.content && !fC.hidden && !getSelectedField.hidden,
                      hidden: fC.hidden,
                      row: getSelectedField.row == fC.row,
                      column: getSelectedField.column == fC.column,
                      sameSquare: fC.square == getSelectedField.square,
                    }"
                    @onFieldClick="onSelectField"
                    :width="getFieldWidth"
    ></c-sudoku-field>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import CSudokuField from './CSudokuField.vue';

@Component({
  components: {
    CSudokuField
  },
  props: [
    'squareContent',
    'squareID',
  ],
  computed: {
    ...mapGetters(['getSelectedField', 'getFieldWidth']),
  },
  methods: {
    ...mapActions(['selectField']),
    onSelectField(field) {      
      this.selectField(field);
    }
  },
})
export default class CSudokuSquare extends Vue {}
</script>

<style lang="scss" scoped>
.sudoku-square {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  border-radius: 3px;
  border: 1px solid var(--square-box-shadow);
  box-shadow: inset 0 0 7px var(--square-box-shadow), 0 0 7px var(--square-box-shadow);
  width: fit-content;
  height: fit-content;
}
</style>