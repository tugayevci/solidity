import Install from "./pages/Install";
import Home from "./pages/Home";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let renderComponent = <></>;

  if (window.ethereum) {
    renderComponent = <Home />;
  } else {
    renderComponent = <Install />;
  }

  return (
    <Container>
      <Row className="justify-content-center ">
        <Col>{renderComponent}</Col>
      </Row>
    </Container>
  );
}

export default App;
