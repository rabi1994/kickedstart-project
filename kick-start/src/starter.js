import React from 'react';
import { ButtonGroup ,Button} from '@mui/material';
import 'tachyons'
import './starter.css'
import App from'./App';
import Home from './Home'
function GuestFunc(){
     return Home();
}
const Starter=() =>{

return(
    <div className='tc'>
        <h1>Kick Start 2022!</h1>
    <ButtonGroup size='large' variant="contained" aria-label="outlined primary button group">
        <Button id='entrence' onClick={GuestFunc} className='grow' color='info'>enter as a Guest</Button>
        <Button id='entrence' className='grow' color='info'>Log in</Button>
        <Button id='entrence' className='grow' color='info'>Register</Button>
    </ButtonGroup>  
    <br></br>
    <br></br>
    <hr></hr>
    <h4>powered by:</h4>
    <h5>Ben bronstein</h5>
    <h5>Rabi Rabi</h5>
    </div>
)
}
export default Starter;