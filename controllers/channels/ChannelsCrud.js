const Channels = require("../../models/Channels");
const uuid = require("uuid");

const AddChannelsController = async (req, res) =>{
    const body = {
        channel_name: req.body?.channel_name,
        created_by: req?.user?.user_id,
        channel_id: uuid.v4()
    };
    try {
        // return { status: 400, message: 'Failed to create channel.', body: body};
        const channel = new Channels(body);
        await channel.save();
        return { status: 200, data: channel };
    } catch (error) {
      return { status: 400, message: 'Failed to create channel.', error: error };
    }
}
const GetChannelsController = async (req, res) =>{
    const { page = 1, limit = 20, search = "" } = req;
    try {
        const channels = await Channels.find({ created_by: req?.user?.user_id })
        .sort({ updated_at: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
        if (!channels || channels.length === 0) {
            return  { status: 400, message: 'No channels found' };
        }
        const total_records = await Channels.countDocuments({ created_by: req?.user?.user_id });

        const pagination = {
            total_records,
            limit: parseInt(limit),
            page: parseInt(page),
            total_pages: Math.ceil(total_records / limit),
        };
        return { status: 200, data: { data: channels, pagination }};
    } catch (error) {
      return { status: 400, message: 'No channels found' };
    }
}
const AddChannels = async (req, res) =>{
    const response = await AddChannelsController(req, res);
    res.status(response?.status).json(response);
}
const GetChannels = async (req, res) =>{
    const payload = req.body || req.query;
    payload.user = req?.user;
    const response = await GetChannelsController(payload, res);
    res.status(response?.status).json(response);
    // res.status(300).json({ payload: payload, query: req.query});
}
module.exports = {
    AddChannels: AddChannels,
    AddChannelsController: AddChannelsController,
    GetChannelsController: GetChannelsController,
    GetChannels: GetChannels,

};
