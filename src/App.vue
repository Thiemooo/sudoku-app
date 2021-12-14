<template>
  <div id="app">
    <div id="nav">
      <div class="nav">
        <div class="left">
          <c-button>
            <router-link to="/">{{ getAPP.homeButton }}</router-link>
          </c-button>
          <c-button>
            <router-link to="/settings">{{ getAPP.settingsButton }}</router-link>
          </c-button>
        </div>
        <div class="right">
          <c-button>
            <a href="https://www.github.com/Thiemooo/sudoku-app/" target="_blank">GitHub</a>
          </c-button>
        </div>
      </div>
    </div>
    <div class="page">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import CButton from './components/Utility/CButton.vue';

@Component({
  components: {
    CButton,
  },
  computed: {
    ...mapGetters(['getAPP']),
  }
})

export default class App extends Vue {}
</script>

<style lang="scss">
@import './css/variables.css';
@import './css/global.css';
@import './css/classes.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--primary-color);
  height: 100%;
}
#nav {
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: center;
  top: 0;
  background: var(--background);
  margin-bottom: 0.6rem;
  z-index: 1;

  & .nav {
    width: 95%;
    border-bottom: 1px solid var(--header-line);
    display: flex;
    justify-content: space-between;
    padding: 2rem 1rem;
  }

  .left > * {
    margin-right: 2rem;
  }
}
.page {
  padding: 0 2rem;
  height: 100%;
}
</style>
