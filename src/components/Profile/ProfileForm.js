// React-Firebase-Change-Password

// React-Context-API-Login-Logout-Management
import { useRef, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

// React-Context-API-Login-Logout-Management
import AuthContext from '../../store/auth-context';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const navigate = useNavigate();

  const newPasswordInputRef = useRef();

  // React-Context-API-Login-Logout-Management
  const authCtx = useContext(AuthContext);

  const submitHandler = event => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDz4w8qDeBEeaGk1IiecPpNWYWavqqncYQ';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // assumption: Always succeeds!

      navigate('/', {replace: true});
    });

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
