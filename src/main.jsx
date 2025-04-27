import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import { Home } from './pages/Home';
import { Logados } from './pages/Logados';
import { Menu } from './components/Menu';
import { NotFound } from './pages/NotFound';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logados" element={<Logados />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
