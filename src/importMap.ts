const moduleList = [
    { name:'vue', fileName:'vue.esm-browser.prod.js', path: 'node_modules/vue/dist/vue.esm-browser.prod.js', devUrl: import(`../node_modules/vue/dist/vue.esm-browser.prod.js?url`) },
    //{ name:'vue-router', fileName:'vue-router.esm-browser.js', path: '/vue-router/dist/vue-router.esm-browser.js' },
    { name:'quasar', fileName:'quasar.esm.prod.js', path: 'node_modules/quasar/dist/quasar.esm.prod.js', devUrl: import(`../node_modules/quasar/dist/quasar.esm.prod.js?url`) },
    { name:'quasar/lang/ru.mjs', fileName:'quasar-lang-ru.js', path: 'node_modules/quasar/lang/ru.js', devUrl: import(`../node_modules/quasar/lang/ru.mjs?url`) },
    { name:'single-spa-vue', fileName:'single-spa-vue.js', path: 'node_modules/single-spa-vue/dist/esm/single-spa-vue.js', devUrl: import(`../node_modules/single-spa-vue/dist/esm/single-spa-vue.js?url`) },
]

async function getUrls(){
    const devUrls = await Promise.all(moduleList.map(item=>item.devUrl))
    devUrls.forEach((value, index)=>{
        // @ts-ignore
        console.log(value);
        moduleList[index].devUrl = value.default
    })
}




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




async function getImportMap(mode?: string){
    const importMap = {}

    await getUrls();

    moduleList.forEach(({name,fileName,path,devUrl}) => {
        console.log(devUrl);
        if(mode === 'development') {

            //const url = await import(`../${path}?url`)
            //console.log(url);
            // @ts-ignore
             return importMap[name] = devUrl
        }
         // @ts-ignore
        importMap[name] = `./vendors/${fileName}`
    });
    //console.log(importMap);
    return importMap
}

function copyVendorList(){

    const list = moduleList.map(({name, fileName,path,})=>{

        return {
            src: path,
            dest:'./src/public/vendors',
          /*  ...(name === 'quasar/lang/ru'
                ? { rename: fileName }
                : {}
            )*/
        }
    });
    return list
}



export { importMapConfig, getImportMap, copyVendorList }


