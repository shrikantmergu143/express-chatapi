const connectUsers = new Map();

const addNewConnectedUser = ({ socketId, userId}) =>{
     connectUsers.set(socketId, {userId});
}

module.exports = {
    addNewConnectedUser,
}