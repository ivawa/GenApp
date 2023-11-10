<script setup>
import TheSidebar from "@/components/TheSidebar.vue";
import TheCharacters from "@/components/TheCharacters.vue";
</script>

<template>
  <VApp class="bg-color-dark-gray">
    <TheSidebar />
    <VMain>
      <div class="container">
        <router-view></router-view>
      </div>
      <div>{{ name }}</div>
    </VMain>
  </VApp>
</template>


