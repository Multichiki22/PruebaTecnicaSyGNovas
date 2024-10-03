import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

function Inivtation() {
  const navigate = useNavigate()
  return (
    <div style={{display: "flex", gap: "2%", justifyContent: "center"}}>
      <h3>You dont have any task, feel free to create one:</h3>
      <Button onClick={()=>{navigate("/create")}}>Create new task</Button>
    </div>
  );
}
export default Inivtation
