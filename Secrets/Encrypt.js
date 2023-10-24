// Encrypting the password with an encryption key and storing to Database using the mongoose-encryption package 

// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import encrypt from 'mongoose-encryption'

// Environment variables
dotenv.config()

// Connecting to local MongoDB server
mongoose.connect(process.env.MONGODB_URI)

// Defining DB schema for users
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

// Using mongoose-encryption plugin to encrypt the data feilds with a encrypted key
userSchema.plugin(encrypt, { secret: process.env.ENCRYPTED_KEY, encryptedFields: ['password'] })   // Encryted only the password field

// Creating User model
const User = mongoose.model('User', userSchema)

const app = express();
const port = 3000

// Middleware configuration
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Home Route to render home page
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// Register Route to render user registration page
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// Login Route to render user login page
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

// Post register route to fetch user credentials and create user account
app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = new User({
        email: username,
        password: password
    })
    user.save()         // Creating user account in Database
    res.render('secrets.ejs')       // Render the secrets page after registration
})

// Post login route to fetch user credentials for the verification process
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email:  req.body.username })
    if(user && user.password === req.body.password) res.render('secrets.ejs')  // If successful login, render the secrets page
    else res.redirect('/login')     // If not successful login, redirect to login page
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})