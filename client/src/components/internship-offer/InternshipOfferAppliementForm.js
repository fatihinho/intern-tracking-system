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
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InternshipOfferAppliementForm = (props) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [contentError, setContentError] = useState(false);

	const companyId = location.state.companyId;
	const companyName = location.state.companyName;
	const startDate = location.state.startDate;
	const endDate = location.state.endDate;
	const dayOfInternship = location.state.dayOfInternship;

	const internId = localStorage.getItem('currentUser-subUserId');

	const [values, setValues] = useState({
		companyName: companyName,
		startDate: startDate,
		endDate: endDate,
		dayOfInternship: dayOfInternship,
		content: ''
	});

	const onClickApplyOffer = () => {
		if (values.content.length > 0) {
			axios.post('/api/v1/company-offers', {
				offerMessage: values.content,
				internId: internId,
				companyId: companyId
			})
				.then(function (response) {
					if (response.status === 201) {
						window.alert('Başvuru Gönderildi!');
					}
				})
				.then(() => {
					navigate('/app-intern/internship-offer', { replace: true });
				})
				.catch(function (error) {
					window.alert('Başvuru Gönderilirken Bir Sorun Oluştu!');
				});
		} else {
			if (values.content.length <= 0) {
				setContentError(true);
				setTimeout(() => {
					setContentError(false);
				}, 1500);
			}
		}
	}

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
								label="Başlama Tarihi"
								name="startDate"
								onChange={handleChange}
								value={values.startDate}
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
								label="Bitirme Tarihi"
								name="endDate"
								onChange={handleChange}
								value={values.endDate}
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
								required
								label="Mesajınız"
								name="content"
								onChange={handleChange}
								value={values.content}
								variant="outlined"
								error={contentError}
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
						onClick={onClickApplyOffer}
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

export default InternshipOfferAppliementForm;
