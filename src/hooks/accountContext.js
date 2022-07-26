import { createContext } from "react";

const AccountContext = createContext({
  account: null,
  setAccount: () => {},
  provider: null,
  wrongNetwork: false,
  setWrongNetwork: () => {},
  connectMetamask: () => {},
  contractAddress: "",
});

export default AccountContext;
