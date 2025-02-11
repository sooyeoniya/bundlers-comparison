# 🌟 SWC를 번들러 비교에서 제외한 이유
**`*. 상세 코드는 swc-legacy 브랜치 참고할 것!`**

처음에는 SWC가 우리나라 개발자분께서 개발했다는 말에 흥미가 가기 시작했다. **SWC**는 **`Rust 기반으로 작성되어 Babel을 포함한 여러 웹 빌드 툴을 대체하려는 목적에서 개발된 것이다.`** 아무래도 Rust 기반으로 작성된 컴파일러다보니 훨씬 빠를 수 밖에 없었다. 왜냐하면 Rust 자체가 다른 언어에 비해 동시성 처리 속도가 높고 병렬 처리가 가능하기 때문에 싱글 스레드인 JavaScript로 개발된 Babel보다 훨씬 빠를 수밖에 없다.

그리고 SWC는 transform 관점에서 보면 Babel을 대체하는 컴파일러일 뿐만 아니라, minify 관점에서 보면 terser와 거의 비슷한 수준의 압축률을 보여주는, terser를 대체하는 기능도 가지고 있다. 이러한 관점에서 보면 SWC는 컴파일링과 번들링 모두 갖춘 고효율의 빌드 도구라고 볼 수 있다. 

하지만, SWC를 번들러 비교군에서 제외할 수 밖에 없었다. SWC 자체를 비난하고자 하는 것이 절대 아니다. 요약해 말하자면, 다른 번들러에 비해 **`번들러`** 로서의 기능이 약간은 미흡하다는 것이다.

SWC 공홈을 보면 아래와 같은 공지가 나와있다.
```
This feature will be dropped in v2, in favor of SWC-based bundlers like Parcel 2, Turbopack, rspack, fe-farm.

Please use one of the bundlers instead.

SWC is able to bundle multiple JavaScript or TypeScript files into one.

This feature is currently named spack, but will be renamed to swcpack in v2. spack.config.js will be deprecated for swcpack.config.js.
```
**출처:** [swc bundling configuratoin](https://swc.rs/docs/configuration/bundling)

위 말을 해석해보면, SWC의 기존 번들러 기능 spack이 SWC v2에서 제거되며, 대신 Turbopack, rspack, Parcel2 등의 SWC 기반 번들러를 사용하는 것을 권장한다는 것이다. 다시 말하면, SWC는 자체적으로 번들링이 가능하지만, 별도의 SWC 기반 번들러를 사용하는 것이 더 나은 선택이라는 것이다. 

그리고 v2부터는 spack이라는 명칭이 swcpack으로 변경되며, 설정 파일도 spack.config.js → swcpack.config.js로 바뀌고, 앞으로 SWC를 번들러로 사용하려면 swcpack.config.js를 이용해야 하며, 기존 설정 파일 방식은 더 이상 지원되지 않는다고 한다.

**SWC**는 **`기본적으로 트랜스파일러, 즉 코드를 변환하는 도구로 사용되는 것이지, 완전한 번들러라고 볼 수는 없다.`** 실질적으로 SWC를 단독으로 번들러처럼 사용하는 경우도 드물다. 보통 다른 번들러들(Webpack, Rollup, esbuild, Vite 등)의 부가적인 플러그인으로서 함께 사용하여 트랜스파일링을 도와 빌드 성능을 향상시켜주는 역할을 주로 하는 것으로 보인다.

이렇듯 현재 비교하는 대상들과 약간의 기능적인 차이(용도 차이 정도로 보면 될 것 같음)가 있었기 때문에, 내가 비교하고자 하는 공통 지표에 대한 결과를 얻기 위해 구성한 기본 파일들을 번들링 하는 과정에서 더 많은 기능을 제공해주지 않아 중간에 오류가 발생하여 제대로 된 비교가 불가능 했다.

아래는 번들링 과정에서 마주한 오류들이다. 사실상 다른 번들러들과 함께 사용하면 처리가 가능한 부분들이었지만, SWC 자체만으로는 불가능한 번들링이었다.

## 📌 SWC 번들러 테스트 과정 중 발생한 오류

### 🐥 이미지와 scss 처리 문제

✅ **오류 분석**

빌드 과정에서 아래와 같은 오류가 발생했다. 
```
🌟 이미지 오류
> swc@1.0.0 build
> npm run clean && npm run build:bundle && npm run build:css && npm run build:html


> swc@1.0.0 clean
> rm -rf dist/*


> swc@1.0.0 build:bundle
> spack

node:internal/process/promises:391
    triggerUncaughtException(err, true /* fromPromise */);
    ^

[Error: load_transformed failed

Caused by:
    0: Bundler.load() failed
    1: Bundler.loader.load(/Users/sooyeon/IdeaProjects/bundler-test-repos/bundlers-comparison/swc/src/my-pet.jpg) failed
    2: failed to load file /Users/sooyeon/IdeaProjects/bundler-test-repos/bundlers-comparison/swc/src/my-pet.jpg
    3: stream did not contain valid UTF-8] {
  code: 'GenericFailure'
}

Node.js v20.18.0
npm run build  0.45s user 0.19s system 53% cpu 1.198 total
```

```
🌟 SCSS 오류
> swc@1.0.0 build
> npm run clean && npm run build:bundle && npm run build:css && npm run build:html && npm run build:assets


> swc@1.0.0 clean
> rm -rf dist/*


> swc@1.0.0 build:bundle
> spack

node:internal/process/promises:391
    triggerUncaughtException(err, true /* fromPromise */);
    ^

[Error: load_transformed failed

Caused by:
    0: Bundler.load() failed
    1: Bundler.loader.load(/Users/sooyeon/IdeaProjects/bundler-test-repos/bundlers-comparison/swc/src/main.scss) failed
    2:   × Expression expected
          ╭─[/Users/sooyeon/IdeaProjects/bundler-test-repos/bundlers-comparison/swc/src/main.scss:1:1]
        1 │ @use 'sass:color';
          · ─
        2 │ 
        3 │ $primary-color: #4caf50;
        4 │ $font-size: 16px;
          ╰────
       
    3: tried to parse as ecmascript as it's excluded by .swcrc
    4: Syntax Error] {
  code: 'GenericFailure'
}

Node.js v20.18.0
npm run build  0.46s user 0.20s system 77% cpu 0.854 total
```
위 오류(`load_transformed failed`)를 분석해보니, `spack`이 빌드하는 과정에서 이미지 파일(`my-pet.jpg`)과 SCSS 파일을 처리하는 과정에서 문제가 발생한 것이다.

이 문제의 원인은 SWC의 `spack.config.js`에 있었다. 여기서 `spack.config.js`가 `.swcrc`와 뭐가 다른지 궁금하다면 [swcrc-spack-comparison](./swcrc-spack-comparison.md)에 간단하게 정리해두었으니 읽어보고 와도 좋다.

앞서 말했듯이, 사실 근본적인 문제는 SWC 자체는 번들링에 최적화된 도구가 아니라는 것이다. SWC의 `spack`은 기본적으로 JS/TS 코드만 번들링 처리한다. 

그런데 위 오류에 따르면, `my-pet.jpg` 같은 **이미지 파일을 번들링하려고 시도** 한다는 것이다. 여기서 **이미지를 UTF-8 텍스트로 해석하려고 하면서 오류 발생한 것**이다.

또한, spack이 main.scss 파일을 로드할 때 구문 분석과정에서 오류가 발생했는데, 이에 대한 근본적인 원인도도 애초에 spack(SWC 번들러)이 기본적으로 SCSS를 지원하지 않기 때문이다. 그래서 SCSS를 직접 번들링하려 하면 `"Expected ';', '}' or <eof>"` 같은 구문 오류가 발생하는 것이었고 별도의 CSS 변환이 필요하기 때문에 빌드할 때 sass 를 사용해서 컴파일 해주면 된다. 

여기서 내가 해주면 되는 것은 `spack`이 이미지와 SCSS 파일을 건들지 않도록 하는 것이라고 생각했다.

✅ **해결 시도**

```js
app: path.resolve(__dirname, 'src/App.tsx'),
```

`spack.config.js`의 진입점(엔트리 파일)이 `src/App.tsx` 인데, 그 내부에는 이미지와 SCSS 파일이 존재한다.
<br/> 여기서 내가 원하는 해결 방법은 다음과 같았다.

1️⃣ `spack.config.js`가 이미지와 SCSS 파일을 완전 무시하도록 설정하기
<br/> 2️⃣ `package.json`에서 `cp` 명령어와 sass를 설정하여, 빌드될 때 `dist/`로 복사되도록 하기

이렇게 되면, `spack`에서는 이미지와 SCSS 파일을 건드리지 않도록 설정되었으므로 오류가 발생하지 않을 것이라고 생각했다. 사실 해결책만 보면 간단하지만, 결론적으로는 해결하지 못했다. 

```json
{
  // spack.config.js
  test: /\.(png|jpe?g|gif|svg)$/,
  exclude: /.*/,
},
```
```json
{
  // spack.config.js
  test: /\.(png|jpe?g|gif|svg)$/,
  exclude: /\.(png|jpe?g|gif|svg)$/,
},
```
위와 같은 방식으로 특정 파일 패턴(`test`)에 대해 `exclude: /.*/` 또는 `exclude: /\.(png|jpe?g|gif|svg)$/,`를 적용하여 이미지 파일 자체를 번들링에서 제외시키는 방식도 적용해보았는데 실패했다. 

```json
{
  // .swcrc
  "exclude": [
    "node_modules",
    "dist",
    ".*\\.scss$",
    ".*\\.sass$",
    ".*\\.png$",
    ".*\\.jpg$",
    ".*\\.jpeg$",
    ".*\\.gif$",
    ".*\\.svg$"
  ]
}
```
두 번째로는 `.swcrc` 파일 내부에서 위와 같은 방식으로 다 exclude 해주었다. 하지만 이 방식도 오류를 고쳐주지 못했다.

``` sh
npx swc ./src --o dist --ignore **/*.scss,**/*.sass,**/*.png,**/*.jpg,**/*.jpeg,**/*.gif,**/*.svg
```
또 다른 해결책으로는 `cli` 명령어를 사용하는 방법이다. 위와 같은 방식으로 `--ignore` 옵션을 사용해 하나하나 다 파일을 일일이 삭제해주면 될 수도 있다. 하지만 그렇게 되면 cp 명령어를 사용해 dist로 복사해서 넣을 수가 없다. 그렇게 되면 아예 이미지와 scss 파일을 번들링할 수가 없는 것이다. 

✅ **결론**

더 많은 시행착오가 있었는데, 실질적으로는 해결하지 못했다.
아예 App.tsx 내부에 있는 image와 scss의 import를 모두 없애버렸는데도 아래와 같은 오류가 계속 발생했다. SWC 프로젝트의 Rust 기반 코어에서 발생한 것이라는 오류 분석이 나오는데, swcrc와 spack.config.js 설정 자체를 다 없애버렸는데도 여전히 동일하게 발생했다.
```
> swc@1.0.0 build
> npm run clean && npm run build:bundle && npm run build:css && npm run build:html && npm run build:assets


> swc@1.0.0 clean
> rm -rf dist/*


> swc@1.0.0 build:bundle
> spack

thread '<unnamed>' panicked at /Users/runner/.cargo/registry/src/index.crates.io-6f17d22bba15001f/scoped-tls-1.0.1/src/lib.rs:168:9:
cannot access a scoped thread local variable without calling `set` first
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
node:internal/process/promises:391
    triggerUncaughtException(err, true /* fromPromise */);
    ^

[Error: panic detected] { code: 'GenericFailure' }

Node.js v20.18.0
npm run build  0.47s user 0.19s system 85% cpu 0.781 total
```

## 📌 SWC는 ESM보다 CJS가 더 편하다?
SWC의 `spack` 설정파일은 기본적으로 CJS 모듈 시스템을 사용한다. 
그 이유는 크게보면 한 2~3개 정도가 있다.
1. Node.js 환경에서 실행
- 기본적으로 Node.js는 CJS 기반 환경이기 때문에 CJS가 더 적합하다. 그리고 `spack` 자체가 아직 ESM이 완벽히 지원되지 않는다고 함. 실제 SWC 공식문서만 봐도 CJS 모듈 방식을 사용하고 있음. 
2. CJS 환경에서 더 안정적으로 동작함
- 1번과 연계된 내용인데, Node.js 환경에서 돌아가기 때문에 swc 관련 API를 가져올 때 require로 가져오는 것이 훨씬 안정적임.
3. `spack.config.js`는 일반적으로 Webpack 스타일을 따라감
- Webpack 설정(`webpack.config.js`)도 기본적으로 CJS 형식을 사용하고 있음. Webpack도 마찬가지로 1,2번의 이유를 CJS 사용 근거로 볼 수 있겠음.

하지만? 본 프로젝트에서는 현재 ESM으로 비교하고 있음. (물론 Webpack은 그냥 CJS로 설정해놓긴 했는데, 호환성 측면에서 그렇게 해놓은 것이긴함. 사실 ESM으로 바꾼다고 해도 큰 효율 차이가 없을 것 같다고 생각함.. 각 번들러별로 대중적으로 사용하는 모듈 시스템 방식을 적용했을 뿐. 그래도 ESM으로 변경해서 테스트 해보는 것이 좋을 듯!)

## 📌 결론
- 애초에 SWC는 구글에 레퍼런스가 너무 부족해서 제대로 된 해결책을 찾을 수가 없었다..!
- SWC 프로젝트를 까보려고 시도했지만, Rust 언어로 개발되어 있어서 진짜 이해가 하나도 안됐다. 뭔가 외계어같다..ㅎㅎ
- SWC는 트랜스파일러로서의 역할을 충실히 이행할 뿐. 단독 번들러로 사용하기는 어렵다는 것을 깨달았다. 즉, SWC는 다른 번들러와 함께 사용하는 것이 시너지가 훨씬 좋다.
- 만약, SWC를 비교할거면 비교군에 Babel, Terser를 두는 것이 훨씬 더 적합하다.
- SWC를 기반으로 개발되고 있는 차세대 번들러들을 이용해보자!

## 📌 SWC 기반 번들러: Turbopack (Beta)
- Turbopack의 경우에는 SWC 기반으로 개발되고 있는 번들러로, Next.js 자체에 내장되어 있음! 하지만, 아직까지 Turbopack은 베타버전이기에 지원되지 않는 기능들이 좀 많은 것 같다. 공식문서를 보면 현재 `next dev`만 지원하며 `next build`는 지원하지 않는다고 한다. (하지만 안전성 향상을 위해 빌드 지원 작업을 현재 진행 중이라고 한다.) 그렇기 때문에 개발 모드가 아닌 프로덕션 빌드 모드에서 번들러를 비교를 하는 본 프로젝트에서는 제대로 평가할 수 있는 방법이 없어서 Turbopack을 추가로 비교하지 않기로 했다.

- **최종 결론:** SWC에서도 남은 주요 번들링 기능은 Turbopack에 포팅 작업중이라고 하니 좀 더 기다려봐야겠다!

## 📌 참고 자료
- [GitHub swc-project](https://github.com/swc-project/swc)
- [swc 공식 홈페이지](https://swc.rs/)
- [swc와 웹 개발의 미래 - 강동윤 | Vercel 발표](https://www.youtube.com/watch?v=4RJxyGJQe4o)
