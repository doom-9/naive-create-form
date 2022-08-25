declare module "vue" {
  export interface ComponentCustomProperties {
    $t: (target: string) => string;
  }
}

export {};
