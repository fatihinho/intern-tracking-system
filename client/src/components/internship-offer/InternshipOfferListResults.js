import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
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

const InternshipOfferListResults = ({ internshipOffers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onClickAppliement = (index) => {
    const id = internshipOffers[index].id;
    const companyName = internshipOffers[index].name;
    const startOfDate = internshipOffers[index].startOfDate;
    const endOfDate = internshipOffers[index].endOfDate;
    const dayOfInternship = internshipOffers[index].dayOfInternship;
    navigate(`/app-intern/internship-offer/${id}/appliement`, { replace: false, state: { companyName: companyName, startOfDate: startOfDate, endOfDate: endOfDate, dayOfInternship: dayOfInternship } });
  }

  return (
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
                  Staj Süresi
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
                  <TableCell align='right'>
                    <Button
                      onClick={() => onClickAppliement(index)}
                      size="small"
                      color="primary"
                      variant="contained"
                    >
                      Başvur
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

InternshipOfferListResults.propTypes = {
  internshipOffers: PropTypes.array.isRequired
};

export default InternshipOfferListResults;
