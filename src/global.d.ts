import type { App } from 'vue'

type GlobalThis = typeof globalThis

declare global {
  interface Window {
    Vue?:  App;
  }
  interface Global extends GlobalThis {
    Vue?:  App;
  }
}
declare var global: global.Global;


