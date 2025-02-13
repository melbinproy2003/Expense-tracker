import { Link } from "react-router-dom";
import "./App.css";

const App = () => {

  return (
    <div className="app-container">
      <h1 className="app-title">Expense Tracker</h1>
      <p className="app-subtitle">Track Your Expense and Make Profit</p>
      <div className="app-button-container">
        <Link to="/login" className="app-button login-button">Sign In</Link>
        <Link to="/register" className="app-button register-button">Sign Up</Link>
      </div>
    </div>
  );
};

export default App;