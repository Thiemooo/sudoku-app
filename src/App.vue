<template>
  <div id="app">
    <c-sudoku></c-sudoku>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import CSudoku from './components/Sudoku/CSudoku.vue';

@Component({
  components: {
    CSudoku,
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
  
body {
  background-color: rgb(0, 0, 8);
  overflow: hidden;
}

* {
  font-family: 'Indie Flower';
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3rem;
}
</style>
