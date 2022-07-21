import WalletBalance from "../components/WalletBalance";
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import MyContract from "../artifacts/contracts/MyContract.sol/MyContract.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, MyContract.abi, signer);

export default function Home() {
  const [name, setName] = useState("");
  const [contractName, setContractName] = useState("");

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
  }, [contract]);

  return (
    <div>
      <WalletBalance />

      <input value={name} onChange={(e) => setName(e.target.value)}></input>

      <button onClick={() => setNameOnContract()}>Set Name</button>

      <button onClick={() => getNameFromContract()}>Get Name</button>

      <h2>Name: {contractName}</h2>
    </div>
  );
}
