import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import InstitutionInternRejectedDiariesResults from '../components/institution-intern-diaries/InstitutionInternRejectedDiariesResults';

const InstitutionInternRejectedDiaries = () => (
    <>
        <Helmet>
            <title>Staj Defterleri - Reddedilenler</title>
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
                    <InstitutionInternRejectedDiariesResults />
                </Box>
            </Container>
        </Box>
    </>
);

export default InstitutionInternRejectedDiaries;
