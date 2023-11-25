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
  try {
    const questionlist = await Question.find().sort({ askedon: -1 });
    res.status(200).json(questionlist);
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
