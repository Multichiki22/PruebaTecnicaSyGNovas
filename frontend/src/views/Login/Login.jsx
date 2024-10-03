import Container from "react-bootstrap/esm/Container";
import LoginContainer from "../../Components/Login/LoginContainer/LoginContainer";
import styles from './Login.module.css'

function Login() {
  return (
    <Container className={styles.Container}>
      <LoginContainer></LoginContainer>
    </Container>
  );
}
export default Login;
