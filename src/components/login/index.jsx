import React, {useState} from 'react'
import firebase from 'firebase';
import PropTypes from 'prop-types'
import styles from './styles.css'
import { useHistory } from "react-router-dom";

const propTypes = {
  onAuth: PropTypes.func.isRequired
}

const Login = ({ onAuth }) => {
  const [inputs, setInputs] = useState({email:'', password: ''});
  let history = useHistory();

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  const handleEmailLogin = (e) => {
  
      e.preventDefault();
  
      firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password)
        .then(result => {
            console.log(`Login success ${result}`);
            history.push("/");
        })
        .catch(error =>{
            console.log(`Error: ${error}`);
        });
      
  }

  return (
    <div className={styles.root}>
      <p className={styles.text}>
        Welcome to Sustain-ice, a Sustainbility innovation news share space
      </p>
      <p>
        {JSON.stringify(inputs)}
      </p>
      <div className="panel-body">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <form id="login-form" onSubmit={handleEmailLogin} role="form">
              <div className="form-group">
                <input 
                  type="text" 
                  name="email" 
                  id="email" 
                  tabIndex="1" 
                  className="form-control" 
                  placeholder="Email"
                  value={inputs.email} 
                  onChange={handleInputChange}
                  />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  tabIndex="2" 
                  className="form-control" 
                  placeholder="Password"
                  value={inputs.password} 
                  onChange={handleInputChange}
                  />
              </div>
              <div className="form-group text-center">
                <input type="checkbox" tabIndex="3" className="" name="remember" id="remember" />
                <label htmlFor="remember"> Remember Me</label>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-sm-offset-3">
                    <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="text-center">
                      <a href="https://phpoll.com/recover" tabIndex="5" className="forgot-password">Forgot Password?</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form id="register-form" action="https://phpoll.com/register/process" method="post" role="form">
              <div className="form-group">
                <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" />
              </div>
              <div className="form-group">
                <input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" />
              </div>
              <div className="form-group">
                <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
              </div>
              <div className="form-group">
                <input type="password" name="confirm-password" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password" />
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-sm-offset-3">
                    <input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
		  </div>
	
      <button
        onClick={onAuth}
        className={styles.button}
      >
        <span className='fa fa-facebook'></span> Login on Facebook
      </button>
    </div>
  )
}

Login.propTypes = propTypes

export default Login
