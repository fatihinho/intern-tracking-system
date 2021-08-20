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

const InstitutionInternshipOffersResults = ({ internshipOffers, ...rest }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

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
                                        {offer.companyName}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            style={{ backgroundColor: "#F33D3D", marginRight: "8px" }}
                                            variant="contained"
                                        >
                                            Reddet
                                        </Button>
                                        <Button
                                            style={{ backgroundColor: "#70D987" }}
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

export default InstitutionInternshipOffersResults;
