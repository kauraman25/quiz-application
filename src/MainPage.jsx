import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";

import Navbar from "./component/Navbar";
import { useNavigate } from "react-router-dom";
import { Authentication } from "./Approuter";
import { useContext } from "react";
const MainPage = () => {
  const {loggedin} = useContext(Authentication)
    const navigate = useNavigate();
    const handleLogin = () => {
      if(loggedin) {
        navigate('/readmore')
      }
      else{
        navigate('/login')
      }
    }
  return (
    <>
      <Navbar />
      <Box sx={{ background: "black", paddingBottom: "170px" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ color: "#fff", marginTop: "150px", marginLeft: "100px" }}>
            <Typography
              variant="h4"
              sx={{
                color: "#3cd458",
                fontWeight: "regular",
                fontSize: "30px",
                lineHeight: "50px",
              }}
            >
              The Quiz includes a wide number of Tech questions
            </Typography>
            <Typography variant="h5" sx={{ color: "#fff" }}>
              Test your knowledge
            </Typography>
            <Box>
              <Button onClick={() => navigate('/takequiz')}
                variant="contained"
                sx={{ background: "#3cd458", color: "black", marginTop:"30px",marginRight:"20px" }}
              >
                Take Quiz
              </Button>
              <Button
              onClick={handleLogin}
                variant="outlined"
                sx={{ borderColor: "#3cd458", color: "#fff", marginTop:"30px" }}
              >
               {loggedin ? "Read More" : "Log in"}
              </Button>
            </Box>
          </Box>
          <Box sx={{ color: "#fff", marginLeft: "90px", marginTop: "50px" }}>
            <ImageListItem>
              <img
                style={{ width: "70%" }}
                srcSet="https://quizapi.io/storage/pages/laptop-quizapi.png"
                src="https://quizapi.io/storage/pages/laptop-quizapi.png"
                alt="laptop"
                loading="lazy"
              />
            </ImageListItem>
          </Box>
        </Box>
      </Box>
      <Box  mt={9} mb={10}>
      <Typography sx={{textAlign:"center"}} variant="h5">Our Top Topics</Typography>
      <Typography sx={{textAlign:"center"}} variant="h6">Test your skills with our top topics with a variaty of questions set for beginners and seniors alike!</Typography>
        <Box sx={{display:"inline-flex"}} mt={9} >
         
          <Card
          onClick={() => navigate('/linuxquiz')} sx={{marginRight: "50px", marginLeft:"350px"}}
          >
            <CardMedia
            component="img"
            sx={{width:"170px"}}
            height="190"
             image="data:image/png;base64,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"
            />
          </Card>
          <Card sx={{marginRight: "50px"}} onClick={() => navigate('/devquiz')} >
            <CardMedia 
            component="img"
            sx={{width: "170px"}}
            height="190"
            image="data:image/png;base64,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"
            />
          </Card>
          <Card sx={{marginRight: "50px"}} onClick={() => navigate('/dockerquiz')} >
            <CardMedia 
            component='img'
            sx={{width:"170px"}}
            height="190"
            image="data:image/png;base64,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"
            />
          </Card>
          <Card>
            <CardMedia 
             component='img'
             sx={{width: "170px"}}
             height="190"
             image=""
            />
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
