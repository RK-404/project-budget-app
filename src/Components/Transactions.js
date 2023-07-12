import Transaction from "./Transaction";

function Transactions( {transactions} ) {
  return (
    <div className="transactions">
      <section>
        <table>
          {/* <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead> */}
          <tbody>
            {transactions.map((transaction, index) =>
              <Transaction key={transaction.id} transaction={transaction} index={index} />
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Transactions;
