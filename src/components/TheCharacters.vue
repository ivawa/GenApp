<template>
  <h1 class="app-font app-font-wc ml-12 pt-3 mb-3">Персонажи</h1>
  <v-card-title class="d-flex bg-color-dark-gray mr-0 ml-8">
    <!-- XD тоggле XD -->
    <div class="d-flex align-center bg-color-dark-gray ">
      <v-btn-toggle
          v-model="toggle"
          style="height: 56px;"
          color="grey-lighten-1"
          class="app-font app-font-wc bg-gray-lighten-4"
          mandatory
      >
        <v-btn style="background-color: #424242" value="all">Все</v-btn>
        <v-btn style="background-color: #424242" value="my">Мои</v-btn>
      </v-btn-toggle>
    </div>
    <!-- XD кнопка XD -->
    <div>
      <v-dialog
          v-model="dialog"
      >
        <template v-slot:activator="{ props }">
          <v-btn color="grey-darken-3"
                 v-bind="props"
                 class="d-flex text-xs-center app-font app-font-color mx-5 mr-4 py-7"
          >
            Фильтры&nbsp
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
  <!-- XD карточки героев XD -->

  <v-card
      class="mx-5 my-2 pa-2 bg-color-dark-gray"
  >
    <v-row class="d-flex flex-wrap justify-center px-0 py-5">
      <v-col
          v-for="n in filteredCharacters.length"
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
                :style="{ backgroundColor: isHighlighted(filteredCharacters[n-1]) ? '#FFFFFF' : '#808080' }"
                v-on:click="goToCharacter(filteredCharacters[n-1].name, filteredCharacters[n-1].id)"
            >
              <v-img
                  :src="`https://api.ambr.top/assets/UI/UI_AvatarIcon_${filteredCharacters[n-1] && filteredCharacters[n-1].name}.png`"
                  :lazy-src="`https://i.ibb.co/2qQ1VTw/wqiqi.png`"
                  aspect-ratio="1"
                  cover
                  :class="[filteredCharacters[n-1].rarity == 4 ? 'bg-four-star' : 'bg-five-star', isHighlighted(filteredCharacters[n-1]) ? '' : 'image-darken']"
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
                  {{ filteredCharacters[n - 1] && filteredCharacters[n - 1].RU }}
                </template>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import characters from '@/assets/characters.json'
import enkacharacters from '@/assets/gamedata/playercharacters.json' //парс данных
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
      toggle: "my",
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
    goToCharacter(name, id) {
      this.$router.push({ name: 'Character_ids', params: { name, id } });
    },
    isHighlighted(character) {
      if (this.toggle === "my") {
        return true
      } else {
      return this.enkacharacters.findIndex(c => c.id === character.gameId) !== -1;
      }
    },
  },
  computed: {
    filteredCharacters() {
      let filtered = [];
      if (this.toggle === "my") {
        filtered = this.enkacharacters.map(enkaCharacter => {
          const character = this.characters.find(character => {
            return enkaCharacter.id === character.gameId;
          });
          enkaCharacter.name = character.name;
          enkaCharacter.RU = character.RU;
          enkaCharacter.id = character.gameId;
          return enkaCharacter;
        });
      } else {
        filtered = this.characters.filter(character => {
          return character.RU.toLowerCase().includes(this.search.toLowerCase()) &&
              (this.selectedQuality ? character.rar === this.selectedQuality : true);
        });
        filtered.forEach(character => {
          character.id = character.gameId;
        });
        if (this.selectedQuality) {
          filtered = filtered.filter(character => {
            return character.rar === this.selectedQuality;
          });
        }
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