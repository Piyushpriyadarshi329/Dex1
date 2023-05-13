import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DEXContext } from "../App";

export default function Partialclaimorder() {
  const location = useLocation();
  let { Appdata, dispatch } = useContext(DEXContext);

  const [_buyerAmount, set_buyerAmount] = useState(0);
  const Tokenlist = Appdata.Tokenlist;

  console.log("Location");
  let depositedata=location.state

  async function partialclaimorderfun(__depositId) {
    let x = await Appdata.contract.buyPartialOrder(depositedata._depositId, _buyerAmount);
  }
  return (
    <div>
      <h1>Partialclaimorder </h1>

      <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  Seller Token{" "}
                  {
                    Tokenlist.filter(
                      (j) => j.Tokenaddress == depositedata._sellerTokenAddress
                    )[0].Tokenname
                  }
                </div>

                <div>Seller Token Amount {depositedata._sellerAmount}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 50,
                }}
              >
                <div>
                  Buyer Token{" "}
                  {
                    Tokenlist.filter(
                      (j) => j.Tokenaddress == depositedata._buyerTokenAddress
                    )[0].Tokenname
                  }
                </div>

                <div>Buyer Token Amount {depositedata._buyerAmount}</div>
              </div>


      <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <div style={{ fontSize: 20, display: "flex", flexDirection: "row" }}>
          <p>Enter Sell Amount</p>
        </div>
        <input
          style={{ height: 40, marginLeft: 30 }}
          type={"number"}
          value={_buyerAmount}
          onChange={(e) => {
            if (location.state._buyerAmount >= e.target.value){

                set_buyerAmount(e.target.value);
            }else{
                                                     
                alert("Please enter correct Seller amount");
            }
          }}
        ></input>
      </div>

      <div style={{justifyContent:"center",alignItems:"center"}}>
        <button onClick={partialclaimorderfun}>Submit</button>
      </div>
    </div>
  );
}
