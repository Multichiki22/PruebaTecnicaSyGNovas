import Container from "react-bootstrap/esm/Container";
import ProjectForm from "../../Components/ProjectForm/ProjectForm.jsx";
import { useEffect, useState } from "react";
import userService from "../../Services/UserService.ts";
import ProjectsService from "../../Services/ProjectsService.ts";
import CustomToast from "../../Components/ToastSuccess/ToastSuccess.jsx";
function CreateProjectView() {
  const [userData, setUserData] = useState([]);
  const [toastResponse, setToastResponse] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    userService
      .getUsersInfo()
      .then((data) => {
        setUserData(data);
      })
      .catch();
  }, []);

  const createNewProject = (data) => {
    ProjectsService.createProject(data)
      .then((res)=>{
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
  };

  return (
    <Container className="pt-4">
      <ProjectForm usersList={userData} onSubmit={createNewProject} formType={"Create"}></ProjectForm>
       <CustomToast
        toastType={toastResponse}
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        
      />
    </Container>
  );
}
export default CreateProjectView;
