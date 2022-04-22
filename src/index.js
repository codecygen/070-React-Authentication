import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// React-Context-API-Login-Logout-Management
import { AuthContextProvider } from './store/auth-context';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React-Context-API-Login-Logout-Management
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
