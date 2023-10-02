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
  //Get the code from qs
  const code = req.query.code;
  //get the id and access token with code
  const { id_token, access_token } = await userService.getGoogleOauthTokens({
    code,
  });
  console.log({ id_token, access_token });
  //get user with tokens
  const googleUser = await userService.getGoogleUser({
    id_token,
    access_token,
  });
  console.log({ googleUser });

  if (!googleUser.verified_email) {
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

  //set cookies and redirect back to client
  res.cookie("accessToken", token, accessTokenCookieOptions);
  console.log("USER AUTHENTICATED WITH GOOGLE")

  // redirect back to client
  //TODO: If this should be sent back?
  res.redirect(process.env.CLIENT_ORIGIN);
}

module.exports = {
  googleOauthHandler,
};
