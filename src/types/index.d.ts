declare module '*.scss' {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module 'react-router-dom';

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}
