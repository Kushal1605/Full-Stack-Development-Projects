# Secrets

**Summary**

This is a simple website where users can register themselves, login to the website and can read other's secrets or write their own secrets while providing and elaborating different levels of security and authentication.

## Overview


This contains 6 files which provides different level of security to the user passwords:

**NoAuth.js**: In this user's passwords are stored as simple plain text.

**Encrypt.js**: In this user's passwords are encrypted using an encrypted key and the encrypted key and password is stored in the database. This is done using mongoose-encryption npm package.

**Hash.js**: In this user's passwords are converted to an hash code and converting them again to a plain text is next to impossible. md5 npm package is used to convert the password into a hash code.

**Bcrypt.js**: In this user password is converted into hash again and again n number of times and addting salt(some extra text) to the password each time. **n** is called as salt rounds. bcrypt npm package is used for this.

**Session.js**: I this a user session is created so that user don't have to login everytime they login in specified amount of time. express-session and passport.js are used to create a session.

**GoogleSignIn.js**: Sign in with Google account functionality added in this file so user can also login with their google account.
## Installation

First clone the repository then open the git bash in the desired directory and use the following command to clone the repository locally:
```
git clone https://github.com/<Your Github Username>/secrets
```

Run ```npm install``` or   ```npm i``` to install the required packages and dependencies.

Set up the MongoDB for creating and managing the database.

Then you can use the command ```node <file name>``` and the website will be live in ```localhost:3000```

File name must be one of the above 6 listed file.

## Contributing

This project welcomes contributions from the community. Contributions are
accepted using GitHub pull requests; for more information, see 
[GitHub documentation - Creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

For a good pull request, we ask you provide the following:

1. Include a clear description of your pull request in the description
   with the basic "what" and "why"s for the request.
2. The tests should pass as best as you can. GitHub will automatically run
   the tests as well, to act as a safety net.
3. The pull request should include tests for the change. A new feature should
   have tests for the new feature and bug fixes should include a test that fails
   without the corresponding code change and passes after they are applied.
   The command `npm run test-cov` will generate a `coverage/` folder that
   contains HTML pages of the code coverage, to better understand if everything
   you're adding is being tested.
4. If the pull request is a new feature, please include appropriate documentation 
   in the `README.md` file as well.
5. To help ensure that your code is similar in style to the existing code,
   run the command `npm run lint` and fix any displayed issues.
