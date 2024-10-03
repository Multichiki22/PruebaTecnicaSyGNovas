function Title(props) {
  const { title } = props;
  return (
    <div style={{display:"flex",justifyContent:"center",marginTop: "20px", marginBottom: "10px"}}>
      <h1 style={{color:"#1C2833"}}>{title}</h1>
    </div>
  );
}
export default Title;
