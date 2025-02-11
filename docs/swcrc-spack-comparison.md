# 👯‍♀️ SWC 설정 파일 비교

### 🧚🏻‍♂️ `.swcrc` vs. `spack.config.js`

왜 SWC는 설정 파일이 2개일까? 사실 두 설정 파일은 전혀 다른 기능을 한다. 메인이 되는 `.swcrc`는 **트랜스파일러** 역할을 하는 것이다. 부가적으로 **번들러** 기능을 제공해주는 것인데, 그 설정 파일이 바로 `spack.config.js`이다. 

✨. 다만, [reason-for-exclusion-of-SWC](reason-for-exclusion-of-SWC.md) 에 작성된 내용을 참고하여, `spack.config.js` 가 더 이상 권장되지 않는 SWC 번들링 설정 파일이라는 것을 알아두자.

### ✅ **`.swcrc`: SWC 트랜스파일러 설정**  
**`.swcrc`는 Babel의 `.babelrc`처럼 SWC의 트랜스파일러 설정을 담당하는 JSON 파일**

📌 **기능 요약**
- **JS/TS 컴파일(트랜스파일링) 옵션을 설정하여 JS/TS 코드 변환을 최적화**
  - ESNext → ES5 변환, JSX/TSX/TS 변환, minify 가능
- 코드 변환만 수행 (✨. 번들링은 하지 않음)
- Webpack, Esbuild, Rollup과 함께 사용할 수 있음 (Babel 대체용)

### ✅ **`spack.config.js`: SWC 번들러 설정**
**`spack.config.js`는 SWC의 번들러 설정 파일**

📌 **기능 요약**
- **SWC에서 번들링을 수행할 때 사용**
- 번들 크기 최적화 지원
- `.swcrc`의 트랜스파일링 기능도 포함됨
  - 단, `.swcrc` 파일에서만 가능한 특정 기능들이 있을 수 있기 때문에, 복잡한 프로젝트의 경우 둘다 사용하는 것을 권장. 

## 🏁 정리
| 설정 파일 | 역할 | 트랜스파일링 | 번들링 |
|------|------|----|---|
| **`.swcrc`** | 트랜스파일러 설정 (Babel 대체 가능) | ✅ | ❌ |
| **`spack.config.js`** | 번들러 설정 (Webpack 대체 가능) | ✅ | ✅ |

**즉, SWC를 트랜스파일러로만 쓸 경우 `.swcrc`만 필요하고, 번들러로도 사용하려면 `spack.config.js`를 추가해야 함!**
