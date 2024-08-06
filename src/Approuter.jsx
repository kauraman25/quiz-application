import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import LogIn from "./component/LogIn";
import { createContext, useState } from "react";
import ReadMore from "./component/ReadMore";
import TakeQuiz from "./component/TakeQuiz";
import LinuxQuiz from "./quizitem/LinuxQuiz";
import Devquiz from "./quizitem/Devquiz";
import DockerQuiz from "./quizitem/DockerQuiz";


export const Authentication = createContext();
const Approuter = () => {
  const [loggedin, setloggedin] = useState(false);
  const [username, setUsername] = useState("");
  function login(username, password) {
    if (password === password) {
      setloggedin(true);
      setUsername(username);
    } else {
      alert("please enter correct password");
    }
  }
  function logout() {
    setloggedin(false);
    setUsername("");
  }
  return (
    <>
      <Authentication.Provider value={{ loggedin, username, login, logout }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/readmore" element={<ReadMore />} />
            <Route path="/takequiz" element={<TakeQuiz />} />
            <Route path="/linuxquiz" element={<LinuxQuiz />} />
            <Route path="/devquiz" element={<Devquiz />} />
            <Route path="/dockerquiz" element={<DockerQuiz />} />

          </Routes>
        </BrowserRouter>
      </Authentication.Provider>
    </>
  );
};

export default Approuter;
