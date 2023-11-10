<template>
  <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
    <v-card

        v-on:click="goToCharacters()"
        class="rounded-lg position-relative mt-9"
        style="width: 395px; position: absolute; z-index: 1; height: 188px; background-color: transparent;"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div class="genshin-font pt-2 font-outline" style="max-width: 230px">
          <v-card-title class="genshin-font app-font-wc">{{ pf.nickname }}</v-card-title>
          <v-card-subtitle class="pt-2 app-font-wc">{{ pf.signature }}</v-card-subtitle>
          <v-card-subtitle class="pt-2 app-font-wc">Ранг приключений: {{ pf.level }}</v-card-subtitle>
          <v-card-subtitle class="pt-2 app-font-wc">Достижения: {{ pf.achievement }}</v-card-subtitle>
        </div>
        <div
            class="pt-5 pr-7 pl-5"
        >
          <v-avatar
              class="ma-3"
              size="100"
              rounded="1"
              style="background-color: #d19d78; box-shadow: 0 0 0 4px #f1ece2; "
          >
            <v-img aspect-ratio="1" style="overflow: hidden"
                   :src="`${pf.avatar}`"></v-img>
          </v-avatar>
          <v-chip size="x-small" color="#111111" class="ml-2">
            <div class="app-font-wc genshin-font font-outline" style="font-size: 9pt">UID: {{ pf.uid }}</div>
          </v-chip>
        </div>
      </div>
      <v-img :src="pf.namecard"
             style="width:400px; overflow: hidden; position: absolute; z-index: -1; top: 0; bottom: 0"></v-img>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import playerinfo from '@/assets/gamedata/playerinfo.json'

export default {
  name: "ThePlayerCard",
  data() {
    return {
      characters: [],
      data: null,
      pf: playerinfo,
    };
  },
  methods: {
    goToCharacters() {
      this.$router.push(`/characters/`)
    },
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/data/')
        .then(response => {
          this.data = response.data;
        });
  },
};
</script>

<style scoped>

</style>