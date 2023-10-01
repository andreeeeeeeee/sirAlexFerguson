const express = require('express')
const session = require('express-session');

const path = require('path')
const bodyParser = require('body-parser');
const app = express();
const flash = require('connect-flash');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = require("./routes/routes")

const handlebars = require("express-handlebars")
const handlebars_mod = require("handlebars")

const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access")

app.engine('handlebars', handlebars.engine({
  defaultLayout: false,
  handlebars: allowInsecurePrototypeAccess(handlebars_mod)
}));

app.use(session({
  secret: "gjxlnizfhqpvbfbgktkcex37jpw0ixrp",
  resave: false,
  saveUninitialized: true
}))
app.use(flash())

app.set('views', path.join("./views"))
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("successmsg")
  res.locals.error_msg = req.flash('error_msg')
  res.locals.errors = req.session.errors
  next()
})

app.use('/users', (req, res, next) => {
  console.log('will run before users route');
  next();
});

app.use(routes)

app.listen(3000, () => {
  console.log('app is running');
});
