const groupMessagePayload = (user) =>{
    const payload = {}
    if(user?.group_id){
        payload.group_id = user.group_id
    }
    if(user?._id){
        payload.chat_id = user._id
    }
    if(user?.message){
        payload.message = user.message
    }
    if(user?.chat_type){
        payload.chat_type = user.chat_type
    }
    if(user?.device_id){
        payload.device_id = user.device_id
    }
    if(user?.message_type){
        payload.message_type = user.message_type
    }
    if(user?.sender_name){
        payload.sender_name = user.sender_name
    }
    if(user?.sender_id){
        payload.sender_id = user.sender_id
    }
    if(user?.is_deleted){
        payload.is_deleted = user.is_deleted
    }
    if(user?.seen){
        payload.seen = user.seen
    }
    if(user?.delivered){
        payload.delivered = user.delivered
    }
    if(user?.updated_at){
        payload.updated_at = user.updated_at
    }
    if(user?.created_at){
        payload.created_at = user.created_at
    }
    return payload;
}
module.exports = groupMessagePayload;