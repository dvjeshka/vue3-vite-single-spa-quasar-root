<template>
  <div :class="$style.app">
    <p>Test env runtime TITLE = {{ TITLE }}</p>
    <p>
      Test env runtime BACKOFFICE_API_PREFIX =
      {{ BACKOFFICE_API_PREFIX }}
    </p>
    <p>Test env runtime TEXT = {{ TEXT }}</p>
    <img
      alt="Vue logo"
      src="@/assets/logo.png"
    />
    <QBtn
      color="primary"
      @click="routerTo"
    >
      to microfront Turnover</QBtn
    >
    <HelloWorld />
    <div id="content" />
  </div>
</template>

<script setup lang="ts">
  import { navigateToUrl } from 'single-spa';
  import { defineAsyncComponent } from 'vue';
  import exampleInSourceTest from '@/utils/exampleInSourceTest';

  exampleInSourceTest(1, 2, 3);
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  const HelloWorld = defineAsyncComponent(
    () => import('@/components/HelloWorld.vue'),
  );
  function routerTo() {
    navigateToUrl('/turnover');
  }

  const { TITLE } = import.meta.env;
  const { BACKOFFICE_API_PREFIX } = import.meta.env;
  const { TEXT } = import.meta.env;
</script>

<style lang="scss" module>
  .app {
    background: gainsboro;
  }
</style>
