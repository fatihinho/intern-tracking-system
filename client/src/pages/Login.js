import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonGroup, Link } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/img/1.jfif"})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1)
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

export default function Login() {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <Grid style={{ backgroundColor: '#424242' }} container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3" style={{ color: '#3f51b5' }}>
                        <strong>STAJ TAKİP SİSTEMİ</strong>
                    </Typography>
                    <br />
                    <Avatar className={classes.avatar}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Giriş Yap
                    </Typography>
                    <ButtonGroup style={{ marginTop: '64px' }} aria-label="outlined secondary button group">
                        <Button
                            style={{
                                width: 'auto',
                                margin: '8px',
                                border: 'thick double white',
                                background: '#3f51b5',
                                display: 'inline'
                            }}
                            onClick={() => navigate('/login-intern', { replace: true })}
                        ><img width='96px' src="./img/user.png" alt="intern-login" />
                            <div style={{ color: 'white' }}>STAJYER</div>
                        </Button>
                        <Button
                            style={{
                                width: 'auto',
                                margin: '8px',
                                border: 'thick double white',
                                background: '#3f51b5',
                                display: 'inline'
                            }}
                            onClick={() => navigate('/login-company', { replace: true })}
                        ><img width='96px' src="./img/company.png" alt="intern-login" />
                            <div style={{ color: 'white' }}>FİRMA</div>
                        </Button>
                        <Button
                            style={{
                                width: 'auto',
                                margin: '8px',
                                border: 'thick double white',
                                background: '#3f51b5',
                                display: 'inline'
                            }}
                            onClick={() => navigate('/login-institution', { replace: true })}
                        ><img width='96px' src="./img/school.png" alt="intern-login" />
                            <div style={{ color: 'white' }}>KURUM</div>
                        </Button>
                    </ButtonGroup>
                    <Box mt={10}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}