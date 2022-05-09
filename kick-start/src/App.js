import './App.css';
import img from './kick-start.jpeg' ;
import Bar from './Bar';
import { useForm } from "react-hook-form";
import { useNavigate,Routes, Route } from "react-router-dom";
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { ButtonGroup ,Button} from '@mui/material';
import AddProject from './addProject';
import Project from './Project';
import { useEffect, useState } from 'react';
import {useSelector , useDispatch} from 'react-redux'
import {change_name,go_app,go_login,go_register,logout,login,nothing,change_permession} from './actions'


function App({type}) {
const name = useSelector(state=>state.name);
const place = useSelector(state=>state.places);


const dispatch = useDispatch();

const [button,setButton] = useState('')
function GuestFunc(){
  dispatch(go_app());
  dispatch(logout())
}
function loginFunc(){
  dispatch(go_login());
  dispatch(nothing())
  
  setButton('log out')
}
function signupFunc(){
  dispatch(nothing())
  dispatch(go_register());
  setButton('log out')
}

useEffect(()=>{
if(name === 'Admin')
dispatch(change_permession(true));

},[name])
//login 
const navigate =useNavigate();

function handleClick(name){
  dispatch(change_name(name))
  navigate('/')
}
const { register, handleSubmit, watch, formState: { errors } } = useForm();
const onSubmit1 = data => createBlogPost1(data);
const onSubmit2 = data => createBlogPost2(data);

 function createBlogPost1({username,password}) {
  return fetch('http://localhost:3001/Login', {
      method: 'POST',
      body: JSON.stringify({username:username,
          password:password}),
          headers: {
              'Content-Type': 'application/json'
          }
     
  }).then(response =>{
    if(response.status >=200 && response.status<300)
      return response.json()
  } )
  .then(data =>{ 
    if(data !=='no username' && data !='fail')
    {
    alert(data)
    if(data == 'Admin')
        dispatch(change_permession());
    dispatch(change_name(data))
    dispatch(login())
    dispatch(go_app());

    }
    else{
      alert('please try again!')
    }
  })
      
 
  }
  function createBlogPost2({username,password}) {
    return fetch('http://localhost:3001/Register', {
        method: 'POST',
        body: JSON.stringify({username:username,
            password:password}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.status >=200 && response.status< 300)
            return response.json()
    } 
       )
    .then(data=>{
      alert(data)
      
        dispatch(login())
      dispatch(change_name(data))
      dispatch(go_app());
    });
    

    
    }







  return (
    <div>
    <Bar />
      {place === 'start' && (
       
         <div className='tc'>
              <h1>Kick Start 2022!</h1>
          <ButtonGroup size='large' variant="contained" aria-label="outlined primary button group">
              <Button id='interence' onClick={GuestFunc} className='grow' color='info'>enter as a Guest</Button>
              <Button  id='interence' onClick={loginFunc} className='grow' color='info'>Log in</Button>
              <Button id='interence' onClick={signupFunc} className='grow' color='info'>Register</Button>
          </ButtonGroup>  
          <br></br>
          <br></br>
          <hr></hr>
          <h4>powered by:</h4>
          <h5>Rabi Rabi</h5>
     </div>
      )}
   {place === 'app' && (<div>
    
  
      <Routes>
      <Route path={`/`} element={<Home  name={name} place={place} button={button}/>}/>
      <Route path={`/project/:id`} element={<Project />}/>
      <Route path={`/Register`} element={<Register />}/>
      <Route path={`/Login`} element={<Login />}/>
      <Route path={`/addProject`} element={<AddProject name={name} />}/>

      </Routes>
   </div>
   )}

  {place === 'login' &&(
    <div>
    <form onSubmit={handleSubmit(onSubmit1)}>
        <div className='tc'>
        <br></br>

        <img style={{'width':'400px'}} src={img}></img>
        <br></br>
        <h2>Login</h2>
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
  )}
  {place === 'register' && (
    <div>
  <form onSubmit={handleSubmit(onSubmit2)}>
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
  )}

   </div>
  );
}

export default App;
