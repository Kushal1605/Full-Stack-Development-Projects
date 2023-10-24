// Implementating sign-in with google feature in the project using google-oauth-2.0


// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import passportLocalMongoose from 'passport-local-mongoose';
import dotenv from 'dotenv';
import findOrCreate from 'mongoose-findorcreate';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Configuring .env
dotenv.config()

const app = express();
const port = 3000

// Setting view engine to ejs and static folder as ./public
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Creating an session for the user
app.use(session({
    secret: 'This is a secret used to sign the session ID cookie.',
    resave: true,
    saveUninitialized: false,
}))

// Initializing the session and passport.js 
app.use(passport.initialize())
app.use(passport.session())

// Connect to mongoDB server
mongoose.connect(process.env.MONGODB_URI)

// Defining the DB Schema for the user which consists of email, password, goodgleId if signIn with google
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,       // Storing googleId in the DB which is unique to every google account to prevent new account creation for the same account
    secret: String,
})

// Pluging in passport-local-mongoose for the database
userSchema.plugin(passportLocalMongoose)

// Plugin to directly use the findOrCreate method as it is not provided directly by the mongoose
userSchema.plugin(findOrCreate)

// Creating the mongoose model which folows userSchema
const User = mongoose.model('User', userSchema)

passport.use(User.createStrategy());

// Serializing the user session to create cookie and store it in the browser
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
});

// Deserializing the user session to crumble the cookie and extract the information mainly cookie id
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

// Using the google oauth GoogleStrategy() to provide sign in feature functionality for the website
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,    // ClientId generated from google cloud api services
    clientSecret: process.env.CLIENT_SECRET,  // ClientSecret generated from google cloud api services
    callbackURL: "http://localhost:3000/auth/google/secrets"  // Redirect URL after successful authentication
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {  // If user not already exits then create a new user with googleId = profile.id (Unique for every google account)
      return cb(err, user);
    }); 
  }
));

// Home Route
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// Register Route for user registration
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// Login Route for user login
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

// Submit route to render page for submitting the secret
app.get('/submit', (req, res) => {
    if (req.isAuthenticated()){     // If user is authenticated then allow to submit a secret otherwise render the login page for authentication
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

// Secrets Route for fetching and displaying the secrets submitted by the users
app.get('/secrets', async (req, res) => {
    var foundUsers = await User.find({ secret: {$ne: null}})    // Fetching all the secrets if exits
    res.render('secrets.ejs', { usersWithSecrets: foundUsers })

})

// Logout Route to enable user to log out from their account
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err) {
            console.log(err)
            res.redirect('/secrets')
        } else {
            res.redirect('/')
        }
    })
})

// Route to get oauth consent screen from google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', 
    passport.authenticate('google', { failureRedirect: '/login' }), // If authentication fails redirect to login page
    function(req, res) {
        res.redirect('/secrets');   // If authentication succeeds redirect to the secrets page
});

// Post route to collect user credentials and create account for user
app.post('/register', (req, res) => {
   User.register({ username: req.body.username }, req.body.password, function (err, user) {  // Registering the user and stroing the information in database
    if(err) {
        console.log(err)
        res.redirect('/register')
    } else {
        passport.authenticate('local')(req, res, () => {    // Authenticating the user after successful registration
            res.redirect('/secrets')
        })
    }
   })
})

//  Post Route for login to verify the user credentials
app.post('/login', async (req, res) => {
    const user = new User({       // Fetching the detials from the database
        username: req.body.username,
        password: req.body.password
      })

    req.logIn(user, (err) => {      // Logging in the user
        if(err) {
            console.log(err)
            res.redirect('/login')   // If Login failed, again redirect to the login page
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secrets')    // If successful, authorizing the user and redirecting to the the secrets page 
            })
        }
    })
})

// Post Route to submit the secrets
app.post('/submit', async (req, res) => {
    const submittedSecret = req.body.secret;    // Fetching the secret submitted by the user
    var user = await User.findById(req.user.id)
    user.secret = submittedSecret
    user.save()                                 // Saving the user's secret in the database
    res.redirect('/secrets')

}) 

app.listen(port, () => {
    console.log('listening on port ' + port);
})


