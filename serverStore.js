const connectUsers = new Map();

const addNewConnectedUser = (props) =>{
    const { socketId, user_id} = props
     connectUsers.set(socketId, {user_id});
}

module.exports = {
    addNewConnectedUser,
}