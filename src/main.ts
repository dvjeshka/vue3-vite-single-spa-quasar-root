import { vendorNameToSrcMap } from "./vendorConfig";
document.head.appendChild(Object.assign(document.createElement('script'), {
    type: 'importmap-shim',
    innerHTML: JSON.stringify({
        imports: {
            ...vendorNameToSrcMap,
            "@finuslugi/cuf-backoffice": "//localhost:8080/js/app.js",
        }}),
}));

// @ts-ignore
import('es-module-shims')
    .then( _ => window.importShim(`./registerApplications.${import.meta.env.DEV ? 'ts' :'js'}`));



