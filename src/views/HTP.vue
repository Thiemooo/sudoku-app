<template>
  <div class="htp-container">
    <h1>How to play:</h1>
    <div class="htp">
      <h2>Rules:</h2>
      <div class="rules">
        <c-entry v-for="rule in getRules" :key="rule.title" :entry="rule"></c-entry>
      </div>
      <br><br>
      <h2>Controls:</h2>
      <div class="controls">
        <c-entry v-for="control in getControls" :key="control.title" :entry="control"></c-entry>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import CEntry from '../components/Utility/CEntry.vue';

@Component({
  components: {
    CEntry,
  },
  computed: {
    ...mapGetters(['getRules', 'getControls']),
  }
})

export default class HTP extends Vue {}
</script>

<style lang="scss" scoped>
.htp-container {
  padding-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rules, .controls {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-size: 3rem;
}
h2 {
  font-size: 2.4rem;
}
</style>