import Toast from "react-bootstrap/Toast";
function CustomToast( { show, setShow, toastType, message }) {
  let text = "";
  if (toastType === "success") {
    text = "Your information was sent successfully";
  } else {
    text = "An error has occurred";
  }

  return (
    <>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        bg={toastType}
        style={{ position: "fixed", bottom: 10, right: 10 }}
      >
        <Toast.Header>
          <strong className="me-auto">{toastType}</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>{message || text}</Toast.Body>
      </Toast>
    </>
  );
}
export default CustomToast;
