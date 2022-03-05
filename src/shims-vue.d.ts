/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@discostudebaker/auth' {
  let _auth: any;
  export = _auth;
}
