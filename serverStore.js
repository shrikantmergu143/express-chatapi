const connectUsers = new Map();

const addNewConnectedUser = (props) => {
    const { socketId, user_id } = props;
    connectUsers.set(socketId, { user_id });
};

const removeConnectedUser = (socketId) => {
    connectUsers.delete(socketId);
};

const getAllConnectedUsers = () => {
    return Array.from(connectUsers.values());
};

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getAllConnectedUsers,
    connectUsers
};
