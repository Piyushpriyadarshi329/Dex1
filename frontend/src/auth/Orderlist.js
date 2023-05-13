import React, { useContext, useEffect, useState } from "react";
import { DEXContext } from "../App";
import { json, useNavigate } from "react-router-dom";

export default function Orderlist() {
  const hexToDecimal = (hex) => parseInt(hex, 16);

  let { Appdata, dispatch } = useContext(DEXContext);

  const Tokenlist = Appdata.Tokenlist;

  const navigate = useNavigate();
  const [orderlist, setorderlist] = useState([]);

  useEffect(() => {
    getorderlist();
  }, [Appdata]);

  async function getorderlist() {
    console.log("localorderlist call");

    // let events = await Appdata.contract.queryFilter(
    //   "DepositCreated",
    //   0,
    //   9985387
    // );
    // 1682572687599
    // 96944463976
    // 1682572734

    // 96944463976000
    // 1682572905728
    let events = await Appdata.contract.getdeposites();

    console.log("event", events);

    let localdata = events.map((i, index) => {
      let x = {};

      // console.log("e",index,j)
      x._depositId = index;
      x._sellerTokenAddress = i["sellerContractAddress"];
      x._sellerAmount = hexToDecimal(i["sellerAmount"]._hex);
      x._buyerAmount = hexToDecimal(i["buyerAmount"]._hex);
      x._buyerTokenAddress = i["buyerContractAddress"];
      x.depositAddress = i["depositAddress"];
      x.isActive = i["isActive"];
      x.expiryTime = Math.round(
        (parseInt(i["expiryTime"]._hex, 16) * 1000 - new Date().valueOf()) /
          60000
      );
      x.now = new Date().valueOf();
      return x;
    });

    console.log("localdata", localdata[0]._sellerTokenAddress);

    let x = localdata.filter((i) => i.isActive  &&i.expiryTime>0&& i.depositAddress.toUpperCase()!==Appdata.account[0].toUpperCase());

    setorderlist(x);
  }

  async function claimorderfun(__depositId) {
    let x = await Appdata.contract.claimOrder(__depositId);
  }

  return (
    <div>
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        {orderlist.map((i) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 30,
                border: "2px lightgray",
                backgroundColor: "lightgray",
                marginRight: "10px",
                marginLeft: "200px",
                borderRadius: "10px",
                height: "100px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  Seller Token
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
                  Buyer Token
                  {
                    Tokenlist.filter(
                      (j) => j.Tokenaddress == i._buyerTokenAddress
                    )[0].Tokenname
                  }
                </div>

                <div>Buyer Token Amount {i._buyerAmount}</div>
              </div>

              <div style={{display:"flex",flexDirection:"column"}}>


<div>

<p>order will expire in {i.expiryTime} minutes</p>

  </div>

                <div style={{ marginLeft: 40, marginTop: 10 }}>
                  <button
                    style={{
                      backgroundColor: "dodgerblue",
                      padding: 5,
                      borderRadius: 5,
                    }}
                    onClick={() => {
                      claimorderfun(i._depositId);
                    }}
                  >
                    Claim Order
                  </button>
                  <button
                    style={{
                      backgroundColor: "dodgerblue",
                      padding: 5,
                      borderRadius: 5,
                    }}
                    onClick={() => {
                      navigate("/partialclaimorder", { state: i });
                    }}
                  >
                    Partial Claim Order
                  </button>
                </div>
              </div>
            </div>
          );
        })}

{orderlist.length==0?(

  <div>


    <p style={{color:"white", fontSize:30, textAlign:"center",marginTop:100}}>
      No record Found
    </p>
    </div>
):null}

      </div>
    </div>
  );
}
