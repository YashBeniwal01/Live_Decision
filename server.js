// Import required modules
const express = require('express');
const app = express();
const port = process.env.PORT || 3333; // Use port 3333 by default
const mongoose = require('mongoose');

app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));// Parse URL-encoded requests

// Define your routes here

const path = require('path');

// Serve HTML pages for users and admin
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'Love_quiz', 'lovequiz.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'Admin', 'Dashboard', 'love.html'));
});

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/Relationship', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the existing MongoDB database (Relationship)');
});

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctOption: Number,
});

const Question = mongoose.model('Question', questionSchema);

// Retrieve all questions
app.get('/api/questions', (req, res) => {
    Question.find({}, (err, questions) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json(questions);
    });
});

// Create a new question
app.post('/api/questions', (req, res) => {
    const { question, options } = req.body;

    const newQuestion = new Question({
        question,
        options,
    });

    newQuestion.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(201).send('Question added successfully');
    });
});

app.use(express.static(path.join(__dirname, 'frontend')));

//for sending question to the json

app.get('/api/questions', (req, res) => {
  Question.find({}, (err, questions) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      res.json(questions);
  });
});

//add question

app.post('/api/questions', (req, res) => {
  const { question, options, correctOption } = req.body;
  const newQuestion = new Question({
      question,
      options,
      correctOption,
  });

  newQuestion.save((err) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      res.status(201).json({ message: 'Question added successfully' });
  });
});

// Update question
app.put('/api/questions/:questionId', (req, res) => {
  const questionId = req.params.questionId;
  const { question, options, correctOption } = req.body;
  Question.findByIdAndUpdate(questionId, {
      question,
      options,
      correctOption,
  }, (err) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      res.json({ message: 'Question updated successfully' });
  });
});

//delete question

app.delete('/api/questions/:questionId', (req, res) => {
  const questionId = req.params.questionId;
  Question.findByIdAndRemove(questionId, (err) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      res.json({ message: 'Question deleted successfully' });
  });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
