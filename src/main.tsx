import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { CookiesProvider } from 'react-cookie';
import  store  from './store/store.tsx';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <Provider store={store}>
        <App />
    </Provider>
  </CookiesProvider>,
)
