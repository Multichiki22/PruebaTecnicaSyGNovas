import Home from "./views/Home/Home";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Welcome from "./views/Welcome/Welcome";
import { useEffect } from "react";
import Login from "./views/Login/Login";
import "./App.css";
import TaskOfProject from "./views/TaskOfProject/TaskOfProject";
import CreateProjectView from "./views/CreateProject/CreateProject";
import EditProject from "./views/EditProject/EditProject";
import CreateTask from "./views/CreateTask/CreateTask";
import AllMyTasks from "./views/AllMyTasks/AllMyTasks";

function App() {
  const location = useLocation()
const navigate = useNavigate()
  let isAuthenticated = false; 
  if (
    !!localStorage &&
    !!localStorage.accessToken &&
    !!localStorage.user
  ) {
    isAuthenticated = true;
  }
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="App">
      {location.pathname !== "/login" && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/LogIn" element={<Login />} />
        <Route exact path="/projects" element={<Home/>} />
        <Route exact path="/project/:id" element={<TaskOfProject />} />
        <Route exact path="/editproject/:projectId" element={<EditProject />} />
        <Route exact path="/createProject" element={<CreateProjectView />} />
        <Route exact path="/createTask/:projectId" element={<CreateTask />} />
        <Route exact path="/Tasks" element={<AllMyTasks />} />
      </Routes>
    </div>
  );
}

export default App;
