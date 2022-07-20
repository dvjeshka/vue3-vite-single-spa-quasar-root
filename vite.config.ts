import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import dynamicImport from 'vite-plugin-dynamic-import'
import { resolve } from 'path'

const envPrefix = 'VUE_APP_';

import { vendorConfig } from "./src/vendorConfig";

export default defineConfig(({ mode}) => {
  return {
  envPrefix,
  plugins: [
    vue({ template: { transformAssetUrls }}),
    dynamicImport(),
    quasar({
      autoImportComponentCase: 'pascal',
    }),
  ],
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      preserveEntrySignatures: true,
      input: {
        index:'./src/index.html',
        registerApplications: "./src/registerApplications.ts",
        ...vendorConfig.input
      },
      output: {
        entryFileNames: vendorConfig.output.entryFileNames,
      },
      external: vendorConfig.external,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 9000,
    open: true,
  },
  preview: {
    port: 9001
  },
}});
