import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import copyFiles from 'vite-plugin-copy-files'
import copy from 'rollup-plugin-copy'

import htmlPlugin from 'vite-plugin-html-config';

import {importMaps } from "./src/vite-plugin-import-maps";

import dynamicImport from 'vite-plugin-dynamic-import'

import importDynamicModule from 'vite-plugin-dynamic-import-module'


import { resolve } from 'path';

const envPrefix = 'VUE_APP_';

const pathSrc = resolve(__dirname, "src")

import { importMapConfig, copyVendorList } from "./src/importMap";



//console.log(importMapConfig, importMap);
//console.log(copyVendorList());
export default defineConfig(({ mode}) => {
const env = loadEnv(mode, '', envPrefix);
  return {
  envPrefix,
  plugins: [
    vue({ template: { transformAssetUrls }}),
    importDynamicModule(),
    //dynamicImport(),
    quasar({
      autoImportComponentCase: 'pascal',
    }),
    ViteEjsPlugin(({ mode}) => ({
      isLocal: mode === "development",
    })),
 /*   htmlPlugin({
      headScripts: [
        {}
      ]
    }),*/
   /* importMaps([
      {
        imports:getImportMap(mode)
      }
    ])*/
    /*viteStaticCopy({
      targets: [{src:'./node_modules/vue/dist/vue.esm-browser.prod.js', dest:'vendors'
      }]
    }),*/
  /*  copyFiles({
      include:copyVendorList(),
      root:'/',
      entry:'node_modules'
    }),*/
  /*  {
      ...copy({
            targets: copyVendorList(),
            verbose: true
           }),
    },*/

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
       // ...importMapConfig.input
      },
      output: {
        entryFileNames: '[name].js',
      /*  entryFileNames:(chunkInfo) => {
          return getImportMap(mode)[chunkInfo.name]
              ? getImportMap(mode)[chunkInfo.name].replace('./','')
              : '[name].js'
        }*/
      },
      //external: importMapConfig.external,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      //"vue": resolve(__dirname, "node_modules/vue/dist/vue.esm-browser.prod.js")
      //modules: [resolve("./node_modules")]
    },
  },
  //assetsInclude: ['./node_modules/vue/dist/*'],
  server: {
    port: 9000,
    open: true,
    //origin: 'http://127.0.0.1:8080',
    fs:{
      strict: false
    }
  },
  preview: {
    port: 9001
  },
}})
