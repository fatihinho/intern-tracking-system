import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import institutionInternDiaries from '../__mocks__/institutionInternDiaries';
import InstitutionInternDiariesResults from '../components/institution-intern-diaries/InstitutionInternDiariesResults';

const InstitutionInternDiaries = () => (
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
                    <InstitutionInternDiariesResults internshipOffers={institutionInternDiaries} />
                </Box>
            </Container>
        </Box>
    </>
);

export default InstitutionInternDiaries;
