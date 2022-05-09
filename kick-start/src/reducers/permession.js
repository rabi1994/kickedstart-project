const permission = (state = false , action) =>{
    switch(action.type){
        case 'CHANGE_PERMESSION':
            return true;
        case 'REMOVE_PERMESSION':
            return false;
        default:
            return state;
    }
}

export default permission;