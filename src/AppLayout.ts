import singleSpaVue from 'single-spa-vue';
import { h, createApp } from 'vue';

import * as QuasarForTreeShaking from 'quasar';

import locale from 'quasar/lang/ru';
import AppLayout from '@/AppLayout.vue';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(AppLayout);
    },
  },
  handleInstance: (app) => {
    app.use(QuasarForTreeShaking.Quasar, {
      lang: locale,
      config: {
        brand: {
          primary: '#0a7902',
          secondary: '#26A69A',
          accent: '#9C27B0',
          dark: '#1D1D1D',
          positive: '#21BA45',
          negative: '#C10015',
          info: '#31CCEC',
          warning: '#F2C037',
        },
      },
    });
  },
});

export const { bootstrap, mount, unmount } = vueLifecycles;
