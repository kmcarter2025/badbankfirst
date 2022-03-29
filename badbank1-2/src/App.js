import React, { useState } from "react";
import NavBar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserContext from "./context/storeApi";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import Deposit from "./components/Deposit";
import AllData from "./components/AllData";
import Withdraw from "./components/Withdraw";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  return (
    <UserContext.Provider
      value={{
        balance,
        setBalance,
        users,
        setUsers,
        loggedUser,
        setLoggedUser,
      }}
    >
      <BrowserRouter>
        <NavBar />
        {/* <div className="container" style={{ padding: "20px" }}> */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          {/* <Route path="/balance" component={Balance} /> */}
          <Route path="/alldata" element={<AllData />} />
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
