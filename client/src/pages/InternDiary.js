import { Helmet } from 'react-helmet';
import { Box, Container, } from '@material-ui/core';
import internDiaries from '../__mocks__/internDiaries';
import InternDiaryForm from '../components/intern-diary/InternDiaryForm';
import InternDiaryEmpty from '../components/intern-diary/InternDiaryEmpty';

const InternDiary = () => {
    const internOfferAccepted = localStorage.getItem('internDiary-companyName') !== null;

    return (
        <>
            <Helmet>
                <title>Staj Defteri</title>
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
                        {internOfferAccepted ? <InternDiaryForm internDiaries={internDiaries} /> : <InternDiaryEmpty />}
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default InternDiary;
