import UserContext from "../context/storeApi";
import Card from "./Card";
import React from "react";

function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [deposit, setDeposit] = React.useState(0);
  const { balance, setBalance, setUsers, loggedUser } =
    React.useContext(UserContext);

  function validate(num) {
    if (isNaN(parseFloat(num))) {
      setStatus("Warning: Please enter a number");
      return false;
    }
    return true;
  }

  function handleDeposit() {
    console.log(deposit);
    if (!validate(deposit)) return;
    setBalance((curr) => Number(curr) + Number(deposit));
    const transaction = {
      ...loggedUser,
      balance: Number(balance) + Number(deposit),
    };
    setUsers((users) => {
      const filtered = users.filter((user) => user.email !== loggedUser.email);
      return [...filtered, transaction];
    });
    setShow(false);
  }

  // const handleSubmit = (event) => {
  //   balance = +deposit;
  //   setDeposit(balance);
  //   event.preventDefault();
  //   alert("Success");
  // };

  function clearForm() {
    setDeposit("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="success"
      header="Deposit"
      status={status}
      body={
        show ? (
          <>
            Account Balance: ${balance}
            <label readOnly={false} onChange={(e) => setBalance()}>
              {" "}
            </label>{" "}
            <br />
            <br />
            <input
              type="input"
              className="form-control"
              id="deposit"
              placeholder="Deposit Amount"
              value={deposit}
              onChange={(e) => setDeposit(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Clear
            </button>
          </>
        )
      }
    />
  );
}

export default Deposit;
