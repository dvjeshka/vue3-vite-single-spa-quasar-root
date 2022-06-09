<template>
  <div :class="$style.app">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <a @click="routerTo">Turnover</a>
    <QBtn color="primary">Quasar btn</QBtn>
    <div id="content"></div>
  </div>
</template>
<style lang="scss" module>
.app {
  background: gainsboro;
}
</style>

<script setup lang="ts">
import { navigateToUrl } from 'single-spa'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from '@/components/HelloWorld.vue'
function routerTo(){

  navigateToUrl('/turnover')
}
</script>


