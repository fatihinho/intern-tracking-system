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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const CompanyInternshipOffersResults = ({ ...rest }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [offers, setOffers] = useState(null);

    const navigate = useNavigate();

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onClickDetail = (index) => {
        const id = offers.filter(offer => offer.active && !offer.accepted && !offer.rejected)[index].id;
        const internId = offers.filter(offer => offer.active && !offer.accepted && !offer.rejected)[index].intern.id;
        const internName = offers.filter(offer => offer.active && !offer.accepted && !offer.rejected)[index].intern.name;
        const internSurname = offers.filter(offer => offer.active && !offer.accepted && !offer.rejected)[index].intern.surname;
        const offerDate = offers.filter(offer => offer.active && !offer.accepted && !offer.rejected)[index].offerDate;
        const offerMessage = offers.filter(offer => offer.active && !offer.accepted && !offer.rejected)[index].offerMessage;
        navigate(`/app-company/company-internship-offers/${id}/detail`, {
            replace: false, state: {
                id: id,
                internId: internId,
                internName: internName,
                internSurname: internSurname,
                startDate: startDate,
                endDate: endDate,
                offerDate: offerDate,
                offerMessage: offerMessage
            }
        });
    }

    const companyId = localStorage.getItem('currentUser-subUserId');

    useEffect(() => {
        getOffers();
        getInternshipStartAndEndDate();

        async function getOffers() {
            const response = await axios.get(`/api/v1/company-offers/company/${companyId}`);
            const data = await response.data;
            setOffers(data);
        }

        async function getInternshipStartAndEndDate() {
            const response = await axios.get(`/api/v1/intern-searches/company/${companyId}`)
            setStartDate(response.data.startDate);
            setEndDate(response.data.endDate);
        }
    }, []);

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
                            {offers &&
                                offers
                                    .slice(0, limit)
                                    .filter(offer => offer.active && !offer.accepted && !offer.rejected)
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
                count={offers && offers.length}
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
