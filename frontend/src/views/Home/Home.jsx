import Container from "react-bootstrap/esm/Container";
import Title from "../../Components/Titlte/Title";
import ProjectList from "../../Components/ProjectList/ProjectList";
import { useEffect, useState } from "react";
import ProjectsService from "../../Services/ProjectsService.ts";
import CustomToast from "../../Components/ToastSuccess/ToastSuccess";
function Home() {
  const [projects, setProjects] = useState([]);
  const [toastResponse, setToastResponse] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const isAdmin = localStorage.getItem("role") === "ADMIN";

  const handleDeleteProject = (id) => {
    ProjectsService.deletProject(id)
      .then((res) => {
        setProjects(projects.filter((project)=> project.id != id))
        setToastResponse("success");
        setToastMessage("");
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
    if (isAdmin) {
      ProjectsService.getProjects()
        .then((res) => {
          setProjects(res);
          setToastResponse("success");
          setToastMessage("");
        })
        .catch((err) => {
          setToastResponse("danger");
          setToastMessage(err.message);
        })
        .finally(() => {
          setShowToast(true);
        });
    } else {
      ProjectsService.getMyProjects()
        .then((res) => {
          setProjects(res);
          setToastResponse("success");
          setToastMessage("");
        })
        .catch((err) => {
          setToastResponse("danger");
          setToastMessage(err.message);
        })
        .finally(() => {
          setShowToast(true);
        });
    }
  }, []);

  return (
    <Container>
      <Title title={"List of projects"}></Title>
      <ProjectList
        projects={projects}
        isAdmin={isAdmin}
        handleDeleteProject={handleDeleteProject}
      ></ProjectList>
      <CustomToast
        toastType={toastResponse}
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
      ></CustomToast>
    </Container>
  );
}
export default Home;
