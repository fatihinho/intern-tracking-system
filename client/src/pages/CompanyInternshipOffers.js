import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CompanyInternshipOffersResults from '../components/company-internship-offers/CompanyInternshipOffersResults';

const CompanyInternshipOffers = () => (
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
                    <CompanyInternshipOffersResults />
                </Box>
            </Container>
        </Box>
    </>
);

export default CompanyInternshipOffers;
