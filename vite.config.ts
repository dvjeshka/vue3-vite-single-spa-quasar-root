import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { ViteEjsPlugin } from "vite-plugin-ejs";

import dynamicImport from 'vite-plugin-dynamic-import'
import { resolve } from 'path'

const envPrefix = 'VUE_APP_';

import { vendorConfig } from "./src/vendorConfig";

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
/*  esbuild:{
    //minify: true,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false
  },*/
  build: {
    //minify: 'terser',
    /*terserOptions:{
      compress:false,
      mangle: {
        keep_classnames:false,
        keep_fnames:false,
        reserved:['createApp']
      },
      keep_classnames: false,
      keep_fnames: false,
      module: false,
      toplevel: false,
    },*/
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
    /*    manualChunks: {
          vue: ['vue']
        },
        chunkFileNames:(AssetInfo=>{
          console.log(AssetInfo.name);
          if(AssetInfo.name === 'vue') {
            return 'vendors/[name].js'
          }
          return 'assets/[name].[hash].js'
        })*/
      },
      external: vendorConfig.external,
    },
  },
  /*  esbuild:{
      minifyWhitespace:false,
      minifyIdentifiers: false,
      minifySyntax:false,
    },*/
  //define: { __VUE_OPTIONS_API__: false, __VUE_PROD_DEVTOOLS__: false },
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
