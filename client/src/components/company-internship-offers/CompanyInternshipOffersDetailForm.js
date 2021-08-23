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
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CompanyInternshipOffersDetailForm = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state.id;
    const internName = location.state.internName;
    const internSurname = location.state.internSurname;
    const startDate = location.state.startDate;
    const endDate = location.state.endDate;
    const offerDate = location.state.offerDate;
    const offerMessage = location.state.offerMessage;

    const [values, setValues] = useState({
        internName: internName,
        internSurname: internSurname,
        startDate: startDate,
        endDate: endDate,
        offerDate: offerDate,
        offerMessage: offerMessage
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const onClickAcceptOffer = () => {
        axios.put(`/api/v1/company-offers/accept/${id}`)
            .then(response => {
                if (response.status === 200) {
                    window.alert('Staj Teklifi Kabul Edildi!')
                }
            }).then(() => {
                navigate('/app-company/company-internship-offers', { replace: true });
            }).catch(error => {
                window.alert('Staj Teklifini Kabul Ederken Bir Sorun Oluştu!')
            })
    }

    const onClickRejectOffer = () => {
        axios.put(`/api/v1/company-offers/reject/${id}`)
            .then(response => {
                if (response.status === 200) {
                    window.alert('Staj Teklifi Reddedildi!')
                }
            }).then(() => {
                navigate('/app-company/company-internship-offers', { replace: true });
            }).catch(error => {
                window.alert('Staj Teklifini Reddederken Bir Sorun Oluştu!')
            })
    }

    return (
        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <CardHeader
                    title="Staj Talepleri"
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
                                label="Öğrenci Adı"
                                name="internName"
                                onChange={handleChange}
                                value={`${values.internName} ${values.internSurname}`}
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
                                value={moment(values.startDate).format('DD/MM/YYYY')}
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
                                label="Başvurma Tarihi"
                                name="offerDate"
                                onChange={handleChange}
                                value={moment(values.offerDate).format('DD/MM/YYYY')}
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
                                value={moment(values.endDate).format('DD/MM/YYYY')}
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
                                disabled
                                multiline
                                label="Mesaj"
                                name="offerMessage"
                                onChange={handleChange}
                                value={values.offerMessage}
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
                        onClick={onClickRejectOffer}
                        style={{ backgroundColor: "#F33D3D", marginRight: "8px" }}
                        variant="contained"
                    >
                        Reddet
                    </Button>
                    <Button
                        onClick={onClickAcceptOffer}
                        style={{ backgroundColor: "#70D987" }}
                        variant="contained"
                    >
                        Kabul Et
                    </Button>
                </Box>
            </Card>
        </form>

    );
};

export default CompanyInternshipOffersDetailForm;
