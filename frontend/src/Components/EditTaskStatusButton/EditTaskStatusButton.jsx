import { Button } from "react-bootstrap";
import TaskService from "../../Services/TasksServices.ts";
import { useState } from "react";
import CustomToast from "../ToastSuccess/ToastSuccess.jsx";

const EditTaskStatusButton = ({ taskId, taskStatus, setTaskState }) => {
  const [toastResponse, setToastResponse] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const getButtonText = (taskStatus) => {
    if (taskStatus == "PENDIENTE") return "Start";
    else if (taskStatus == "EN_PROGRESO") return "Complete";
    else if (taskStatus == "COMPLETADA") return "Set in progress";
    else return "Test";
  };

  const onUpdateTaskStatus = (taskId, taskStatus) => {
    let newTaskStatus = "";
    switch (taskStatus) {
      case "PENDIENTE":
        newTaskStatus = "EN_PROGRESO";
        break;
      case "EN_PROGRESO":
        newTaskStatus = "COMPLETADA";
        break;
      case "COMPLETADA":
        newTaskStatus = "EN_PROGRESO";
        break;
      default:
        newTaskStatus = "EN_PROGRESO";
    }

    TaskService.updateTaksState(taskId, {state: newTaskStatus})
      .then((res) => {
        setToastResponse("success");
        setToastMessage(res.message || "");
        setTaskState(newTaskStatus)
      })
      .catch((err) => {
        setToastResponse("danger");
        setToastMessage(err.message);
      })
      .finally(() => {
        setShowToast(true);
      });
  };

  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        className="me-2"
        onClick={() => onUpdateTaskStatus(taskId, taskStatus)}
      >
        {getButtonText(taskStatus)}
      </Button>
      <CustomToast
        toastType={toastResponse}
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
      />
    </>
  );
};

export default EditTaskStatusButton;
