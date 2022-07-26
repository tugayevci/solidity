import WalletBalance from "../components/WalletBalance";
import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";

import { ethers } from "ethers";
import MyContract from "../artifacts/contracts/MyContract.sol/MyContract.json";
import accountContext from "../hooks/accountContext";
import NFTCard from "../components/NFTCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Home() {
  const [nfts, setNfts] = useState([]);

  const { account, provider, contractAddress, connectMetamask } =
    useContext(accountContext);
  // get the end user
  const signer = provider && provider.getSigner();

  console.log("contractAddress", contractAddress);

  // get the smart contract
  const contract =
    ethers &&
    contractAddress &&
    new ethers.Contract(contractAddress, MyContract.abi, signer);

  useEffect(() => {
    getNFTs();
  }, [provider]);

  const getNFTs = async () => {
    if (contract) {
      const result = await contract.getNfts();
      console.log("result", result);
      setNfts(result);
    }
  };

  const mintNft = async (id) => {
    console.log("id", id);
    const nft = nfts[id];

    if (contract) {
      const result = await contract.mintNft(id, {
        value: nft.price,
      });
      await result.wait();
      console.log(result);
      getNFTs();
    }
  };

  if (!account) {
    return (
      <div>
        <h3>Connect your Metamask Wallet to use Dapp</h3>
        <Button
          onClick={() => connectMetamask && connectMetamask()}
          variant="primary"
        >
          Connect
        </Button>
      </div>
    );
  }

  return (
    <Row>
      {nfts.map((nft, i) => (
        <Col key={i} md={4}>
          <NFTCard nft={nft} mintNft={mintNft} id={i} />
        </Col>
      ))}
    </Row>
  );
}
