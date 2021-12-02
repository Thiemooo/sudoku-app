<template>
  <div class="home">
    <c-button>
      <router-link to="/Game">Start a Sudoku-Game</router-link>
    </c-button>
    <br><br><br><br>
    <c-button>
      <router-link to="/how-to-play">How To Play</router-link>
    </c-button>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import CSudoku from '../components/Sudoku/CSudoku.vue';
import CButton from '../components/Utility/CButton.vue';

@Component({
  components: {
    CSudoku,
    CButton,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
}
</style>
