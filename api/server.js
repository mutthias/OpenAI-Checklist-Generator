require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/tasks', taskRoutes)

mongoose.connect(process.env.IP, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to DB!"))
.catch(console.error);


app.listen(3001, () => console.log("Server started on port 3001!"));
