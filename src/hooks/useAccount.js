import { useContext, useState } from "react";
import AccountContext from "./accountContext";

const useAccount = () => {
  return useContext(AccountContext);
};

export default useAccount;
