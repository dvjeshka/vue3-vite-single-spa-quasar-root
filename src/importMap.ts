const moduleList = [
    { name:'vue', fileName:'vue.esm-browser.prod.js', path: 'node_modules/vue/dist/vue.esm-browser.prod.js' },
    //{ name:'vue-router', fileName:'vue-router.esm-browser.js', path: '/vue-router/dist/vue-router.esm-browser.js' },
    { name:'quasar', fileName:'quasar.esm.prod.js', path: 'node_modules/quasar/dist/quasar.esm.prod.js' },
    { name:'quasar/lang/ru.mjs', fileName:'quasar-lang-ru.js', path: 'node_modules/quasar/lang/ru.js' },
    { name:'single-spa-vue', fileName:'single-spa-vue.js', path: 'node_modules/single-spa-vue/dist/esm/single-spa-vue.js' },
]

const input = {};

moduleList.forEach(({name,path})=>{
    // @ts-ignore
    input[name] = path
});

const external = moduleList.map(moduleItem => moduleItem.name)

function getImportMap(){
    const importMap = {}
    moduleList.forEach(({name,fileName,path}) => {
        // @ts-ignore
        importMap[name] = `./vendors/${fileName}`
    });
    return importMap
}

const commonImportMap = getImportMap()

function entryFileNames({ name }: { name: string }){
    // @ts-ignore
    const path = commonImportMap[name];
    return path
        ? path.replace('./','')
        : '[name].js'
}

const importMapConfig = {
    input,
    external,
    output:{  entryFileNames }
}







export { importMapConfig, getImportMap, commonImportMap }


