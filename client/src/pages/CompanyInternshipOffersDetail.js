import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CompanyInternshipOffersDetailForm from '../components/company-internship-offers/CompanyInternshipOffersDetailForm';

const CompanyInternshipOffersDetail = () => (
    <>
        <Helmet>
            <title>Staj Talepleri Başvurusu</title>
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
                    <CompanyInternshipOffersDetailForm />
                </Box>
            </Container>
        </Box>
    </>
);

export default CompanyInternshipOffersDetail;
