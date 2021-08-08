<template>
  <NMessageProvider>
    <router-view />
  </NMessageProvider>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import { NMessageProvider, useMessage } from "naive-ui";
import { useRouter } from 'vue-router';
// @ts-ignore
window.$router = useRouter()

</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
