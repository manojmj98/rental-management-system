const qs = require('qs');
const axios = require('axios');
const User  = require('../models/userModel.js');

async function getGoogleOauthTokens({code}){
    const url = "https://oauth2.googleapis.com/token";
    console.log("redirect:",process.env.GOOGLE_REDIRECT_URL)
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: "authorization_code",
      };
    try {
        const res = await axios.post(
          url,
          qs.stringify(values),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log({values})
        return res.data;
    } catch (error) {
        //console.error(error.response.data.error);
        console.log("Failed to fetch Google Oauth Tokens",error);
        throw new Error(error.message);
    }
}

async function getGoogleUser({id_token,access_token}){
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching Google user",error);
    throw new Error(error.message);
  }
}

async function findAndUpdateUser(
  query,
  update,
  options
) {
  return User.findOneAndUpdate(query, update, options);
}

module.exports={
  getGoogleOauthTokens,
  getGoogleUser,
  findAndUpdateUser
}