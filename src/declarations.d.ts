declare module 'typeface-poppins'
declare module 'typeface-nunito'
declare module 'typeface-jetbrains-mono'
declare module 'typeface-montserrat'
declare module 'typeface-dancing-script'
declare module 'typeface-merienda'
declare module 'typeface-inter'
declare module 'typeface-saira'
declare module 'typeface-caveat'

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
