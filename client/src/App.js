import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import {Routes, Route,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Grid, Typography } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
  injectStyle();
}

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuth, setAuth ] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect( ()=>{
    if(user && user.id && user.email){
      setAuth(true)
    }
  })

  const logout = () =>{
    setAuth(false)
    localStorage.clear();
    navigate('login')
  }

  return (
    <div className="App">
      <AppBar>
        <Grid display={'flex'} justifyContent={'space-between'}>
          <Grid mt={1} ml={2}><Typography>Home</Typography></Grid>
         <Grid>
           {!isAuth ? 
            <>
            <Button variant='danger' ><Link to='/register'>Sign Up </Link> </Button>
            <Button variant='danger' ><Link to='/login'>Login </Link></Button>
            </>
            :<>
            
           <Grid display={'flex'} justifyContent='start' alignItems={'center'}>
             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
           <Typography>{user && user.name}</Typography>
            <Button variant='danger' onClick={logout}>Log Out</Button></Grid>
           </>
           }
         
         </Grid>
        </Grid>
      </AppBar>
      {
        <Routes>
          <Route path="*" element={<ProtectedRoute user={user}><Home/></ProtectedRoute>} />
          <Route exact path="home" element={<ProtectedRoute user={user}><Home/></ProtectedRoute>} />
          <Route exact path='login' element={<Login/>} />
          <Route exact  path='register' element={<Register />} />
        </Routes>
      }
      <ToastContainer />
    </div>
  );
}

export default App;
