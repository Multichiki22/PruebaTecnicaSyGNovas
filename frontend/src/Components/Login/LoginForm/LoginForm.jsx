import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function LoginForm(props) {
  const { login, setLogin, isLogin } = props;
  const handleChange = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    setLogin({ ...login, [key]: value });
  };
  return (
    <div style={{ padding: "5%" }}>
      {!!!isLogin ? (
        <FloatingLabel controlId="user" label="UserName" className="mb-3">
          <Form.Control
            onChange={handleChange}
            value={login.user}
            type="text"
            placeholder="UserName"
          />
        </FloatingLabel>
      ) : null}

      <FloatingLabel controlId="email" label="email" className="mb-3">
        <Form.Control
          onChange={handleChange}
          value={login.email}
          type="text"
          placeholder="email"
        />
      </FloatingLabel>
      <FloatingLabel controlId="password" label="Password">
        <Form.Control
          onChange={handleChange}
          value={login.password}
          type="password"
          placeholder="Password"
        />
      </FloatingLabel>
    </div>
  );
}
export default LoginForm;
