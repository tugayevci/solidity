import metamask from "../assets/metamask.png";
import Col from "react-bootstrap/Col";

const Install = () => {
  return (
    <Col md="auto">
      <img src={metamask} width={250}></img>
      <h3>Follow the link to install 👇🏼</h3>
      <a target={"_blank"} href="https://metamask.io/download.html">
        MetaMask
      </a>
    </Col>
  );
};

export default Install;
