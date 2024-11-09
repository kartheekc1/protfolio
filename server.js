const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/portfolioDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Contact Schema and Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  console.log('Received Data:', req.body); // Log incoming data

  // Validation check
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  try {
    const newSubmission = new Contact({ name, email, message });
    await newSubmission.save();
    res.status(200).send('Your message has been submitted successfully!');
  } catch (err) {
    console.error('Error saving to MongoDB:', err);
    res.status(500).send('There was an error submitting your message.');
  }
})


// Serve static files from the "public" folder
app.use(express.static('public'));

// Other routes and server logic here...

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

