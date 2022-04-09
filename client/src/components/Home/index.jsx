import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getUserData_action} from '../../redux/action';
import {Grid,Box, Avatar, Typography} from '@mui/material'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {SetAuthToken} from '../../ApiService'

const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.home.userData)
    
    const loadUser= useCallback(() => {
        getUserData_action()(dispatch);
    }, [dispatch, getUserData_action]); 

    useEffect(()=>{
        async function  initalSetup(){
            await SetAuthToken(localStorage.getItem('auth_token'));
          }
          initalSetup()
        loadUser()
      },[])
    

    const showTable2 = () =>{
        return <Box
        sx={{
            margin: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding : '5px'
        }}
    ><TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.data &&  userData.data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    }
    const showTable = () =>{
        return(
        <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding : '5px'
                    }}
                >
                <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} alignContent={'center'}>
        <Grid>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.data && userData.data.length && userData.data.map(item=>{
                            return <tr>
                                <th>{item.name}</th>
                                <th>{item.email}</th>
                                <th>{item.role}</th>
                            </tr>
                        })
                    }
                </tbody>
            </table> 
        </Grid>
    </Grid>
    </Box>)
    }

    const showCard = () =>{
        return  <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding : '5px'
                    }}
                >
                    <Avatar  sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                <Typography component="h1" variant="h5">
                    Name : {userData.data[0].name}
                </Typography> 
                <Typography component="h1" variant="h5">
                Email : {userData.data[0].email}
                </Typography> 
                <Typography component="h1" variant="h5">
                Role : {userData.data[0].role}
                </Typography>
        </Box>
    }
    return (
        <div>
            {
                userData.type == 'ADMIN' && showTable2()
            }
            {
                userData.type == "EMPLOYEE" && showCard()
               
            }
        </div>
    );
};

export default Home;