<template>
  <div class="settings-container">
    <h1>Colors:</h1>
    <div class="settings">
      <h2>Color Themes:</h2>
      <div class="color-themes">
        <div class="color-theme" v-for="colorTheme in getColorThemes" :key="colorTheme.title">
          <c-entry :entry="colorTheme.entry" :d_flex="true"></c-entry>
          <div class="preview">
            <div v-for="colorEntry in colorTheme.content" :key="colorEntry.id" :style="{ 'background-color': colorEntry.content }"></div>
          </div>
          <c-button @onClick="onColorThemeSelect" class="button" :id='colorTheme.entry.id'>Select</c-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import CEntry from '../components/Utility/CEntry.vue';
import CButton from '../components/Utility/CButton.vue';

@Component({
  components: {
    CEntry,
    CButton,
  },
  computed: {
    ...mapGetters(['getColorThemes']),
  },
  methods: {
    ...mapActions(['setColorTheme']),
    onColorThemeSelect(e) {
      this.setColorTheme(Number.parseInt(e.target.id.split('-')[1]));
    }
  }
})

export default class Settings extends Vue {}
</script>

<style lang="scss" scoped>
.settings-container {
  padding-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.color-themes {
  display: flex;
  flex-wrap: wrap;

  & .color-theme {
    display: flex;
    flex-wrap: wrap;

    & .preview {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      box-shadow: 0px 0px 10px white, 0px 0px 10px black;

      & > div {
        width: 50px;
        height: 50px;
      }
    }

    & .button {
      margin-left: 3rem;
      height: fit-content;
      align-self: center;
    }
  }
}
h1 {
  font-size: 3rem;
}
h2 {
  font-size: 2.4rem;
}
</style>