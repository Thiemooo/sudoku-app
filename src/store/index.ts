import Vue from 'vue';
import Vuex from 'vuex';
import Sudoku from './modules/Sudoku';
import Languages from './modules/Languages';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Sudoku,
    Languages,
  }
});