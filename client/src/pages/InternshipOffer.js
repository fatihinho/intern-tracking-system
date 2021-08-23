import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import InternshipOfferListResults from '../components/internship-offer/InternshipOfferListResults';

const InternshipOffer = () => (
  <>
    <Helmet>
      <title>Staj Talebi</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <InternshipOfferListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default InternshipOffer;
