const isLogged = (state = 2 , action) =>{
    switch(action.type){
        case 'LOGIN':
            return 1
        case 'LOGOUT':
            return 0;
        case 'NOTHING':
            return 2
        default:
            return state;
    }
}

export default isLogged;