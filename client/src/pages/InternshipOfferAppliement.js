import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import companies from '../__mocks__/companies';
import InternshipOfferAppliementForm from '../components/internship-offer/InternshipOfferAppliementForm';

const InternshipOfferAppliement = () => (
	<>
		<Helmet>
			<title>Staj Talep Başvurusu</title>
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
					<InternshipOfferAppliementForm internshipOffers={companies} />
				</Box>
			</Container>
		</Box>
	</>
);

export default InternshipOfferAppliement;
