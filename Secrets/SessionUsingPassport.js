// Here we are creating user sessions using passport.js to store user information temporarily and user is not required to login every time if once logined.


// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import passportLocalMongoose from 'passport-local-mongoose';

const app = express();
const port = 3000

// Middleware configuration
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Creating session for the user
app.use(session({
    secret: 'This is a secret used to sign the session ID cookie.',
    resave: true,
    saveUninitialized: false,
}))

// Initializing the passport and allowing to create session
app.use(passport.initialize())
app.use(passport.session())

// Connecting to the local mongoDB server
mongoose.connect(process.env.MONGODB_URI)

// Defining schema for user accounts in DB
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

// Pluging in passport-local-mongoose for the database
userSchema.plugin(passportLocalMongoose)

// Creating the mongoose model which folows userSchema
const User = mongoose.model('User', userSchema)

passport.use(User.createStrategy());

// Serializing the user session to create cookie and store it in the browser
passport.serializeUser(User.serializeUser());

// Deserializing the user session to crumble the cookie and extract the information mainly cookie id
passport.deserializeUser(User.deserializeUser());

// Home Route
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// Get register route to render the register page
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// Get login route to render the login page
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

// Get secrets route to render the secrets page
app.get('/secrets', (req, res) => {
    if(req.isAuthenticated()) {     // If user is authenticated then render the secrets page
        res.render('secrets.ejs')
    } else {                        // If user is not authenticated then redirect to login page
        res.redirect('/login')
    }
})

// Get logout route to end the session and logout from the account
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err) {
            console.log(err)
            res.redirect('/secrets')
        } else {
            res.redirect('/')       // Redirect to home route after logout
        }
    })
})

// Post route to collect user credentials and create account for user
app.post('/register', (req, res) => {
    // Registering user with the credentials provided by the user
   User.register({ username: req.body.username }, req.body.password, function (err, user) {
    if(err) {
        console.log(err)
        res.redirect('/register')   // If registration fails, redirect to the registration page
    } else {
        passport.authenticate('local')(req, res, () => {
            res.redirect('/secrets')    //If registration succeeds, render the secrets pase
        })
    }
   })
})

//  Post Route for login to verify the user credentials
app.post('/login', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
      })

    req.logIn(user, (err) => {          // requires User object to login not the normal JS object
        if(err) {
            console.log(err)
            res.redirect('/login')  // redirect to login page if login failed
        } else {
            passport.authenticate('local')(req, res, () => {    // If successful login, authenticate user
                res.redirect('/secrets')
            })
        }
    })
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})


