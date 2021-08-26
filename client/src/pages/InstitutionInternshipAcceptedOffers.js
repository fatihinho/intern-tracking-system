import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import InstitutionInternshipAcceptedOffersResults from '../components/institution-internship-offers/InstitutionInternshipAcceptedOffersResults';

const InstitutionInternshipAcceptedOffers = () => (
    <>
        <Helmet>
            <title>Staj Talepleri - Kabul Edilenler</title>
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
                    <InstitutionInternshipAcceptedOffersResults />
                </Box>
            </Container>
        </Box>
    </>
);

export default InstitutionInternshipAcceptedOffers;
