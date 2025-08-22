require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const User = require('./models/listofusers'); 
const auth = require('./middleware/auth');
const connectDB = require('./db');

// Connect DB
connectDB();

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

const SECRET_KEY = process.env.SECRET_KEY;

// ✅ SIGN UP
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ email, password: hashedPassword });
    await newUser.save();
    console.log("✅ User saved:", newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ PROTECTED ROUTE
app.get('/profile', auth, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

// ✅ JOBS (via RapidAPI JSearch)
// JOBS via Arbeitnow (no API key needed)
app.get('/jobs', async (req, res) => {
  try {
    const response = await fetch('https://www.arbeitnow.com/api/job-board-api');
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Error fetching Arbeitnow jobs', error: data });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching from Arbeitnow:", error);
    res.status(500).json({ message: 'Server error fetching jobs', error: error.message });
  }
});


// ✅ START SERVER
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
