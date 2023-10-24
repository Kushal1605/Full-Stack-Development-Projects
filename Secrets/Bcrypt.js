// Storing password by converting it to a hash code which then cannot be converted back to plain text using bcrypt which generates hash repeatedly according to the specified number of salt rounds
 

// Importing required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Defining the number of salt rounds for the creating hash
const saltRounds = 10

// Connecting to local MongoDB server
mongoose.connect(process.env.MONGODB_URI)

// Defining the Database schema for user accounts
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

// Creating User model
const User = mongoose.model('User', userSchema)

const app = express();
const port = 3000

// Middleware configuration
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Home route to render home page
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// Register route to render register page
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// Login route to render login page
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

// Post register route to fetch the user credentials and creating a new user account
app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    bcrypt.hash(password, saltRounds, function (err, hash) {    // Creating hash for the password with specified salt rounds
        if(err) {
            console.log(err)
            res.render('/')     // If failed to create hash, redirect to the home route
        } else {
            const user = new User({ 
                email: username,
                password: hash
            })
            user.save()     // If successful, create new user account and render the secrets page
            res.render('secrets.ejs')
        }
    })
})

// Post login route to fetch user credentials for the verification process
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email:  req.body.username })  // Find the user account associated with the email
    if(user) {      // If user with the account exists, compare the password entered by the user against the hash stored in the database
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(err) {
                console.log(err)
                res.redirect('/login')
            } else if(result === true) {
                res.render('secrets.ejs')       // If password is correct, render the secrets page
            } else {
                res.redirect('/login')          // If password is incorrect, redirect to the login page
            }
        })
    } else {
        res.redirect('/login')
    }
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})


