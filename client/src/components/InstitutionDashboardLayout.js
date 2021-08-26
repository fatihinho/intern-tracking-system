import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import DashboardNavbar from './DashboardNavbar';
import InstitutionDashboardSidebar from './InstitutionDashboardSidebar';
import axios from 'axios';

const InstitutionDashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const InstitutionDashboardLayoutWrapper = experimentalStyled('div')(
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

const InstitutionDashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const InstitutionDashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const InstitutionDashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const [name, setName] = useState();

  const institutionId = localStorage.getItem('currentUser-subUserId')

  useEffect(async () => {
    initSubUser();
    async function initSubUser() {
      const response = await axios.get(`/api/v1/institutions/${institutionId}`);
      if (response.status === 200) {
        const data = response.data;
        setName(data.name);
        localStorage.setItem('currentUser-subUserName', data.name);
        localStorage.setItem('currentUser-subUserAddress', data.address);
        localStorage.setItem('currentUser-subUserEmail', data.email);
        localStorage.setItem('currentUser-subUserPhone', data.phone);
      }
    }
  }, []);

  return (
    <InstitutionDashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <InstitutionDashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        name={name}
      />
      <InstitutionDashboardLayoutWrapper>
        <InstitutionDashboardLayoutContainer>
          <InstitutionDashboardLayoutContent>
            <Outlet />
          </InstitutionDashboardLayoutContent>
        </InstitutionDashboardLayoutContainer>
      </InstitutionDashboardLayoutWrapper>
    </InstitutionDashboardLayoutRoot>
  );
};

export default InstitutionDashboardLayout;
