import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

import { useSelector,useDispatch } from "react-redux";
import {change_name,go_app,logout,nothing,remove_permession} from './actions';

export default function Bar() {
  const name = useSelector(state => state.name);
  const logged_in =useSelector(state =>state.isLogged)
  const place = useSelector(state=>state.places);

  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate('/Login');
    dispatch(nothing());
  }
  const handleClick2 = () => {
    dispatch(nothing());
    navigate('/Register');
  }
  const handleClick3 = () => {
    window.location.reload();
    dispatch(logout())
    dispatch(remove_permession());
    dispatch(change_name('guest'))
    navigate('/');
  }
  const handleClick4 = () => {
    navigate('/addProject');
  }
  const handleClick5 = ()=>{
    dispatch(go_app());
    dispatch(change_name('guest'));
    dispatch(logout())
    navigate('/')
  }
  return (
    <div>
      {logged_in === 0 &&(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        
       
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Kick Start
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`hello ${name}`}
          </Typography>
        
         <Button onClick={handleClick1} color='inherit'>Log in</Button>
         <Button onClick={handleClick2} color='inherit'>sign up</Button> 
        
        </Toolbar>
      </AppBar>
    </Box>
      )}

{logged_in === 1 &&(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        
       
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Kick Start
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`hello ${name}`}
          </Typography>
          
         <Button onClick={handleClick3} color='inherit'>Log out</Button>
         <Button onClick={handleClick4} color='inherit'>add project</Button>


        </Toolbar>
      </AppBar>
    </Box>
      )}


{logged_in === 2 &&(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        
       
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Kick Start
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`hello ${name}`}
          </Typography>
          
          <Button onClick={handleClick5} color='inherit'>back as a guest</Button>

        </Toolbar>
      </AppBar>
    </Box>
      )}
    </div>
  );
}
