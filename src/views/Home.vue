<template>
  <div class="home">
    <div class="buttons">
      <c-button>
        <router-link to="/Game">{{ getHOME.startButton }}</router-link>
      </c-button>
      <br><br><br><br>
      <c-button>
        <router-link to="/how-to-play">{{ getHOME.htpButton }}</router-link>
      </c-button>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import CSudoku from '../components/Sudoku/CSudoku.vue';
import CButton from '../components/Utility/CButton.vue';

@Component({
  components: {
    CSudoku,
    CButton,
  },
  computed: {
    ...mapGetters(['getHOME']),
  }
})
export default class Home extends Vue {}
</script>

<style lang="css" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.buttons {
  margin-bottom: 10%;
}
</style>
