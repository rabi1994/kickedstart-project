const name = (state = 'guest' , action) =>{
    switch(action.type){
        case 'CHANGENAME':
            return action.payload

        default:
            return state;
    }
}

export default name;