<template>
  <div id="app">
    <div id="nav">
      <div class="left">
        <c-button>
          <router-link to="/">🛖 Home</router-link>
        </c-button>
        <c-button>
          <router-link to="/settings">⚙️ Settings</router-link>
        </c-button>
      </div>
      <div class="right">
        <c-button>
          <a href="https://www.github.com/Thiemooo/sudoku-app/" target="_blank">GitHub</a>
        </c-button>
      </div>
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
@import './scss/colors.scss';
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap&family=Genos&display=swap');

body {
  background-color: $BACKGROUND;
  height: 100vh;
  padding: 0 2rem;

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
  color: $PRIMARY-COLOR;
  height: 100%;
}
a, p {
  font-family: 'Genos';
  color: $PRIMARY-COLOR;
}
h2 {
  color: $SECONDARY-COLOR;
}
#nav {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  background: $BACKGROUND;
  border-bottom: 1px solid $HEADER-LINE;

  .left > * {
    margin-right: 2rem;
  }
}
</style>
