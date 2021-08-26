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
import { useNavigate } from 'react-router';
import axios from 'axios';
import moment from 'moment';

const InstitutionInternDiariesResults = ({ ...rest }) => {
    const navigate = useNavigate();

    const [diaries, setDiaries] = useState();

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const onClickDetail = (index) => {
        const id = diaries[index].id;
        const name = diaries[index].intern.name;
        const surname = diaries[index].intern.surname;
        const dayOfInternship = diaries[index].dayOfInternship;
        const content = diaries[index].content;
        const isAccepted = diaries[index].accepted;
        const isRejected = diaries[index].rejected;
        navigate(`/app-institution/institution-intern-diaries/${id}/detail`, {
            replace: false, state: {
                id: id,
                name: name,
                surname: surname,
                dayOfInternship: dayOfInternship,
                content: content,
                isAccepted: isAccepted,
                isRejected: isRejected
            }
        });
    }

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
        <Card {...rest}>
            <CardHeader
                title="Staj Defterleri"
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
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {diaries &&
                                diaries
                                    .sort((a, b) => a.dayOfInternship - b.dayOfInternship)
                                    .slice(0, limit)
                                    .map((diary, index) => (
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
                                            <TableCell align='center'>
                                                {diary.content}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => onClickDetail(index)}
                                                >
                                                    Detay
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
    );
};

export default InstitutionInternDiariesResults;
