import { Container } from "react-bootstrap";
import CreateTaskForm from "../../Components/CreateTaskForm/CreateTaskForm";
import { useEffect, useState } from "react";
import userService from "../../Services/UserService.ts";
import { useParams } from "react-router-dom";
import TaskService from "../../Services/TasksServices.ts";
import CustomToast from "../../Components/ToastSuccess/ToastSuccess.jsx";

const CreateTask = () => {
  const { projectId } = useParams();
  const [userData, setUserData] = useState([]);
  const [toastResponse, setToastResponse] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleSubmit = (data) => {
    TaskService.createTask(data)
      .then((res) => {
        setToastResponse("success");
        setToastMessage("Task created successfully");
      })
      .catch((err) => {
        setToastResponse("danger");
        setToastMessage(err.message);
      })
      .finally(() => {
        setShowToast(true);
      });
  };

  useEffect(() => {
    userService
      .getUsersInfo()
      .then((data) => {
        setUserData(data);
      })
      .catch();
  }, []);

  return (
    <Container>
      <CreateTaskForm
        users={userData}
        onSubmit={handleSubmit}
        projectId={projectId}
      />
      <CustomToast
        toastType={toastResponse}
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
      ></CustomToast>
    </Container>
  );
};
export default CreateTask;
