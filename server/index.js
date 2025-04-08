const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { initDb } = require('./db');

app.use(cors());
app.use(express.json());

// Initialize database on startup
(async () => {
  await initDb();
})();

// app.post('/api/register', async (req, res) => {
//   const newPassword = await bcrypt.hash(req.body.password, 10);
//   try {
//     await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: newPassword,
//     });
//     res.json({ status: 'ok' });
//   } catch (err) {
//     console.log(err);
//     res.json({ status: 'error', error: 'Duplicate E-mail' });
//   }
// });

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.json({ status: 'error', error: 'All fields are required' });
    }
  
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ status: 'error', error: 'Email already in use' });
    }
  
    try {
      // Directly save the password as is (not recommended for production)
      await User.create({
        name,
        email,
        password,  // Save the password as plain text
      });
      res.json({ status: 'ok' });
    } catch (err) {
      console.log(err);
      res.json({ status: 'error', error: 'Server error, please try again' });
    }
  });
  

// app.post('/api/login', async (req, res) => {
//   const user = await User.findOne({
//     email: req.body.email,
//   });

//   if (!user) {
//     return res.json({ status: 'error', error: 'Invalid Login' });
//   }

//   const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

//   if (isPasswordValid) {
//     const token = jwt.sign(
//       {
//         name: user.name,
//         email: user.email,
//       },
//       'qsxcefgvb'
//     );
//     return res.json({ status: 'ok', user: token });
//   } else {
//     return res.json({ status: 'error', user: false });
//   }
// });

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({
      email: email,
    });
  
    if (!user) {
      return res.json({ status: 'error', error: 'Invalid Login' });
    }
  
    // Direct password comparison (plain text)
    if (password === user.password) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        'qsxcefgvb'
      );
      return res.json({ status: 'ok', user: token });
    } else {
      return res.json({ status: 'error', user: false });
    }
  });
  

app.get('/api/quote', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'qsxcefgvb');
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ status: 'error', error: 'User not found' });
    }

    return res.json({ status: 'ok', quote: user.quote, name: user.name });
  } catch (err) {
    console.log(err);
    res.json({ status: 'error', error: 'invalid token' });
  }
});

app.post('/api/quote', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'qsxcefgvb');
    const email = decoded.email;
    await User.updateOne(
      { email: email },
      { $set: { quote: req.body.quote } }
    );

    return res.json({ status: 'ok' });
  } catch (err) {
    console.log(err);
    res.json({ status: 'error', error: 'invalid token' });
  }
});

app.listen(1337, () => {
  console.log('Server started at 1337');
});