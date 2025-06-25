import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchExpenses } from './api/expenses';
import './App.css';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const formRef = useRef(null);
  const listRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      loadExpenses();
    }
  }, []);

  const loadExpenses = async () => {
    try {
      const res = await fetchExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setExpenses([]);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="container">
        {isAuthenticated && (
          <nav className="navbar">
            <div className="nav-left">Expense Tracker</div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <div className="nav-links">
                <button onClick={() => scrollToSection(formRef)}>Form</button>
                <button onClick={() => scrollToSection(listRef)}>List</button>
                <button onClick={() => scrollToSection(dashboardRef)}>Dashboard</button>
              </div>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </nav>
        )}

        {!isAuthenticated ? (
          <div className="auth-container">
            {showRegister ? (
              <div className="auth-box">
                <Register onRegisterSuccess={() => setShowRegister(false)} />
                <div className="auth-switch">
                  Already have an account?{" "}
                  <button onClick={() => setShowRegister(false)} className="link-button">Login here</button>
                </div>
              </div>
            ) : (
              <div className="auth-box">
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  onLoginSuccess={loadExpenses}
                />
                <div className="auth-switch">
                  No account?{" "}
                  <button onClick={() => setShowRegister(true)} className="link-button">Register here</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="sections-container">
            <section ref={formRef} className="section">
              <ExpenseForm
                onExpenseAdded={loadExpenses}
                editingExpense={editingExpense}
                setEditingExpense={setEditingExpense}
              />
            </section>

            <section ref={listRef} className="section">
              <ExpenseList
                expenses={expenses}
                setExpenses={setExpenses}
                onExpenseDeleted={loadExpenses}
                onEdit={(expense) => {
                  setEditingExpense(expense);
                  scrollToSection(formRef);
                }}
              />
            </section>

            <section ref={dashboardRef} className="section">
              <Dashboard expenses={expenses} />
            </section>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
