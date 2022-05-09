const places = (state = 'start' , action) =>{
    switch(action.type){
        case 'START':
            return 'start';
        case 'LOGIN':
            return 'login';
        case 'REGISTER':
            return 'register';
        case 'APP':
            return 'app';
        default:
            return state;
    }
}

export default places;