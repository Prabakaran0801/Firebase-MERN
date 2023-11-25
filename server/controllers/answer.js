import mongoose from "mongoose";
import Question from "../models/Questions.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answer } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavilable...");
  }

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(_id, {
      answre: answer,
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json("Error while updating");
  }
};

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answere unavailable...");
  }
  try {
    await Question.updateOne(
      { _id },
      {
        $pull: {
          answer: { _id: answerId },
        },
      }
    );
    res.status(200).json({ message: "Successfilly deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};
