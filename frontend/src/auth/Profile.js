import React, { useContext, useEffect, useState } from "react";
import { DEXContext } from "../App";

export default function Profile() {
  let { Appdata, dispatch } = useContext(DEXContext);
  const [tokenstatus, settokenstatus] = useState([]);

  useEffect(() => {
    gettokendetails();
  }, [Appdata]);

  async function gettokendetails() {
    let newdata = [];

    Appdata.Tokenlist.map(async (i) => {
      let x = await Appdata.contract.gettokenbalance(
        i.Tokenaddress,
        Appdata.account[0]
      );

      console.log("x", x);

      newdata.push({ ...i, count: parseInt(x._hex, 16) });

      console.log("newdata", newdata);
      settokenstatus([...newdata]);
    });
  }

  return (
    <div style={{justifyContent:"center",alignItems:"center"}}>
      <div>
        <h1 style={{ color: "white" }}>Your Account: {Appdata.account[0]}</h1>
      </div>

      <div style={{backgroundColor:"white",width:"200px",borderRadius:5}}>
        {tokenstatus.map((i,index) => {
            console.log("index",index)
          return (
            <div>
              <p style={{color:"black",textAlign:"center"}}> 
                {i.Tokenname}:{i.count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
