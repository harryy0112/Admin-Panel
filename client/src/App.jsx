import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={AdminPanel} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
