console.log('root-config.js');

import { registerApplication, start } from "single-spa";

window.addEventListener('single-spa:first-mount',()=>{
    registerApplication({
        name: "@finuslugi/cuf-backoffice",
        app: ({name}) => {
            console.log(name);

            return import(
                /* @vite-ignore */
                name
                ).then(r=>{
                console.log(r); return r
            })
        },
        activeWhen: ["/turnover"],
        customProps: {
            domElement: '#content'
        }
    });
})

registerApplication({
    name: "@finuslugi/cuf-root",
    app: () => import('./main'),
    activeWhen: '/',
    customProps: {
        domElement: '#layout'
    }
});



start({
    urlRerouteOnly: true,
});

/*import {
    testString
} from "@finuslugi/test";

console.log(testString);





console.log('registerApplication');

*/

