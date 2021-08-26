import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Book as BookIcon,
  Users as UsersIcon,
  UserCheck as UserCheckIcon,
  UserMinus as UserMinusIcon,
  PlusSquare as PlusSquareIcon,
  MinusSquare as MinusSquareIcon
} from 'react-feather';
import NavItem from './NavItem';

const institutionUser = {
  avatar: '',
  jobTitle: 'Kurum',
  name: 'Erciyes Üniversitesi'
};

const institutionItems = [
  {
    href: '/app-institution/home',
    icon: HomeIcon,
    title: 'Ana Sayfa'
  },
  {
    href: '/app-institution/institution-internship-offers',
    icon: UsersIcon,
    title: 'Staj Talepleri'
  },
  {
    href: '/app-institution/institution-internship-offers/accepts',
    icon: UserCheckIcon,
    title: 'Talep Kabulleri'
  },
  {
    href: '/app-institution/institution-internship-offers/rejects',
    icon: UserMinusIcon,
    title: 'Talep Retleri'
  },
  {
    href: '/app-institution/institution-intern-diaries',
    icon: BookIcon,
    title: 'Staj Defterleri'
  },
  {
    href: '/app-institution/institution-intern-diaries/accepts',
    icon: PlusSquareIcon,
    title: 'Defter Kabulleri'
  },
  {
    href: '/app-institution/institution-intern-diaries/rejects',
    icon: MinusSquareIcon,
    title: 'Defter Retleri'
  },
  {
    href: '/app-institution/settings',
    icon: SettingsIcon,
    title: 'Ayarlar'
  }
];

const InstitutionDashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

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
          src={institutionUser.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app-institution/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {institutionUser.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {institutionUser.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {institutionItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
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

InstitutionDashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

InstitutionDashboardSidebar.defaultProps = {
  onMobileClose: () => { console.log('onMobileClose()') },
  openMobile: false
};

export default InstitutionDashboardSidebar;
