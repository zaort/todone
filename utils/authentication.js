// Using Express.js framework to create a Middleware function to check for user authenticaion. This is used on the user-routs.js
const middleAuth = (req, res, next) => {
 if (!req.session.loggedIn) {
  res.redirect('/login')
 } else {
  next();
 }

};