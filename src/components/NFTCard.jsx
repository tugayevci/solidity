import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ethers } from "ethers";
import ether from "../assets/ethereum.png";
import accountContext from "../hooks/accountContext";
import { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";

function NFTCard({ nft, id, mintNft, isTransaction }) {
  const { account } = useContext(accountContext);

  let owner =
    nft.owner === "0x0000000000000000000000000000000000000000"
      ? "None"
      : nft.owner;

  if (owner.toUpperCase() === account.toUpperCase()) owner = "You 🤑";

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={nft.image} />
      <Card.Body>
        <Card.Title>
          {nft.name} {ethers.utils.formatEther(nft.price)}{" "}
          <img width={18} src={ether}></img>
        </Card.Title>
        <Card.Text>{nft.desc}</Card.Text>
        <Card.Text>Owner: {owner}</Card.Text>
        {nft.owner.toUpperCase() !== account.toUpperCase() && (
          <Button
            disabled={isTransaction}
            onClick={() => mintNft(id)}
            variant="primary"
          >
            {!isTransaction ? (
              "Mint"
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default NFTCard;
