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
import { toast } from 'react-toastify';

const InternAccountProfileDetails = (props) => {
  const id = localStorage.getItem('currentUser-id');
  const name = localStorage.getItem('currentUser-subUserName');
  const surname = localStorage.getItem('currentUser-subUserSurname');
  const email = localStorage.getItem('currentUser-subUserEmail');
  const phone = localStorage.getItem('currentUser-subUserPhone');

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [values, setValues] = useState({
    name: name,
    surname: surname,
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
    if (values.name.trim().length > 0 && values.surname.trim().length > 0 && values.email.trim().length > 0) {
      axios.put(`/api/v1/interns/${id}/profile`, {
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone
      })
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem('currentUser-subUserName', values.name);
            localStorage.setItem('currentUser-subUserSurname', values.surname);
            localStorage.setItem('currentUser-subUserEmail', values.email);
            localStorage.setItem('currentUser-subUserPhone', values.phone);
            toast.success('Profil Güncellendi!');
          }
        })
        .catch(error => {
          toast.error('Profil Güncellenirken Bir Sorun Oluştu');
        });
    } else {
      if (values.name.trim().length <= 0) {
        setNameError(true);
        setTimeout(() => {
          setNameError(false);
        }, 1500);
      }
      if (values.surname.trim().length <= 0) {
        setSurnameError(true);
        setTimeout(() => {
          setSurnameError(false);
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
                label="Soyisim"
                name="surname"
                onChange={handleChange}
                required
                value={values.surname}
                variant="outlined"
                error={surnameError}
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

export default InternAccountProfileDetails;
