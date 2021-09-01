import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider
} from '@material-ui/core';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Ana Sayfa</title>
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
          <Card>
            <CardHeader
              title="Duyurular"
            />
            <Divider />
          </Card>
        </Box>
      </Container>
    </Box>
  </>
);

export default Dashboard;
