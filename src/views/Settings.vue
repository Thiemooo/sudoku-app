<template>
  <div class="settings-container">
    <h1>{{ getSETTINGS.headline }}</h1>
    <div class="settings">
      <h2>{{ getSETTINGS.colorHeadline }}</h2>
      <div class="color-themes">
        <div class="color-theme" v-for="colorTheme in getColorThemes" :key="colorTheme.title">
          <c-entry class="d-flex" :entry="getSETTINGS.colorThemes[getColorThemes.indexOf(colorTheme)]"></c-entry>
          <div class="preview" @click="onColorThemeSelect" :id='colorTheme.entry.id'>
            <div v-for="colorEntry in colorTheme.content" :key="colorEntry.id" :style="{ 'background-color': colorEntry.content }"></div>
          </div>
        </div>
      </div>
      <h2 class="mt-10 mb-6">{{ getSETTINGS.languageHeadline }}</h2>
      <div class="languages">
        <c-entry class="language d-flex" v-for="language in getSETTINGS.languages" :key="language.id" :entry="language">
          <c-button @onClick="onSelectLanguage" :id="language.id">{{ getSETTINGS.selectButtonText }}</c-button>
        </c-entry>
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
    ...mapGetters(['getColorThemes', 'getSETTINGS']),
  },
  methods: {
    ...mapActions(['setColorTheme', 'selectLanguage']),
    onColorThemeSelect(e) {
      this.setColorTheme(Number.parseInt(e.composedPath()[1].id.split('-')[1]));
    },
    onSelectLanguage(e) {
      this.selectLanguage(e.composedPath()[0].id);
    }
  }
})

export default class Settings extends Vue {}
</script>

<style lang="css" scoped>
/* .settings-container {
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
.languages {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  & .language {
    justify-content: right;
  }
} */

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
}
 .color-themes .color-theme {
   display: flex;
   flex-wrap: wrap;
}
 .color-themes .color-theme .preview {
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   box-shadow: 0px 0px 10px white, 0px 0px 10px black;
}
 .color-themes .color-theme .preview > div {
   width: 50px;
   height: 50px;
}
 .color-themes .color-theme .button {
   margin-left: 3rem;
   height: fit-content;
   align-self: center;
}
 .languages {
   display: grid;
   grid-template-columns: repeat(1, 1fr);
}
 .languages .language {
   justify-content: right;
}
 
</style>