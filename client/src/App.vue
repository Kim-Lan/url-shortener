<script setup>
import AppContainer from './components/AppContainer.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <app-container>
    <app-header />
    <main>
      <router-view :key="$route.path"></router-view>
    </main>
  </app-container>
</template>

