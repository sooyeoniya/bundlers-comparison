// TypeScript에서 이미지 파일을 import할 수 있도록 선언

// 이미지 파일을 문자열로 export
declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.jpeg' {
  const value: string;
  export default value;
}
declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.gif' {
  const value: string;
  export default value;
}

/**
 * SVG는 React 컴포넌트로 import할 수도 있고, URL로 import할 수도 있음.
 * import { ReactComponent as Icon } from './icon.svg'; -> <Icon /> 사용 가능
 * import iconURL from './icon.svg'; -> <img src={iconURL} /> 사용 가능
 */
declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
