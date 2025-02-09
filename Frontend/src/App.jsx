import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1 className="app-title">Expense Tracker</h1>
      <p className="app-subtitle">Track Your Expense and Make Profit</p>
      <div className="app-button-container">
        <Link to="/login" className="app-button login-button">Sign In</Link>
        <Link to="/register" className="app-button register-button">Sign Up</Link>
      </div>

      <style jsx>{`
        .app-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 99vh;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(to bottom right, #e0eafc, #cfdef3);
          overflow: hidden;
          position: relative;
        }

        .app-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
          z-index: -1;
        }

        .app-title {
          font-size: 5rem;
          font-weight: bold;
          color: #333;
          animation: fadeInUp 1s ease-in-out;
        }

        .app-subtitle {
          font-size: 1.2rem;
          font-style: italic;
          margin-bottom: 40px;
          color: #555;
          animation: fadeInUp 1.2s ease-in-out;
        }

        .app-button-container {
          display: flex;
          gap: 20px;
          animation: fadeInUp 1.4s ease-in-out;
        }

        .app-button {
          padding: 10px 25px;
          border: none;
          border-radius: 8px;
          text-decoration: none;
          font-size: 1.1rem;
          color: #fff;
          transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .login-button {
          background-color: #007bff;
        }

        .register-button {
          background-color: #6c757d;
        }

        .app-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }

        .login-button:hover {
          background-color: #0056b3;
        }

        .register-button:hover {
          background-color: #5a6268;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 400px) {
          .app-title {
            font-size: 2.5rem;
          }

          .app-subtitle {
            font-size: 1.1rem;
          }

          .app-button {
            font-size: 1rem;
            padding: 8px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default App;