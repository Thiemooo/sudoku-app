<template>
  <div id="app">
    <div class="container">
      <div class="button-container">
        <c-button @onClick="startSudoku" style="margin-bottom: 2rem;" :disabled="false" color="rgb(0, 0, 8)">Start</c-button>
      </div>
      <c-sudoku></c-sudoku>
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
    ...mapActions(['createSudoku', 'hideSudoku', 'setIfIsFirst']),
    startSudoku() {
      this.createSudoku();
      this.setIfIsFirst(false);
    },
  },
  computed: {
    ...mapGetters(['getIfFirst']),
    started: ()  => !this.getIfFirst,
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
  
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
  // color: #2c3e50;
  color: #af4e9a;
  height: 100%;
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
