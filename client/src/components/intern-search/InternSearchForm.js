import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

const InternSearchForm = (props) => {
    const companyId = localStorage.getItem('currentUser-subUserId');
    const companyName = localStorage.getItem('companyName');

    const [didStartSearching, setDidStartSearching] = useState(false);

    const [values, setValues] = useState({
        companyName: companyName,
        startDate: '',
        endDate: '',
        dayOfInternship: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const onClickStopSearch = () => {
        axios.delete(`/api/v1/intern-searches/${companyId}`)
            .then(response => {
                if (response.status === 200) {
                    window.alert('Arama Durduruldu!');
                }
            })
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                window.alert('Arama Durdurulurken Bir Sorun Oluştu!');
            });
    }

    const onClickStartSearch = () => {
        axios.post('/api/v1/intern-searches', {
            dayOfInternship: values.dayOfInternship,
            startDate: values.startDate,
            endDate: values.endDate,
            companyId: companyId
        })
            .then(response => {
                if (response.status === 201) {
                    window.alert('Arama Başlatıldı!');
                }
            })
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                window.alert('Arama Başlatılırken Bir Sorun Oluştu!');
            });
    }

    useEffect(() => {
        didStartSearching();
        function didStartSearching() {
            axios.get(`/api/v1/intern-searches/company/${companyId}`)
                .then(response => {
                    if (response.status === 200) {
                        setDidStartSearching(true);
                    }
                })
                .catch(error => {
                    setDidStartSearching(false);
                })
        }
    })

    return (
        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <CardHeader
                    title="Stajyer Arama"
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
                                required
                                label="Çalışma Süresi"
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
                            <Typography variant="body2">Başlama Tarihi</Typography>
                            <TextField
                                fullWidth
                                required
                                name="startDate"
                                type="date"
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
                            <Typography variant="body2">Bitirme Tarihi</Typography>
                            <TextField
                                fullWidth
                                required
                                name="endDate"
                                type="date"
                                onChange={handleChange}
                                value={values.endDate}
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
                        disabled={!didStartSearching}
                        onClick={onClickStopSearch}
                        style={{ backgroundColor: "#F33D3D", marginRight: "8px" }}
                        variant="contained"
                    >
                        Aramayı Durdur
                    </Button>
                    <Button
                        disabled={didStartSearching}
                        onClick={onClickStartSearch}
                        style={{ backgroundColor: "#70D987" }}
                        variant="contained"
                    >
                        Aramayı Başlat
                    </Button>
                </Box>
            </Card>
        </form>

    );
};

export default InternSearchForm;
