import WalletBalance from "../components/WalletBalance";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import { ethers } from "ethers";
import MyContract from "../artifacts/contracts/MyContract.sol/MyContract.json";

export default function Home() {
  const contractAddress = "0xe247c7bA0339E09351783e69a6BB44ef400CF65e";

  const provider = ethers && new ethers.providers.Web3Provider(window.ethereum);

  // get the end user
  const signer = provider && provider.getSigner();

  // get the smart contract
  const contract =
    ethers && new ethers.Contract(contractAddress, MyContract.abi, signer);

  const [name, setName] = useState("");
  const [contractName, setContractName] = useState("");
  const [account, setAccount] = useState(null);

  const getNameFromContract = async () => {
    const result = await contract.getName();
    setContractName(result);
  };

  const setNameOnContract = async () => {
    const result = await contract.changeName(name, {
      value: ethers.utils.parseEther("0.05"),
    });
    await result.wait();
    console.log(result);
    getNameFromContract();
  };

  useEffect(() => {
    contract &&
      contract.events &&
      contract.events.ChangeName({}, (error, data) => {
        if (error) console.log("Error: " + error);
        else console.log("Log data: " + data);
      });
    getNameFromContract();
  }, [contract]);

  useEffect(() => {
    connectMetamask();
  }, []);

  const connectMetamask = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("account", account);

    if (account) setAccount(account);
  };

  if (!account) {
    return (
      <div>
        <h3>Connect your Metamask Wallet to use Dapp</h3>
        <Button onClick={() => connectMetamask()} variant="primary">
          Connect
        </Button>
      </div>
    );
  }

  return (
    <div>
      <WalletBalance />

      {/* <input value={name} onChange={(e) => setName(e.target.value)}></input>

      <button onClick={() => setNameOnContract()}>Set Name</button>

      <button onClick={() => getNameFromContract()}>Get Name</button>*/}

      <h2>Name: {contractName}</h2>
    </div>
  );
}
