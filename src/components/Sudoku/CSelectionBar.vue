<template>
  <div class="selection-bar">
    <c-sudoku-field v-for="nF in content" 
                    :key="nF.number"
                    :field="nF"
                    :selected="false"
                    @onFieldClick="onSelectionBarClick"
                    :style="{'--count': content.length}"
                    :class="{
                      numberField: nF.data    == 'NUMBER-FIELD',
                      actionField: nF.data    == 'ACTION-FIELD',
                      active:      nF.fieldID == getActionFieldIDs.Notation && getIfIsNoting,
                    }"
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
  user-select: none;
  height: 50rem;
  width: 5.5rem;
  display: grid;
  grid-template-rows: repeat(var(--count), 1fr);
  grid-row-gap: 2px;
}
.selection-bar div {
  border-top: 1px solid rgb(153, 146, 179);
  margin: -2px;
}
</style>