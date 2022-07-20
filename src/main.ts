import 'es-module-shims';

import { vendorNameToSrcMap } from "./vendorConfig";

document.body.appendChild(Object.assign(document.createElement('script'), {
    type: 'importmap-shim',
    innerHTML: JSON.stringify({
        imports: {
            ...vendorNameToSrcMap,
            "@finuslugi/cuf-backoffice": "//localhost:8080/js/app.js",
        }}),
}));
const fileType = import.meta.env.DEV ? 'ts' :'js'

importShim(`./registerApplications.${fileType}`);