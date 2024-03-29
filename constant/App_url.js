module.exports = {
    get_user:"/get",
    send_request:"/send_request",
    acceptedFriends:"/accepted-friends",
    ReceivedFriendRequests:"/received-friend-requests",
    FriendRequestUpdate:"/friend-request/:id/status",
    friend_request:"/friend-request",
    get_users:"/users",
    upload:"/upload",
    update_user:"/update",
    add_experience:"/add-experience",
    add_projects:"/add-projects",
    add_education:"/add-education",
    GetUser:"/get",
    api_auth:"/api/auth",
    api_user:"/api/user",
    api_list:"/api/list",
    storage:"/storage/*",
    register:"/register",
    login:"/login",
    message:"/api/message",
    api_message:"/api/message",
    api_friend:"/api/friend",
    api_group:"/api/group",
    friend_chat:"/chat-list",
    send_message:"/:friend_id/send",
    get_message:"/:friend_id/get_message",
    get_details:"/:friend_id/get_details",
    AddGroup:"/add-group",
    GetGroupsList:"/get",
    sendGroupMessage:"/:group_id/send",
    getGroupDetails:"/:group_id/get",
    getGroupMessage:"/:group_id/get_message",
}