import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true); // ✅ Mark user as logged in
        navigate('/'); // ✅ Go to Dashboard
      } else {
        setMsg(data.error || 'Signup failed');
      }
    } catch (err) {
      setMsg('Something went wrong');
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form
    onSubmit={handleSignup}
    className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md"
  >
    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>

    <input
      type="email"
      placeholder="Email"
      className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
    >
      Sign up
    </button>
    <p className="mt-6 text-sm text-center text-gray-600">
      Already have an account?{" "}
      <span
        className="text-green-600 cursor-pointer underline hover:text-green-800"
        onClick={() => navigate("/")}
      >
        Login
      </span>
    </p>
  </form>
  </div>
);

}

export default Signup
