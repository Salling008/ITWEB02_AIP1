const express = require("express");
const path = require("path");
const routes = require("./routes/index");
const loginRouter = require("./routes/loginRouter");
const workoutRouter = require("./routes/workoutRouter");
const bodyParser = require("body-parser");
const cors = require("cors")
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

const app = express();

const corsOptions = {
  origin: ["http://localhost:4200", "https://itweb-g12-a2-app.herokuapp.com", "https://itweb-g12-a2-app.herokuapp.com/"],
  credentials: true,
  methods: "POST, PUT, OPTIONS, DELETE, GET",
  allowedHeaders: "X-Requested-With, Content-Type, Access-Control-Allow-Headers, Authorization, Origin, Accept",
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Access-Control-Allow-Headers, Authorization, Origin, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors(corsOptions))
app.options('*', cors(corsOptions));

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
if (process.env.NODE_ENV === "production") {
  mongoose.connect(
    "mongodb+srv://dbUser:dbUserPassword@cluster0.8gtzz.azure.mongodb.net/Fitness?retryWrites=true&w=majority"
  );
} else {
  mongoose.connect("mongodb://localhost:27017/Fitness");
}
var db = mongoose.connection;
// mongo error
db.on("error", console.error.bind(console, "connection error:"));

// use sessions for tracking logins
app.use(
  session({
    secret: "very secret secret",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes, loginRouter, workoutRouter);
module.exports = app;
