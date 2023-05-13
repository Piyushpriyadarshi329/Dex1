import React,{useContext} from 'react'
import { DEXContext } from "../App";

export default function Header() {

    let { Appdata, dispatch } = useContext(DEXContext);

  return (
    <div>


        <div style={{alignItems:"center",justifyContent:"center"}}>

          <div style={{marginTop:-25}}>

            <h1 style={{padding:20,textAlign:"center",color:"white"}}>ABC DEX</h1>
          </div>
            <p style={{color:"white",textAlign:"end"}}> Your Account:   {Appdata.account}</p>
        </div>
    </div>
  )
}
