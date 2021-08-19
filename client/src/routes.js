import { Navigate } from 'react-router-dom';
import InternDashboardLayout from './components/InternDashboardLayout';
import CompanyDashboardLayout from './components/CompanyDashboardLayout';
import InstitutionDashboardLayout from './components/InstitutionDashboardLayout';
import Account from './pages/Account';
import CompanyLoginPage from './pages/CompanyLoginPage';
import CustomerList from './pages/CustomerList';
import SettingsView from './pages/Settings';
import Dashboard from './pages/Dashboard';
import InstitutionLoginPage from './pages/InstitutionLoginPage';
import InternLoginPage from './pages/InternLoginPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';

const routes = [
  {
    path: 'app-intern',
    element: <InternDashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app-company',
    element: <CompanyDashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app-institution',
    element: <InstitutionDashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'login-intern', element: <InternLoginPage /> },
      { path: 'login-company', element: <CompanyLoginPage /> },
      { path: 'login-institution', element: <InstitutionLoginPage /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
