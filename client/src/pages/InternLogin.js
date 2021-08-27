import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useInput } from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/img/2.jfif"})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/fatihinho">
                Fatih Çınar
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function InternLogin() {
    const classes = useStyles();
    const navigate = useNavigate();

    const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const login = () => {
        window.location.replace('/app-intern');
    }

    const handleLogin = () => {
        if (username.trim().length > 0 && password.trim().length > 0) {
            axios.post('/api/v1/login', {
                username: username,
                password: password,
                roleType: 2
            })
                .then(function (response) {

                    if (response.status === 200) {
                        localStorage.setItem('currentUser-id', response.data['id']);
                        localStorage.setItem('currentUser-subUserId', response.data['subUserId']);
                        localStorage.setItem('currentUser-subUserType', response.data['subUserType']);
                        localStorage.setItem('currentUser-username', response.data['username']);
                        localStorage.setItem('currentUser-password', response.data['password']);
                        login();
                    } else {
                        toast.error('Kullanıcı Adı veya Şifre Yanlış!')
                    }
                })
                .catch(function (error) {
                    toast.error("Kullanıcı Adı veya Şifre Yanlış!");
                });

            resetUsername();
            resetPassword();
        } else {
            if (username.trim().length <= 0) {
                setUsernameError(true);
                setTimeout(() => {
                    setUsernameError(false);
                }, 1500);
            }
            if (password.trim().length <= 0) {
                setPasswordError(true);
                setTimeout(() => {
                    setPasswordError(false);
                }, 1500);
            }
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3" style={{ color: '#3f51b5' }}>
                        <Button style={{ width: '48px' }} onClick={() => navigate('/login', { replace: true })}><img width='48px' src="./img/back-button.png" alt="back-button" /></Button> STAJYER
                    </Typography>
                    <br></br>
                    <Avatar className={classes.avatar}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Giriş Yap
                    </Typography>
                    <form className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Öğrenci Numarası"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            error={usernameError}
                            {...bindUsername}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Şifre"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordError}
                            {...bindPassword}
                        />
                        <Button
                            onClick={handleLogin}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Giriş Yap
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}