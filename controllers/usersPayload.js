const usersPayload = (item) =>{
    const payload = {
        user_id:item?._id,
        id:item?._id,
        email:item?.email,
        username:item?.username,
        profile_url:item?.profile_url?item?.profile_url:null,
        first_name:item?.first_name?item?.first_name:null,
        last_name:item?.last_name?item?.last_name:null,
        username:item?.last_name?item?.last_name:null,
    }
    return payload;
}
module.exports = usersPayload;