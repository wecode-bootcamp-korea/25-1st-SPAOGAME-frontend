import React from 'react';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

class Routes extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <Router>
          <Switch>
            <Route path="/Main" component={Main} />
            <Route exact path="/users/login" component={Login} />
          </Switch>
        </Router>
        <Footer />
      </>
    );
  }
}

export default Routes;
