<template>
  <!-- XD текст XD -->
  <v-icon>mdi-FilterMenu</v-icon>
  <div class="d-flex app-font app-font-style mx-5 my-2 pt-5 pl-4">

  </div>
  <v-card-title class="d-flex bg-color-dark-gray">
    <div>
      <v-dialog
          v-model="dialog"
      >
        <template v-slot:activator="{ props }">
          <!-- XD кнопка XD -->
          <v-btn color="grey-darken-3" v-bind="props"
                 class="d-flex text-xs-center app-font app-font-color mx-5 ml-8 mr-2 py-7">Фильтры&nbsp
            <svg-icon type="mdi" :path="path" size="20"></svg-icon>
          </v-btn>
        </template>
        <!-- Карточка выбора фильтров -->
        <v-card class="filter-dialog align-self-center bg-color-dark-gray app-font app-font-wc py-2 px-2">
          <!-- Кнопка закрыть и текст фильтры -->
          <div class="d-flex align-center ">
            <v-layout class="justify-center pl-12 app-font app-font-wc" style="font-size: x-large">Фильтры</v-layout>
            <v-btn
                position-absolute-right
                icon
                dark
                @click="dialog = false"
                class="bg-color-dark-gray"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-divider class="mt-3"></v-divider>
          <v-card-text>
            Элементы
          </v-card-text>
          <!-- Список фильтра элементов -->
          <v-item-group multiple selected-class="bg-chip" class="d-flex justify-start mx-5 my-2 pt-1 pl-4">
            <v-item
                v-for="i in 7"
                :key="i"
                v-slot="{ selectedClass, toggle }"
            >
              <v-chip

                  :class="selectedClass"
                  @click="toggle"
              >
                <img :src="`https://api.ambr.top/assets/UI/UI_Buff_Element_${elements[i-1]}.png`" width="30"
                     align-center
                     v-on:click=""/>
              </v-chip>
            </v-item>
          </v-item-group>
          <v-card-text>
            Редкость
          </v-card-text>
          <!-- Список фильтра редкости -->
          <v-item-group multiple selected-class="bg-chip" class="d-flex justify-start mx-5 my-2 pt-1 pl-4">
            <v-item
                v-for="item in quality"
                v-slot="{ selectedClass, toggle }"
            >

              <v-chip
                  :class="selectedClass"
                  @click="() => { toggle ? toggle() : selectQuality(item.rar) }"
              >
                <div class="d-flex align-center">
                  <div>{{ item.rar }}</div>
                  <svg-icon type="mdi" :path="path2" size="20"></svg-icon>
                </div>
              </v-chip>
            </v-item>
          </v-item-group>
          <v-card-text>
            Оружие
          </v-card-text>
          <!-- Список фильтра оружие -->
          <v-item-group multiple selected-class="bg-chip" class="d-flex justify-start mx-5 my-2 pt-1 pl-4">
            <v-item
                v-for="i in 5"
                :key="i"
                v-slot="{ selectedClass, toggle }"
            >
              <v-chip
                  :class="selectedClass"
                  @click="toggle"
              >
                <img :src="`https://api.ambr.top/assets/UI/UI_GachaTypeIcon_${weapons[i-1]}.png`" width="35"
                     align-center
                     v-on:click=""/>
              </v-chip>
            </v-item>
          </v-item-group>
        </v-card>
      </v-dialog>
    </div>
    <!-- XD поиск XD -->
    <v-text-field
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        prepend-inner-icon="mdi-magnify"
        class="expanding-srch app-font-style pr-12 fade-transition-move"
        :class="{ 'closed' : searchClosed && !search}"
        row-height="15"
        variant="outlined"
        v-model="search"
        hide-details
    ></v-text-field>
  </v-card-title>
  <!-- Карточки героев -->
  <v-card
      class="mx-5 my-2 pa-2 bg-color-dark-gray"
  >
    <v-row class="d-flex flex-wrap justify-center px-0 py-5">
      <v-col
          v-for="n in enkacharacters.length"
          :key="n"
          class="d-inline-block pa-1"
          cols="20"
          xs="4"
          sm="0"
          md="0"
          lg="0"
          xl="0"
      >
        <v-hover>
          <template
              v-slot:default="{ isHovering, props }"
          >
            <v-card
                class="rounded-lg "
                style="width: 6.5rem"
                v-bind="props"
                :color="isHovering ? 'grey-lighten-2' : undefined"
                :class="isHovering ? 'card-hover' : undefined"
                v-on:click="goToCharacter(enkacharacters[n-1])"
            >
              <v-img
                  :src="getImageUrl(enkacharacters[n-1], chid[n-1])"
                  :lazy-src="`https://i.ibb.co/2qQ1VTw/wqiqi.png`"
                  aspect-ratio="1"
                  cover
                  :class="enkacharacters[n-1].rarity == 4 ? 'bg-four-star' : 'bg-five-star'"
              >
                <template
                    v-slot:placeholder
                >

                  <v-row
                      class="cards fill-height ma-0"
                      align="center"
                      justify="center"
                  >

                    <v-progress-circular
                        indeterminate
                        color="grey-lighten-5"
                    ></v-progress-circular>
                  </v-row>

                </template>
              </v-img>
              <!-- Имя перса -->
              <v-card-text align="center" class="pt-1 pb-0 app-font cards-name" style="font-size: 0.7rem;">
                <template v-slot:default>
                  {{ getName(enkacharacters[n - 1], chid[n - 1]) }}
                </template>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-card>
  <div>Бонус лечения</div>
  <div>Бонус получаемого лечения</div>
  <div>Восст. энергии</div>
  <div>Прочность щита</div>
  <v-divider></v-divider>
  <div style="font-size: 8pt">Элементы</div>
  <div>Бонус Пиро урона</div>
  <div>Пиро сопротивление</div>
  <div>Бонус Гидро урона</div>
  <div>Гидро сопротивление</div>
  <div>Бонус Дендро урона</div>
  <div>Дендро сопротивление</div>
  <div>Бонус Электро урона</div>
  <div>Электро сопротивление</div>
  <div>Бонус Анемо урона</div>
  <div>Анемо сопротивление</div>
  <div>Бонус Крио урона</div>
  <div>Крио сопротивление</div>
  <div>Бонус Гео урона</div>
  <div>Гео сопротивление</div>
  <div>Бонус физ. урона</div>
  <div>Физ. сопротивление</div>
  <v-divider></v-divider>
</template>

<script>
import characters from '@/assets/characters.json'

import enkacharacters from '@/assets/gamedata/playercharacters.json' //парс данных
import chid from '@/assets/gamedata/data/characters.json' //база персов
import loc from '@/assets/gamedata/localizations/characters.json' //переводы
import myData from '@/assets/characters.json' //база персов #2

import SvgIcon from '@jamescoyle/vue-icon'
import {
  mdiFilterMenu,
  mdiStar
} from '@mdi/js'

export default {
  name: "chars",
  components: {
    SvgIcon
  },
  data() {
    return {
      headers: [
        {
          align: 'start',
          key: 'name',
          sortable: false
        }
      ],
      searchClosed: true,
      search: '',
      selectedQuality: null,
      path: mdiFilterMenu,
      path2: mdiStar,
      dialog: false,
      characters: characters,
      enkacharacters: enkacharacters,
      loc: loc,
      chid: chid,
      myData: myData,
      elements: [
        "Ice",
        "Wind",
        "Electric",
        "Water",
        "Fire",
        "Rock",
        "Grass"
      ],
      weapons: [
        "Sword",
        "Catalyst",
        "Claymore",
        "Bow",
        "Pole"
      ],
      quality: [
        {rar: '5'},
        {rar: '4'}
      ],
      categories: [
        {name: 'Все', value: 'a'},
        {name: 'Вода', value: 'v'},
        {name: 'Огонь', value: 'f'},
        {name: 'Рок', value: 'r'}
      ],
      selected: ''
    }
  },

  methods: {
    filter_element() {
      const selectedElement = elements[i];
      return selectedElement;
    },
    selectQuality(rar) {
      this.selectedQuality = rar;
    },
    //делает ссылку на перса
    goToCharacter(character) {
      let gameName = '';
      this.myData.forEach(item => {
        if (item.gameId === character.id) {
          gameName = item.name;
        }
      });
      this.$router.push(`/characters/${gameName}`)
    },
    //сравнивает id героя с локой
    getName(character) {
      const characterMapHash = this.chid[character.id]
      const characterName = this.loc[characterMapHash.nameTextMapHash]
      return characterName.RU
    },
    //сравнивает героев которые парсяться с энки с героями которые есть в файле characters.json
    getImageUrl(character) {
      const characterData = this.chid[character.id];
      if (!characterData) {
        console.error(`Character with ID ${character.id} not found in chid file`);
        return null;
      }
      return `https://api.ambr.top/assets/UI/${characterData.iconName}.png`;
    }
  },
  computed: {
    filteredCharacters() {
      let filtered = this.characters.filter(character => {
        return character.RU.toLowerCase().includes(this.search.toLowerCase()) &&
            (this.selectedQuality ? character.rar === this.selectedQuality : true);
      }).map(character => {
        return {...character, quality: this.characters[this.characters.indexOf(character)].quality};
      });
      if (this.selectedQuality) {
        filtered = filtered.filter(character => {
          return character.rar === this.selectedQuality;
        });
      }
      return filtered;
    }

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap');
/* Цвет фона карточек */
@import '@/main.css';
</style>
типа гайд на сортировку https://www.youtube.com/watch?v=v3M__TF2zLE&ab_channel=GoFrontend