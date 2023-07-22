import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <h1>Welcome</h1>
      <h2>To My Budget App</h2>
      <br/>
      <h3>
        <Link to="/transactions" className="tr-name">{`>>Click here to see the Transactions<<`}</Link>
      </h3>
    </div>
  );
}

export default Home;
