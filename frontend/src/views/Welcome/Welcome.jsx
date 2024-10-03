import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate()
  return (
    <Container style={{display:"flex",justifyContent:"center", alignItems:"center",flexDirection:"column", height:"80vh", gap:"2%"}}>
      <div style={{backgroundColor: "#6997BF", display:"flex", flexDirection:"column", alignItems:"center", padding: "5%", borderRadius:"1vh"}}>
      <h1>Projects App</h1>
      <h2 style={{margin: 0}}>Welcome back {localStorage.getItem("user")}</h2>
      <div style={{width: "100%", display:"flex", justifyContent:"center", paddingTop:"4%"}}>

      <Button onClick={()=>{navigate("/projects")}}>Go to my projects</Button>
      </div>

      </div>
    </Container>
  );
}
export default Welcome