import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            // Notice how the component <Form> uses an elements prop whose 
            // value is a function which returns the input fields to be used 
            // in each of the forms:
            elements={() => (
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={this.change} 
                  placeholder="Name" />
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
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
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
  // Destructure props and state. In the body of the submit function, 
  // use destructuring assignment to extract the context prop from 
  // this.props, and unpack the name, username and password properties 
  // from the state object (this.state) into distinct variables:
    const { context } = this.props;
    const {
      name,
      username,
      password,
    } = this.state;

    // New user payload
    // This user object is the new user payload that will be passed to 
    // the createUser() method.
    const user = {
      name,
      username,
      password,
    };

    // Call the createUser() method with context.data.createUser(). 
    // createUser() accepts one argument, which is the new user payload.
    // Pass the method the user object as the argument.
    context.data.createUser(user)
       // get value of returned promise and check if there are errors
      .then( errors => {
        if (errors.length) {
          // console.log(errors);
          this.setState({ errors });
        // if no errors (i.e. empty array), log message user created successfully
        } else {
          console.log(`${username} is successfully signed up and authenticated!`);
        }
      })
      .catch( err => { // handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // redirects to '/error' and renders NotFound component
      });
  }

  cancel = () => {
    this.props.history.push('/'); // redirects to 'main' public page of app
    // Essentially we are pushing the new redirected url on to the history stack.
  }
}
