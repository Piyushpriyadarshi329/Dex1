import React, { useEffect,useReducer ,createContext} from "react";
import Dex from "./artifacts/contracts/DEXContract.sol/Dex.json";
import { ethers } from "ethers";
import Auth from "./auth/Auth";
export const DEXContext = createContext()


// export DEXContext;


const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return {...state,contract:action.contract}
      case "UPDATEACCOUNT":
      return {...state,account:action.account}
    default:
      return state;
  }
};

export default function App() {


  var state={
    state:"piyush",
    account:"",
    contract:"",
    Tokenlist:[
      {Tokenname:"T1",
    Tokenaddress:"0x9356Db645b644aD4926040B349CB72BdaE9B9dac"
    },{Tokenname:"T2",
    Tokenaddress:"0xa8Ed77958dA87593b118716CcD8FA62686Ffb476"
    }
    // "0x9356Db645b644aD4926040B349CB72BdaE9B9dac"
    ]
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
const accountslist = await provider.listAccounts();
const signer =  provider.getSigner();


console.log("accountslist",accountslist)
console.log("signer",signer.length)

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts);
      dispatch({ type: "UPDATEACCOUNT", account: accounts });

     fetchGreetings();


    } catch (error) {
      console.log(error);
    }
  };

  const fetchGreetings = async () => {
    // let contractAddress = "0x3b04Bd5AEE04b1beE0bec34498eABaac7C3073f3";  // 1st
    // let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  //2nd
      //  let contractAddress = "0xB5610615A5f5E6d38cA839cd8D6Fd2E2E3005878";  //3nd
      //  let contractAddress = "0xBf6f342C43C128435f8208f1bd5ecd990A42A422";  //4nd
       let contractAddress = "0x586F217907Eb2ffBEAbC253B8aC5b2afD2570767";  //5nd
      // let contractAddress = "0x3B6bB9bF7Dfd0D977D121c87573710c20a8bFdf5";  //6nd

    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    console.log("metamask found")

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner(0);


    console.log("signer===",signer)
   let  contract = new ethers.Contract(
      contractAddress,
      Dex.abi,
      signer
    );
    console.log("contracti",contract)


   


    dispatch({ type: "COMPLETE", contract: contract });
  };

  useEffect(() => {
    connectWallet();
  }, []);






const [Appdata, dispatch] = useReducer(reducer, state);


  return(
<DEXContext.Provider value={{Appdata:Appdata,  dispatch:dispatch}}>
<Auth/>
</DEXContext.Provider>




  )
  
}

