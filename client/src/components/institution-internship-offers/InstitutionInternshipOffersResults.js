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

const InstitutionInternshipOffersResults = ({ ...rest }) => {

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const [offers, setOffers] = useState();

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onClickAcceptOffer = (id) => {
        axios.put(`/api/v1/company-offers/accept/${id}`)
            .then(response => {
                if (response.status === 200) {
                    window.alert('Staj Teklifi Kabul Edildi!')
                }
            }).then(() => {
                window.location.reload();
            }).catch(error => {
                window.alert('Staj Teklifini Kabul Ederken Bir Sorun Oluştu!')
            })
    }

    const onClickRejectOffer = (id) => {
        axios.put(`/api/v1/company-offers/reject/${id}`)
            .then(response => {
                if (response.status === 200) {
                    window.alert('Staj Teklifi Reddedildi!')
                }
            }).then(() => {
                window.location.reload();
            })
            .catch(error => {
                window.alert('Staj Teklifini Reddederken Bir Sorun Oluştu!')
            })
    }

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
                                    Firma Adı
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {offers &&
                                offers
                                    .sort((a, b) => a.offerDate - b.offerDate)
                                    .slice(0, limit)
                                    .filter(offer => offer.active)
                                    .map((offer) => (
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
                                            <TableCell align='center'>
                                                {offer.company.name}
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Button
                                                    disabled={offer.rejected}
                                                    onClick={() => onClickRejectOffer(offer.id)}
                                                    style={{ backgroundColor: offer.accepted ? "#F33D3D" : "primary", marginRight: "8px" }}
                                                    variant="contained"
                                                >
                                                    Reddet
                                                </Button>
                                                <Button
                                                    disabled={offer.accepted}
                                                    onClick={() => onClickAcceptOffer(offer.id)}
                                                    style={{ backgroundColor: offer.rejected ? "#70D987" : "primary" }}
                                                    variant="contained"
                                                >
                                                    Kabul Et
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

export default InstitutionInternshipOffersResults;
