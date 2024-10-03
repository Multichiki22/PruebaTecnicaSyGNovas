import { Container } from "react-bootstrap";
import MyTasks from "../../Components/MyTasks/MyTasks";
import { useEffect, useState } from "react";
import TaskService from "../../Services/TasksServices.ts";
import CustomToast from "../../Components/ToastSuccess/ToastSuccess";

const AllMyTasks = () => {
  const [toastResponse, setToastResponse] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [tasks, setTasks] =useState([])

  useEffect(() => {
    TaskService.getMyTask()
      .then((res) => {
        setTasks(res)
        setToastResponse("success");
        setToastMessage(res.message || "");
      })
      .catch((err) => {
        setToastResponse("danger");
        setToastMessage(err.message);
      })
      .finally(() => {
        setShowToast(true);
      });
  }, []);

  return (
    <Container>
      <MyTasks tasks={tasks} />
      <CustomToast
        toastType={toastResponse}
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        
      />
    </Container>
  );
};
export default AllMyTasks;
