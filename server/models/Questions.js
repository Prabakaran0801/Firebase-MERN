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
  questionTitle: {
    type: String,
    require: true,
    min: 2,
  },
  questionsTags: {
    type: [String],
    required: "Question must have Tags",
  },
  questionsCategory: {
    type: [String],
    required: "Question must have Category",
  },
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
