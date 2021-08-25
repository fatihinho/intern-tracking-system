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

const InternshipOfferListResults = ({ ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [offers, setOffers] = useState(null);
  const [appliedOffers, setAppliedOffers] = useState(null);

  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const internId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    getOffers();
    getAppliedOffers();

    async function getOffers() {
      const response = await axios.get('/api/v1/intern-searches');
      if (response.status === 200) {
        const data = await response.data;
        setOffers(data);
      }
    }

    async function getAppliedOffers() {
      const response = await axios.get(`/api/v1/company-offers/intern/${internId}`);
      if (response.status === 200) {
        const data = await response.data;
        setAppliedOffers(data);
      }
    }
  }, [])

  const onClickAppliement = (index) => {
    const id = offers[index].id;
    const companyId = offers[index].company.id;
    const companyName = offers[index].company.name;
    const startDate = moment(offers[index].startDate).format('DD/MM/YYYY');
    const endDate = moment(offers[index].endDate).format('DD/MM/YYYY');
    const dayOfInternship = offers[index].dayOfInternship;
    navigate(`/app-intern/internship-offer/${id}/appliement`, {
      replace: false, state: {
        companyId: companyId,
        companyName: companyName,
        startDate: startDate,
        endDate: endDate,
        dayOfInternship: dayOfInternship
      }
    });
  }

  return (
    <Card {...rest}>
      <CardHeader
        title="Staj Talebi"
      />
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
                  Staj Süresi
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers && offers.slice(0, limit).map((offer, index) => (
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
                        {getInitials(offer.company.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {offer.company.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align='center'>
                    {moment(offers[index].startDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align='center'>
                    {moment(offers[index].endDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align='center'>
                    {offer.dayOfInternship}
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      disabled={appliedOffers && appliedOffers[index].company.id === offer.company.id}
                      onClick={() => onClickAppliement(index)}
                      size="small"
                      color="primary"
                      variant="contained"
                    >
                      {appliedOffers && appliedOffers[index].company.id === offer.company.id ? 'Başvuruldu' : 'Başvur'}
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

export default InternshipOfferListResults;
