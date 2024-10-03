import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminProjectButtons from "../AdminProjectButtons/AdminProjectButtons";
import dateExtractor from "../../utils/dateExtractor";

const ProjectColumn = ({ project, isAdmin = false, handleDeleteProject }) => {
  const navigate = useNavigate();
  return (
    <Col md={4} key={project.id}>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Text>{project.description}</Card.Text>
          <Card.Text
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <small className="text-muted">In charge:</small>
            <small className="text-muted">{" " + project.user.email}</small>
          </Card.Text>

          <Card.Text>
            <small className="text-muted">
              {"Start: " + dateExtractor(project.dateOfStart)}
            </small>
            <br />
            <small className="text-muted">
              End: {dateExtractor(project.dateOfEnd) || " Still in progress"}
            </small>
          </Card.Text>
          <div
            style={
              isAdmin
                ? { display: "flex", justifyContent: "space-between" }
                : {}
            }
          >
            <Button
              variant="info"
              onClick={() => {
                navigate(`/project/${project.id}`);
              }}
              className="me-2"
            >
              Ver Detalles
            </Button>
            {isAdmin && (
              <AdminProjectButtons projectId={project.id} handleDelete={handleDeleteProject}/>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProjectColumn;
