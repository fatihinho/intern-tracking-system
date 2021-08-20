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
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const InternSearchForm = (props) => {
    const location = useLocation();

    /* const companyName = location.state.companyName;
     const startOfDate = location.state.startOfDate;
     const endOfDate = location.state.endOfDate;
     const dayOfInternship = location.state.dayOfInternship;*/


    const [values, setValues] = useState({
        companyName: 'Türksat A.Ş.',
        startOfDate: '28/06/2021',
        endOfDate: '12/08/2021',
        dayOfInternship: '24',
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
                                name="startOfDate"
                                type="date"
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
                            <Typography variant="body2">Bitirme Tarihi</Typography>
                            <TextField
                                fullWidth
                                name="endOfDate"
                                type="date"
                                onChange={handleChange}
                                value={values.endOfDate}
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
                        style={{ backgroundColor: "#F33D3D", marginRight: "8px" }}
                        variant="contained"
                    >
                        Aramayı Durdur
                    </Button>
                    <Button
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
