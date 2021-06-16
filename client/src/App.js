import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Public from './components/Public';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';

import withContext from './Context'; // import withContext function
// Note: when a consumer component is passed to this function, it 
// automatically receives
// ALL context changes and actions

// Connect UserSignUp to context
const UserSignUpWithContext = withContext(UserSignUp);
// Connect UserSignIn to context
const UserSignInWithContext = withContext(UserSignIn);
// Note: UserSignUp & UserSignIn are now consumer components subscribed 
// to all context changes

import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';



export default () => (
  <Router>
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={Public} />
        <Route path="/authenticated" component={Authenticated} />
        {/* When '/signin' route is requested, we render UserSignIn with context */}
        <Route path="/signin" component={UserSignInWithContext} />
        {/* When '/signup' route is requested, we render UserSignUp with context */}
        <Route path="/signup" component={UserSignUpWithContext} /> 
        <Route path="/signout" component={UserSignOut} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
