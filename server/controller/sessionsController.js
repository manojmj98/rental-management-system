const jwt = require("jsonwebtoken");
//const {getGoogleOauthTokens,getGoogleUser} = require("../services/userService");
const userService = require("../services/userService");
const accessTokenCookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost", //TODO: What should this domain name be? Locally yes local host but on server?
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

async function googleOauthHandler(req, response) {
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
  //TODO: Have to do this
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token

  const accessToken = signJwt(
    { ...user.toJSON(), session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user.toJSON(), session: session._id },
    { expiresIn: config.get("refreshTokenTtl") } // 1 year
  );

  //set cookies and redirect back to client
  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  // redirect back to client
  res.redirect(process.env.CLIENT_ORIGIN);
}

module.exports = {
  googleOauthHandler,
};
