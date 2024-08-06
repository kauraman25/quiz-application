/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Navbar from "../component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const DockerQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(60);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const apiKey = "UjuItugZHwvSYZtWbsxAVc2YBDP3XclJqTHY42RC";
  const limit = 10;
  const category = "Docker";
  const apiUrl = "https://quizapi.io/api/v1/questions";
  

  useEffect(() => {
    axios
      .get(apiUrl, {
        params: {
          apiKey: apiKey,
          limit: limit,
          category: category,
        },
      })
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (timer > 0 && !quizComplete) {
      const timerRun = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timerRun);
    } else if (!quizComplete) {
      submitQuiz();
    }
  }, [timer, quizComplete]);

  function submitQuiz() {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setQuizComplete(true);
  }

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitQuiz();
    }
  };

  if (loading) {
    return <p>loading.....</p>;
  }

  return (
    <>
      <Navbar />
      <Box p={4} mt={15}>
        <Typography variant="h6">
          Timer: {Math.floor(timer / 60)} :{" "}
          {String(timer % 60).padStart(2, "0")}
        </Typography>
        <Typography variant="h6">
          Total questions: {questions.length}
        </Typography>

        {quizComplete ? (
          <Box>
            <Typography variant="h5">Quiz Complete</Typography>
            <Typography variant="h5">
              Score: {score} / {questions.length}
            </Typography>
          </Box>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">Question: {currentIndex + 1}</Typography>
              <Typography variant="body1">
                {questions[currentIndex].question}
              </Typography>
              <ul>
                {Object.entries(questions[currentIndex].answers).map(
                  ([key, answer]) =>
                    answer && (
                      <li style={{listStyle:"none"}} key={key}>
                        <Button
                          variant="text"
                          onClick={() => handleAnswerSelect(key)}
                        >
                          {answer}
                        </Button>
                      </li>
                    )
                )}
              </ul>
            </CardContent>
          </Card>
        )}
        {!quizComplete && (
          <Box mt={2}>
            <Button onClick={nextQuestion} variant="contained" color="primary">
              Next
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DockerQuiz;
