<template>
  <VNavigationDrawer expand-on-hover rail class="bg-color-dark-gray">
    <v-list density="compact" nav class="app-font">
      <router-link to="/"><v-list-item class="link-sidebar" prepend-icon="mdi-view-dashboard" title="Главная" value="home"></v-list-item></router-link>
      <v-divider></v-divider>
      <router-link to="/characters"><v-list-item class="link-sidebar" prepend-icon="mdi-forum" title="Персонажи" value="characters"></v-list-item></router-link>
      <router-link to="/about"><v-list-item class="link-sidebar" prepend-icon="mdi-forum" title="Настройки" value="about"></v-list-item></router-link>
    </v-list>
  </VNavigationDrawer>
</template>

<script>
export default {
  name: "sidebar"
}
</script>

<style scoped>
  .link-sidebar {
    color: white;
  }
</style>