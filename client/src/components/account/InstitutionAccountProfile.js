import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

const InstitutionAccountProfile = ({ props }) => {
  const [subUser, setSubUser] = useState([]);
  const [file, setFile] = useState(null);

  const handleUploadImage = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };

  const institutionId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    initSubUser();

    async function initSubUser() {
      const response = await axios.get(`/api/v1/institutions/${institutionId}`);
      if (response.status === 200) {
        const data = response.data;
        setSubUser(data);
      }
    }
  }, [subUser]);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={file}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {subUser.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleUploadImage}
      />
      <label htmlFor="raised-button-file">
        <Button
          color="primary"
          fullWidth
          component="span"
        >
          Fotoğraf Yükle
        </Button>
      </label>
    </Card>
  );
}
export default InstitutionAccountProfile;
