import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, withRouter, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function TransactionDetails() {
  const [transaction, setTransaction] = useState([]);
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then(response => setTransaction(response.data))
      .catch(() => navigate("/not-found"));
  }, [index, navigate]);

  const handleDelete = () => {
    axios
      .delete(`${API}/transactions/${index}`)
      .then(() => navigate(`/transactions`))
      .catch((e) => console.error(e));
  };
  
  return (
    <article className="log-page">
      <div className="log-detail">
        <h2>{transaction.item_name}</h2>
        <h5>Amount: {transaction.amount}</h5>
        <h5>Date: {transaction.date}</h5>
        <h5>From: {transaction.from}</h5>
        <h5>Category: {transaction.category}</h5>
      </div>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/transactions`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/transactions/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default TransactionDetails;
