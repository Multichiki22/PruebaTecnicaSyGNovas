import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminProjectButtons = ({ projectId, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="warning"
        onClick={() => {
          navigate(`/editProject/${projectId}`);
        }}
      >
        Editar
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          handleDelete(projectId);
        }}
      >
        Borrar
      </Button>
    </div>
  );
};

export default AdminProjectButtons;
