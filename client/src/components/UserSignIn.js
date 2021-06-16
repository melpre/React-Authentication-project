import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    // extract context prop using destructuring 
    const { context } = this.props;
    // unpack username and password properties from state object
    const { username, password } = this.state;
    // call signIn function which was assigned to the actions property in
    // Context.js
    context.actions.signIn(username, password) //signIn() accepts 2 params
      .then((user) => { // user is param that contains username and password
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          // If user is NOT null, redirect user to '/authenticated' route
          this.props.history.push('/authenticated');
          console.log(`SUCCESS! ${username} is now signed in!`);
        }
      })
      // Just as in UserSignUp component, chain catch() method to handle
      // rejected promises.
      // Use history and push methods to redirect user to '/error' to let
      // them know something went wrong. Essentially we are pushing the new
      // redirected url on to the history stack.
      .catch( err => {
        console.log(err);
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    this.props.history.push('/'); // redirects to 'main' public page of app
    // Essentially we are pushing the new redirected url on to the history stack.
  }
}
