import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate,Routes, Route } from "react-router-dom";
import 'tachyons';
import { ButtonGroup ,Button} from '@mui/material';
export default function AddProject(props) {
    const navigate =useNavigate();
  
    function handleClick(){
      navigate('/')
    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => createBlogPost(data);
  
     function createBlogPost(data) {
         console.log(data)
      return fetch('http://localhost:3001/Project', {
          method: 'POST',
          body: JSON.stringify({title:data.title,
                                author:props.name,
                                description:data.description,
                                funded:0,
                                target:parseInt(data.target),
                                final_date:data.final_date,
                                images:[data.image1,data.image2,data.image3,data.image4],
                                video:data.video}),
              headers: {
                  'Content-Type': 'application/json'
              }
         
      }).then(response => response.json())
      .then(data =>{ alert(data)
      handleClick();
      })
          
     
      }
  
  
  
    return (
  <div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className='tc'>
          <br></br>
  
          <br></br>
          <h2>add project</h2>
          <br></br>
       
        <input placeholder='title' {...register("title",{required: true})} />
        <br></br>
        
        <input placeholder='description' {...register("description",{required: true})} />
        <br></br>
        <input placeholder='target' {...register("target",{required: true})} />
        <br></br>
        <input placeholder='final_date' {...register("final_date",{required: true})} />
        <br></br>
        <input placeholder='images' {...register("image1",{required: true})} />
        <br></br>
        <input placeholder='images' {...register("image2",{required: false})} />
        <br></br>
        <input placeholder='images' {...register("image3",{required: false})} />
        <br></br>
        <input placeholder='images' {...register("image4",{required: false})} />
        <br></br>
        <input placeholder='video' {...register("video",{required: false})} />
    


        <br></br>
        
  
        {/* errors will return when field validation fails  */}
        <br></br>
        {errors.exampleRequired && <span>This field is required</span>}
        
        <input type="submit" />
        </div>
      </form>
      </div>
    );
  }