const serverStore = require("./../serverStore");
const uuid = require("./../controllers/uuid")
const newConnectionHandler = async (socket) =>{
    const userDetails = socket;
    const id = uuid?.getId();
    serverStore.addNewConnectedUser({
        socketId:id,
        user_id:userDetails?.user_id,
    })
}

module.exports = newConnectionHandler;