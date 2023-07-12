import axios from "axios";
import { v4 as uid } from 'uuid';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function LogNewForm() {
  const navigate = useNavigate();
  // console.log(uid());

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

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction(transaction);
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="text"
          value={transaction.date}
          placeholder="mm/dd/yyyy"
          onChange={handleTextChange}
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
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          onChange={handleTextChange}
          value={transaction.category}
        />
        <br/>
        <input type="submit" value="Creat New Transaction" />
      </form>
    </div>
  );
}

export default LogNewForm;
