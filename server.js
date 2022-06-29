const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// const Pizza = require('./models/pizzaModel');
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
//const db = require("./db.js")

const path = require('path')
const pizzasRoute = require('./routes/pizzasRoute')
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')

app.use('/api/pizzas/', pizzasRoute)
app.use('/api/users/' , userRoute)
app.use('/api/orders/' , ordersRoute)
// const express = require("express");


const PORT = process.env.PORT || 3001;

const url = "mongodb://localhost:27017/pizza_db";
// ||
// "mongodb://localhost/UrlShortener";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected"));

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (request, respone) => {
  respone.send("Welcome to node app!!!! Hi Guys");
});

// app.get("/jwt", (req, res) => {
//   const token = jsonwebtoken.sign({ user: "johndoe" }, jwtSecret);
//   res.cookie("token", token, { httpOnly: true });
//   res.json({ token });
// });

// app.use("/users", userRouter);

// app.use("/url", urlRouter);

app.listen(PORT, () => console.log("The server is started in " + PORT));


if(process.env.NODE_ENV ==='production')
{
    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'client/build/index.html'))

    })
}

// const port = process.env.PORT || 8000;

// app.listen(port, () => `Server running on port port 🔥`)