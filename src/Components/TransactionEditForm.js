import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function TransactionEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: 0,
    date: "",
    from: "",
    category: ""
  });

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => setTransaction(response.data))
      .catch((e) => console.error(e));
  }, [index]);

  const updateTransaction = () => {
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${index}`);
      })
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleAmountChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: Number(event.target.value) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTransaction();
  };

  return (
    <div className="Edit">
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
        <input type="submit" value="Edit Transaction" />
      </form>
      <Link to={`/transactions/${index}`}>
        <button>Back</button>
      </Link>
    </div>
  );
}

export default TransactionEditForm;
