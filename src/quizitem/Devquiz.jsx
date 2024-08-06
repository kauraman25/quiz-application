/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
const Devquiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeleft, setTimeleft] = useState(60);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const apiUrl = "https://quizapi.io/api/v1/questions";
  const apiKey = "UjuItugZHwvSYZtWbsxAVc2YBDP3XclJqTHY42RC";
  const category = "DevOps";
  const limit = 10;
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
        console.log("Data:", response.data);
        setQuestions(response.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (timeleft > 0 && !quizComplete) {
      const timer = setTimeout(() => {
        setTimeleft(timeleft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      if (!quizComplete) {
        submitquiz();
      }
    }
  }, [timeleft, quizComplete]);
  const submitquiz = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setQuizComplete(true);
  };
  const handleCorrect = (answer) => {
    const updateAnswers = [...selectedAnswers];
    updateAnswers[currentIndex] = answer;
    setSelectedAnswers(updateAnswers);
  };
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitquiz();
    }
  };
  if (loading) {
    return <p>loading...</p>;
    
  }
  return (
    <>
      <Navbar />
      <Box p={4} mt={15}>
        <Typography variant="h6">
          Timer : {Math.floor(timeleft / 60)} :{" "}
          {(timeleft % 60).toString().padStart(2, "0")}
        </Typography>
        <Typography variant="h6">
          Total No. Of Questions : {questions.length}
        </Typography>

        {quizComplete ? (
          <Box mt={3}>
            <Typography>Quiz Completed</Typography>
            <Typography>
              Score : {score} / {questions.length}{" "}
            </Typography>
          </Box>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Question {currentIndex + 1}
              </Typography>
              <Typography variant="body1" paragraph>
                {questions[currentIndex].question}
              </Typography>
              <ul>
                {Object.entries(questions[currentIndex].answers).map(
                  ([key, answer]) =>
                    answer && (
                      <li key={key} style={{ listStyle: "none" }}>
                        <Button
                          variant="text"
                          onClick={() => handleCorrect(key)}
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
              Next Question
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Devquiz;
