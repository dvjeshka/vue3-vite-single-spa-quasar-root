interface IVendorItem {
    name: string
    fileName: string,
    nodeModulePath: string
}

const vendorList = [
    { name:'vue', fileName:'vue.runtime.esm-browser.prod.js', nodeModulePath: 'node_modules/vue/dist/vue.runtime.esm-browser.prod.js' },
    { name:'vue-router', fileName:'vue-router.esm-browser.js', nodeModulePath: 'node_modules/vue-router/dist/vue-router.esm-browser.js' },
    { name:'axios', fileName:'axios.js', nodeModulePath: 'node_modules/axios/dist/axios.js' },
    { name:'@vueuse/integrations/useAxios', fileName:'@vueuse-integrations-useAxios.js', nodeModulePath: 'node_modules/@vueuse/integrations/useAxios.mjs' },
    { name:'quasar', fileName:'quasar.esm.prod.js', nodeModulePath: 'node_modules/quasar/dist/quasar.esm.prod.js' },
    { name:'quasar/lang/ru', fileName:'quasar-lang-ru.js', nodeModulePath: 'node_modules/quasar/lang/ru.js' },
    { name:'single-spa-vue', fileName:'single-spa-vue.js', nodeModulePath: 'node_modules/single-spa-vue/dist/esm/single-spa-vue.js' },
] as Array<IVendorItem>

const vendorNameToSrcMap = vendorList
    .reduce((prevVal, currentVal) =>
        ({ ...prevVal, [currentVal.name]: `./vendors/${currentVal.fileName}`}), {}) as { [name: string]: string }

function entryFileNames({ name }: { name: string }) {
    const nodeModulePath = vendorNameToSrcMap[name];
    return nodeModulePath
        ? nodeModulePath.replace('./','')
        : '[name].js'
}

const vendorConfig = {
    input: vendorList.reduce((prevVal, currentVal) =>
        ({ ...prevVal, [currentVal.name]: currentVal.nodeModulePath }), {}),
    external: vendorList.map(({ name }) => name),
    output: { entryFileNames }
}

export { vendorConfig, vendorNameToSrcMap }


