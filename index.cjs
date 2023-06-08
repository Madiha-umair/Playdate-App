const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');

const uri = 'mongodb+srv://Madiha:Nissan123!@cluster0.xfsegp5.mongodb.net/playpal-data?retryWrites=true&w=majority';
const PORT = 8888;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.json('Hello to my app');
});


// Create a multer instance with the desired configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify the destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueFileName = uuidv4(); // Generate a unique filename for the uploaded file
    cb(null, uniqueFileName); // Set the filename for the uploaded file
  },
});



// Create a multer upload instance
const upload = multer({ storage });

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

      res.status(201).json({ token, userId: validUser.user_id });
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


app.get('/user', async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db('playpal-data');
    const users = database.collection('users');
    const query = { user_id: userId }
    const user = await users.findOne(query);
    res.send(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`An error occurred: ${error.message}`);
  } finally {
    await client.close();
  }
});

console.log("i am client10 ");

//update user with a match

app.put('/addmatch', async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db('playpal-data');
    const users = database.collection('users');

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };

    const user = await users.updateOne(query, updateDocument);
    console.log("i am client10.5 ", user);
    res.send(user);
  } finally {
    await client.close();
  }
});

console.log("i am client11 ");

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db('playpal-data');
    const users = database.collection('users');

    const usersArray = [
      {
        $match: {
          user_id: { $in: userIds },
        },
      },
    ];
    const foundUsers = await users.aggregate(usersArray).toArray();
    res.send(foundUsers);
  } finally {
    await client.close();
  }
});


app.get('/matched-users', async (req, res) => {

  const client = new MongoClient(uri);
  
  const age = req.query.age;
  const city = req.query.city;

  console.log("show age value " + age);
  console.log("show city value " + city);
/*
  if (!city) {
    return res.status(400).send('Missing city parameter');
  }
*/
  try {
    await client.connect();
    const database = client.db('playpal-data');
    const users = database.collection('users');
    const query = { show_matches: {$eq: 'Mississauga'} }; // Use 'show_matches' field for the query


    const listOfMatchedUsers = await users.find(query).toArray();
    console.log("list of users matched: " + listOfMatchedUsers);
    console.log("list of users matched:", JSON.stringify(listOfMatchedUsers));
   
    res.send(listOfMatchedUsers);
  } finally {
    await client.close();
  }
});




app.put('/user', upload.single('picture'), async (req, res) => {
  const file = req.file;

  if (file) {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const database = client.db('playpal-data');
      const users = database.collection('users');

      const query = { user_id: req.body.user_id };
      const updateDocument = {
        $set: {
          picture: file.path, // Store the file path directly in the update document
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
  } else {
    res.status(400).send({ message: 'No file uploaded' });
  }
});


app.get('/messages', async (req, res) => {
  const client = new MongoClient(uri);
  const { senderId, receiverId } = req.query;

  try {
    await client.connect();
    const database = client.db('playpal-data');
    const messages = database.collection('messages');

    const messagesArray = [
      {
        $match: {
          $or: [
            { sender_id: senderId, receiver_id: receiverId },
            { sender_id: receiverId, receiver_id: senderId },
          ],
        },
      },
      {
        $sort: { timestamp: 1 },
      },
    ];

    const chatMessages = await messages.aggregate(messagesArray).toArray();
    res.send(chatMessages);
  } finally {
    await client.close();
  }
});










app.post('/messages', async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const timestamp = new Date();

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('playpal-data');
    const messages = database.collection('messages');

    const newMessage = {
      sender_id: senderId,
      receiver_id: receiverId,
      message: message,
      timestamp: timestamp,
    };

    const result = await messages.insertOne(newMessage);
    res.send(result);
  } finally {
    await client.close();
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});