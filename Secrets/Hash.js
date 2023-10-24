// Storing password by converting it to a hash code which then cannot be converted back to plain text using md5


// Import the required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import md5 from 'md5';

// Connect to the local mongoDB server
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
    const user = new User({     // Create a new user
        email: username,
        password: md5(password)     // Generating hash for the password using md5 and storing to the DB
    })
    user.save()         
    res.render('secrets.ejs')  // Save the user account and render the secrets page
})

// Post login route to fetch user credentials for the verification process
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email:  req.body.username })    // Find the user account associated with the email
    if(user && user.password === md5(req.body.password)) res.render('secrets.ejs')         // If user with the account exists, compare the password entered by the user against the hash stored in the database
    else res.redirect('/login')  // If user with the account exists and password is incorrect, redirect to the login page otherwise render the secrets page
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})