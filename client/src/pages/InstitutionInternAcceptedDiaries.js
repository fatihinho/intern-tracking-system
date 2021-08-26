import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import InstitutionInternAcceptedDiariesResults from '../components/institution-intern-diaries/InstitutionInternAcceptedDiariesResults';

const InstitutionInternAcceptedDiaries = () => (
    <>
        <Helmet>
            <title>Staj Defterleri - Kabul Edilenler</title>
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
                    <InstitutionInternAcceptedDiariesResults />
                </Box>
            </Container>
        </Box>
    </>
);

export default InstitutionInternAcceptedDiaries;
