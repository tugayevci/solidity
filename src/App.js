import { useEffect, useState, useMemo } from "react";
import Install from "./pages/Install";
import Home from "./pages/Home";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Navbar from "./components/Navbar";
import AccountContext from "./hooks/accountContext";

import { ethers } from "ethers";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  useEffect(() => {
    getProvider();

    window.addEventListener("load", function () {
      if (window.ethereum) {
        window.ethereum.on("networkChanged", function (networkId) {
          console.log("networkId", networkId);
          if (networkId != 5) setWrongNetwork(true);
          else setWrongNetwork(false);
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
      if (chainId !== 5) setWrongNetwork(true);
      else setWrongNetwork(false);
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
    }),
    [account, provider, wrongNetwork, connectMetamask]
  );

  let renderComponent = <></>;

  if (window.ethereum) {
    renderComponent = <Home />;
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
