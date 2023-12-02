import Question from "../models/Questions.js";
import mongoose from "mongoose";

export const askQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const postQuestion = new Question(postQuestionData);

  try {
    await postQuestion.save();
    res.status(200).json("Question posted successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Could't post a new question");
  }
};

export const getAllQuestion = async (req, res) => {
  const PAGE_SIZE = 5;
  const page = parseInt(req.query.page || "0");
  try {
    const total = await Question.countDocuments({});
    const questionlist = await Question.find()
      .skip(PAGE_SIZE * page)
      .limit(PAGE_SIZE);
    res.status(200).json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      questionlist,
    });
  } catch (error) {
    res.status(404).json({ message: error.meassage });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavilable...");
  }

  try {
    await Question.findByIdAndRemove(_id);
    res.status(200).json({ message: "Question successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
