// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "matcheat";

app.locals.appTitle = `${capitalize(projectName)}`;
const { exposeUserToView } = require("./middlewares/auth");
app.use("/", exposeUserToView);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const signup = require("./routes/signup");
app.use("/", signup);

const login = require("./routes/login");
app.use("/", login);

const match = require("./routes/match");
app.use("/", match);

const allMatchs = require("./routes/allMatchs");
app.use("/", allMatchs);

const about = require("./routes/about");
app.use("/", about);

const profile = require("./routes/profile");
app.use("/", profile);

const matchAxios = require("./routes/matchAxios");
app.use("/matchAxios", matchAxios);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

hbs.registerPartials(__dirname + "/views/partials");

module.exports = app;
