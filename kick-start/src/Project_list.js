import React, {useState,useEffect} from 'react';
import Deafaultcard from './card';
import Actived_list from './activited_list'


const Project_list = ({projects ,title,color,func,name,permession}) =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    today = Date.parse(today)
    if(title === 'your projects')
    projects = projects.filter( (project) =>func(project,name))
    else
    projects = projects.filter( (project) =>func(project,today))
    //projects.filter((project)=> Date.parse(project.final_date) > today )
 
    if(projects.length === 0)
    return(
        <h1>
        </h1>
    )
    else
    return (
        <div>
          <Actived_list  color ={color} elements={projects} title={title}/>
        </div>
    )
}

export default Project_list;