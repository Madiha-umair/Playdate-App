const PORT = 8888;
const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require ('jsonwebtoken')
const cors = require ('cors')
const uri = 'mongodb+srv://Madiha:Nissan123!@cluster0.xfsegp5.mongodb.net/playpal-data?retryWrites=true&w=majority';

const app = express();
app.use(cors())

app.get('/', function (req, res) {
  res.json('Hello to my app');
});

app.post('/signup', async(req, res) => {
    const client = new MongoClient(uri);
    const {email, password } = req.body; /*extracting the values of email and password from the request*/
    const uniqueUserId = uuidv4();
    const encryptedPassword = await bcrypt.hash(password, 7)

    try{
      client.connect()
      const database = client.db('playpal-data')
      const users = database.collection('users')
      const registeredUsers = users.findOne({email})

      if (registeredUsers) {
        return res.status(409).send('The user account already exists. Please proceed to login');
      }

      const filteredEmail = email.tolowerCase();
      const data = {
        user_id: uniqueUserId,
        email: filteredEmail, 
        hashed_password: encryptedPassword
      }

      const newUser =await users.insertOne(data)

      const token = jwt.sign(newUser,filteredEmail, {
        expiresIn : 60*12,
      })
      res.status(201).json({token, userId: uniqueUserId, email: filteredEmail})
    }
    catch (err) {
      console.log (err)
    }
  });

app.get('/users', async (req, res) => {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const database = client.db('playpal-data');
      const users = database.collection('users');
      const returnedusers = await users.find().toArray();
      res.send(returnedusers);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send(`An error occurred: ${error.message}`);
    } finally {
      if (client) {
        await client.close();
      }
    }
  });


app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT);
});