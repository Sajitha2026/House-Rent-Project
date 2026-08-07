import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// 1. Home Page Component (Search & House List)
function Home() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/properties?location=${search}&type=${type}`);
      setProperties(res.data);
    } catch (err) {
      console.log('Error fetching data', err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [search, type]);

  return (
    <div>
      <h3 className="text-center my-3 text-primary">🏡 Search & Book Rental Houses</h3>
      
      {/* Search & Filter Controls */}
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control" 
            placeholder="📍 Search by City / Location..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <div className="col-md-6">
          <select className="form-select" onChange={(e) => setType(e.target.value)}>
            <option value="">All Types (Apartment, Villa, House)</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
          </select>
        </div>
      </div>

      {/* House List Cards */}
      <div className="row">
        {properties.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div className="card h-100 shadow-sm border-0">
              <img src={p.image || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500'} className="card-img-top" alt="house" style={{ height: '180px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted mb-1">📍 {p.location || p.city}</p>
                <h6 className="text-primary fw-bold">₹ {p.price} / month</h6>
                <button className="btn btn-outline-success btn-sm w-100 mt-2" onClick={() => alert('Booking Request Sent!')}>
                  Book House
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Login Page Component
function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      const userData = { email: form.email, name: form.email.split('@')[0], role: form.email.includes('admin') ? 'admin' : 'user' };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      alert('Login Successful!');
      navigate('/');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="col-md-4 mx-auto card p-4 shadow-sm mt-4">
      <h4 className="text-center text-primary mb-3">🔑 Login</h4>
      <form onSubmit={handleLogin}>
        <input type="email" className="form-control my-2" placeholder="Email" required onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" className="form-control my-2" placeholder="Password" required onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
      </form>
    </div>
  );
}

// 3. Register Page Component
function Register() {
  const navigate = useNavigate();
  return (
    <div className="col-md-4 mx-auto card p-4 shadow-sm mt-4">
      <h4 className="text-center text-success mb-3">📝 Register</h4>
      <form onSubmit={(e) => { e.preventDefault(); alert('Registered Successfully! Login now.'); navigate('/login'); }}>
        <input type="text" className="form-control my-2" placeholder="Full Name" required />
        <input type="email" className="form-control my-2" placeholder="Email" required />
        <input type="password" className="form-control my-2" placeholder="Password" required />
        <button type="submit" className="btn btn-success w-100 mt-2">Register</button>
      </form>
    </div>
  );
}

// Main App Component
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
        <Link className="navbar-brand fw-bold" to="/">🏠 HouseRent</Link>
        <div className="navbar-nav ms-auto align-items-center">
          <Link className="nav-link" to="/">Home</Link>
          {user ? (
            <>
              <span className="nav-link text-info me-2">Hi, {user.name}</span>
              <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Page Routing */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;