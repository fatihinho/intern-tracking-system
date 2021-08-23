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
import { useState } from 'react';

const InternDiaryForm = ({ internDiaries, props, ...rest }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const [values, setValues] = useState({
        companyName: 'Türksat A.Ş.',
        startOfDate: '28/06/2021',
        endOfDate: '12/08/2021',
        dayOfInternship: 'dayOfInternship',
        content: ''
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

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
                                    label="Staj Günü"
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
                            style={{ backgroundColor: "#F33D3D", marginRight: "8px" }}
                            variant="contained"
                        >
                            Sil
                        </Button>
                        <Button
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
                                {internDiaries.slice(0, limit).map((offer, index) => (
                                    <TableRow
                                        hover
                                        key={offer.id}
                                    >
                                        <TableCell align='left'>
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex'
                                                }}
                                            >
                                                <Avatar
                                                    src={offer.avatarUrl}
                                                    sx={{ mr: 2 }}
                                                >
                                                    {getInitials(offer.name)}
                                                </Avatar>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {offer.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align='center'>
                                            {offer.startOfDate}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {offer.endOfDate}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {offer.dayOfInternship}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {offer.content}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
                <TablePagination
                    component="div"
                    count={internDiaries.length}
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
