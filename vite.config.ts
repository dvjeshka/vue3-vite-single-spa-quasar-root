import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { ViteEjsPlugin } from "vite-plugin-ejs";

import dynamicImport from 'vite-plugin-dynamic-import'
import { resolve } from 'path'

const envPrefix = 'VUE_APP_';


import { importMapConfig } from "./src/importMap";

export default defineConfig(({ mode}) => {
const env = loadEnv(mode, '', envPrefix);
  return {
  envPrefix,
  plugins: [
    vue({ template: { transformAssetUrls }}),
    dynamicImport(),
    quasar({
      autoImportComponentCase: 'pascal',
    }),
    ViteEjsPlugin(({ mode}) => ({
      isLocal: mode === "development",
    })),
  ],
  root: "./src",
  build: {
    minify: false,
    outDir: "../dist",
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      preserveEntrySignatures: true,
      input: {
        index:'./src/index.html',
        //main:'./src/main.ts',
        'root-config': "./src/root-config.ts",
        ...importMapConfig.input
      },
      output: {
        entryFileNames: importMapConfig.output.entryFileNames,
      },
      external: importMapConfig.external,
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
