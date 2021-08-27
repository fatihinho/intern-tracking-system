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
  Book as BookIcon,
  User as UserIcon,
} from 'react-feather';
import NavItem from './NavItem';
import axios from 'axios';


const home = [
  {
    href: '/app-intern/home',
    icon: HomeIcon,
    title: 'Ana Sayfa'
  }
];
const internshipOffer = [
  {
    href: '/app-intern/internship-offer',
    icon: UserIcon,
    title: 'Staj Talebi'
  }
];
const internDiary = [
  {
    href: '/app-intern/intern-diary',
    icon: BookIcon,
    title: 'Staj Defteri'
  }
];
const settings = [
  {
    href: '/app-intern/settings',
    icon: SettingsIcon,
    title: 'Ayarlar'
  }
];

const InternDashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const [subUser, setSubUser] = useState([]);

  const internId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }

    initSubUser();

    async function initSubUser() {
      const response = await axios.get(`/api/v1/interns/${internId}`);
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
          src={''}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app-intern/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {subUser.name} {subUser.surname}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Stajyer
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
          {internshipOffer.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
        <div>
          {internDiary.map((item) => (
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

InternDashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

InternDashboardSidebar.defaultProps = {
  onMobileClose: () => { console.log('onMobileClose()') },
  openMobile: false
};

export default InternDashboardSidebar;
