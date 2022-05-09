import React from "react";
import { useForm } from "react-hook-form";
import 'tachyons';
import img from './kick-start.jpeg' ;
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { change_name,go_app,login } from "./actions";
//var bcrypt =require('bcryptjs');
//var salt = bcrypt.genSaltSync(10);



export default function Register() {
const name = useSelector(state => state.name);

  const dispatch = useDispatch();

const navigate = useNavigate();
  const handleClick1 = () => {
    navigate(`/`);
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => createBlogPost(data);

   function createBlogPost({username,password}) {
    return fetch('http://localhost:3001/Register', {
        method: 'POST',
        body: JSON.stringify({username:username,
            password:password}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.status >=200 && response.status< 300)
            handleClick1(username);
            return response.json()
    } 
       )
    .then(data=>{
        alert(data)
        dispatch(change_name(data));
        dispatch(login());
        dispatch(go_app());

    });
    

    
    }



  return (
      <div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='tc'>
        <br></br>

        <img style={{'width':'400px'}} src={img}></img>
        <br></br>
        <h2>Register</h2>
        <br></br>
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder='Username' {...register("username",{required: true})} />
      <br></br>
      {/* include validation with required or other standard HTML validation rules */}
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