import React, { useEffect } from 'react';
import Bar from './Bar';
import Projects from './Projects';
import {useNavigate} from 'react-router-dom';
const Home =(props)=>{
    const navigate = useNavigate();
    const handleClick = (place) => {
      navigate(`/${place}`);
    }
    useEffect(()=>{
        if(props.place !== 'app')
        handleClick(props.place);
        
    },[])
    return(
        <div>
        
        <div>
            <hr></hr>
            <Projects  name={props.name}/>
        </div>
         
        </div>
        
    )
}

export default Home;