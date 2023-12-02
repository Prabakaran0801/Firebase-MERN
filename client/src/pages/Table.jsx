import { React, useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";
// import { Pagination } from "../components/Paginator";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const QuestionTable = () => {
  const [questions, setQuestion] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/questions/details?page=${pageNumber}`)
      .then((response) => {
        const { questionlist } = response.data;
        setQuestion(questionlist);
      })
      .catch((err) => console.log(err));
  }, [pageNumber]);

  // console.log(questions);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(pageNumber + 1));
  };

  // const gotoPage = (page) => {
  //   setPageNumber(page);
  // };

  // const renderPaginationButtons = () => {
  //   const buttons = [];
  //   for (let i = 0; i < numberOfPages; i++) {
  //     buttons.push(
  //       <Button
  //         key={i}
  //         onClick={() => gotoPage(i)}
  //         variant={i === pageNumber ? "solid" : "outline"}
  //         colorScheme="teal"
  //       >
  //         {i + 1}
  //       </Button>
  //     );
  //   }
  //   return buttons;
  // };

  const navigate = useNavigate();

  return (
    <>
      <div>
        <TableContainer m={20}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>S.NO</Th>
                <Th>Type</Th>
                <Th>Question</Th>
                <Th>Category</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(questions) && questions.length > 0 ? (
                questions.map((question, index) => (
                  <Tr key={questions._id}>
                    <Td>{index + 1}</Td>
                    <Td>{question.type}</Td>
                    <Td
                      dangerouslySetInnerHTML={{
                        __html: question.questionTitle,
                      }}
                    />
                    <Td>{question.questionsCategory}</Td>
                    <Td>
                      <Link to={`/edit/${question._id}`}>
                        <Button colorScheme="blue">Edit</Button>
                      </Link>
                    </Td>
                    <Td>
                      {/* <Button
                        colorScheme="red"
                        onClick={() => handleDelete(question.id)}
                      >
                        Delete Document
                      </Button> */}
                    </Td>
                    <Td key="no-questions-found"></Td>
                  </Tr>
                ))
              ) : (
                <Td>No questions found</Td>
              )}
            </Tbody>
          </Table>

          {/* <Button
          m="5"
          float="left"
          onClick={() => {
            navigate("/form");
          }}
        >
          Back
        </Button> */}
          <Button
            m="5"
            colorScheme="blue"
            onClick={() => {
              navigate("/create");
            }}
          >
            Create
          </Button>
          <Box ml={"10"}>
            <Button mr={"2"} onClick={gotoPrevious}>
              Previous
            </Button>
            {/* {renderPaginationButtons()} */}
            <Button onClick={gotoNext}>Next</Button>
          </Box>
        </TableContainer>
      </div>
    </>
  );
};

export default QuestionTable;
