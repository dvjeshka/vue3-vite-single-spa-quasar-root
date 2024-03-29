/// <reference types="vitest" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { resolve } from 'path';

import compress from 'vite-plugin-compress';
import { ViteTips } from 'vite-plugin-tips';
import Inspector from 'vite-plugin-vue-inspector';
import checker from 'vite-plugin-checker';
import ImportMetaEnvPlugin from '@import-meta-env/unplugin';

import { vendorConfig } from './src/vendorConfig';

export default defineConfig(() => ({
  //envPrefix: [], // https://iendeavor.github.io/import-meta-env/guide.html#framework-specific-notes
  test: {
    dir: './',
    coverage: {
      provider: 'v8', // or 'istanbul'
    },
  },
  /*  test: {
    dir: './',
    includeSource: ['./src/!**!/!*.ts'],
    environment: 'happy-dom',
    coverage: {
      src: ['./src'],
      reportsDirectory: '../test/utils/.coverage',
      /!* all: true,
       lines: 80,
       functions: 80,
       branches: 80,
       statements: 80, *!/
    },
    reporters: ['vitest-sonar-reporter'],
    outputFile: '../test-report.xml',
  },*/
  plugins: [
    /*    ImportMetaEnvPlugin.vite({
      env: '.env.default',
      example: '.env.runtime',
    }),
    ViteTips(),
    Inspector(),
    checker({ vueTsc: true }),*/
    vue({ template: { transformAssetUrls } }),
    quasar({ autoImportComponentCase: 'pascal' }),
    // compress({ verbose: true, brotli: false }),
  ],
  root: './src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      preserveEntrySignatures: 'strict', // Оставляет exports у vendors
      input: {
        index: './src/index.html',
        registerApplications: './src/registerApplications.ts',
        ...vendorConfig.input,
      },
      output: {
        entryFileNames: vendorConfig.output.entryFileNames,
      },
      external: vendorConfig.external,
    },
  },
  define: {
    'import.meta.vitest': false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 9000,
    open: true,
  },
  preview: {
    port: 9001,
  },
}));
