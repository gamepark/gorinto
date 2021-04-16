/// <reference types="react-scripts" />

declare module "*.ttf" {
    const value: string
    export = value
  }

  declare module '*.mp3' {
    const src: string;
    export default src;
  }