import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import axios from 'axios';

const SettingsPassword = (props) => {
  const id = localStorage.getItem('currentUser-id');

  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onClickSave = () => {
    if (values.password.trim().length > 0 && values.confirm.trim().length > 0) {
      axios.put(`/api/v1/users/${id}/settings`, {
        password: values.password,
        password2: values.confirm
      })
        .then(response => {
          if (values.password === values.confirm) {
            if (response.status === 200) {
              window.alert('Şifre Güncellendi!');
            }
          } else {
            window.alert('Şifreler Aynı Değil!');
          }
        })
        .catch(error => {
          window.alert('Şifre Güncellenirken Bir Sorun Oluştu');
        }).finally(() => {
          setValues({
            password: '',
            confirm: ''
          });
        });
    } else {
      if (values.password.trim().length <= 0) {
        setPasswordError(true);
        setTimeout(() => {
          setPasswordError(false);
        }, 1500);
      }
      if (values.confirm.trim().length <= 0) {
        setConfirmError(true);
        setTimeout(() => {
          setConfirmError(false);
        }, 1500);
      }
    }
  }

  return (
    <form {...props}>
      <Card>
        <CardHeader
          title="Ayarlar"
        />
        <CardHeader
          subheader="Şifreyi Güncelle"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Şifre"
            margin="normal"
            required
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
            error={passwordError}
          />
          <TextField
            fullWidth
            label="Şifreyi Onayla"
            margin="normal"
            required
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
            error={confirmError}
          />
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

export default SettingsPassword;
