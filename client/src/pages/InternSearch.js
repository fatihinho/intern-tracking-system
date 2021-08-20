import { Helmet } from 'react-helmet';
import { Box, Container, } from '@material-ui/core';
import internDiaries from '../__mocks__/internDiaries';
import InternSearchForm from '../components/intern-search/InternSearchForm';

const InternSearch = () => (
    <>
        <Helmet>
            <title>Stajyer Arama</title>
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
                    <InternSearchForm internDiaries={internDiaries} />
                </Box>
            </Container>
        </Box>
    </>
);

export default InternSearch;
