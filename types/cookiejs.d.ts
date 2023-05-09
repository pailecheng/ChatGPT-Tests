declare module 'cookiejs' {
    interface ICookieOptions {
      expires?: number | Date | string;
      path?: string;
      domain?: string;
      secure?: boolean;
    }
  
    export class Cookie {
      static set(name: string, value: string, options?: ICookieOptions): void;
      static get(name: string): string;
      static remove(name: string, options?: ICookieOptions): void;
    }
  }