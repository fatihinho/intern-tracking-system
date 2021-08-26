import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import CompanyAccountProfile from '../components/account/CompanyAccountProfile';
import CompanyAccountProfileDetails from '../components/account/CompanyAccountProfileDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyAccount = () => {
  const [name, setName] = useState();

  const companyId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    initSubUser();

    async function initSubUser() {
      const response = await axios.get(`/api/v1/companies/${companyId}`);
      if (response.status === 200) {
        const data = response.data;
        setName(data.name);
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Profil</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <CompanyAccountProfile name={name} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <CompanyAccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default CompanyAccount;
