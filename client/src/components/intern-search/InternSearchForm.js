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
import { toast } from 'react-toastify'

const InternSearchForm = (props) => {
    const companyId = localStorage.getItem('currentUser-subUserId');
    const companyName = localStorage.getItem('currentUser-subUserName');

    const [didStartSearching, setDidStartSearching] = useState(false);

    const [dayOfInternshipError, setDayOfInternshipError] = useState(false);
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

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
                    toast.success('Arama Durduruldu!');
                    setDidStartSearching(false);
                }
            })
            .catch(error => {
                toast.error('Arama Durdurulurken Bir Sorun Oluştu!');
            });
    }

    const onClickStartSearch = () => {
        if (values.dayOfInternship.trim().length > 0 && values.startDate.trim().length > 0 && values.endDate.trim().length > 0) {
            axios.post('/api/v1/intern-searches', {
                dayOfInternship: values.dayOfInternship,
                startDate: values.startDate,
                endDate: values.endDate,
                companyId: companyId
            })
                .then(response => {
                    if (response.status === 201) {
                        toast.success('Arama Başlatıldı!');
                        setDidStartSearching(true);
                    }
                })
                .catch(error => {
                    toast.error('Arama Başlatılırken Bir Sorun Oluştu!');
                });
        } else {
            if (values.dayOfInternship.trim().length <= 0) {
                setDayOfInternshipError(true);
                setTimeout(() => {
                    setDayOfInternshipError(false);
                }, 1500);
            }
            if (values.startDate.trim().length <= 0) {
                setStartDateError(true);
                setTimeout(() => {
                    setStartDateError(false);
                }, 1500);
            }
            if (values.endDate.trim().length <= 0) {
                setEndDateError(true);
                setTimeout(() => {
                    setEndDateError(false);
                }, 1500);
            }
        }
    }

    useEffect(() => {
        getDidStartSearching();
        function getDidStartSearching() {
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
    }, [])

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
                                error={dayOfInternshipError}
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
                                error={startDateError}
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
                                error={endDateError}
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
                        style={{ marginRight: "8px" }}
                        color='secondary'
                        variant="contained"
                    >
                        Aramayı Durdur
                    </Button>
                    <Button
                        disabled={didStartSearching}
                        onClick={onClickStartSearch}
                        variant="contained"
                        color='primary'
                    >
                        Aramayı Başlat
                    </Button>
                </Box>
            </Card>
        </form>

    );
};

export default InternSearchForm;
