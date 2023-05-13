import React, { useContext, useEffect, useState } from "react";
import { DEXContext } from "../App";
import { json, useNavigate } from "react-router-dom";

export default function Claimhistory() {
  const hexToDecimal = (hex) => parseInt(hex, 16);

  let { Appdata, dispatch } = useContext(DEXContext);

  const Tokenlist = Appdata.Tokenlist;

  const navigate = useNavigate();
  const [orderlist, setorderlist] = useState([]);

  useEffect(() => {
    getorderhistory();
  }, [Appdata]);

  async function getorderhistory() {
    console.log("localorderlist call");

    let events1 = await Appdata.contract.queryFilter(
      "ClaimOrder",
      0,
      9985387
    );


    console.log("events1",events1)

    // let events = await Appdata.contract.getdeposites();

    // console.log("event", events);

    let localdata = events1.map((i, index) => {
      let x = {};

      // console.log("e",index,j)
      x._depositId = index;
      x._sellerTokenAddress = i.args["_sellerTokenAddress"];
      x._sellerAmount = hexToDecimal(i.args["sellerAmount"]._hex);
      x._buyerAmount = hexToDecimal(i.args["buyerAmount"]);
      x._buyerTokenAddress = i.args["_buyerTokenAddress"];
      x._buyer = i.args["_buyer"];
      x.isActive = i.args[0];
      return x;
    });

    console.log("localdata", localdata);

    localdata=localdata.filter((i)=>i._buyer.toUpperCase()== Appdata.account[0].toUpperCase())
    setorderlist(localdata);
  }

 

  return (
    <div>
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        {orderlist.map((i,index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 30,
                borderWidth: "1px",
                backgroundColor: "lightgray",
                borderRadius: 5,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                Seller Token{" "}
                  {
                    Tokenlist.filter(
                      (j) => j.Tokenaddress == i._sellerTokenAddress
                    )[0].Tokenname
                  }
                </div>

                <div>Seller Token Amount {i._sellerAmount}</div>
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
                      (j) => j.Tokenaddress == i._buyerTokenAddress
                    )[0].Tokenname
                  }
                </div>

                <div>Buyer Token Amount {i._buyerAmount}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

