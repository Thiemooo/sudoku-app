import Vue from 'vue';
import Vuex from 'vuex';
import Sudoku from './modules/Sudoku';
import HowToPlay from './modules/HowToPlay';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Sudoku,
    HowToPlay,
  }
});