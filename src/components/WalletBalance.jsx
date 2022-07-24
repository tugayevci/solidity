import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ether from "../assets/ethereum.png";

function WalletBalance() {
  const [balance, setBalance] = useState();

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <h5>
        Your Balance: {balance} <img width={18} src={ether}></img>
      </h5>
    </div>
  );
}

export default WalletBalance;
