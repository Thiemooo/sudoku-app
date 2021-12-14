<template>
  <div class="finished"> {{ this.getTime.pause() }}
    <h1>{{ getFINISHED.headline }}</h1>
    <h2>You've finished the sudoku in {{ this.getTime.minutes() > 0 ? `${this.getTime.minutes()} minute${this.getTime.minutes() > 1 ? 's' : '' } and` : ''}} {{ `${this.getTime.seconds()%60} second${this.getTime.seconds()%60 != 1 ? 's' : ''}` }}! <br> {{ getFINISHED.niceMsg }}</h2>
    <br><br><br><br><br>
    <c-button>
      <router-link to="/">{{ getFINISHED.button1text }}</router-link>
    </c-button>
    <h3>{{ getFINISHED.or }}</h3>
    <c-button>
      <router-link to="/Game">{{ getFINISHED.button2text }}</router-link>
    </c-button>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import CButton from '../components/Utility/CButton.vue';

@Component({
  components: {
    CButton,
  },
  computed: {
    ...mapGetters(['getTime', 'getFINISHED']),
  },
})

export default class Finished extends Vue {}
</script>