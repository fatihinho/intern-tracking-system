import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CompanyInternshipAddUnitForm from '../components/company-internship-offers/CompanyInternshipAddUnitForm';

const CompanyInternshipAddUnit = () => (
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
                    <CompanyInternshipAddUnitForm />
                </Box>
            </Container>
        </Box>
    </>
);

export default CompanyInternshipAddUnit;
