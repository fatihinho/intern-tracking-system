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
import { toast } from 'react-toastify';

const InstitutionInternDiariesDetailForm = (props) => {
    const location = useLocation();

    const navigate = useNavigate();

    const id = location.state.id;
    const name = location.state.name;
    const surname = location.state.surname;
    const dayOfInternship = location.state.dayOfInternship;
    const content = location.state.content;
    const isAccepted = location.state.isAccepted;
    const isRejected = location.state.isRejected;


    const [values, setValues] = useState({
        name: name,
        surname: surname,
        dayOfInternship: dayOfInternship,
        content: content,
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const onClickAcceptDiary = () => {
        axios.put(`/api/v1/interns/diaries/accept/${id}`)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Staj Defteri Kabul Edildi!')
                }
            }).then(() => {
                navigate('/app-institution/institution-intern-diaries', { replace: true });
            }).catch(error => {
                toast.error('Staj Defterini Kabul Ederken Bir Sorun Oluştu!')
            })
    }

    const onClickRejectDiary = () => {
        axios.put(`/api/v1/interns/diaries/reject/${id}`)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Staj Defteri Reddedildi!')
                }
            }).then(() => {
                navigate('/app-institution/institution-intern-diaries', { replace: true });
            }).catch(error => {
                toast.error('Staj Defterini Reddederken Bir Sorun Oluştu!')
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
                    title="Staj Defterleri"
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
                                name="name"
                                onChange={handleChange}
                                value={`${values.name} ${values.surname}`}
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
                                label="Staj Günü"
                                name="endOfDate"
                                onChange={handleChange}
                                value={values.dayOfInternship}
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
                                label="Yapılan İşler"
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
                        disabled={!isAccepted && isRejected}
                        onClick={onClickRejectDiary}
                        style={{ marginRight: "8px" }}
                        color='secondary'
                        variant="contained"
                    >
                        Reddet
                    </Button>
                    <Button
                        disabled={isAccepted && !isRejected}
                        onClick={onClickAcceptDiary}
                        variant="contained"
                        color='primary'
                    >
                        Kabul Et
                    </Button>
                </Box>
            </Card>
        </form>

    );
};

export default InstitutionInternDiariesDetailForm;
