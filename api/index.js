require("dotenv").config({ path: "./.env" });
require("./models/database")
var createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

// databaseconnection

const productRoute = require("./routes/productRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  require("cors")({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// app.use(require("cors")({ credentials: true }));

app.use("/api/", productRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(500).json({ error: err });
});


app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
