import React, { useEffect } from 'react';
import {Container, Box, CssBaseline, Avatar, Typography, TextField, Grid, FormControlLabel, Checkbox, Button, Copyright } from '@mui/material';

import { useFormik, Formik, Form } from 'formik';
import {Link, useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import {login_action } from '../../redux/action'
import { useSelector, useDispatch } from 'react-redux';

const validationSchema = yup.object({
    email: yup.string().email().required(),
    password : yup.string().required()
  });

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
    },[])

    const onSubmit = async(values, {setSubmitting, resetForm}) =>{
        localStorage.clear();
        setSubmitting(true)
        await login_action(values)(dispatch)
        resetForm({})
        navigate('/home')
    }

    return (
        <div>
            <Container component="main" maxWidth="xs" sx={{background : "#fff"}}>
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding : '5px'
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik
                initialValues= {{
                    email : "radmin@gmail.com",
                    password : "1234"
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({errors, handleSubmit, handleChange, handleBlur, isSubmitting, isValid, touched, values}) =>
            <Form>
            <Box noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    name="email" onBlur={handleBlur}  onChange={handleChange} 
                    value={values.email}  
                    error={errors.email && Boolean(errors.email)}
                    helperText={errors.email && errors.email}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    name="password" onBlur={handleBlur}  onChange={handleChange} 
                    value={values.password}  
                    error={errors.password && Boolean(errors.password)}
                    helperText={errors.password && errors.password}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Grid container  
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Link href="#" variant="body2" to="/register">
                    <Grid item>
                        
                        {"Don't have an account? Sign Up"}
                    </Grid>
                        </Link>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                >
                Sign In
                </Button>
                
            </Box>
            </Form>}
            </Formik>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
        </div>
    );
};

export default Login;