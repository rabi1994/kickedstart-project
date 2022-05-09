import React from 'react';
import  './card.css';

import {LinearProgress} from '@mui/material'
import { styled } from '@mui/material/styles';

import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate,Routes, Route } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import Project from './Project';
import { go_app,go_start } from './actions';


 

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
   
        </Box>
      </Box>
    );
  }

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function get_days_diffrents(final_date){
  var final_date = new Date(final_date);
  
  var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return final_date.getFullYear()*365 - parseInt(yyyy)*365 + (final_date.getMonth()+1)*30 - parseInt(mm)*30 + final_date.getDate() -parseInt(dd);
}
const Deafaultcard =({id,title,author,description,funded,target,final_date,image,color})=>{
  const permission = useSelector(state=>state.permission);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/project/${id}`);
  }
  const handleClick2 = (id) => {
    dispatch(go_start());
    dispatch(go_app());
  }
 
  function deleteCard(){
      return fetch('http://localhost:3001/delete', {
          method: 'DELETE',
          body: JSON.stringify({title:title}),
              headers: {
                  'Content-Type': 'application/json'
              }
         
      }).then(response => response.json())
      .then(data =>{ alert(data)
        handleClick2();
      })
          
     
      
  }
return(
    <div  className={` tc bg-light-${color} dib br3 pa3 ma2  grow bw2 shadow-5 `}>
        <Card  sx={{ maxWidth: 500 ,minWidth: 500 ,maxHeight: 550,minHeight:550}}>
          {permission === true &&(
            <div>
            <Button onClick={deleteCard} className='tr' variant="outlined" color="error">X</Button>
            <br></br>
            </div>
          )}
        <img style={{'width':'200px','height':'200px'}}  src = {image}></img>
       <h3 >{title}</h3>
       <h4>{author}</h4> 
       <TextField
          id="standard-multiline-static"
          label="explanation"
          multiline
          rows={4}
          variant="standard"
          defaultValue ={description}
          disabled
        />    
      <LinearProgressWithLabel value={funded / target *100 } />
      <Grid container spacing={3}>
        <Grid item xs="auto">
          <Item>{funded / target *100 }% funded</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{funded} pledged</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{get_days_diffrents(final_date) > 0 ? get_days_diffrents(final_date) : 0} days left</Item>
        </Grid>
      </Grid>
      <Button onClick={()=>handleClick(id)}  style={{'float':'right', 'margin':'2px'}} variant="text">more...</Button>

       </Card>
    </div>
)
}

export default Deafaultcard;
