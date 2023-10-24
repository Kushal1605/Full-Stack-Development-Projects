// Password is stored as plain text in the database


// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Connecting to local mongoDB server
mongoose.connect(process.env.MONGODB_URI)

// Defining Schema for the user's database
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

// Creating mongoose model
const User = mongoose.model('User', userSchema)

const app = express();
const port = 3000

// Setting public as the static folder
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Home roote to render home page
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// Get register route to render register page
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// Get login route to render login page
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

// Post register route to create account for the uswer
app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = new User({
        email: username,
        password: password
    })
    user.save()
    res.render('secrets.ejs') // Render secrets page after successful registration
})

//  Post login route for user login and verification
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email:  req.body.username })
    if(user && user.password === req.body.password) res.render('secrets.ejs') // Render secrets page after successful login
    else res.redirect('/login')
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})