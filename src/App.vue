<template>
  <div id="app">
    <div class="container">
      <div id="timer" class="timer">
        {{ this.getTime.toString() }}
      </div>
      <div class="button-container">
        <c-button @onClick="startSudoku" style="margin-bottom: 2rem;" :disabled="false" color="rgb(0, 0, 8)">Start</c-button>
      </div>
      <c-sudoku v-if="getIfShowing"></c-sudoku>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import CSudoku from './components/Sudoku/CSudoku.vue';
import CButton from './components/Utility/CButton.vue';
import CContent from './components/Sudoku/CContent.vue';

@Component({
  components: {
    CSudoku,
    CButton,
    CContent,
  },
  methods: {
    ...mapActions(['createSudoku', 'show']),
    startSudoku() {
      this.show(false);
      this.createSudoku();
    },
  },
  computed: {
    ...mapGetters(['getIfShowing', 'getTime']),
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap');

body {
  background-color: rgb(0, 0, 8);
  overflow: hidden;
  height: 100vh;
  padding: 2rem;
}
* {
  font-family: 'Indie Flower';
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #af4e9a;
  height: 100%;
}
.timer {
  position: absolute;
  font-family: 'Major Mono Display';
  top: 1rem;
  right: 1.5rem;
  font-size: 3rem;
  color: white;
}
.button-container button {
  margin-left: 3rem;
  margin-right: 3rem;
}
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
}
</style>
