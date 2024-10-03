import LoginForm from "../LoginForm/LoginForm";
import LoginTabs from "../LoginTabs/LoginTabs";
import styles from "./LoginContainer.module.css"
import LoginTitle from "../LoginTitle/LoginTitle";
import LoginButton from "../LoginButton/LoginButton";
import { useState } from "react";

function LoginContainer() {
  const [view, setView] = useState("Log In")
  const [login, setLogin] = useState({user: "", password: ""})
  return (
    <div className={styles.LayoutContainer}>
      <LoginTitle view={view}/>
      <div style={{backgroundColor:"#818D96", width:"100%", display: "flex", flexDirection:"column", paddingBottom:"5%", borderRadius: "10px", marginTop:"4%"}}>
      <LoginTabs view={view} setView={setView}/>
      <LoginForm login={login} setLogin={setLogin} isLogin={(view=="Log In")} />
      <LoginButton action={view} login={login} setView={setView} setLogin={setLogin}/>
      </div>
    </div>
  );
}
export default LoginContainer;
