// React-Firebase-Create-Account
// React-Context-API-Login-Logout-Management
import { useState, useRef, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

// React-Context-API-Login-Logout-Management
import AuthContex from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const navigate = useNavigate();

  // React-Firebase-Create-Account
  const emailInputRef = useRef();
  // React-Firebase-Create-Account
  const passwordInputRef = useRef();

  // React-Context-API-Login-Logout-Management
  const authCtx = useContext(AuthContex);

  const [isLogin, setIsLogin] = useState(true);

  // React-Firebase-Create-Account
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // React-Firebase-Create-Account
  const submitHandler = event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;

    if (isLogin) {
      // React-Firebase-Login-Account
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDz4w8qDeBEeaGk1IiecPpNWYWavqqncYQ'
    } else {
      // This link is gotten from Firebase Auth REST API docs for POST request to
      // sign in. API Key can be grabbed from the Firebase project's gear icon.
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDz4w8qDeBEeaGk1IiecPpNWYWavqqncYQ';
    }

    fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {

      setIsLoading(false);

      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          const errorMessage = 'Authentication failed!';
          throw new Error(errorMessage);
        });
      }
    }).then(data => {
      // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));

      // React-Context-API-Login-Logout-Management
      // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
      authCtx.login(data.idToken, expirationTime.toISOString());
      navigate('/', {replace: true});
    }).catch(err =>{ 
      alert(err.message);
    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {/* React-Firebase-Create-Account */}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          {/* React-Firebase-Create-Account */}
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          {/* React-Firebase-Create-Account */}
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {/* React-Firebase-Create-Account */}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
