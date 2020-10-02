const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const PORT = 8087;

//parse
app.use(bodyParser.json());

// connect to a db, created the db on postres
const sequelize = new Sequelize('postgresql://localhost:5432/practice');

//check database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('connection to postgres established');
  } catch (e) {
    console.log('error connecting to postgres', e);
  }
})();

// create model
const User = sequelize.define('User', {
  // define model attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  rollNo: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM('1', '0'),
    defaultValue: '1',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

// sync table with database
sequelize.sync();

// create some data to table
app.post('/user', function (req, res) {
//   User.create({
//     name: 'cody poo',
//     email: 'cody@cody.com',
//     rollNo: 2,
//     status: 1,
//   })
//     .then((response) =>
//       res.status(200).json({
//         status: 2,
//         message: 'User created',
//       })
//     )
//     .catch((err) => res.send(err));
console.log(req.body);
    User.create(req.body)
    .then(response => { 
        res.status(200).json({
            status: 2,
            message: 'User created'
        })
    })
    .catch(err => {
        res.send(err);
    })
});

// set routes
app.get('/', function (req, res) {
  res.status(200).json({
    status: 1,
    message: 'Get it up',
  });
});

app.listen(PORT, () => console.log(`Express connected on port: ${PORT}`));
