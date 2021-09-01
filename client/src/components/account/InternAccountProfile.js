import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

const InternAccountProfile = ({ props }) => {

  const [subUser, setSubUser] = useState([]);
  const [file, setFile] = useState(null);

  const handleUploadImage = function loadFile(event) {
    if (event.target.files.length > 0) {
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  const internId = localStorage.getItem('currentUser-subUserId');

  useEffect(() => {
    initSubUser();

    async function initSubUser() {
      const response = await axios.get(`/api/v1/interns/${internId}`);
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
            {subUser.name} {subUser.surname}
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
export default InternAccountProfile;
