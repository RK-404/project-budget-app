import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  let shortDate = new Date(transaction.date).toLocaleDateString('en-us', { month:"long", day:"numeric"});
  
  return (
    <tr className="transaction">
      <td>{shortDate}</td>
      <td>
        <Link to={`/transactions/${index}`}>{transaction.item_name}</Link>
      </td>
      <td>{transaction.amount}</td>
    </tr>
  );
}

export default Transaction;
