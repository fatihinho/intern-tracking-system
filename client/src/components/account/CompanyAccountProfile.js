import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyAccountProfile = ({ props }) => {
  const [subUser, setSubUser] = useState([]);

  const companyId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    initSubUser();

    async function initSubUser() {
      const response = await axios.get(`/api/v1/companies/${companyId}`);
      if (response.status === 200) {
        const data = response.data;
        setSubUser(data);
      }
    }
  }, [subUser]);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={''}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {subUser.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Fotoğraf Yükle
        </Button>
      </CardActions>
    </Card>
  );
}

export default CompanyAccountProfile;
