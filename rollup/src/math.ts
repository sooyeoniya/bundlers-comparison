// Tree Shaking 테스트를 위한 유틸 모듈
export const add = (a: number, b: number): number => {
  console.log('덧셈할 두 수:', a, b);
  return a + b;
};

export const subtract = (a: number, b: number): number => {
  console.log('뺄셈할 두 수:', a, b);
  return a - b;
};

export const multiply = (a: number, b: number): number => {
  console.log('곱셈할 두 수:', a, b);
  return a * b;
};

export const divide = (a: number, b: number): number => {
  console.log('나눗셈할 두 수:', a, b);
  return a / b;
};
