import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ amount: "", description: "", category: "", date_added: "" });
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const categoryOptions = ["All", "Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

  useEffect(() => {
    fetchExpenses();
  }, [categoryFilter, startDate, endDate, currentPage]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/expenses/", {
        headers: { Authorization: `Token ${token}` },
      });

      let filteredExpenses = response.data;

      if (categoryFilter && categoryFilter !== "All") {
        filteredExpenses = filteredExpenses.filter(exp => exp.category === categoryFilter);
      }

      if (startDate) {
        filteredExpenses = filteredExpenses.filter(exp => new Date(exp.date_added) >= new Date(startDate));
      }

      if (endDate) {
        filteredExpenses = filteredExpenses.filter(exp => new Date(exp.date_added) <= new Date(endDate));
      }

      filteredExpenses.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

      setTotalExpenses(filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0));

      setExpenses(filteredExpenses);
    } catch (error) {
        alert("Failed to fetch expenses.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        await axios.put(`http://127.0.0.1:8000/api/expenses/update/${editingExpense.id}/`, formData, {
          headers: { Authorization: `Token ${token}` },
        });
      } else {
        await axios.post("http://127.0.0.1:8000/api/expenses/", formData, {
          headers: { Authorization: `Token ${token}` },
        });
      }
      setFormData({ amount: "", description: "", category: "", date_added: "" });
      setEditingExpense(null);
      fetchExpenses();
    } catch (error) {
        alert("Failed to save expense.");
    }
  };

  const handleCancel = () => {
    setFormData({ amount: "", description: "", category: "", date_added: "" });
    setEditingExpense(null);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setFormData({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      date_added: expense.date_added.split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/expenses/delete/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchExpenses();
    } catch (error) {
        alert("Failed to delete expense.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove the authentication token
    localStorage.removeItem("username");  // Remove stored username
    window.location.href = "/login";  // Redirect to login page
  };

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2 className="dashboard-title">Expense Dashboard</h2>
        <div className="user-info">
          <span className="username">Welcome, {username}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <h4 className="add-expense-title">Add Expense</h4>
      <form onSubmit={handleSubmit} className="expense-form">
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="form-input" min="1"/>
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-input" />
        <select name="category" value={formData.category} onChange={handleChange} required className="form-input">
          <option value="">Select Category</option>
          {categoryOptions.slice(1).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input type="date" name="date_added" value={formData.date_added} onChange={handleChange} required className="form-input" max={new Date().toISOString().split("T")[0]}/>
        <div className="form-buttons">
          <button type="submit" className="form-button">{editingExpense ? "Update" : "Add"}</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>

      <h3 className="expenses-title">My Expenses</h3>
      <h3 className="total-expenses" >Total: $<span style={{color:"red"}}>{totalExpenses.toFixed(2)}</span></h3>

      <div className="filters">
        <select className="category-filter" onChange={(e) => setCategoryFilter(e.target.value)}>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input type="date" className="category-filter" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
        <input type="date" className="category-filter" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
      </div>

      <ul className="expenses-list">
        {currentExpenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <div className="expense-details">
              <strong>{expense.category}</strong> - ${expense.amount}
              <p>{expense.description}</p>
              <small>{new Date(expense.date_added).toLocaleDateString()}</small>
            </div>
            <div className="expense-actions">
              <button onClick={() => handleEdit(expense)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(expense.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="pagination-button">Prev</button>
        <span className="page-number"> Page {currentPage} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastExpense >= expenses.length} className="pagination-button">Next</button>
      </div>
    </div>
  );
};

export default Dashboard;
