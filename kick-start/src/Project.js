import { useEffect, useState } from "react";
import React from 'react';
import {useNavigate} from 'react-router-dom'
import {LinearProgress} from '@mui/material'
import { styled } from '@mui/material/styles';

import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const Project =(props)=>{

function get_days_diffrents(final_date){
    var final_date = new Date(final_date);
    
    var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      return final_date.getFullYear()*365 - parseInt(yyyy)*365 + (final_date.getMonth()+1)*30 - parseInt(mm)*30 + final_date.getDate() -parseInt(dd);
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

  function get_days_diffrents(final_date){
    var final_date = new Date(final_date);
    
    var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      return final_date.getFullYear()*365 - parseInt(yyyy)*365 + (final_date.getMonth()+1)*30 - parseInt(mm)*30 + final_date.getDate() -parseInt(dd);
  }

  function updateAmount(project) {
    console.log(project)
    console.log(project.funded + parseInt(input))
    return fetch('http://localhost:3001/projects', {
        method: 'PUT',
        body: JSON.stringify({
          _id:project._id,
          title:project.title,
          authour:project.author,
          description:project.description,
          funded:project.funded + parseInt(input),
          target:project.target,
          final_date:project.final_date,
          images:project.images,
          video:project.video

        }),
            headers: {
                'Content-Type': 'application/json'
            }
       
    }).then(response => response.json())
    .then(data =>{ alert(data)
      handleClick();
    })
        
   
    }
    const navigate = useNavigate();
    function handleClick(){
      navigate('/');
    }
    const [input, setInput] = useState('')
    const [project,setProject] = useState(undefined)
    let id = window.location.href.toString().split('/')[4]
    useEffect(()=>{
        fetch(`http://localhost:3001/${id}`).then(response =>response.json())
        .then(project =>{ 
            setProject(project)
            console.log(project)
        })
    },[])
    return(
      <div className="tc">
        {project === undefined &&(
          <h1>loading</h1>
        )}

        {project !== undefined &&(<div className="tc">
       <h1 >{project.title}</h1>
       <h4>{project.author}</h4> 
       <img  src = {project.images[0]}></img>
    
          <br></br>
       <TextField
          id="standard-multiline-static"
          label="explanation"
          multiline
          rows={9}
          variant="standard"
          fullWidth 
          defaultValue ={project.description}
          disabled
        />    

{project.images[1] !== undefined && (
         <div>
             <img  src = {project.images[1]}></img>

           </div>
       )}
{project.images[2] !== undefined && (
         <div>
             <img  src = {project.images[2]}></img>

           </div>
       )}
{project.images[3] !== undefined && (
         <div>
             <img  src = {project.images[3]}></img>

           </div>
       )}



       {project.video !== undefined && (
         <div>
          
          <iframe width="952" height="506" src={project.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
           </div>
       )}
      <LinearProgressWithLabel value={project.funded / project.target *100 } />
      <Grid container spacing={5}>
        <Grid item xs="auto">
          <Item>{project.funded / project.target *100 }% funded</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{project.funded} pledged</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{get_days_diffrents(project.final_date)} days left</Item>
        </Grid>
      </Grid>
      <br></br>
        
        {get_days_diffrents(project.final_date) > 0 && ( 
              <div>
              <TextField
            id="standard-multiline-static"
            label="amount"
            value={input}
            onInput={e => setInput(e.target.value)}
            rows={2}
            
            
          /> 
        <Button onClick={()=>updateAmount(project)} color='info' defaultValue={0}>pledge</Button>  
        </div>
        )}
            
        </div>
        )}

        </div>
    )
}

export default Project;