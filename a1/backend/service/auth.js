// const sessionIdToUserMap = new Map(); //ststefull

const jwt = require('jsonwebtoken');
const secret= "rohank10";

function setUser(user){
    // sessionIdToUserMap.set(id,user);
    return jwt.sign({
        id : user._id,
        email : user.email,
        first_name : user.first_name,
        last_name : user.last_name,
        contact : user.contact,
        age : user.age,
        role : user.role
    },secret);
}

function getUser(token){
    // return sessionIdToUserMap.get(id);
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }catch(e){
        return null;
    }
}

module.exports = {setUser,getUser};