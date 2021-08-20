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
import { useNavigate } from 'react-router-dom';

const CompanyInternshipOffersResults = ({ internshipOffers, ...rest }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const navigate = useNavigate();

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onClickDetail = (index) => {
        const id = internshipOffers[index].id;
        const internName = internshipOffers[index].name;
        const startOfDate = internshipOffers[index].startOfDate;
        const endOfDate = internshipOffers[index].endOfDate;
        const offerDate = internshipOffers[index].offerDate;
        const content = internshipOffers[index].content;
        navigate(`/app-company/company-internship-offers/${id}/detail`, { replace: false, state: { internName: internName, startOfDate: startOfDate, endOfDate: endOfDate, offerDate: offerDate, content: content } });
    }

    return (
        <Card {...rest}>
            <CardHeader
                title="Staj Talepleri"
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
                                    Başvuru Tarihi
                                </TableCell>
                                <TableCell align='center'>
                                    Mesaj
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
                                        {offer.offerDate}
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

export default CompanyInternshipOffersResults;
