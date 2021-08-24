import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CompanyInternshipAcceptedOffersResults from '../components/company-internship-offers/CompanyInternshipAcceptedOffersResults';

const CompanyInternshipAcceptedOffers = () => (
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
                    <CompanyInternshipAcceptedOffersResults />
                </Box>
            </Container>
        </Box>
    </>
);

export default CompanyInternshipAcceptedOffers;
