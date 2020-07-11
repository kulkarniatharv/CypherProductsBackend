const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const apiSchema = require('./graphql/schema/index');
const apiResolver = require('./graphql/resolver/index');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    return res.status(200).json({});
  }
  next();
});

app.use(
  '/api',
  graphqlHTTP({
    schema: apiSchema,
    rootValue: apiResolver,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0.klzm6.mongodb.net/${
      process.env.MONGO_DBNAME
    }?retryWrites=true&w=majority`,
    // 'mongodb+srv://jake:DbMa48SM5APFSgNG@cluster0.klzm6.mongodb.net/cypherProducts?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('DB Connected!');
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log('Error: ', err);
  });
