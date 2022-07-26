import { useEffect, useState, useMemo } from "react";
import Install from "./pages/Install";
import Home from "./pages/Home";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Navbar from "./components/Navbar";
import AccountContext from "./hooks/accountContext";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { ethers } from "ethers";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProvider();

    window.addEventListener("load", function () {
      if (window.ethereum) {
        window.ethereum.on("networkChanged", function (networkId) {
          console.log("networkId", networkId);
          if (networkId == 5 || networkId == 31337) setWrongNetwork(false);
          else setWrongNetwork(true);
        });
      }
    });
  }, []);

  useEffect(() => {
    checkNetwork();
  }, [provider]);

  const getProvider = () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    }
  };

  const connectMetamask = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (account) setAccount(account);
  };

  const checkNetwork = async () => {
    if (provider) {
      const { chainId } = await provider.getNetwork();
      if (chainId == 5 || chainId == 31337) setWrongNetwork(false);
      else setWrongNetwork(true);
    }
  };

  useEffect(() => {
    connectMetamask();
  }, []);

  const value = useMemo(
    () => ({
      account,
      setAccount,
      provider,
      wrongNetwork,
      setWrongNetwork,
      connectMetamask,
      contractAddress: "0x8DE3588659256e0D93cE0fC785B00C79E03fE5C4",
    }),
    [account, provider, wrongNetwork, connectMetamask]
  );

  let renderComponent = <></>;

  if (window.ethereum) {
    renderComponent = (
      <Home setError={setError} setErrorMessage={setErrorMessage} />
    );
  } else {
    renderComponent = <Install />;
  }

  if (wrongNetwork) {
    renderComponent = (
      <Alert variant={"danger"}>
        WRONG NETWORK PLEASE SWITCH TO GOERLI NETWORK
      </Alert>
    );
  }

  return (
    <>
      <AccountContext.Provider value={value}>
        <Navbar />
        <ToastContainer position="bottom-end" containerPosition="fixed">
          <Toast
            onClose={() => setError(false)}
            show={error}
            className="d-inline-block m-1"
            bg={"danger"}
          >
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>{errorMessage || "Unknown error"}</Toast.Body>
          </Toast>
        </ToastContainer>
        <Container>
          <Row className="justify-content-center ">
            <Col>{renderComponent}</Col>
          </Row>
        </Container>
      </AccountContext.Provider>
    </>
  );
}

export default App;
