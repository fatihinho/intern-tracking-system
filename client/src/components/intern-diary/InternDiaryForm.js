import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import getInitials from '../../utils/getInitials';
import { useEffect, useState } from 'react';
import axios from 'axios';

const InternDiaryForm = ({ props, ...rest }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const [dayOfInternshipError, setDayOfInternshipError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const [clickedRowId, setClickedRowId] = useState(null);

    const [internDiaries, setInternDiaries] = useState();

    const companyName = localStorage.getItem('internDiary-companyName');
    const startDate = localStorage.getItem('internDiary-startDate');
    const endDate = localStorage.getItem('internDiary-endDate');

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const [values, setValues] = useState({
        companyName: companyName,
        startDate: startDate,
        endDate: endDate,
        dayOfInternship: '',
        content: ''
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const onClickRow = (id) => {
        setClickedRowId(id);
        values.content = internDiaries.find(e => e.id === id).content;
        values.dayOfInternship = internDiaries.find(e => e.id === id).dayOfInternship;
        if (clickedRowId === id) {
            setClickedRowId(null);
        }
    }

    const internId = localStorage.getItem('currentUser-subUserId');

    const onClickSave = () => {
        if (values.content.length > 0 && values.dayOfInternship.length > 0) {
            axios.post(`/api/v1/interns/${internId}/diaries`, {
                content: values.content,
                dayOfInternship: values.dayOfInternship,
            })
                .then(response => {
                    if (response.status === 201) {
                        window.alert('Staj Defteri Kaydedildi!');
                    }
                })
                .then(() => {
                    window.location.reload();
                })
                .catch(error => {
                    window.alert('Staj Defteri Kaydedilirken Bir Sorun Oluştu!');
                });
        } else {
            if (values.content.length <= 0) {
                setContentError(true);
                setTimeout(() => {
                    setContentError(false);
                }, 1500);
            }
            if (values.dayOfInternship.length <= 0) {
                setDayOfInternshipError(true);
                setTimeout(() => {
                    setDayOfInternshipError(false);
                }, 1500);
            }
        }
    }

    const onClickUpdate = () => {
        if (clickedRowId !== null) {
            if (values.content.length > 0 && values.dayOfInternship.length > 0) {
                axios.put(`/api/v1/interns/diaries/${clickedRowId}`, {
                    content: values.content,
                    dayOfInternship: values.dayOfInternship,
                })
                    .then(response => {
                        if (response.status === 200) {
                            window.alert('Staj Defteri Güncellendi!');
                        }
                    })
                    .then(() => {
                        window.location.reload();
                    })
                    .catch(error => {
                        window.alert('Staj Defteri Güncellenirken Bir Sorun Oluştu!');
                    });
            } else {
                if (values.content.length <= 0) {
                    setContentError(true);
                    setTimeout(() => {
                        setContentError(false);
                    }, 1500);
                }
                if (values.dayOfInternship.length <= 0) {
                    setDayOfInternshipError(true);
                    setTimeout(() => {
                        setDayOfInternshipError(false);
                    }, 1500);
                }
            }
        } else {
            window.alert('Lütfen Staj Defteri Seçiniz!');
        }
    }

    useEffect(() => {
        getInternDiaries();

        async function getInternDiaries() {
            const response = await axios.get(`/api/v1/interns/${internId}/diaries`);
            if (response.status === 200) {
                const data = response.data;
                setInternDiaries(data);
            }
        }
    }, []);

    return (
        <div>
            <form
                autoComplete="off"
                noValidate
                {...props}
            >
                <Card>
                    <CardHeader
                        title="Staj Defteri"
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
                                    required
                                    label="Staj Günü"
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
                                    label="Yapılan İşler"
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
                            onClick={onClickUpdate}
                            style={{ backgroundColor: "#FF7A2F", marginRight: "8px" }}
                            variant="contained"
                        >
                            Güncelle
                        </Button>
                        <Button
                            onClick={onClickSave}
                            style={{ backgroundColor: "#70D987" }}
                            variant="contained"
                        >
                            Kaydet
                        </Button>
                    </Box>
                </Card>
            </form>

            <Card {...rest}>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>
                                        Firma Adı
                                    </TableCell>
                                    <TableCell align='center'>
                                        Başlama Tarihi
                                    </TableCell>
                                    <TableCell align='center'>
                                        Bitirme Tarihi
                                    </TableCell>
                                    <TableCell align='center'>
                                        Staj Günü
                                    </TableCell>
                                    <TableCell align='right'>
                                        Çalışmalar
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {internDiaries && internDiaries.slice(0, limit).map((diary) => (
                                    <TableRow
                                        hover
                                        onClick={() => onClickRow(diary.id)}
                                        style={{ backgroundColor: clickedRowId === diary.id ? 'gray' : '' }}
                                        key={diary.id}
                                    >
                                        <TableCell align='left'>
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex'
                                                }}
                                            >
                                                <Avatar
                                                    src={''}
                                                    sx={{ mr: 2 }}
                                                >
                                                    {getInitials(companyName)}
                                                </Avatar>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {companyName}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align='center'>
                                            {startDate}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {endDate}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {diary.dayOfInternship}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {diary.content}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
                <TablePagination
                    component="div"
                    count={internDiaries && internDiaries.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </div>

    );
};

export default InternDiaryForm;
