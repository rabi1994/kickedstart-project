import React from "react";
import { useForm } from "react-hook-form";
import 'tachyons';
import img from './kick-start.jpeg' ;
import Bar from './Bar'
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {change_name,go_app,change_permession,login} from './actions';


var bcrypt =require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default function Login() {
const name = useSelector(state=>state.name);

const dispatch = useDispatch();
  const navigate =useNavigate();

  function handleClick(){
    navigate('/')
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => createBlogPost(data);

   function createBlogPost({username,password}) {
    return fetch('http://localhost:3001/Login', {
        method: 'POST',
        body: JSON.stringify({username:username,
            password:password}),
            headers: {
                'Content-Type': 'application/json'
            }
       
    }).then(response => response.json())
    .then(data =>{ alert(data)
      if(data === 'Admin')
        dispatch(change_permession());
      dispatch(change_name(data))
      dispatch(login())
      dispatch(go_app())
    handleClick();
    })
        
   
    }



  return (
<div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='tc'>
        <br></br>

        <img style={{'width':'400px'}} src={img}></img>
        <br></br>
        <h2>Login..</h2>
        <br></br>
     
      <input placeholder='Username' {...register("username",{required: true})} />
      <br></br>
      <input type='password' placeholder='Password' {...register("password", { required: true })} />
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