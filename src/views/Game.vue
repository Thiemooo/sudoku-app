<template>
  <div class="game">
    <div class="header">
      <div id="timer" class="timer">
        {{ this.getTime.toString() }}
      </div>
    </div>
    <c-sudoku></c-sudoku>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import CSudoku from '../components/Sudoku/CSudoku.vue';

@Component({
  components: {
    CSudoku,
  },
  methods: {
    ...mapActions(['createSudoku']),
  },
  computed: {
    ...mapGetters(['getTime']),
  },
  created() {
    this.createSudoku();
  },
})

export default class App extends Vue {}
</script>

<style lang="scss">
.header {
  width: 100%;
  display: flex;
  justify-content: right;
  margin-bottom: 2rem;
}
.header > * {
  margin-left: 2rem;
}
.timer {
  font-family: 'Major Mono Display';
  font-size: 2pc;
  color: white;
}
</style>
