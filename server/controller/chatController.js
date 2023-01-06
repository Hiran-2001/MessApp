const asyncHandler = require("express-async-handler");
const chatModels = require("../models/chatModels");
const userModel = require("../models/userModel");


// creating or accessing chat 

exports.accessChat = asyncHandler(async (req, res) => {

    const { userId } = req.body
    console.log(userId);
    console.log(req.user);
    if (!userId) {
        console.log("userId param not sent with request");
        return res.status(400)
    }

    let isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
        .populate("users", "-password").populate("latestMessage");

    isChat = await userModel.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        let chatData = {
            chatName: "Sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await chatModel.create(chatData)

            const fullChat = await chatModel.findOne({ _id: createdChat._id })
                .populate(
                    "users",
                    "-password"
                )
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(401)
            throw new Error(error.message)
        }
    }

})


// fetching all chat messages 

exports.fetchChat = asyncHandler(async (req, res) => {
    try {
        chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updateAt: -1 })
            .then(async (results) => {
                results = await userModel.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                })

                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})


// create a groupChat 

exports.createGroupChat = asyncHandler(async (req, res) => {

    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the fields" })
    }

    let users = JSON.parse(req.body.users)

    if (users.length < 2) {
        return res.status(400).send("More than 2 users are required to foem a group chat")
    }
    users.push(req.user)

    try {
        const groupChat = await chatModels.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const fullGroupChat = await chatModels.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).json(fullGroupChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})


// rename group 

exports.renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updateChat = await chatModels.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!updateChat) {
        res.status(404);
        throw new Error("Chat not found")
    } else {
        res.json(updateChat)
    }
})


exports.addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const added = await chatModels.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },

        },
        {
            new: true
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!added) {
        res.status(404);
        throw new Error("Chat not found")
    } else {
        
            res.json(added)
        
    }

})



exports.removeFromGroup=asyncHandler(async(req,res)=>{
        
    const { chatId, userId } = req.body;

    const remove = await chatModels.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },

        },
        {
            new: true
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!remove) {
        res.status(404);
        throw new Error("Chat not found")
    } else {
        
            res.json(remove)
        
    }
})