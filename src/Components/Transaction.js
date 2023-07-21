import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  let shortDate = new Date(transaction.date).toLocaleDateString('en-us', { month:"long", day:"numeric"});
  
  return (
    <tr className="transaction">
      <td className="tr-date">{shortDate}</td>
      <td>
        <Link className="tr-name" to={`/transactions/${index}`}>{transaction.item_name}</Link>
      </td>
      <td className="tr-amount">{transaction.amount.toFixed(2)}</td>
    </tr>
  );
}

export default Transaction;
