import { Navigate } from 'react-router-dom';
import InternDashboardLayout from './components/InternDashboardLayout';
import CompanyDashboardLayout from './components/CompanyDashboardLayout';
import InstitutionDashboardLayout from './components/InstitutionDashboardLayout';
import InternAccount from './pages/InternAccount';
import CompanyAccount from './pages/CompanyAccount';
import InstitutionAccount from './pages/InstitutionAccount';
import CompanyLoginPage from './pages/CompanyLogin';
import InternshipOfferList from './pages/InternshipOffer';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import InstitutionLoginPage from './pages/InstitutionLogin';
import InternLoginPage from './pages/InternLogin';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import InternshipOfferAppliement from './pages/InternshipOfferAppliement';
import InternDiary from './pages/InternDiary';
import InstitutionInternAcceptedDiaries from './pages/InstitutionInternAcceptedDiaries';
import InstitutionInternRejectedDiaries from './pages/InstitutionInternRejectedDiaries';
import InternSearch from './pages/InternSearch';
import CompanyInternshipOffers from './pages/CompanyInternshipOffers';
import CompanyInternshipAcceptedOffers from './pages/CompanyInternshipAcceptedOffers';
import CompanyInternshipRejectedOffers from './pages/CompanyInternshipRejectedOffers';
import InstitutionInternshipAcceptedOffers from './pages/InstitutionInternshipAcceptedOffers';
import InstitutionInternshipRejectedOffers from './pages/InstitutionInternshipRejectedOffers';
import CompanyInternshipOffersDetail from './pages/CompanyInternshipOffersDetail';
import InstitutionInternshipOffers from './pages/InstitutionInternshipOffers';
import InstitutionInternDiaries from './pages/InstitutionInternDiaries';
import InstitutionInternDiariesDetailForm from './components/institution-intern-diaries/InstitutionInternDiariesDetailForm';
import CompanyInternshipAddUnit from './pages/CompanyInternshipAddUnit';

const isAnyAuth = localStorage.getItem('currentUser-subUserType') !== null;
const isAuthIntern = localStorage.getItem('currentUser-subUserType') === 'INTERN';
const isAuthCompany = localStorage.getItem('currentUser-subUserType') === 'COMPANY';
const isAuthInstitution = localStorage.getItem('currentUser-subUserType') === 'INSTITUTION';

const routes = [
  {
    path: `${isAuthIntern ? "app-intern" : "#"}`,
    element: <InternDashboardLayout />,
    children: [
      { path: 'account', element: <InternAccount /> },
      { path: 'internship-offer', element: <InternshipOfferList /> },
      { path: 'internship-offer/:id/appliement', element: <InternshipOfferAppliement /> },
      { path: 'intern-diary', element: <InternDiary /> },
      { path: 'home', element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: `${isAuthCompany ? "app-company" : "#"}`,
    element: <CompanyDashboardLayout />,
    children: [
      { path: 'account', element: <CompanyAccount /> },
      { path: 'intern-search', element: <InternSearch /> },
      { path: 'company-internship-offers', element: <CompanyInternshipOffers /> },
      { path: 'company-internship-offers/:id/detail', element: <CompanyInternshipOffersDetail /> },
      { path: 'company-internship-offers/accepts', element: <CompanyInternshipAcceptedOffers /> },
      { path: 'company-internship-offers/rejects', element: <CompanyInternshipRejectedOffers /> },
      { path: 'company-internship-offers/accepts/:internId/add-unit', element: <CompanyInternshipAddUnit /> },
      { path: 'home', element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: `${isAuthInstitution ? "app-institution" : "#"}`,
    element: <InstitutionDashboardLayout />,
    children: [
      { path: 'account', element: <InstitutionAccount /> },
      { path: 'institution-internship-offers', element: <InstitutionInternshipOffers /> },
      { path: 'institution-intern-diaries', element: <InstitutionInternDiaries /> },
      { path: 'institution-intern-diaries/accepts', element: <InstitutionInternAcceptedDiaries /> },
      { path: 'institution-intern-diaries/rejects', element: <InstitutionInternRejectedDiaries /> },
      { path: 'institution-intern-diaries/:id/detail', element: <InstitutionInternDiariesDetailForm /> },
      { path: 'institution-internship-offers/accepts', element: <InstitutionInternshipAcceptedOffers /> },
      { path: 'institution-internship-offers/rejects', element: <InstitutionInternshipRejectedOffers /> },
      { path: 'home', element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: 'login', element: isAnyAuth ? (isAuthIntern ? <InternDashboardLayout /> : (isAuthCompany ? <CompanyDashboardLayout /> : <InstitutionDashboardLayout />)) : <LoginPage /> },
      { path: 'login-intern', element: <InternLoginPage /> },
      { path: 'login-company', element: <CompanyLoginPage /> },
      { path: 'login-institution', element: <InstitutionLoginPage /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
