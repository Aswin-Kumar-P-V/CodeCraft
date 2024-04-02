const express = require("express");
const bodyParser = require("body-parser");

const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");


//routes path
const authRoutes = require("./routes/authRoutes");
const openaiRoutes = require("./routes/openaiRoutes");
//dotenv
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorMiddleware");
dotenv.config();

//mongo connection
connectDB();

//rest app
const app = express();


//middlwares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler)

const PORT = process.env.PORT || 8080;

//api routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai",openaiRoutes)





//listen server
app.listen(PORT, () => {
  console.log(
    `App listening on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white
  );
});
