import { Helmet } from 'react-helmet';
import { Box, Container, } from '@material-ui/core';
import internDiaries from '../__mocks__/internDiaries';
import InternDiaryForm from '../components/intern-diary/InternDiaryForm';

const InternDiary = () => (
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
                    <InternDiaryForm internDiaries={internDiaries} />
                </Box>
            </Container>
        </Box>
    </>
);

export default InternDiary;
