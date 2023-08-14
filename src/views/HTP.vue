<template>
  <div class="htp-container">
    <h1>{{ getHTP.headline }}</h1>
    <div class="htp">
      <h2>{{ getHTP.rulesHeadline }}</h2>
      <div class="rules">
        <c-entry v-for="rule in getHTP.rules" :key="rule.title" :entry="rule"></c-entry>
      </div>
      <br><br>
      <h2>{{ getHTP.controlsHeadline }}</h2>
      <div class="controls">
        <c-entry v-for="control in getHTP.controls" :key="control.title" :entry="control"></c-entry>
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
    ...mapGetters(['getHTP']),
  }
})

export default class HTP extends Vue {}
</script>

<style lang="css" scoped>
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
</style>