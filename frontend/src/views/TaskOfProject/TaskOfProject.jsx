import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectsService from "../../Services/ProjectsService.ts";
import CustomToast from "../../Components/ToastSuccess/ToastSuccess";
import TaskService from "../../Services/TasksServices.ts";
import TaskByProject from "../../Components/TaskByProject/TaskByProject.jsx";
function TaskOfProject() {
  let { id } = useParams();
  const [projectInfo, setProjectInfo] = useState({});
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [toastState, setToastState] = useState("success");
  const [message, setMessage] = useState("");
  const isAdmin = localStorage.getItem("role") === "ADMIN";

  const fetchData = () => {
    ProjectsService.getProjectById(id)
      .then((data) => {
        setProjectInfo(data);
        setToastState("success");
        setMessage("");
      })
      .catch((error) => {
        setToastState("danger");
        setMessage(error.message);
      })
      .finally(() => {
        setShow(true);
      });

    if (isAdmin) {
      TaskService.getTaskByProject(id)
        .then((data) => {
          setTasks(data);
          setToastState("success");
          setMessage("");
        })
        .catch((error) => {
          setToastState("danger");
          setMessage(error.message);
        })
        .finally(() => {
          setShow(true);
        });
    } else {
      TaskService.getMyTaskByProject(id)
        .then((data) => {
          console.log(data);
          
          setTasks(data);
          setToastState("success");
          setMessage("");
        })
        .catch((error) => {
          setToastState("danger");
          setMessage(error.message);
        })
        .finally(() => {
          setShow(true);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Container>
      <TaskByProject project={projectInfo} tasks={tasks} isAdmin={isAdmin} />
      <CustomToast
        show={show}
        setShow={setShow}
        toastType={toastState}
        message={message}
      />
    </Container>
  );
}
export default TaskOfProject;
