const moduleList = [
    { name:'vue', fileName:'vue.esm-browser.prod.js', path: 'node_modules/vue/dist/vue.esm-browser.prod.js' },
    //{ name:'vue-router', fileName:'vue-router.esm-browser.js', path: 'node_modules/vue-router/dist/vue-router.esm-browser.js' },
    { name:'quasar', fileName:'quasar.esm.prod.js', path: 'node_modules/quasar/dist/quasar.esm.prod.js' },
    { name:'quasar/lang/ru', fileName:'quasar-lang-ru.js', path: 'node_modules/quasar/lang/ru.js' },
    { name:'single-spa-vue', fileName:'single-spa-vue.js', path: 'node_modules/single-spa-vue/dist/esm/single-spa-vue.js' },
]

const input = {};

moduleList.forEach(({name,path})=>{
    // @ts-ignore
    input[name] = path
});

const external = moduleList.map(moduleItem => moduleItem.name)

const importMapConfig = {
    input,
    external
}

const importMap = {}

moduleList.forEach(({name,fileName})=>{
    // @ts-ignore
    importMap[name] = `./js/${fileName}`
});

export { importMapConfig, importMap }