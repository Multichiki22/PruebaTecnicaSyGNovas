import Nav from 'react-bootstrap/Nav';
import "./LoginTabs.css";

function LoginTabs(props) {
  const {view, setView} = props
  const handleChange = (event)=>{
    setView(event.target.id)
  }
  return (
    <div>
       <Nav justify variant="tabs" activeKey={view}>
      <Nav.Item >
        <Nav.Link id='Log In' onClick={handleChange} eventKey="Log In">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item >
        <Nav.Link  id='Sign Up'onClick={handleChange} eventKey="Sign Up">Signup</Nav.Link>
      </Nav.Item>
    </Nav>
    </div>
  );
}
export default LoginTabs;
