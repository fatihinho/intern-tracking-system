import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CompanyInternshipRejectedOffersResults from '../components/company-internship-offers/CompanyInternshipRejectedOffersResults';

const CompanyInternshipRejectedOffers = () => (
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
                    <CompanyInternshipRejectedOffersResults />
                </Box>
            </Container>
        </Box>
    </>
);

export default CompanyInternshipRejectedOffers;
