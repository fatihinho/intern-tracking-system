import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import DashboardNavbar from './DashboardNavbar';
import InternDashboardSidebar from './InternDashboardSidebar';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';


const InternDashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const InternDashboardLayoutWrapper = experimentalStyled('div')(
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

const InternDashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const InternDashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const InternDashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const internId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    initInternDiaryForm();

    async function initInternDiaryForm() {
      const response = await axios.get(`/api/v1/company-interns/intern/${internId}`);
      if (response.status === 200) {
        const companyIntern = response.data[0];
        const companyId = companyIntern.company.id;

        const response2 = await axios.get(`/api/v1/companies/${companyId}`);
        if (response2.status === 200) {
          const companyName = response2.data.name;
          localStorage.setItem('internDiary-companyName', companyName);

          const startDate = moment(companyIntern.startDate).format("DD/MM/YYYY");
          const endDate = moment(companyIntern.endDate).format("DD/MM/YYYY");
          localStorage.setItem('internDiary-startDate', startDate);
          localStorage.setItem('internDiary-endDate', endDate);
        }
      }
    }
  }, []);

  return (
    <InternDashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <InternDashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <InternDashboardLayoutWrapper>
        <InternDashboardLayoutContainer>
          <InternDashboardLayoutContent>
            <Outlet />
          </InternDashboardLayoutContent>
        </InternDashboardLayoutContainer>
      </InternDashboardLayoutWrapper>
    </InternDashboardLayoutRoot>
  );
};

export default InternDashboardLayout;
