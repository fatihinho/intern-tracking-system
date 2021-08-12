import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import InternLoginPage from './pages/InternLoginPage';
import CompanyLoginPage from './pages/CompanyLoginPage';
import InstitutionLoginPage from './pages/InstitutionLoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" exact={true} component={LoginPage} />
          <Route path="/login-intern" exact={true} component={InternLoginPage} />
          <Route path="/login-company" exact={true} component={CompanyLoginPage} />
          <Route path="/login-institution" exact={true} component={InstitutionLoginPage} />
          <Route path="/home" exact={true} component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
