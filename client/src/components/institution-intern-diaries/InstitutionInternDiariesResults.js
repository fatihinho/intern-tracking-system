import { useState } from 'react';
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

const InstitutionInternDiariesResults = ({ internshipOffers, ...rest }) => {
    const navigate = useNavigate()

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onClickDetail = (index) => {
        const id = internshipOffers[index].id;
        const name = internshipOffers[index].name;
        const startOfDate = internshipOffers[index].startOfDate;
        const endOfDate = internshipOffers[index].endOfDate;
        const dayOfInternship = internshipOffers[index].dayOfInternship;
        const content = internshipOffers[index].content;
        navigate(`/app-institution/institution-intern-diaries/${id}/detail`, { replace: false, state: { name: name, startOfDate: startOfDate, endOfDate: endOfDate, dayOfInternship: dayOfInternship, content: content } });
    }

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
                                    Başlama Tarihi
                                </TableCell>
                                <TableCell align='center'>
                                    Bitirme Tarihi
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
                            {internshipOffers.slice(0, limit).map((offer, index) => (
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
                                    <TableCell align='center'>
                                        {offer.content}
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
                count={internshipOffers.length}
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
