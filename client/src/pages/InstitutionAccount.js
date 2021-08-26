import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import InstitutionAccountProfile from '../components/account/InstitutionAccountProfile';
import InstitutionAccountProfileDetails from '../components/account/InstitutionAccountProfileDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';

const InstitutionAccount = () => {
  const [name, setName] = useState();

  const institutionId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    initSubUser();

    async function initSubUser() {
      const response = await axios.get(`/api/v1/institutions/${institutionId}`);
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
              <InstitutionAccountProfile name={name} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <InstitutionAccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default InstitutionAccount;
