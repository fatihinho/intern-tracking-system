import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import DashboardNavbar from './DashboardNavbar';
import CompanyDashboardSidebar from './CompanyDashboardSidebar';
import axios from 'axios';

const CompanyDashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const CompanyDashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const CompanyDashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const CompanyDashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const CompanyDashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const companyId = localStorage.getItem('currentUser-subUserId')
  useEffect(async () => {
    initSubUser();
    async function initSubUser() {
      const response = await axios.get(`/api/v1/companies/${companyId}`);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('currentUser-subUserName', data.name);
        localStorage.setItem('currentUser-subUserAddress', data.address);
        localStorage.setItem('currentUser-subUserEmail', data.email);
        localStorage.setItem('currentUser-subUserPhone', data.phone);
      }
    }
  }, []);

  return (
    <CompanyDashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <CompanyDashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <CompanyDashboardLayoutWrapper>
        <CompanyDashboardLayoutContainer>
          <CompanyDashboardLayoutContent>
            <Outlet />
          </CompanyDashboardLayoutContent>
        </CompanyDashboardLayoutContainer>
      </CompanyDashboardLayoutWrapper>
    </CompanyDashboardLayoutRoot>
  );
};

export default CompanyDashboardLayout;
