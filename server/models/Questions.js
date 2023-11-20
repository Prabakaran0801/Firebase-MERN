import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
  answer: {
    type: String,
    require: true,
    min: 2,
  },
  question: {
    type: String,
    require: true,
    min: 2,
  },
  tags: {
    type: Array,
    default: [],
  },
  category: {
    type: Array,
    default: [],
  },
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
