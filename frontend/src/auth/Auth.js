import React from "react";
import Header from "./Header";
import CreateOrder from "./CreateOrder";
import Orderlist from "./Orderlist";
import { BrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import Partialclaimorder from "./Partialclaimorder";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Link } from "react-router-dom";
import Orderhistory from "./Orderhistory";
import Claimhistory from "./Claimhistory";
import Updateorder from "./Updateorder";
import Profile from "./Profile";

export default function Auth() {
  const { collapseSidebar } = useProSidebar();
console.log("hello")
  return (
    <div style={divStyle}>
      <BrowserRouter>
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
          <Sidebar style={{ height: "100vh" }}>
            <Menu>
              <MenuItem icon={<MenuOutlinedIcon />}>
                <h2>ABC DEX</h2>
              </MenuItem>
              <MenuItem icon={<HomeOutlinedIcon />} component={<Link to="/" />}>
                Order
              </MenuItem>
              <MenuItem icon={<HomeOutlinedIcon />} component={<Link to="/Profile" />}>
                Profile
              </MenuItem>
             
              <MenuItem
                icon={<PeopleOutlinedIcon />}
                component={<Link to="/CreateOrder" />}
              >
                Create Order
              </MenuItem>
              <MenuItem
                icon={<ContactsOutlinedIcon />}
                component={<Link to="/Orderhistory" />}
              >
                Order History
              </MenuItem>

              <MenuItem
                icon={<ReceiptOutlinedIcon />}
                component={<Link to="/Claimhistory" />}
              >
                Claim History
              </MenuItem>
            </Menu>
          </Sidebar>

          <main>
            <Header />
            <Routes>
              <Route path="/" element={<Orderlist />}></Route>
              <Route path="/CreateOrder" element={<CreateOrder />}></Route>
              <Route
                path="/partialclaimorder"
                element={<Partialclaimorder />}
              ></Route>
              <Route path="/Claimhistory" element={<Claimhistory />}></Route>
              <Route path="/Orderhistory" element={<Orderhistory />}></Route>
              <Route path="/Updateorder" element={<Updateorder />}></Route>
              <Route path="/Profile" element={<Profile />}></Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}
//

const imgMyimageexample = require("../assest/blockchain_background.jpg");
const divStyle = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: "cover",
};
