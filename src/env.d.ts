/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly BACKOFFICE_API_PREFIX: string;
  readonly TITLE: string;
  readonly TEXT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
