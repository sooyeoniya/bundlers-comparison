# 🪄 bundlers-comparison

<!-- TODO: **구현 기간:** `25.02.02` - `25.02.~` -->

본 프로젝트는 번들러를 비교하기 위한 벤치마크 테스트이다.

최근 웹 개발에서는 **빌드 속도의 최적화**와 **효율적인 번들링**이 점점 더 중요한 요소로 자리 잡고 있다. 이에 따라, 기존 `Webpack`을 대체하거나 보완하는 다양한 번들러들이 등장하고 있다. 각 번들러는 성능, 최적화 기법, 사용성 측면에서 여러 차별점을 갖는다.

본 프로젝트는 이러한 번들러들의 **성능과 스펙을 종합적으로 분석**하여, 앞으로의 개발에 있어 개발 환경에 가장 적합한 번들러를 선정하고 활용할 수 있도록 하는 것을 목표로 한다.

## 🔹 비교 번들러 항목

우선, 번들러 항목 선정 과정에서 [2024 State-of-JavaScript Build-Tools](https://2024.stateofjs.com/en-US/libraries/build_tools/) 를 참고하였다.

본 사이트의 `2024년 Build Tools` 통계에서 **Usage(사용성)** 및 **Awareness(인지도)** 지표를 참고하였으며, 높은 활용도와 성장세를 번들러를 선정 기준으로 삼았다.

| 번들러    | 선정 이유                                                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Webpack` | 가장 범용적이고, 확장성이 좋은 번들러. 모든 환경(브라우저, Node.js, etc.)에서 대응 가능하며, 커스텀이 용이함.                                                                |
| `Rollup`  | ESM(ES Module) 지원이 최적화 되어있음. Vite의 빌드 단계에서 Rollup을 사용해 코드 최적화 및 번들링을 수행함.                                                                  |
| `esbuild` | Go 기반의 매우 빠른 번들러. Vite의 개발 환경에서 esbuild를 트랜스파일러로 사용함.                                                                                            |
| `SWC`     | Rust 기반의 매우 빠른 컴파일러 + 번들러. Next.js가 babel 대신 채택한 트랜스파일러(컴파일러)임. ([Next.js Compiler](https://nextjs-ko.org/docs/architecture/nextjs-compiler)) |
| `Vite`    | 번들러 자체가 아니라, 기존 번들러를 이용해 번들링 최적화 하는 빌드 도구임. 다만, 기존 번들러와 비교를 많이 하기도 하고, 최근 활용도가 가장 높기 때문에 채택함.               |

## 🔹 번들러 비교 지표

| 항목                        | 정의(단위)                                                      |
| --------------------------- | --------------------------------------------------------------- |
| ✔️ TypeScript 지원 | TS 코드가 정상적으로 변환되는지 확인 |
| ✔️ React 지원 | JSX/TSX가 정상적으로 컴파일되는지 확인 |
| ✔️ JSON 처리 | import data from './data.json' 가능 여부 및 번들 포함 방식 확인 |
| ✔️ 이미지 처리 | .png, .jpg, .svg 등 이미지 파일 임포트 및 최적화 여부 확인|
| ✔️ CSS 처리 | Sass/SCSS 지원 여부 및 변환 결과 확인 |
| ✔️ Tree-shaking | 사용되지 않는 코드가 제거되는지 확인 |
| ✔️ Code-splitting | React.lazy()와 import()로 동적 임포트한 코드가 별도 번들로 분리되는지 확인 |
| ✔️ main JS 크기 | 최종 번들된 JS 파일 크기 |
| ✔️ Chunk(Splitted) JS 크기 | 코드 스플리팅에 의해 분리된 Chunk JS 파일 크기 |
| ✔️ index.html 크기 | 번들링된 html 파일 크기 |
| ✔️ CSS 크기 | Sass/SCSS 파일이 번들링되어 생성된 CSS 번들 파일 크기 |
| ✔️ 이미지 크기  | 번들링된 이미지 파일 크기 |
| ✔️ 빌드 시간 | 번들러가 번들링을 수행하는 데 걸린 시간 |
| ✔️ user mode 작업 시간 | CPU가 사용자 프로세스(user mode)에서 작업한 시간 |
| ✔️ system mode 작업 시간 | CPU가 커널 모드(system mode)에서 작업한 시간 |
| ✔️ CPU 사용률 | CPU 사용률(멀티코어를 사용한 경우 100%를 초과할 수 있음) |
| ✔️ 전체 실행 시간 | 실제 경과 시간(Elapsed Time), 즉 npm run build 명령어가 실행된 후 종료될 때까지의 전체 시간 |
| ✔️ Configuration Size (LoC) | 번들러 설정 파일(xxx.config.js)의 코드 라인 수 비교, LoC가 클수록 번들러 설정 복잡도 큰 것을 의미함 |

<!-- | ✔️ 이미지 압축 및 최적화 지원 | | -->
<!-- | ✔️ HMR 지원 | Hot Module Replacement 지원 여부 확인 | -->

## 🔹 테스트 환경 구성

### ✔️ 기본 정보
  *정확한 번들러 성능 비교를 위해 로컬 테스트 환경 정보를 적어두도록 하겠다.*

- **OS:** `maxOS Sequoia 15.1.1`

- **CPU:** `Apple M2 Pro`

- **Module System:** `ES Modules(ESM)` (모듈 시스템 채택 방식: `docs/module-select.md`)

- **Node.js:** `20.18.0`

- **npm:** `10.8.2`

### ✔️ 테스트 프로젝트 구성 (공통)


```
/bundlers-comparison
```

## 🔹 테스트 실행

```sh
du -sh src/ # 원본 파일 크기 확인
du -sh dist/ # 전체 번들 크기 확인
ls -lh dist/ # 번들 각 파일 크기 확인
```

### ✔️ Webpack

1️⃣ **필요한 의존성 패키지 설치**
```sh
# webpack 폴더로 이동
cd webpack

# React
npm install react react-dom

# React, TypeScript, Sass
npm install -D @types/react @types/react-dom typescript @types/node sass 

# Webpack
npm install -D webpack webpack-cli webpack-bundle-analyzer ts-loader css-loader sass-loader html-webpack-plugin mini-css-extract-plugin clean-webpack-plugin
```

2️⃣ **실행**
```sh
npm run build # 프로덕션 빌드 및 번들 분석
time npm run build # 프로덕션 빌드 및 번들 분석 + 빌드 시간 측정
```

3️⃣ **번들링 결과 분석**
```
bundle-report.html 파일 브라우저로 실행해서 확인 (시각화)
dist/stats.json 을 통해 번들 분석 가능 (json 데이터로 정리)
```

### ✔️ Rollup

1️⃣ **필요한 의존성 패키지 설치**
```sh
# rollup 폴더로 이동
cd rollup

# React
npm install react react-dom

# React, TypeScript, Sass
npm install -D @types/react @types/react-dom typescript @types/node sass

# Rollup
npm install -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript @rollup/plugin-json @rollup/plugin-url @rollup/plugin-replace @rollup/plugin-terser rollup-plugin-postcss rollup-plugin-visualizer @rollup/plugin-html
```

2️⃣ **실행**
```sh
npm run build # 프로덕션 빌드 및 번들 분석
time npm run build # 프로덕션 빌드 및 번들 분석 + 빌드 시간 측정
```

3️⃣ **번들링 결과 분석**
```
bundle-analysis.html 파일 브라우저로 실행해서 확인 (시각화)
```

### ✔️ esbuild

1️⃣ **필요한 의존성 패키지 설치**
```sh
# esbuild 폴더로 이동
cd esbuild

# React
npm install react react-dom

# React, TypeScript, Sass
npm install -D @types/react @types/react-dom typescript @types/node sass

# esbuild
npm install -D esbuild esbuild-sass-plugin @craftamap/esbuild-plugin-html
```

2️⃣ **실행**
```sh
npm run build # 프로덕션 빌드 및 번들 분석
time npm run build # 프로덕션 빌드 및 번들 분석 + 빌드 시간 측정
```

3️⃣ **번들링 결과 분석**
```
dist/metafile.json 을 통해 번들 분석 가능 (json 데이터로 정리)
```

### ✔️ SWC


### ✔️ Vite


## 🔹 분석 결과

### 🔗 전체 비교
| 항목                        | Webpack                     | Rollup                          | esbuild                    | SWC                          | Vite                          |
| --------------------------- | --------------------------- | ------------------------------- | -------------------------- | ---------------------------- | ----------------------------- |
| **버전(version)**            | ✔️ 5.97.1 | ✔️ 4.34.1 | ✔️ 0.24.2 | ✔️  | ✔️  |
| **TypeScript 지원**          | ✅ 기본 지원   | 🔼 플러그인 필요 (rollup/plugin-typescript) | ✅ 기본 지원                  | 기본 지원                    | 기본 지원                     |
| **React 지원**               | ✅ 기본 지원   | 🔼 플러그인 필요 (rollup/plugin-typescript) | ✅ 기본 지원                  | 플러그인 필요 (swc-loader 등) | 기본 지원                     |
| **JSON 처리**         | ✅ 기본 지원  | 🔼 플러그인 필요 (rollup-plugin-json) | ✅ 기본 지원                  | 플러그인 필요 (swc-plugin-json) | 기본 지원                     |
| **이미지 처리**              | ✅ 원래는 로더(file-loader, url-loader)가 필요했으나 v5부터는 내장된 [asset-modules](https://webpack.kr/guides/asset-modules/)로 가능! | 🔼 플러그인 필요 (rollup/plugin-image, rollup/plugin-url, rollup/plugin-image-files) | ✅ 기본 지원 | 플러그인 필요 (swc-loader) | 기본 지원                     |
| **CSS 처리**                 | 🔼 로더 필요 (sass-loader, css-loader) | 🔼 플러그인 필요 (rollup-plugin-postcss) | 🔼 플러그인 필요 (esbuild-sass-plugin) | 플러그인 필요 (swc-plugin-sass) | 기본 지원 (esbuild 기반)      |
| **Tree-shaking**             | ✅ 기본 지원    | ✅ 기본 지원                        | ✅ 기본 지원                  | 기본 지원                    | 기본 지원                     |
| **Code-splitting**      | ✅ 기본 지원   | ✅ 기본 지원                        | ✅ 기본 지원                  | 기본 지원                    | 기본 지원                     |
| **번들(dist 폴더) 크기(MB)** | 3.4 | 3.1 | 2.9 | | | |
| **메인 JS 번들 크기(KiB)** | 180 | 179 | 181 |  |     |
| **Chunk(Splitted) JS 크기(bytes)** | 248 | 163 | 190 |  |     |
| **index.html 크기(bytes)** | 329 | 331 | 326 |  |     |
| **CSS 크기(bytes)** | 161 | 148 | 149 |  |     |
| **이미지 크기(MiB)**  | 2.71 | 2.71 | 2.71 |  |     |
| **평균 user mode 작업 시간(s)** | 7.47 | 7.72 | 0.70 | | |
| **평균 system mode 작업 시간(s)** | 0.47 | 0.60 | 0.14 | | |
| **평균 CPU 사용률(%)** | 189 | 201 | 120 | | |
| **평균 전체 실행 시간(s)** | 4.205 | 4.123 | 0.714 | | |
| **Configuration 길이 (LoC)** | 57 | 73 | 58 | | |

<!-- | **이미지 압축 및 최적화 지원** | | | | | | -->
<!-- | **HMR 지원(개발 모드에서만 테스트 가능)** | 기본 지원 | 플러그인 필요 (rollup-plugin-hot) | 플러그인 필요 (esbuild-plugin-hmr) | 기본 지원 | 기본 지원 | -->

## 🔹 추가 확장 테스트

### 1. 라이브러리 번들링 분석

- 본 프로젝트는 실제 웹 애플리케이션 번들링 시나리오를 테스트하고 있으나, 추가로 라이브러리 번들링 테스트도 진행할 수 있음.
- 특히, 라이브러리 번들링에 특화된 Rollup이 얼마나 효과적인지 비교 가능함.

### 2. 여러 개의 모듈로 번들링 테스트

- 번들러 별로 어떤 유형의 모듈이 더 효율적인지 테스트해볼 수 있음.
- 다만 테스트 환경과 결과 분석이 더 복잡해질 수 있음.

### 3. 프로덕션 빌드가 아닌 개발 환경 테스트

- HMR (Hot Module Replacement) 테스트
- 개발 서버 시작 속도 테스트
