import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import ether from "../assets/ethereum.png";
import accountContext from "../hooks/accountContext";

function WalletBalance() {
  const [balance, setBalance] = useState();

  const { account, provider, wrongNetwork } = useContext(accountContext);

  const getBalance = async () => {
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

  useEffect(() => {
    if (account && provider && !wrongNetwork) getBalance();
  }, [account, provider, wrongNetwork]);

  if (wrongNetwork)
    return <h6>WRONG NETWORK PLEASE SWITCH TO GOERLI NETWORK</h6>;
  if (!balance) return <h6>Please connect your Metamask account</h6>;

  return (
    <div>
      <h5>
        Your Balance: {balance} <img width={18} src={ether}></img>
      </h5>
    </div>
  );
}

export default WalletBalance;
