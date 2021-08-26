import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';
import axios from 'axios';
import { useNavigate } from 'react-router';

const InstitutionInternAcceptedDiariesResults = ({ ...rest }) => {
    const navigate = useNavigate();

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const [diaries, setDiaries] = useState(null);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const institutionId = localStorage.getItem('currentUser-subUserId');

    useEffect(() => {
        getDiaries();

        async function getDiaries() {
            const response = await axios.get(`/api/v1/interns/diaries/institution/${institutionId}`);
            if (response.status === 200) {
                const data = await response.data;
                setDiaries(data);
            }
        }
    }, []);

    return (
        <>
            <Card {...rest}>
                <CardHeader
                    title="Staj Defterleri - Kabul Edilenler"
                />
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>
                                        Öğrenci Adı
                                    </TableCell>
                                    <TableCell align='center'>
                                        Staj Günü
                                    </TableCell>
                                    <TableCell align='center'>
                                        Çalışmalar
                                    </TableCell>
                                    <TableCell align='center'>
                                        Durum
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {diaries &&
                                    diaries
                                        .slice(0, limit)
                                        .filter(diary => diary.accepted && !diary.rejected)
                                        .map((diary) => (
                                            <TableRow
                                                hover
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
                                                            {getInitials(`${diary.intern.name} ${diary.intern.surname}`)}
                                                        </Avatar>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body1"
                                                        >
                                                            {`${diary.intern.name} ${diary.intern.surname}`}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {diary.dayOfInternship}
                                                </TableCell>
                                                <TableCell align='center' variant>
                                                    {diary.content}
                                                </TableCell>
                                                <TableCell align='center' variant>
                                                    <Button
                                                        disabled
                                                        style={{ backgroundColor: "#70D987", color: "#FFFFFF" }}
                                                        size="small"
                                                        variant="contained"
                                                    >
                                                        Kabul Edildi
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
                <TablePagination
                    component="div"
                    count={diaries && diaries.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </>
    );
};

export default InstitutionInternAcceptedDiariesResults;
