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

const CompanyInternshipOffersDetailForm = (props) => {
    const location = useLocation();

    const internName = location.state.internName;
    const startOfDate = location.state.startOfDate;
    const endOfDate = location.state.endOfDate;
    const offerDate = location.state.offerDate;
    const content = location.state.content;


    const [values, setValues] = useState({
        internName: internName,
        startOfDate: startOfDate,
        endOfDate: endOfDate,
        offerDate: offerDate,
        content: content
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
                                value={values.internName}
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
                                label="Başvurma Tarihi"
                                name="offerDate"
                                onChange={handleChange}
                                value={values.offerDate}
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
                                disabled
                                multiline
                                label="Mesaj"
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
                        style={{ backgroundColor: "#F33D3D", marginRight: "8px" }}
                        variant="contained"
                    >
                        Reddet
                    </Button>
                    <Button
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
