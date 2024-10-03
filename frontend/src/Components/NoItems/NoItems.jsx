import { Container } from "react-bootstrap"

const NoItems = ({entity})=>{
    return (
    <Container style={{display:"flex",justifyContent:"center", alignItems:"center",flexDirection:"column", height:"75vh", gap:"2%"}}>
      <div style={{backgroundColor: "#6997BF", display:"flex", flexDirection:"column", alignItems:"center", padding: "5%", borderRadius:"1vh"}}>
      <h1>{`You don't have ${entity} to show rigth now`}</h1>
      </div>
    </Container>)

}

export default NoItems