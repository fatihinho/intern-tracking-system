import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import companyInternOffers from '../__mocks__/companyInternOffers';
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
                    <CompanyInternshipOffersResults internshipOffers={companyInternOffers} />
                </Box>
            </Container>
        </Box>
    </>
);

export default CompanyInternshipOffers;
