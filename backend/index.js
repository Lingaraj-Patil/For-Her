const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();

dotenv.config();
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cors({
  origin: 'https://for-her-2619.vercel.app'
}));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Define a schema and model
const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model('User', userSchema);

// Endpoint to save name
app.post('/api/names', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json({ message: 'Name saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving name' });
  }
});

// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
