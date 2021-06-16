import React, { Component } from 'react';
import Data from './Data'; // import Data.js containing helper class

const Context = React.createContext();

export class Provider extends Component {

  // initialize new instance of Data class
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    // initialize variable 'value' to an obj containing a data property
    // set to this.data

    // initialize an actions object which will hold event handlers or actions
    // you want to perform on data that's passed down through context
    const value = {
      data: this.data,
      actions: { // add the 'actions' property and object
        signIn: this.signIn
      }
    };

    // The Provider class in the file Context.js is a "higher-order 
    // component" that returns a Provider component which provides the 
    // application state and any actions or event handlers that need to be 
    // shared between components, via a required value prop.
    return (
      // pass 'value' object to context Provider to be shared 
      // throughout component tree
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // The signIn function is an asynchronous function that takes a username and password as 
  // arguments. signIn uses those credentials to call the getUser() method in Data.js, 
  // which makes a GET request to the protected /users route on the server and returns the 
  // user data.
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    return user;
  }

  signOut = () => {

  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * withContext automatically subscribes the component passed to it all
 * actions and context changes.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

