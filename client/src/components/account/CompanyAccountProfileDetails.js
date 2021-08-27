import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import axios from 'axios';

const CompanyAccountProfileDetails = (props) => {
  const id = localStorage.getItem('currentUser-id');
  const name = localStorage.getItem('currentUser-subUserName');
  const address = localStorage.getItem('currentUser-subUserAddress');
  const email = localStorage.getItem('currentUser-subUserEmail');
  const phone = localStorage.getItem('currentUser-subUserPhone');

  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [values, setValues] = useState({
    name: name,
    address: address,
    email: email,
    phone: phone
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onClickSave = () => {
    if (values.name.trim().length > 0 && values.address.trim().length > 0 && values.email.trim().length > 0) {
      axios.put(`/api/v1/companies/${id}/profile`, {
        name: values.name,
        address: values.address,
        email: values.email,
        phone: values.phone
      })
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem('currentUser-subUserName', values.name);
            localStorage.setItem('currentUser-subUserAddress', values.address);
            localStorage.setItem('currentUser-subUserEmail', values.email);
            localStorage.setItem('currentUser-subUserPhone', values.phone);
            window.alert('Profil Güncellendi!');
          }
        })
        .then(() => {
          window.location.reload();
        })
        .catch(error => {
          window.alert('Profil Güncellenirken Bir Sorun Oluştu');
        });
    } else {
      if (values.name.trim().length <= 0) {
        setNameError(true);
        setTimeout(() => {
          setNameError(false);
        }, 1500);
      }
      if (values.address.trim().length <= 0) {
        setAddressError(true);
        setTimeout(() => {
          setAddressError(false);
        }, 1500);
      }
      if (values.email.trim().length <= 0) {
        setEmailError(true);
        setTimeout(() => {
          setEmailError(false);
        }, 1500);
      }
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Profil bilgilerinizi güncelleyebilirsiniz"
          title="Profil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="İsim"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
                error={nameError}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Adres"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                variant="outlined"
                error={addressError}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Adresi"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                error={emailError}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Telefon Numarası"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            onClick={onClickSave}
            color="primary"
            variant="contained"
          >
            Kaydet
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CompanyAccountProfileDetails;
