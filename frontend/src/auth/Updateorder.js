
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { DEXContext } from "../App";
import { useNavigate, useLocation } from "react-router-dom";

export default function Updateorder() {
  let { Appdata, dispatch } = useContext(DEXContext);

  const [options, setoptions] = useState([]);
  const location = useLocation();


  console.log("location",location.state)

//   const [sellertokenaddress, setsellertokenaddress] = useState("");
//   const [buyertokenaddress, setbuyertokenaddress] = useState("");
  const [selleramount, setselleramount] = useState(location.state._sellerAmount);
  const [buyeramount, setbuyeramount] = useState(location.state._buyerAmount);
  const [validitytime, setvaliditytime] = useState(0);

  useEffect(() => {
    let newdata = [];

    Appdata.Tokenlist.map((i) => {
      newdata.push({
        value: i.Tokenaddress,
        label: i.Tokenname,
      });
    });

    setoptions(newdata);
  }, [Appdata]);

  async function submitfun() {
    try {
  
      console.log("selleramount", selleramount);
      console.log("buyeramount", buyeramount);
      console.log("validitytime", validitytime);

    //   uint _sellerAmount, //15 T1 Token
    //   uint _buyerAmount, //7 T2 Token
    //   uint _validityTime,
    //   uint _orderId

      let x = await Appdata.contract.updateOrder(
        selleramount,
        buyeramount,
        validitytime,
        location.state._depositId
      );
      console.log("xxxxxxxxxx", x);

      
      setselleramount(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        backgroundColor:"lightgray",
        borderRadius:10,
        marginLeft:"200px",
        padding:0
      }}
    >
      <h1 style={{color:"black",textAlign:"center"}}>Create Order</h1>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 20 }}>Select Seller Token</p>
        </div>
        <div style={{ flex: 1 }}>
        {
                    Appdata.Tokenlist.filter(
                      (j) => j.Tokenaddress == location.state._sellerTokenAddress
                    )[0].Tokenname
                  }
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 20 }}>Seller Amount</p>
        </div>
        <div style={{ flex: 1 }}>
          <input
            style={{ height: 40, marginLeft: 20, borderRadius: 5 }}
            value={selleramount}
            onChange={(e) => {
              setselleramount(e.target.value);
            }}
            type={"number"}
          ></input>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 20 }}>Select Buyer Token</p>
        </div>
        <div style={{ flex: 1 }}>
        {
                    Appdata.Tokenlist.filter(
                      (j) => j.Tokenaddress == location.state._buyerTokenAddress
                    )[0].Tokenname
                  }
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <p style={{ fontSize: 20 }}>Buyer Amount</p>

        <input
          style={{ height: 40, marginLeft: 20, borderRadius: 5 }}
          value={buyeramount}

          onChange={(e) => {
            setbuyeramount(e.target.value);
          }}
          type={"number"}
        ></input>
      </div>

      <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <p style={{ fontSize: 20 }}>validity Time</p>
        <input
          style={{ height: 40, marginLeft: 20, borderRadius: 5 }}
          onChange={(e) => {
            setvaliditytime(e.target.value);
          }}
          type={"number"}
        ></input>
      </div>

      <div style={{padding:10}}>
        <button
          style={{
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: "dodgerblue",
          }}
          onClick={submitfun}
        >
          <h1>Submit</h1>
        </button>
      </div>
    </div>
  );
}
