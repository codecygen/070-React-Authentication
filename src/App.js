// React-Context-API-Login-Logout-Management
import { useContext } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

// React-Context-API-Login-Logout-Management
import AuthContext from './store/auth-context';

function App() {
  // React-Context-API-Login-Logout-Management
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />

        {/* React-Context-API-Login-Logout-Management */}
        {/* React-Firebase-Conditional-React-Router-Rendering-Rendering-Links-Conditionally */}
        {!authCtx.isLoggedIn && (
          <Route path='/auth' element={<AuthPage />} />
        )}

        {/* React-Context-API-Login-Logout-Management */}
        {/* React-Firebase-Conditional-React-Router-Rendering-Rendering-Links-Conditionally */}
        {authCtx.isLoggedIn && (
          <Route path='/profile' element={<UserProfile />} />
        )}

        <Route path='*' element={<Navigate to="/" />} />

      </Routes>
    </Layout>
  );
}

export default App;
