const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const uri = 'mongodb+srv://Madiha:Nissan123!@cluster0.xfsegp5.mongodb.net/playpal-data?retryWrites=true&w=majority';
const PORT = 8888;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.json('Hello to my app');
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const uniqueUserId = uuidv4();
  const encryptedPassword = await bcrypt.hash(password, 10); // Changed the number of bcrypt rounds to 10

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('playpal-data');
    const users = database.collection('users');
    const registeredUser = await users.findOne({ email });

    if (registeredUser) {
      return res.status(409).send('The user account already exists. Please proceed to login.');
    }

    const filteredEmail = email.toLowerCase();
    const data = {
      user_id: uniqueUserId,
      email: filteredEmail,
      hashed_password: encryptedPassword,
    };

    const newUser = await users.insertOne(data);

    const token = jwt.sign({ userId: newUser.insertedId }, filteredEmail, {
      expiresIn: '12h',
    });

    res.status(201).json({ token, userId: uniqueUserId });
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('playpal-data');
    const users = database.collection('users');
    const validUser = await users.findOne({ email });

    if (!validUser) {
      console.log('Invalid email:', email);
      return res.status(400).send('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(password, validUser.hashed_password);

    if (validPassword) {
      const token = jwt.sign(validUser, email, {
        expiresIn: '12h',
      });

  
      res.status(201).json({ token, userId: validUser.user_id});
    } else {
      console.log('Invalid password for email:', email);
      res.status(400).send('Invalid email or password');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send(`An error occurred: ${err.message}`);
  } finally {
    await client.close();
  }
});

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('playpal-data');
    const users = database.collection('users');
    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`An error occurred: ${error.message}`);
  } finally {
    await client.close();
  }
});

app.get('/user', async(req,res)=>{
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try{
    await client.connect();
    const database = client.db('playpal-data')
    const users = database.collection('users')

    const query = {user_id: userId}
    const user = await users.findOne(query)
    res.send(user)
  } finally{
    await client.close();
  }

}
)

//for updating a user
app.put('/user', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('playpal-data');
    const users = database.collection('users');

    const query = { user_id: req.body.user_id };
    const updateDocument = {
      $set: {
        picture: req.body.picture,
        child_name: req.body.child_name,
        age: req.body.age,
        gender: req.body.gender,
        city: req.body.city,
        country: req.body.country,
        language: req.body.language,
        other_language: req.body.other_language,
        show_matches: req.body.show_matches,
        interest: req.body.interest,
        availability: req.body.availability,
        additional_info: req.body.additional_info,
      },
    };

    const newUser = await users.updateOne(query, updateDocument);
    res.send(newUser);
  } finally {
    await client.close();
  }
});


app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
});