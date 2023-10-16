const jwt = require("jsonwebtoken");

const userService = require("../services/userService");
domain = "localhost"
if (process.env.ENVIRONEMENT != "local")
   domain = "bot-bazaar"
const accessTokenCookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: domain,
  path: "/",
  sameSite: "lax",
  secure: false,
};

async function googleOauthHandler(req, res) {

  const googleUser = jwt.decode(req.body.credential)

  if (!googleUser.email_verified) {
    return res.status(403).send("Google account is not verified");
  }

  //upsert the user
  const user = await userService.findAndUpdateUser(
    {
      email: googleUser.email,
    },
    {
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture, // TODO: Add picture if it is not already part of the user doc model
      username: googleUser.given_name
    },
    {
      upsert: true,
      new: true,
    }
  );

  const token = jwt.sign({
    email: user.email,
    id: user._id
  },process.env.JWT_SECRET,{expiresIn:"4h"})

res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});

res.status(200).json({
  success: true,
  user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
  }
})
}

module.exports = {
  googleOauthHandler,
};
