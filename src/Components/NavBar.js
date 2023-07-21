import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1 id="title">
        <Link to="/transactions" className="header-link">Budget App</Link>
      </h1>
      <button className="new-btn">
        <Link to="/transactions/new" className="header-link">New Transactions</Link>
      </button>
    </nav>
  );
}
