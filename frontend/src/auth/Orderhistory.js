import React, { useContext, useEffect, useState } from "react";
import { DEXContext } from "../App";
import { json, useNavigate } from "react-router-dom";

export default function Orderhistory() {
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

    // let events1 = await Appdata.contract.queryFilter(
    //   "DepositCreated",
    //   0,
    //   9985387
    // );



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
      x.isActive = i[0];
      x.time=new Date (hexToDecimal(i["time"]._hex)*1000+19800000).toISOString();
      return x;
    });

    console.log("Appdata.account", Appdata.account[0]);
    console.log("localdata", (localdata[0].depositAddress.toUpperCase())==Appdata.account[0].toUpperCase());

    localdata= localdata.filter(i=>i.depositAddress.toUpperCase()==Appdata.account[0].toUpperCase())
    console.log("localdata2", localdata);

    setorderlist(localdata);
  }


  async function updateorder(i){

try {

    // updateOrder

    // let x = await Appdata.contract.updateOrder(
    //     selleramount,
    //     buyeramount,
    //     validitytime
    //   );

navigate("/Updateorder",{state:i})
    
} catch (error) {
  console.log(error)  
}


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
                <div>Time {i.time.slice(0,16)}</div>


                <div>

                    {i.isActive?(

<button onClick={()=>{
    updateorder(i)
}}>
    update Order

</button>
                    ):null
}



                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
