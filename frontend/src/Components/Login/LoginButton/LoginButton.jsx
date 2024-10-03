import Button from "react-bootstrap/esm/Button";
import api from "../../../axiosConfig/axiosLogin";
import { useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
import CustomToast from "../../ToastSuccess/ToastSuccess";
function LoginButton(props) {
  const { action, login, setView, setLogin } = props;
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [toastState, setToastState] = useState("success");
  const [message, setMessage]= useState("")
  const navigate = useNavigate();

  const handleRequest = () => {
    if (login.email === "" || login.password === "") {
      alert("You must provide a email and password");
    } else {
      if (action === "Log In") {
        setLoading(true);
        setMessage(null)
        api
          .post("/auth/login", login)
          .then((response) => {
            if (response.status !== 200 && response.status !== 201) {
              setShow(true);
              setToastState("warning");
            } else {
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              localStorage.setItem("user", response.data.user);
              localStorage.setItem("role", response.data.role);
              navigate("/");
              setToastState("success");
            }
          })
          .catch((error) => {
            if (error.response.status === 403) {
              setMessage("Wrong User or Password")
            }
            setShow(true);
            setToastState("warning");
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(true);
        setMessage(null)
        api
          .post("/auth/signup", login)
          .then((response) => {
  
            if (response.status !== 200 && response.status !== 201) {
              setShow(true);
              setToastState("warning");
            } else {
              setView("Log In");
              setLogin({ email: "", password: "" });
              setShow(true);
              setToastState("success");
            }
          })
          .catch((error) => {
            if (error.response?.status === 409) {
              setMessage("El email de usuario ya esta registrado")
            }
            setShow(true);
            setToastState("warning");            
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Button
        onClick={handleRequest}
        style={{ backgroundColor: "#1C2833", border: "none" }}
      >
        {loading ? <Spinner animation="border" /> : action}
      </Button>
      <CustomToast show={show} setShow={setShow} toastType={toastState} message={message} />
    </div>
  );
}
export default LoginButton;
