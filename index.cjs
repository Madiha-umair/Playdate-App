const PORT = 8888;
const express = require('express');
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://Madiha:Nissan123!@cluster0.xfsegp5.mongodb.net/playpal-data?retryWrites=true&w=majority';

const app = express();

app.get('/', function (req, res) {
  res.json('Hello to my app');
});

app.get('/signup', function (req, res) {
    res.json('Hello to my app');
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