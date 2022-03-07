import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './router'
import './App.css';

interface IProps {
  children?: any
}

const App: React.FC<IProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <RouterConfig />
      </Suspense>
    </BrowserRouter>
  )
}

export default App;
