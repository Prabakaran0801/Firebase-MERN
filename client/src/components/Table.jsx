import { React, useState, useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/Firebase";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const QuestionTable = () => {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/question")
      .then((question) => setQuestion(question.data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(question);

  const navigate = useNavigate();

  // Delete the document
  const handleDelete = async (id) => {
    const questionDelete = doc(db, "questions", id);
    await deleteDoc(questionDelete);
  };

  return (
    <div>
      <TableContainer m={20}>
        <Button
          m="5"
          colorScheme="blue"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>S.NO</Th>
              <Th>Type</Th>
              <Th>Question</Th>
              <Th>Answere</Th>
              <Th>Category</Th>
              <Th>Tags</Th>
            </Tr>
          </Thead>
          <Tbody>
            {question.map((question, index) => (
              <Tr key={question.id}>
                <Td>{index + 1}</Td>
                <Td>{question.type}</Td>
                <Td> {question.questionTitle}</Td>
                <Td>{question.answer}</Td>
                <Td>{question.questionsCategory}</Td>
                {Array.isArray(question.questionsTags) &&
                  question.questionsTags.map((questionsTags) => (
                    <Td>
                      <Badge colorScheme="green">{questionsTags}</Badge>
                    </Td>
                  ))}
                <Td>
                  <Link to={`/edit/${question.id}`}>
                    <Button colorScheme="blue">Edit</Button>
                  </Link>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete Document
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button
          m="5"
          float="left"
          onClick={() => {
            navigate("/form");
          }}
        >
          Back
        </Button>
      </TableContainer>
    </div>
  );
};

export default QuestionTable;
