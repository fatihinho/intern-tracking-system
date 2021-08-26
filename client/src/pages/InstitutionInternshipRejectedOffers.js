import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import InstitutionInternshipRejectedOffersResults from '../components/institution-internship-offers/InstitutionInternshipRejectedOffersResults';

const InstitutionInternshipRejectedOffers = () => (
    <>
        <Helmet>
            <title>Staj Talepleri - Reddedilenler</title>
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
                    <InstitutionInternshipRejectedOffersResults />
                </Box>
            </Container>
        </Box>
    </>
);

export default InstitutionInternshipRejectedOffers;
