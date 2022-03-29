import Card from "./Card";
import React from "react";
import UserContext from "../context/storeApi";

function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [withdraw, setWithdraw] = React.useState("");
  const { setUsers, balance, setBalance, loggedUser } =
    React.useContext(UserContext);

  function validate(num) {
    if (isNaN(parseFloat(num))) {
      setStatus("Warning: Please enter a number");
      return false;
    }
    return true;
  }

  function handleWithdraw() {
    if (!validate(withdraw, "withdraw")) return;
    setBalance((prev) => Number(prev) - Number(withdraw));
    const transaction = {
      ...loggedUser,
      balance: Number(balance) - Number(withdraw),
    };
    setUsers((users) => {
      const filtered = users.filter((user) => user.email !== loggedUser.email);
      return [...filtered, transaction];
    });
    setShow(false);
  }

  function clearForm() {
    setWithdraw("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <>
            Account Balance: ${balance}
            <br />
            <input
              type="input"
              className="form-control"
              id="withdraw"
              placeholder="Withdrawl Amount"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </>
        ) : (
          <>
            <h5>Successful Transaction</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Clear
            </button>
          </>
        )
      }
    />
  );
}

export default Withdraw;
