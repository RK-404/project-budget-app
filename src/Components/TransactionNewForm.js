import axios from "axios";
import { v4 as uid } from 'uuid';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function LogNewForm() {
  const navigate = useNavigate();
  const [deposit, setDeposit] = useState(true);
  const [transaction, setTransaction] = useState({
    id: uid(),
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: ""
  });

  const addTransaction = (newTransaction) => {
    axios
      .post(`${API}/transactions`, newTransaction)
      .then(() => navigate(`/transactions`))
      .catch((c) => console.error("catch", c));
  };

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleAmountChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: Number(event.target.value) });
  };

  const handleDateChange = (event) => {
    let newDate = event.target.value.replace(/(....).(..).(..)/, "$2/$3/$1");
    // let date = new Date(event.target.value);
    // let newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    setTransaction({ ...transaction, [event.target.id]: newDate });
  };

  const handleCheckboxChange = () => {
    setDeposit(!deposit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    transaction.amount = deposit ? transaction.amount : transaction.amount * -1;
    addTransaction(transaction);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="date"
          value={transaction.date.replace(/(..).(..).(....)/, "$3-$1-$2")}
          placeholder="mm/dd/yyyy"
          onChange={handleDateChange}
        />
        <br/>
        <label htmlFor="item_name">Name:</label>
        <input
          id="item_name"
          type="text"
          value={transaction.item_name}
          onChange={handleTextChange}
          placeholder="name"
          required
        />
        <br/>
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={transaction.amount}
          placeholder="amount"
          onChange={handleAmountChange}
          required
        />
        <br/>
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="text"
          placeholder="from"
          value={transaction.from}
          onChange={handleTextChange}
        />
        <br/>
        <label htmlFor="category">Select a Category:</label>
        <select onChange={handleTextChange} id="category">
          <option></option>
          <option value='Income'>Income</option>
          <option value='Miscellaneous'>Miscellaneous</option>
          <option value='Investments'>Investments</option>
          <option value='Living Expenses'>Living Expenses</option>
          <option value='Food & Dining'>Food & Dining</option>
          <option value='Health & Fitnes'>Health & Fitness</option>
          <option value='Personal Care'>Personal Care</option>
          <option value='Transportation'>Transportation</option>
          <option value='Shopping'>Shopping</option>
          <option value='Bills & Utilities'>Bills & Utilities</option>
          <option value='Gifts & Donations'>Gifts & Donations</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Taxes'>Taxes</option>
        </select>
        <p>Select Transaction Type (Select One):</p>
        <div className="check-boxes">
          <label className="checkbox-label">Deposit:</label>
          <input
            id="deposit"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={deposit}
          />
          <label className="checkbox-label">Withdrawal:</label>
          <input
            id="deposit"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={!deposit}
          />
        </div>
        <br/>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default LogNewForm;
