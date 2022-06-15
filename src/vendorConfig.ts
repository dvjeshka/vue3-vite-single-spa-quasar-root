interface IVendorItem {
    name: string
    fileName: string,
    nodeModulePath: string
}

const vendorList = [
    { name:'vue', fileName:'vue.esm-browser.prod.js', nodeModulePath: 'node_modules/vue/dist/vue.esm-browser.prod.js' },
    //{ name:'vue-router', fileName:'vue-router.esm-browser.js', nodeModulePath: '/vue-router/dist/vue-router.esm-browser.js' },
    { name:'quasar', fileName:'quasar.esm.prod.js', nodeModulePath: 'node_modules/quasar/dist/quasar.esm.prod.js' },
    { name:'quasar/lang/ru.mjs', fileName:'quasar-lang-ru.js', nodeModulePath: 'node_modules/quasar/lang/ru.js' },
    { name:'single-spa-vue', fileName:'single-spa-vue.js', nodeModulePath: 'node_modules/single-spa-vue/dist/esm/single-spa-vue.js' },
] as Array<IVendorItem>

function entryFileNames({ name }: { name: string }) {
    const nodeModulePath = vendorNameToSrcMap[name];
    return nodeModulePath
        ? nodeModulePath.replace('./','')
        : '[name].js'
}

const vendorConfig = {
    input: vendorList.reduce((prevVal, currentVal) =>
        ({ ...prevVal, [currentVal.name]: currentVal.nodeModulePath}), {}),
    external: vendorList.map(({ name }) => name),
    output: { entryFileNames }
}

const vendorNameToSrcMap = vendorList
    .reduce((prevVal, currentVal) =>
        ({ ...prevVal, [currentVal.name]: `./vendors/${currentVal.fileName}`}), {}) as { [name: string]: string }

export { vendorConfig, vendorNameToSrcMap }


