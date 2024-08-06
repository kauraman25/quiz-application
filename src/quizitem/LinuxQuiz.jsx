/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Navbar from "../component/Navbar";
const LinuxQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 10 minutes in seconds
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [score, setScore] = useState(0)
  const apiKey = "UjuItugZHwvSYZtWbsxAVc2YBDP3XclJqTHY42RC";
  const limit = 10;
  const category = "Linux";
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
        console.log("object", response.data);
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      if (!quizCompleted) {
        submitQuiz();
      }
    }
  }, [timeLeft, quizCompleted]);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitQuiz();
    }
  };
  const handleCorrect =(answer) => {
    const updateAnswers = [...selectedAnswers];
    updateAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updateAnswers);
  }

  const submitQuiz = () => {
    let totalScore = 0;
    questions.forEach((questions,index) => {
      if(selectedAnswers[index] === questions.correct_answer){
        totalScore++;
      }
    });
    setScore(totalScore)
    setQuizCompleted(true);
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Navbar />
      <Box  p={2} mt={11}>
        <Typography variant="h6" >
          Time left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </Typography>
        <Typography variant="h6" >
          Total Questions: {questions.length}
        </Typography>
        {quizCompleted ? (
          <Box  mt={4}>
            <Typography variant="h4" >
              Quiz Completed!
            </Typography>
            <Typography>Score : {score}/{questions.length}</Typography>
          </Box>
        ) : (
          <Card >
            <CardContent>
              <Typography variant="h5" gutterBottom >
                Question {currentQuestionIndex + 1}
              </Typography>
              <Typography variant="body1" paragraph >
                {questions[currentQuestionIndex].question}
              </Typography>
              <ul>
                {Object.entries(questions[currentQuestionIndex].answers).map(([key, answer]) => 
                  answer && (
                    <li key={key} style={{listStyle:"none"}}>
                      <Button variant="text" onClick={() => handleCorrect(key)} >{answer}</Button>
                    </li>
                  )
                )}
                
              </ul>
            </CardContent>
          </Card>
        )}
        {!quizCompleted && (
          <Box mt={2} >
            <Button onClick={nextQuestion} variant="contained" color="primary">
              Next Question
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default LinuxQuiz;
