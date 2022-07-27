import { registerApplication, start } from 'single-spa';

window.addEventListener('single-spa:first-mount', () => {
  registerApplication({
    name: '@finuslugi/cuf-backoffice',
    app: ({ name }) =>
      import(
        /* @vite-ignore */
        name
      ),
    activeWhen: ['/turnover'],
    customProps: {
      domElement: '#content',
    },
  });
});

registerApplication({
  name: '@finuslugi/cuf-layout',
  app: () => import('./AppLayout'),
  activeWhen: '/',
  customProps: {
    domElement: '#layout',
  },
});

start({
  urlRerouteOnly: true,
});
