import React, { useState,useEffect } from 'react';

import Project_list from './Project_list';

const Projects = (props)=>{
   
function give_your_projects(project,name){

    return  project.author === name
}   
 
function give_active_projects(project,today){
  
     return  (project.target - project.funded >0) && (Date.parse(project.final_date) > today)    
}
function give_failed_projects(project,today){
  
    return  (project.target - project.funded >0) && (Date.parse(project.final_date) < today)    
}
function give_completed_projects(project,today){
  
    return  (project.target - project.funded <= 0)     
}

const [projects,setProjects] = useState([])
    useEffect(()=>{
        fetch('http://localhost:3001/').then(response =>response.json())
        .then(projects =>{ 
            setProjects(projects)
            
        })
    },[])

    if(projects.length === 0 ){
        return(
            <h1></h1>
        )
    }
    else{
       
    return(
        <div>
            <Project_list projects={projects}  title={'your projects'} name={props.name} color={'purple'} func ={give_your_projects}/>

           <Project_list projects={projects}  title={'active projects'} color={'blue'} func ={give_active_projects}/>

           <Project_list projects={projects}  title={'not completed projects'} color={'red'} func ={give_failed_projects}/>

           <Project_list projects={projects}  title={'completed projects'} color={'green'} func ={give_completed_projects}/>

        </div>
    )
    }
}

export default Projects;