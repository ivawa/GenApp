<template>
  <div class="home">
    <h1
        align="center"
        class="app-font-style app-font pt-10"
    >GenAPP</h1>
    <div class="destination">
      <v-container
          align="center"
          style="width: 300px"
          class="uid-form pt-10  pb-0"
      >
        <v-row
        >
          <v-text-field
              :counter="9"
              v-model="uid"
              label="UID"
              required
              variant="outlined"
              color="white"
              style="color: white; font-family: 'Nunito Sans'"
              class="app-font-style"
          ></v-text-field>
          <v-btn
              type="submit"
              variant="outlined"
              style="height: 56px; color: #808080;"
              @click="handleSubmit"
              class="menuBtn"
          >
            <svg-icon type="mdi" :path="path"></svg-icon>
          </v-btn>
        </v-row>
      </v-container>
    </div>
  </div>
  <div>
    <ThePlayerCard/>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import ThePlayerCard from "@/components/ThePlayerCard";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiArrowRight } from '@mdi/js';
import axios from 'axios';

export default {
  name: "Home",
  components: {ThePlayerCard, SvgIcon},
  data() {
    return {
      destinations: sourceData.destinations,
      path: mdiArrowRight,
      uid: '',
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/characters/', {uid: 1});
        console.log(response.data); // do something with response data
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>

<style scoped>
@import '@/main.css';
</style>