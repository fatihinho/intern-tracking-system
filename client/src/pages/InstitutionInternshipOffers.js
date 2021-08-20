import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import institutionInternOffers from '../__mocks__/institutionInternOffers';
import InstitutionInternshipOffersResults from '../components/institution-internship-offers/InstitutionInternshipOffersResults';

const InstitutionInternshipOffers = () => (
    <>
        <Helmet>
            <title>Staj Talepleri</title>
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
                    <InstitutionInternshipOffersResults internshipOffers={institutionInternOffers} />
                </Box>
            </Container>
        </Box>
    </>
);

export default InstitutionInternshipOffers;
