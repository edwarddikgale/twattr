import React, {useState, Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import styles from './styles.css';

const propTypes = {
  //onAuth: PropTypes.func.isRequired
}

const Signup = ({ onAuth }) => {
  const [inputs, setInputs] = useState({email:'', password: ''});

  const handleSignup = (e) => {

    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password)
        .then(result => {
            console.log(`Signup success ${result}`);
        })
        .catch(error =>{
            console.log(`Error: ${error}`);
        })
    };

    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    return (
        <form onSubmit={handleSignup}>
            <h3>Sign In :</h3>

            <div className="col-md-4 col-md-offset-4">

              <div className="form-group">
                  <label>Email address</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    placeholder="Enter email" 
                    value={inputs.email}
                    onChange={handleInputChange} />
              </div>

              <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password"
                    className="form-control" 
                    placeholder="Enter password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    />
              </div>

              <div className="form-group">
                  <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                      <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                  </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Submit</button>
              <p className="forgot-password text-right">
                  Forgot <a href="#">password?</a>
              </p>

            </div>
        </form>
    );
}


Signup.propTypes = propTypes

export default Signup;
