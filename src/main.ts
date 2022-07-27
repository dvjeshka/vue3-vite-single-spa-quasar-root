import { vendorNameToSrcMap } from './vendorConfig';
// @ts-ignore
window.esmsInitOptions = { shimMode: true };
// @ts-ignore
import('es-module-shims').then(() => {
  window.importShim.addImportMap({
    imports: {
      ...vendorNameToSrcMap,
      '@finuslugi/cuf-backoffice': '//localhost:8080/js/app.js',
    },
  });
  window.importShim(
    `./registerApplications.${import.meta.env.DEV ? 'ts' : 'js'}`
  );
});
