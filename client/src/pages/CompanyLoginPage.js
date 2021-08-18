import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/img/3.jfif"})`,
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

function backPress() {
    window.location.href = '/login';
}

export default function CompanyLoginPage() {
    const classes = useStyles();

    const { value: username, bind: bindUsername, reset: resetUsername } = useInput("");
    const { value: password, bind: bindPassword, reset: resetPassword } = useInput("");

    const handleSubmit = () => {
        resetUsername();
        resetPassword();
        fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password, roleType: 3 })
        })
            .then(res => {
                if (res.ok) {
                    window.location.href = '/home';
                } else {
                    window.alert("Geçersiz Sicil Numarası veya Şifre");
                }
            })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3" style={{ color: '#3f51b5' }}>
                        <Button style={{ width: '64px' }} onClick={backPress}><img width='64px' src="./img/back-button.png" alt="back-button" /></Button> FİRMA
                    </Typography>
                    <br></br>
                    <Avatar className={classes.avatar}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Giriş Yap
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Sicil Numarası"
                            name="username"
                            autoComplete="username"
                            autoFocus
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
                            {...bindPassword}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Beni Hatırla"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Giriş Yap
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Şifreni mi Unuttun?
                                </Link>
                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}