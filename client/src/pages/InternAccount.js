import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import InternAccountProfile from '../components/account/InternAccountProfile';
import InternAccountProfileDetails from '../components/account/InternAccountProfileDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';

const InternAccount = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();

  const internId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    initSubUser();

    async function initSubUser() {
      const response = await axios.get(`/api/v1/interns/${internId}`);
      if (response.status === 200) {
        const data = response.data;
        setName(data.name);
        setSurname(data.surname);
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
              <InternAccountProfile name={name} surname={surname} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <InternAccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default InternAccount;
