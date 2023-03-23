const Post = require("../models/post");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//get all stories
const getAllStories = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.json({ error });
  }
};

// get single stories

const getAStory = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById({ _id: postId });
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.json({ error });
  }
};

const getAllStoriesByUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const posts = await Post.find({ createdBy: userId });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.json({ error });
  }
};

const getAStoryByUser = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;
  try {
    const post = await Post.findOne({ _id: postId, createdBy: userId });
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.json({ error });
  }
};

const createStory = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "storyImages",
      }
    );
    req.body.image = result.secure_url;
    fs.unlinkSync(req.files.image.tempFilePath);
    req.body.createdBy = userId;
    const post = await Post.create({ ...req.body });
    res.status(201).json({ success: true, post });
  } catch (error) {
    res.json({ error });
  }
};

const updateStory = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;
  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
        createdBy: userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.json({ error });
  }
};

const deleteStory = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;
  try {
    const post = await Post.findOneAndDelete({
      _id: postId,
      createdBy: userId,
    });
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  getAStory,
  getAllStories,
  getAStoryByUser,
  getAllStoriesByUser,
  createStory,
  deleteStory,
  updateStory,
};
