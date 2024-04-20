const userPayload = (user) =>{
    const payload = {}
    if(user?._id){
        payload.user_id = user._id
    }
    if(user?.user_id){
        payload.user_id = user.user_id
    }
    if(user?.profile_url){
        payload.profile_url = user.profile_url
    }
    if(user?.email){
        payload.email = user.email
    }
    if(user?.username){
        payload.username = user.username
    }
    if(user?.first_name){
        payload.first_name = user.first_name
    }
    if(user?.last_name){
        payload.last_name = user.last_name
    }
    if(user?.social_links){
        payload.social_links = user.social_links
    }
    if(user?.date_of_birth){
        payload.date_of_birth = user.date_of_birth
    }
    if(user?.description){
        payload.description = user.description
    }
    if(user?.address){
        payload.address = user.address
    }
    if(user?.city){
        payload.city = user.city
    }
    if(user?.state){
        payload.state = user.state
    }
    if(user?.country){
        payload.country = user.country
    }
    if(user?.pincode){
        payload.pincode = user.pincode
    }
    if(user?.personal_link){
        payload.personal_link = user.personal_link
    }
    if(user?.phone){
        payload.phone = user.phone
    }
    if(user?.created_at){
        payload.created_at = user.created_at
    }
    if(user?.updated_at){
        payload.updated_at = user.updated_at
    }
    if(user?.resume){
        payload.resume = user.resume
    }
    if(user?.is_admin){
        payload.is_admin = user.is_admin
    }
    if(user?.user_type){
        payload.user_type = user.user_type
    }
    return payload;
}
module.exports = userPayload;