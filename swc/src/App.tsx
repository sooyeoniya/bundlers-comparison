import React, { Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';
import testData from './test.json';
// import image from './my-pet.jpg';
import { add } from './math';
// import './main.scss';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

export default function App() {
  const [load, setLoad] = useState(false);
  const numA = 11;
  const numB = 22;
  const addResult = add(11, 22);

  return (
    <div className="app-content">
      {/* <img src={image} alt="우리집 고양이 달콤이" /> */}
      <h1>{testData.name}</h1>
      <p>
        ${numA} + ${numB} = ${addResult}
      </p>
      <ul>
        {testData.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button onClick={() => setLoad(true)}>버튼 클릭</button>
      {load && (
        <Suspense fallback={<div>로딩중...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
