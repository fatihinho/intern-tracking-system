import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Typography
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Users as UsersIcon,
  UserPlus as UserPlusIcon,
  UserCheck as UserCheckIcon,
  UserMinus as UserMinusIcons,
} from 'react-feather';
import NavItem from './NavItem';
import axios from 'axios';

const companyUser = {
  avatar: '',
  jobTitle: 'Firma',
  name: 'Türksat A.Ş.'
};

const home = [
  {
    href: '/app-company/home',
    icon: HomeIcon,
    title: 'Ana Sayfa'
  }
];

const internSearch = [
  {
    href: '/app-company/intern-search',
    icon: UserPlusIcon,
    title: 'Stajyer Arama'
  }
];

const internshipOffers = [
  {
    href: '/app-company/company-internship-offers',
    icon: UsersIcon,
    title: 'Staj Talepleri'
  }
];
const subInternshipOffers = [
  {
    href: '/app-company/company-internship-offers/accepts',
    icon: UserCheckIcon,
    title: 'Talep Kabulleri'
  },
  {
    href: '/app-company/company-internship-offers/rejects',
    icon: UserMinusIcons,
    title: 'Talep Retleri'
  }
];

const settings = [
  {
    href: '/app-company/settings',
    icon: SettingsIcon,
    title: 'Ayarlar'
  }
];

const CompanyDashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const [subUser, setSubUser] = useState([]);

  const companyId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }

    initSubUser();

    async function initSubUser() {
      const response = await axios.get(`/api/v1/companies/${companyId}`);
      if (response.status === 200) {
        const data = response.data;
        setSubUser(data);
      }
    }
  }, [location.pathname, subUser]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={companyUser.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app-company/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {subUser.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Firma
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <div>
          {home.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
        <div>
          {internSearch.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
        <div>
          {internshipOffers.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
        <div style={{ marginLeft: '16px' }}>
          {subInternshipOffers.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
        <div>
          {settings.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

CompanyDashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

CompanyDashboardSidebar.defaultProps = {
  onMobileClose: () => { console.log('onMobileClose()') },
  openMobile: false
};

export default CompanyDashboardSidebar;
