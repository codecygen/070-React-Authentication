// React-Context-API-Login-Logout-Management
import { useContext } from 'react';

import { Link } from 'react-router-dom';

// React-Context-API-Login-Logout-Management
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  // React-Context-API-Login-Logout-Management
  const authCtx = useContext(AuthContext);

  // React-Context-API-Login-Logout-Management
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {/* React-Context-API-Login-Logout-Management */}
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}

          {/* React-Context-API-Login-Logout-Management */}
          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          
          {/* React-Context-API-Login-Logout-Management */}
          {isLoggedIn && (
            <li>
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
