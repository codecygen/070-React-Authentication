// React-Firebase-Create-Account
import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  // React-Firebase-Create-Account
  const emailInputRef = useRef();
  // React-Firebase-Create-Account
  const passwordInputRef = useRef();

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
      console.log(data);
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
