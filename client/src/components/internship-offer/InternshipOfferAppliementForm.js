import PropTypes from 'prop-types';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
} from '@material-ui/core';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const InternshipOfferAppliementForm = (props) => {
	const location = useLocation();

	const companyName = location.state.companyName;
	const startOfDate = location.state.startOfDate;
	const endOfDate = location.state.endOfDate;
	const dayOfInternship = location.state.dayOfInternship;


	const [values, setValues] = useState({
		companyName: companyName,
		startOfDate: startOfDate,
		endOfDate: endOfDate,
		dayOfInternship: dayOfInternship,
		content: ''
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	return (
		<form
			autoComplete="off"
			noValidate
			{...props}
		>
			<Card>
				<CardHeader
					title="Staj Talebi"
				/>
				<Divider />
				<CardContent>
					<Grid
						container
						spacing={3}
					>
						<Grid
							item
							md={6}
							xs={12}
						>
							<TextField
								fullWidth
								disabled
								label="Firma Adı"
								name="companyName"
								onChange={handleChange}
								value={values.companyName}
								variant="outlined"
							/>
						</Grid>
						<Grid
							item
							md={6}
							xs={12}
						>
							<TextField
								fullWidth
								disabled
								label="Staj Süresi"
								name="dayOfInternship"
								onChange={handleChange}
								type="number"
								value={values.dayOfInternship}
								variant="outlined"
							/>
						</Grid>
						<Grid
							item
							md={6}
							xs={12}
						>
							<TextField
								fullWidth
								disabled
								label="Başlama Tarihi"
								name="startOfDate"
								onChange={handleChange}
								value={values.startOfDate}
								variant="outlined"
							/>
						</Grid>
						<Grid
							item
							md={6}
							xs={12}
						>
							<TextField
								fullWidth
								disabled
								label="Bitirme Tarihi"
								name="endOfDate"
								onChange={handleChange}
								value={values.endOfDate}
								variant="outlined"
							/>
						</Grid>
						<Grid
							item
							md={12}
							xs={12}
						>
							<TextField
								fullWidth
								multiline
								label="Mesajınız"
								name="content"
								onChange={handleChange}
								value={values.content}
								variant="outlined"
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						p: 2
					}}
				>
					<Button
						color="primary"
						variant="contained"
					>
						Başvuru Yap
					</Button>
				</Box>
			</Card>
		</form>

	);
};

InternshipOfferAppliementForm.propTypes = {
	internshipOffers: PropTypes.array.isRequired
};

export default InternshipOfferAppliementForm;
