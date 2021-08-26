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
import moment from 'moment';
import { useNavigate } from 'react-router';

const InstitutionInternshipAcceptedOffersResults = ({ ...rest }) => {
    const navigate = useNavigate();

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const [offers, setOffers] = useState(null);
    const [hasUnitInterns, setHasUnitInterns] = useState(null);
    const [hasUnitInternsIds, setHasUnitInternsIds] = useState(null);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const institutionId = localStorage.getItem('currentUser-subUserId');

    useEffect(() => {
        getOffers();

        async function getOffers() {
            const response = await axios.get(`/api/v1/company-offers/institution/${institutionId}`);
            if (response.status === 200) {
                const data = await response.data;
                setOffers(data);
            }
        }
    }, []);

    return (
        <>
            <Card {...rest}>
                <CardHeader
                    title="Staj Talepleri - Kabul Edilenler"
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
                                    <TableCell align='center'>
                                        Durum
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {offers &&
                                    offers
                                        .sort((a, b) => a.offerDate - b.offerDate)
                                        .slice(0, limit)
                                        .filter(offer => offer.active && offer.accepted && !offer.rejected)
                                        .map((offer, index) => (
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
                                                            src={''}
                                                            sx={{ mr: 2 }}
                                                        >
                                                            {getInitials(`${offer.intern.name} ${offer.intern.surname}`)}
                                                        </Avatar>
                                                        <Typography
                                                            color="textPrimary"
                                                            variant="body1"
                                                        >
                                                            {`${offer.intern.name} ${offer.intern.surname}`}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {moment(offer.offerDate).format('DD/MM/YYYY')}
                                                </TableCell>
                                                <TableCell align='center' variant>
                                                    {offer.offerMessage}
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
                    count={offers && offers.length}
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

export default InstitutionInternshipAcceptedOffersResults;
