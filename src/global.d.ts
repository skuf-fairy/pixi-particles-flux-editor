declare module '*.module.css' {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
}
declare module '*.png' {
  const value: any;
  export = value;
}
declare module '*.svg' {
  const value: string;
  export = value;
}
declare module '*.jpg' {
  const value: string;
  export = value;
}
