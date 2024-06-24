const ChannelsCrud = require("./ChannelsCrud");


exports.controllers = {
    AddChannels: ChannelsCrud.AddChannels,
    AddChannelsController: ChannelsCrud.AddChannelsController,
    GetChannelsController: ChannelsCrud.GetChannelsController,
    GetChannels: ChannelsCrud.GetChannels,

}