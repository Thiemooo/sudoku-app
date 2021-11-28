<template>
  <div id="app">
    <div id="nav">
      <c-button :color="'#000008'">
        <router-link to="/">Home</router-link>
      </c-button>
      <c-button :color="'#000008'">
        <a href="https://www.github.com/Thiemooo/sudoku-app/" target="_blank">GitHub</a>
      </c-button>
    </div>
    <br>
    <router-view/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import CButton from './components/Utility/CButton.vue';

@Component({
  components: {
    CButton,
  }
})

export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap&family=Genos&display=swap');

body {
  background-color: rgb(0, 0, 8);
  height: 100vh;
  padding: 2rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
* {
  font-family: 'Indie Flower';
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #af4e9a;
  height: 100%;
}
a, p {
  font-family: 'Genos';
  color: #af4e9a;
}
#nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
</style>
