export const change_name = (name) =>{
    return{
    type:'CHANGENAME',
    payload:name
    };

};

export const go_start = ()=>{
    return{
        type:'START'
    };
};export const go_login = ()=>{
    return{
        type:'LOGIN'
    };
};export const go_register = ()=>{
    return{
        type:'REGISTER'
    };
};export const go_app = ()=>{
    return{
        type:'APP'
    };
};


export const remove_permession = ()=>{
    return{
        type:'REMOVE_PERMESSION'
    };
};
export const change_permession = () =>{
    return{
    type:'CHANGE_PERMESSION'
    };

};

export const login = () =>{
    return{
    type:'LOGIN'
    };

};

export const logout = () =>{
    return{
    type:'LOGOUT'
    };

};

export const nothing = () =>{
    return{
    type:'NOTHING'
    };

};