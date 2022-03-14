import React from 'react';
import {Container, Box, CssBaseline, Avatar, Typography, TextField, Grid, FormControlLabel, Switch, Button, Copyright } from '@mui/material';
import { useFormik, Formik, Form } from 'formik';
import {Link} from 'react-router-dom';
import * as yup from 'yup';
import {register_action} from '../../redux/action'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    name : yup.string().required(),
    email: yup.string().email().required(),
    password : yup.string().required().min(4),
    confirm_password : yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required()
  });

const Register = () => {
    const dispatch= useNavigate();
    const navigate= useDispatch();

    
    const onSubmit = async(values, {setSubmitting, resetForm}) =>{
        // localStorage.clear();
        setSubmitting(true)
        await register_action({...values, 'role' : values.role ? 'ADMIN' :'EMPLOYEE'})(dispatch)
        resetForm({})
        navigate('/login')
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
                Registration 
            </Typography>
            <Formik
                initialValues= {{
                    name : "",
                    email : "",
                    password : "",
                    confirm_password : "",
                    role : false
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({errors, handleSubmit, handleChange, handleBlur, isSubmitting, isValid, touched, values}) =>
            <Form>
            <Box noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="User Name"
                    autoComplete="name"
                    autoFocus
                    name="name" onBlur={handleBlur}  onChange={handleChange} 
                    value={values.name}  
                    error={errors.name && Boolean(errors.name)}
                    helperText={errors.name && errors.name}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="phone"
                    label="Email Address"
                    autoComplete="email"
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
                <TextField
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    id="confirm_password"
                    autoComplete="current-password"
                    name="confirm_password" onBlur={handleBlur}  onChange={handleChange} 
                    value={values.confirm_password}  
                    error={errors.confirm_password && Boolean(errors.confirm_password)}
                    helperText={errors.confirm_password && errors.confirm_password}
                />
                <Grid p={1} sx={{textAlign : "left", margin : "0px 10px"}} textAlign="center" >
                    <label>is Admin</label>
                    <Switch name="role" value={values.role}  onChange={handleChange} 
                    error={errors.role && Boolean(errors.role)}
                    helperText={errors.role && errors.role}
                    id="role" size="small" label="Role"/>
                </Grid>

                <Grid container  
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Link href="#" variant="body2" to="/login">
                        <Grid item>{"You have an account? Login"}</Grid>
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

export default Register;