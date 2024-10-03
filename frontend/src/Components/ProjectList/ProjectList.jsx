import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectColumn from "../ProjectColumn/ProjectColumn";
import NoItems from "../NoItems/NoItems";

const ProjectList = ({ projects = [], isAdmin = false, handleDeleteProject }) => {
  const navigate = useNavigate();

  return (
    <Container>
      {isAdmin && (
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => {
            navigate(`/createProject`);
          }}
        >
          Crear Proyecto
        </Button>
      )}
      <Row>
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectColumn project={project} isAdmin={isAdmin} handleDeleteProject={handleDeleteProject} />
          ))
        ) : (
          <NoItems entity={"projects"} />
        )}
      </Row>
    </Container>
  );
};

export default ProjectList;
