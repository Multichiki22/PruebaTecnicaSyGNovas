import Container from "react-bootstrap/esm/Container";
import ProjectForm from "../../Components/ProjectForm/ProjectForm";
import CustomToast from "../../Components/ToastSuccess/ToastSuccess";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../../Services/UserService.ts";
import ProjectsService from "../../Services/ProjectsService.ts";
function EditProject() {
  const { projectId } = useParams();
  const [userData, setUserData] = useState([]);
  const [toastResponse, setToastResponse] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [projectInfo, setProjectInfo] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    email: "",
  });

  useEffect(() => {
    userService
      .getUsersInfo()
      .then((data) => {
        setUserData(data);
      })
      .catch();
  }, []);

  useEffect(() => {
    ProjectsService.getProjectById(projectId).then((res) => {
      setProjectInfo(transformProjectData(res));
    });
  }, []);

  const formatDate = (date) => {
    if (!date) return ""; 
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  
  const transformProjectData = (originalData) => {
    return {
      name: originalData.name || "",  
      description: originalData.description || "",
      startDate: originalData.dateOfStart ? formatDate(originalData.dateOfStart) : "",
      endDate: originalData.dateOfEnd ? formatDate(originalData.dateOfEnd) : "",
      email: originalData.user?.email || "",  
    };
  };

  const editProject = (data) => {
    ProjectsService.editProject(projectId,data)
      .then((res) => {
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
      <ProjectForm
        usersList={userData}
        onSubmit={editProject}
        projectInfo={projectInfo}
        formType={"Edit"}
      ></ProjectForm>
      <CustomToast
        toastType={toastResponse}
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
      ></CustomToast>
    </Container>
  );
}
export default EditProject;
