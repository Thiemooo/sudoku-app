<template>
  <div class="game-container">
    <div class="game" v-if="show">
      <div class="header">
        <div id="timer" class="timer">
          {{ this.getTime.toString() }}
        </div>
      </div>
      <c-sudoku></c-sudoku>
    </div>
    <div class="loading" v-else>
      <h1>LOADING</h1>
    </div>
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
    show() {
      return this.getShowing;
    }
  },
  computed: {
    ...mapGetters(['getTime', 'getShowing']),
  },
  created() {
    console.log("Creating Sudoku");
    this.createSudoku();
  },
})

export default class App extends Vue {}
</script>

<style lang="css">
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
  font-size: var(--timer-font-size);
  color: white;
}
</style>
