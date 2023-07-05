const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
dotenv.config();

const passport = require('./lib/passportConfig')

// Import our Routes
const indexRoute = require('./routes/index')
const authRoute = require('./routes/auth')
const profileRoute = require("./routes/profile");
const postRoute = require("./routes/post");

// const bodyParser = require('body-parser')

//Initialise our app
const app = express()

app.use(bodyParser.urlencoded(
    { extended:true }
  ))
app.use(bodyParser.json());


const PORT = 4000


app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))


app.use(session({
    secret: 'Thisisasecret!',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 86400000}
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})

// Mount our Routes
app.use('/', indexRoute)
app.use('/', authRoute)
app.use('/', profileRoute)
app.use('/', postRoute);


app.listen(PORT, () => {
    console.log(`The Project is open on port ${PORT}`)
})

// mongoose.connect('mongodb://127.0.0.1:27017/project03',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// ).then(() => {
//     console.log('Mongoose Is Connected to MongoDB')
// }).catch((err) => {
//     console.log('An error occurred', err)
// })

mongoose.connect(process.env.DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
  )
    .then(() => {
      console.log("Mongoose Is Connected to MongoDB");
    })
    .catch((err) => {
      console.log("An error occured", err);
    });
  